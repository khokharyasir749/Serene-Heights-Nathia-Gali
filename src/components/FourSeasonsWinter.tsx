'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Single rolling ticker reel for the final digit (e.g. animating through digits to 5)
const RollingDigit: React.FC<{ target: number; inView: boolean }> = ({
  target,
  inView,
}) => {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5];
  // Target index in the digits array
  const targetIndex = 15; // settles on the final 5

  return (
    <div className="relative inline-block h-[1em] overflow-hidden align-baseline">
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: inView ? `-${(targetIndex / digits.length) * 100}%` : '0%' }}
        transition={{
          duration: 2.2,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.3,
        }}
        className="flex flex-col"
      >
        {digits.map((d, i) => (
          <span key={i} className="h-[1em] leading-none flex items-center justify-center">
            {d}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const FourSeasonsWinter: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [isSoundOn, setIsSoundOn] = useState(false);

  // =========================================================================
  // INTERACTIVE CURSOR-REACTIVE CANVAS SNOW PARTICLE PHYSICS
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // High DPI Support
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle Structure
    const NUM_FLAKES = 160;
    interface Snowflake {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      wobble: number;
      wobbleSpeed: number;
      vx: number;
      vy: number;
    }

    const flakes: Snowflake[] = Array.from({ length: NUM_FLAKES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.7 + Math.random() * 2.1,
      speedY: 0.6 + Math.random() * 1.6,
      speedX: -0.2 + Math.random() * 0.4,
      opacity: 0.25 + Math.random() * 0.65,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.02,
      vx: 0,
      vy: 0,
    }));

    // Mouse Tracking with Velocity
    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    let mouseVx = 0;
    let mouseVy = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (prevMouseX !== -1000) {
        mouseVx = currentX - prevMouseX;
        mouseVy = currentY - prevMouseY;
      }
      prevMouseX = mouseX = currentX;
      prevMouseY = mouseY = currentY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      prevMouseX = -1000;
      prevMouseY = -1000;
      mouseVx = 0;
      mouseVy = 0;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Decay mouse velocity
      mouseVx *= 0.9;
      mouseVy *= 0.9;

      const repulsionRadius = 130;
      const repulsionRadiusSq = repulsionRadius * repulsionRadius;

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];

        // Cursor Repulsion & Wind Deflection Physics
        if (mouseX !== -1000) {
          const dx = flake.x - mouseX;
          const dy = flake.y - mouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < repulsionRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (repulsionRadius - dist) / repulsionRadius;
            const angle = Math.atan2(dy, dx);

            flake.vx += Math.cos(angle) * force * 2.5 + mouseVx * 0.08;
            flake.vy += Math.sin(angle) * force * 2.5 + mouseVy * 0.08;
          }
        }

        // Apply friction to deflection velocity
        flake.vx *= 0.93;
        flake.vy *= 0.93;

        // Advance position with gentle sinusoidal wind sway
        flake.wobble += flake.wobbleSpeed;
        flake.x += flake.speedX + Math.sin(flake.wobble) * 0.65 + flake.vx;
        flake.y += flake.speedY + flake.vy;

        // Wrap around boundaries
        if (flake.y > height + 10) {
          flake.y = -10;
          flake.x = Math.random() * width;
        }
        if (flake.x < -10) flake.x = width + 10;
        else if (flake.x > width + 10) flake.x = -10;

        // Draw Snowflake
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 243, 246, ${flake.opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="snow"
      data-chapter="snow"
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between py-12 md:py-16 px-8 sm:px-14 md:px-20 bg-[#111613] text-[#EAE6DE] z-10 select-none"
    >
      {/* ================= BACKGROUND IMAGE ================= */}
      <img
        src="/img/facade-snow-night-lg.webp"
        alt="The Nathia Reserve in Winter Snow"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-[1.02]"
        loading="lazy"
      />

      {/* Cinematic Gradient Overlays for Text Legibility & Depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/70 z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 z-[1] pointer-events-none" />

      {/* Interactive Cursor-Reactive Snowfall Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[2] pointer-events-none"
      />

      {/* ================= LEFT CONTENT COLUMN ================= */}
      <div className="relative z-10 max-w-2xl mt-10 sm:mt-14 md:mt-16">
        {/* Eyebrow */}
        <div className="flex items-center space-x-3 mb-6 sm:mb-8">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#A8A195] uppercase font-light">
            09
          </span>
          <span className="w-8 sm:w-10 h-[1px] bg-[#7A7468]/50 inline-block" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#A8A195] uppercase font-light">
            FOUR SEASONS HIGH
          </span>
        </div>

        {/* Headline Typography (Exact line breaks from video & image_f9a5ea.png) */}
        <h2 className="tracking-tight leading-[0.92]">
          <span className="font-serif font-normal text-6xl sm:text-7xl md:text-8xl text-[#EAE6DE] leading-[0.92] tracking-tight block">
            Snow falls.
          </span>
          <span className="font-serif font-normal text-6xl sm:text-7xl md:text-8xl text-[#EAE6DE] leading-[0.92] tracking-tight block mt-1 sm:mt-2">
            The Reserve
          </span>
          <span className="font-serif italic font-light text-6xl sm:text-7xl md:text-8xl text-[#C9BEAE] leading-[0.95] tracking-normal block mt-1 sm:mt-2">
            stays warm.
          </span>
        </h2>

        {/* Editorial Body Paragraph */}
        <p className="font-sans font-light text-xs sm:text-sm md:text-base leading-relaxed text-[#C4BCB0] max-w-lg mt-8 sm:mt-10 drop-shadow-sm">
          Heated interiors, covered arrival and a staffed estate through the winter: while the
          hill stations close, the Reserve is at its most beautiful. The heated outdoor pool stays
          open in the snow.
        </p>
      </div>

      {/* ================= RIGHT DYNAMIC 365 COUNTER BLOCK ================= */}
      <div className="relative z-10 self-end text-right flex flex-col items-end mb-6 sm:mb-8">
        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] text-[#A8A195]/90 uppercase font-light mb-2">
          POST HANDOVER
        </span>

        {/* Big Counter Display with Rolling Odometer Ticker */}
        <div className="flex items-baseline font-serif font-light text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] text-[#EAE6DE] leading-none tracking-tighter drop-shadow-lg">
          <span>3</span>
          <span>6</span>
          <RollingDigit target={5} inView={isInView} />
        </div>

        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#A8A195] uppercase font-light mt-3 sm:mt-4">
          DAYS A YEAR · FULLY MANAGED
        </span>
      </div>

      {/* ================= BOTTOM NAVIGATION BAR ================= */}
      <div className="relative z-10 w-full flex items-center justify-between pt-6 border-t border-[#7A7468]/20">
        {/* Left: 09 / 12 Indicator */}
        <div className="flex items-center space-x-4">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#A8A195] uppercase font-light">
            09 / 12
          </span>
          <span className="w-12 sm:w-16 h-[1px] bg-[#7A7468]/30 inline-block" />
        </div>

        {/* Right: Audio Toggle */}
        <div>
          <button
            onClick={() => setIsSoundOn((prev) => !prev)}
            type="button"
            className="flex items-center space-x-2.5 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#A8A195] hover:text-[#EDE8DF] uppercase transition-colors cursor-pointer"
          >
            <span className="font-mono tracking-widest text-[#7A7468]">
              {isSoundOn ? '||||' : '....'}
            </span>
            <span>{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

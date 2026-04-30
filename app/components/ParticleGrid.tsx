'use client'
import React, { useRef, useEffect } from "react";

type ParticleGridProps = {
  width?: string | number;
  height?: string | number;
  aspectRatio?: number;
  spacing?: number;
  radius?: number;
  strength?: number;
  bgColor?: string;
  particleColor?: string;
};

const ParticleGrid: React.FC<ParticleGridProps> = ({
  width = "100%",
  height,
  aspectRatio,
  spacing = 28,
  radius = 160,
  strength = 0.02,
  bgColor = "#ffffff",
  particleColor = "0,0,0",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapperRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let W = 0,
      H = 0;
    let mx = -999,
      my = -999;

    type Dot = {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
    };

    let dots: Dot[] = [];

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      W = rect.width;
      H = rect.height;

      canvas.width = W * dpr;
      canvas.height = H * dpr;

      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildGrid();
    };

    const buildGrid = () => {
      dots = [];
      const cols = Math.ceil(W / spacing) + 1;
      const rows = Math.ceil(H / spacing) + 1;

      const ox = (W - (cols - 1) * spacing) / 2;
      const oy = (H - (rows - 1) * spacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ox + c * spacing;
          const y = oy + r * spacing;
          dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
      } else {
        mx = -999;
        my = -999;
      }
    };

    const handleMouseLeave = () => {
      mx = -999;
      my = -999;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, W, H);

      dots.forEach((d) => {
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const inf = Math.max(0, 1 - dist / radius);
        const inf2 = inf * inf;

        const tx =
          d.ox + (dx / (dist || 1)) * inf2 * radius * strength;
        const ty =
          d.oy + (dy / (dist || 1)) * inf2 * radius * strength;

        d.vx += (tx - d.x) * 0.12;
        d.vy += (ty - d.y) * 0.12;

        d.vx *= 0.65;
        d.vy *= 0.65;

        d.x += d.vx;
        d.y += d.vy;

        const size = 1 + inf2 * 1.2;
        const alpha = 0.12 + inf2 * 0.28;

        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [spacing, radius, strength, bgColor, particleColor]);

  return (
    <div
      ref={wrapperRef}
      style={{
        width,
        height: height ?? (aspectRatio ? "auto" : "100%"),
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
};

export default ParticleGrid;
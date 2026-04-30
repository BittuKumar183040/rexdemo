'use client'

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function GridConnections({ children, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;

    if (!container || !svg) return;

    const drawLines = () => {
      svg.innerHTML = "";

      const items = Array.from(container.children) as HTMLElement[];
      const containerRect = container.getBoundingClientRect();

      items.forEach((el, i) => {
        if (i === items.length - 1) return;

        const a = el.getBoundingClientRect();
        const b = items[i + 1].getBoundingClientRect();

        const x1 = a.left + a.width / 2 - containerRect.left;
        const y1 = a.top + a.height / 2 - containerRect.top;

        const x2 = b.left + b.width / 2 - containerRect.left;
        const y2 = b.top + b.height / 2 - containerRect.top;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        const d = `M ${x1} ${y1} C ${x1} ${y1 + 40}, ${x2} ${y2 - 40}, ${x2} ${y2}`;

        path.setAttribute("d", d);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "rgba(6,182,212,0.35)");
        path.setAttribute("stroke-width", "1.5");
        path.setAttribute("stroke-dasharray", "4 6");

        svg.appendChild(path);

        const length = path.getTotalLength();

        // draw animation
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1,
            delay: i * 0.15,
            ease: "power2.out",
          }
        );

        // flowing motion
        gsap.to(path, {
          strokeDashoffset: -length,
          duration: 6,
          repeat: -1,
          ease: "none",
        });
      });
    };

    drawLines();

    const resizeObserver = new ResizeObserver(drawLines);
    resizeObserver.observe(container);

    window.addEventListener("resize", drawLines);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", drawLines);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* SVG overlay */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* GRID CONTENT */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  icon?: string;
  label: string;
  desc?: string;
  href: string;
};

type MenuProps = {
  label: string;
  href?: string;
  list?: MenuItem[];
  register?: (el: HTMLDivElement | null, href?: string) => void;
  onHover?: (el: HTMLDivElement) => void;
};

export default function Menu({
  label,
  href = "#",
  list = [],
  register,
  onHover,
}: MenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const hasDropdown = list.length > 0;
  const isActive = pathname === href;

  const handleClick = (e: React.MouseEvent) => {
    if (hasDropdown) {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (register) register(containerRef.current, href);
  }, [register, href]);

  useEffect(() => {
    if (!dropdownRef.current) return;

    const el = dropdownRef.current;
    const items = el.querySelectorAll(".menu-item");

    if (open) {
      const tl = gsap.timeline();
      tl.fromTo(
        el,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
      );
      tl.fromTo(
        items,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
        },
        "-=0.2"
      );
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return

      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseEnter={(e) => onHover?.(e.currentTarget)}
      className="relative"
    >
      <Link
        href={href}
        onClick={handleClick}
        className={`flex items-center gap-1 px-4 py-2 text-md transition ${isActive
          ? "text-black dark:text-white"
          : "text-gray-600 hover:text-black"
          }`}
      >
        {label}

        {hasDropdown && (
          <ChevronDown
            size={16}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </Link>

      {hasDropdown && open && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-2 w-82 bg-white shadow-lg p-2 z-50"
        >
          {list.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-start gap-3 p-3 transition cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img src={item.icon} alt={item.label} />
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-0.5">

                <p className="text-sm font-medium tracking-tight text-black/80 group-hover:text-black transition">
                  {item.label}
                </p>

                {item.desc && (
                  <p className="text-xs text-black/40 truncate">
                    {item.desc}
                  </p>
                )}

                <div className="mt-2 h-px w-full bg-black/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
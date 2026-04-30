"use client";

import Image from "next/image";
import Link from "next/link";
import GradientLabel from "./GradientLabel";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const BrandLogo = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const linkRef  = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(linkRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.5,
      })

      .from(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.4,
          rotation: -180,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )

      .from(
        labelRef.current,
        {
          opacity: 0,
          x: -16,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.25"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Link
      ref={linkRef}
      href="/"
      className="flex items-center gap-2"
    >
      <div ref={imageRef} className="will-change-transform">
        <Image
          src="/rexcrux/64.png"
          width={32}
          height={32}
          alt="Rexcrux logo"
        />
      </div>

      <div ref={labelRef} className="will-change-transform">
        <GradientLabel label="REXCRUX" />
      </div>
    </Link>
  );
};

export default BrandLogo;
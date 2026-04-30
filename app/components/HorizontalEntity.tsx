import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type Solution = {
  title: string
  desc: string
  images?: string[]
}

const HorizontalEntity = ({ title, desc, images = [], index }: Solution & { index: number }) => {
  const [hovered, setHovered] = useState(false)

  const rowRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
  const imgRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      }
    )
  }, [index])

  useEffect(() => {
    if (!rowRef.current) return;

    const el = rowRef.current;

    // Only apply on mobile
    if (window.innerWidth >= 768) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 70%",
        end: "bottom 40%",
        onEnter: () => setHovered(true),
        onEnterBack: () => setHovered(true),
        onLeave: () => setHovered(false),
        onLeaveBack: () => setHovered(false),
      });
    }, rowRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (barRef.current)
      gsap.to(barRef.current, { scaleY: hovered ? 1 : 0, duration: 0.35, ease: 'power3.out' })
  }, [hovered])

  useEffect(() => {
    if (titleRef.current)
      gsap.to(titleRef.current, { color: hovered ? '#000000' : '#4b5563', duration: 0.25 })
  }, [hovered])

  useEffect(() => {
    if (descRef.current)
      gsap.to(descRef.current, {
        color: hovered ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.35)', duration: 0.25,
      })
  }, [hovered])

  useEffect(() => {
    if (indexRef.current)
      gsap.to(indexRef.current, {
        color: hovered ? '#06b6d4' : 'rgba(0,0,0,0.18)', duration: 0.25,
      })
  }, [hovered])

  useEffect(() => {
    const container = imagesRef.current
    const imgs = imgRefs.current.filter(Boolean)
    if (!container || imgs.length === 0) return

    if (hovered) {
      gsap.to(container, { opacity: 1, duration: 0.2 })
      gsap.fromTo(
        imgs,
        { opacity: 0, y: 16, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          stagger: 0.07,
        }
      )
    } else {
      gsap.to(imgs, {
        opacity: 0, y: 10, scale: 0.96,
        duration: 0.25,
        ease: 'power2.in',
        stagger: { each: 0.04, from: 'end' },
      })
      gsap.to(container, { opacity: 0, duration: 0.25, delay: 0.15 })
    }
  }, [hovered])

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="read"
      className="relative flex items-center justify-between gap-8 py-8"
      style={{
        borderTop: '1px solid rgba(0,0,0,0.08)',
        borderTopColor: hovered ? 'rgba(6,182,212,0.3)' : 'rgba(0,0,0,0.08)',
        transition: 'border-color 0.3s',
        opacity: 0,
      }}
    >
      <div
        ref={barRef}
        aria-hidden
        style={{
          position: 'absolute', left: -24, top: '50%',
          transform: 'translateY(-50%) scaleY(0)', transformOrigin: 'center',
          width: 2, height: '60%', background: '#22d3ee', borderRadius: 999,
        }}
      />

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="flex items-start justify-between gap-6">
          <h3
            ref={titleRef}
            className="text-lg md:text-xl lg:text-2xl font-semibold leading-snug"
            style={{ color: '#4b5563' }}
          >
            {title}
          </h3>

          <span
            ref={indexRef}
            style={{
              fontSize: 11, letterSpacing: '0.15em',
              fontFamily: 'Courier New, monospace',
              color: 'rgba(0,0,0,0.18)', flexShrink: 0, marginTop: 4,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p
          ref={descRef}
          className="text-sm md:text-base leading-relaxed"
          style={{ color: 'rgba(0,0,0,0.35)' }}
        >
          {desc}
        </p>
      </div>

      {images.length > 0 && (
        <div
          ref={imagesRef}
          className="hidden md:flex items-center gap-3 shrink-0"
          style={{ opacity: 0 }}
        >
          {images.map((src: string | StaticImport, i: number) => (
            <div
              key={i}
              ref={el => { imgRefs.current[i] = el }}
              className="relative overflow-hidden rounded-xl"
              style={{
                width: i === 1 ? 120 : 96,
                height: i === 1 ? 80 : 68,
                background: 'rgba(0,0,0,0.06)',
                flexShrink: 0,
                opacity: 0,
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />

              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 'inherit',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HorizontalEntity
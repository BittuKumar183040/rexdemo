'use client'

import GradientLabel from '../components/GradientLabel'
import Button from '../components/Button'
import ArrowIcon from '../components/ArrowIcon'
import Slider from './Slider'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Pages } from '../config/pages'

const HeroSection = () => {
  const [active, setActive] = useState(0)
  const current = Pages[active]
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!textRef.current) return

    const el = textRef.current

    gsap.fromTo(
      el.children,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      }
    )
  }, [active])

  return (
    <section className={`relative flex w-full lg:h-dvh
      ${current.isDark ? "text-white lg:bg-black": "text-black lg:bg-white"}`}>
      <div className="flex z-10 flex-col justify-between gap-20 p-4 lg:py-50 py-30 lg:pl-25 lg:w-5/12 transition-all">
        <div ref={textRef} className="flex flex-col gap-6 w-fit max-w-xl">
          <div className="text-md flex gap-2 ">
            <svg className=' hidden lg:block' width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p data-cursor="read">{current.tagline}</p>
          </div>
          <GradientLabel isDark={current.isDark} gradient={false} label={current.title} size="4xl" weight="bold" />
          <p className="text-xl font-medium">
            {current.desc}
          </p>
        </div>

        <div className="flex gap-6 ">
          <Button label={current.cta} onClick={() => { window.location.href = current.ctaLink }} />
          { current.secondaryCta &&
            <div data-cursor="magnetic" data-cursor-label="READ RESEARCH"
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => { if (current.secondaryCtaLink) window.location.href = current.secondaryCtaLink }}
            >
              <p className="text-sm opacity-75"> {current.secondaryCta} </p>
              <ArrowIcon />
            </div>
          }
        </div>
      </div>

      <Slider data={Pages} active={active} setActive={setActive} />

    </section>
  )
}

export default HeroSection
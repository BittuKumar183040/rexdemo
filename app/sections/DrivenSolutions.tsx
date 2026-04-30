'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GradientLabel from '../components/GradientLabel'
import { SOLUTIONS } from '../config/solutions'
import HorizontalEntity from '../components/HorizontalEntity'

gsap.registerPlugin(ScrollTrigger)
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

const DrivenSolutions = () => {
  const labelRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (labelRef.current)
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: -16 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: labelRef.current, start: 'top 90%', toggleActions: 'play none none none' }
        }
      )

    if (headingRef.current)
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 90%', toggleActions: 'play none none none' }
        }
      )
  }, [])

  return (
    <section className="flex flex-col gap-8 md:gap-10 w-full pb-20 pt-10 px-2.5 md:px-6 lg:px-25">

      <div ref={labelRef} style={{ opacity: 0 }}>
        <GradientLabel label="DRIVEN SOLUTIONS BY INDUSTRY" size="3xl" weight="normal" />
      </div>

      <p
        ref={headingRef}
        className="max-w-xl md:max-w-2xl text-lg md:text-xl text-black/50 leading-relaxed"
        style={{ opacity: 0 }}
      >
        RexCrux delivers symbolic-structural first intelligence systems built on a modular
        stack that operates above numerical AI, post-quantum, and below physical systems.
      </p>

      <div className="flex flex-col relative" style={{ paddingLeft: 24 }}>
        {SOLUTIONS.map((s, i) => (
          <HorizontalEntity key={s.title} {...s} index={i} />
        ))}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }} />
      </div>
    </section>
  )
}

export default DrivenSolutions
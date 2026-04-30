'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GradientLabel from '../components/GradientLabel'
import UniversalCard from '../components/UniversalCard'

gsap.registerPlugin(ScrollTrigger)

type Item = {
  title: string
  desc: string
}

const DATA: Item[] = [
  { title: 'Symbolic Encoding', desc: 'A universal symbolic grammar...' },
  { title: 'Invariant & Entropy Modeling', desc: 'Captures structure...' },
  { title: 'Interchange Verification Layer', desc: 'Enable cross-model...' },
  { title: 'Composable Systems', desc: 'Convert workflows...' },
  { title: 'Advanced Simulation', desc: 'Run symbolic simulations...' },
]

const PlatformSlider = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

useEffect(() => {
  if (!sectionRef.current || !trackRef.current) return;

  const ctx = gsap.context(() => {
  const el = trackRef.current!;
  const section = sectionRef.current!;

  const sectionWidth = section.offsetWidth;
  const totalScroll = el.scrollWidth - sectionWidth;

  gsap.to(el, {
    x: -totalScroll,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "bottom bottom",
      end: () => `+=${totalScroll * 2}`,
      scrub: true,
      pin: false,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20"
    >
      <div className="px-2.5 md:px-2.5 lg:px-25 mb-10">
        <GradientLabel label="PLATFORM WE DELIVERS" size="3xl" weight="normal" />
      </div>

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 w-max px-2.5 md:px-2.5 lg:px-25"
        >
          {DATA.map((item, i) => (
            <UniversalCard
              key={i}
              index={i}
              className="w-100 shrink-0"
              title={item.title}
              description={item.desc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PlatformSlider
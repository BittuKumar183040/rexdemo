'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { FAQS } from '../config/faq'
import { Minus, Plus } from 'lucide-react'

export type FAQItem = {
  question: string
  answer: string
}

const FAQSection = () => {
  const [active, setActive] = useState<number | null>(null)

  const sectionRef = useRef<HTMLElement | null>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([])

  const toggle = (index: number) => {
    setActive((prev) => (prev === index ? null : index))
  }

  useEffect(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return

      if (active === i) {
        gsap.killTweensOf(el)

        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.45,
            ease: 'power3.out',
          }
        )
      } else {
        gsap.killTweensOf(el)

        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.inOut',
        })
      }
    })

    iconRefs.current.forEach((icon, i) => {
      if (!icon) return

      gsap.killTweensOf(icon)

      gsap.to(icon, {
        rotate: active === i ? 180 : 0,
        scale: active === i ? 1.2 : 1,
        duration: 0.35,
        ease: 'back.out(1.7)', 
      })
    })
  }, [active])

  return (
    <section
      ref={sectionRef}
      className="flex flex-col select-none gap-10 w-full py-40 pt-10 px-2.5 md:px-2.5 lg:px-25 bg-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3 faq-title">
          <h2 className="text-4xl md:text-5xl tracking-widest text-gray-900">
            FAQs
          </h2>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          {FAQS.map((item, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              className={`faq-item border-b pb-4 transition-all duration-300 px-3 py-2 border-gray-200`}
            >
              <div className="flex justify-between items-center cursor-pointer group">
                <p
                  className={`text-lg md:text-xl transition-all duration-300
                    ${active === i ? 'text-cyan-400' : 'text-gray-800' }`}
                >
                  {item.question}
                </p>

                <span
                  ref={(el) => { iconRefs.current[i] = el }}
                  className={`text-2xl transition-all duration-300
                    ${active === i
                      ? 'text-cyan-400'
                      : 'text-gray-500 group-hover:text-cyan-400'
                    }`}
                >
                  {active === i ? <Minus /> : <Plus />}
                </span>
              </div>

              <div
                ref={(el) => { contentRefs.current[i] = el }}
                className="overflow-hidden h-0 opacity-0"
              >
                <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-600">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
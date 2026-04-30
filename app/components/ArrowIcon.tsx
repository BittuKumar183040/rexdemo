'use client'

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

gsap.registerPlugin(MotionPathPlugin)

const ArrowIcon = () => {
  const lineRef = useRef<SVGPathElement | null>(null)
  const headRef = useRef<SVGPathElement | null>(null)

  useEffect(() => {
    if (!lineRef.current || !headRef.current) return

    const line = lineRef.current
    const head = headRef.current

    const length = line.getTotalLength()

    gsap.set(line, {
      strokeDasharray: length,
      strokeDashoffset: length * 0.3,
    })

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { duration: 2, ease: "power2.inOut" },
    })

    tl.to(line, {
      strokeDashoffset: 2,
    })

    tl.to(
      head,
      {
        motionPath: {
          path: line,
          align: line,
          alignOrigin: [1, 0.5],
          start: 0.7,
          end: 1,
        },
      },
      "<"
    )

  }, [])

  return (
    <div className="inline-block">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">

        <path
          ref={headRef}
          d="M18 8L22 12L18 16"
          stroke="#403D39"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          ref={lineRef}
          d="M2 12H24"
          stroke="#403D39"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

      </svg>
    </div>
  )
}

export default ArrowIcon
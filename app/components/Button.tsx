'use client'

import { useRef } from "react"
import { gsap } from "gsap"
import { ChevronRight } from "lucide-react"

interface ButtonProps {
  label: string
  onClick?: () => void
  showIcon?: boolean
}

const Button = ({ label, onClick, showIcon = false }: ButtonProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null)

  const handleEnter = () => {
    if (!overlayRef.current) return

    gsap.to(overlayRef.current, {
      height: "100%",
      duration: 0.4,
      ease: "power3.out",
    })
  }

  const handleLeave = () => {
    if (!overlayRef.current) return

    gsap.to(overlayRef.current, {
      height: "0%",
      duration: 0.3,
      ease: "power2.in",
    })
  }

  return (
    <button
      className="relative overflow-hidden cursor-pointer w-fit h-fit px-12 py-2 text-md font-medium text-white bg-black dark:bg-white dark:text-black"
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div ref={overlayRef} className="absolute bottom-0 left-0 w-full h-0 bg-cyan-300 z-0" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-cyan-300 z-0" />
      <div className="flex gap-4">
        <span className="relative z-10 whitespace-nowrap">{label}</span>
        { showIcon && <ChevronRight size={15} className=" absolute right-4 top-1/2 -translate-y-1/2 "/>}
      </div>
    </button>
  )
}

export default Button
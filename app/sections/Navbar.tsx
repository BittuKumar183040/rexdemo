'use client'

import { Menu as MenuIcon, X } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { usePathname } from 'next/navigation'

import Menu from '../components/Menu'
import Button from '../components/Button'
import BrandLogo from '../components/BrandLogo'
import { menuItems } from '../config/navbar'
import Link from 'next/link'

const Navbar = () => {
  const pathname = usePathname()

  const [mobileOpen, setMobileOpen] = useState(false)

  const mobileRef = useRef<HTMLDivElement | null>(null)
  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mobileRef.current) return

    const el = mobileRef.current

    if (mobileOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.3,
          ease: 'power3.out',
        }
      )
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      })
    }
  }, [mobileOpen])

  const moveIndicator = (el: HTMLDivElement | null) => {
    if (!el || !indicatorRef.current) return

    const rect = el.getBoundingClientRect()
    const parentRect = el.parentElement!.getBoundingClientRect()

    gsap.to(indicatorRef.current, {
      x: rect.left - parentRect.left,
      width: rect.width,
      opacity: 1,
      duration: 0.3,
      ease: 'power3.out',
    })
  }

  useEffect(() => {
    if (!indicatorRef.current) return

    if (pathname === '/') {
      gsap.to(indicatorRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.2,
      })
      return
    }

    const el = itemRefs.current[pathname]
    moveIndicator(el)
  }, [pathname])

  const handleMouseLeave = () => {
    if (!indicatorRef.current) return

    if (pathname === '/') {
      gsap.to(indicatorRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.2,
      })
      return
    }

    const el = itemRefs.current[pathname]
    moveIndicator(el)
  }

  return (
    <nav className="fixed px-2.5 md:px-2.5 lg:px-25 flex items-center py-2 w-full bg-white dark:bg-black z-50">
      <BrandLogo />

      <div className="hidden md:flex flex-1 justify-center">
        <div
          ref={navRef}
          onMouseLeave={handleMouseLeave}
          className="relative flex gap-2 items-center"
        >
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-[2px] bg-cyan-400 rounded-full"
            style={{ width: 0, opacity: 0 }}
          />

          {menuItems.map((item, index) => (
            <Menu
              key={index}
              {...item}
              register={(el, href) => {
                if (href) itemRefs.current[href] = el
              }}
              onHover={(el) => moveIndicator(el)}
            />
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <Link href="/">
          <Button label="Explore" onClick={() => {}} />
        </Link>
      </div>

      <div className="md:hidden ml-auto">
        <button onClick={() => setMobileOpen(prev => !prev)}>
          {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      <div
        ref={mobileRef}
        className="absolute top-full left-0 w-full bg-white shadow-md rounded-lg md:hidden overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="flex flex-col gap-4 p-4">
          {menuItems.map((item, index) => (
            <Menu key={index} {...item} />
          ))}
          <Link href="/">
            <Button label="Explore" />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
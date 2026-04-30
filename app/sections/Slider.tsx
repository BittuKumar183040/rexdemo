'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

type SliderData = {
  isDark: boolean
  title: string
  image: string
  desc?: string
}

type SliderProps = {
  data: SliderData[]
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
}

const Slider = ({ data, active, setActive }: SliderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const progressRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: 'power3.out' }
    )
  }, [active])

  useEffect(() => {
    const bars = progressRefs.current
    bars.forEach((bar) => {
      if (bar) gsap.killTweensOf(bar)
    })

    bars.forEach((bar, i) => {
      if (!bar) return

      if (i === active) {
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: '100%',
            duration: 10,
            ease: 'linear',
            onComplete: () => {
              setActive((prev) => (prev + 1) % data.length)
            },
          }
        )
      } else {
        gsap.set(bar, { width: '0%' })
      }
    })

    return () => {
      bars.forEach((bar) => {
        if (bar) gsap.killTweensOf(bar)
      })
    }
  }, [active, data.length, setActive])

  const isVideo = (src: string) => {
    return /\.(mp4|webm|ogg)$/i.test(src)
  }

  const currentMedia = data[active].image
  const video = isVideo(currentMedia)

  return (
    <div className=" lg:relative absolute top-0 left-0 h-full w-full flex-1 overflow-hidden">

      <div key={active} ref={containerRef} className=" absolute inset-0">

        {video ? (
          <video
            src={currentMedia}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={currentMedia}
            fill
            sizes=''
            className="object-cover"
            alt={data[active].title}
            priority
          />
        )}

        {data[active].isDark ?
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent pointer-events-none" />
          :
          <div className="absolute inset-0 pointer-events-none" />
        }
      </div>

      <div
        className="absolute bottom-6 left-0 px-2 right-6 z-10 flex gap-4 w-full"
      >
        {data.map((item, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className="cursor-pointer flex flex-col gap-2 flex-1 min-w-0"
          >
            <div className="w-full h-1 min-w-10 bg-white/20 overflow-hidden">
              <div
                ref={(el) => { progressRefs.current[i] = el }}
                className="h-full bg-cyan-400 w-0"
              />
            </div>
            <div className="flex flex-col">
              <p
                className={`text-sm lg:block hidden transition whitespace-nowrap overflow-hidden text-ellipsis ${active === i ? 'text-cyan-400 opacity-100' : 'text-white/60'}`}
              >
                {item.title}
              </p>
              {item.desc && (
                <p className="text-xs lg:block hidden text-white/50">
                  {item.desc.split(' ').slice(0, 4).join(' ')}...
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/20 z-0" />
    </div>
  )
}

export default Slider

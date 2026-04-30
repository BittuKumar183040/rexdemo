'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type CursorStateName =
  | 'default'
  | 'view'
  | 'drag'
  | 'read'
  | 'explore'
  | 'magnetic'
  | 'zoom'
  | 'grab'
  | 'text'
  | 'link'

interface RingConfig {
  w: number
  h: number
  border: string
  bg: string
  radius: string
  style: 'solid' | 'dashed'
}

interface DotConfig {
  w: number
  h: number
  bg: string
  radius: string
}

interface CursorStateConfig {
  ring: RingConfig
  dot: DotConfig
  label: string | null
  color?: string
}

interface ParticleData {
  id: number
  x: number
  y: number
  color: string
}

interface Vec2 {
  x: number
  y: number
}

export interface CursorEffectProps {
  /** States that leave a particle trail behind the cursor */
  trailStates?: CursorStateName[]
}

// ─── State Config ─────────────────────────────────────────────────────────────

const NEON = '#00ffff'
const NEON_SOFT = 'rgba(0,255,255,0.5)'
const NEON_FAINT = 'rgba(0,255,255,0.2)'

const STATES: Record<CursorStateName, CursorStateConfig> = {
  default: {
    ring: { w: 17, h: 17, border: NEON_SOFT, bg: 'transparent', radius: '50%', style: 'solid' },
    dot:  { w: 8,  h: 8,  bg: NEON, radius: '50%' },
    label: null,
  },

  view: {
    ring: { w: 64, h: 64, border: NEON, bg: 'transparent', radius: '50%', style: 'solid' },
    dot:  { w: 8,  h: 8,  bg: NEON, radius: '50%' },
    label: 'VIEW',
    color: NEON,
  },

  drag: {
    ring: { w: 50, h: 50, border: NEON_SOFT, bg: 'transparent', radius: '50%', style: 'dashed' },
    dot:  { w: 8,  h: 8,  bg: NEON, radius: '50%' },
    label: 'DRAG',
    color: NEON,
  },

  read: {
    ring: { w: 48, h: 8, border: NEON_FAINT, bg: 'transparent', radius: '4px', style: 'solid' },
    dot:  { w: 4,  h: 4, bg: NEON, radius: '50%' },
    label: null,
  },

  explore: {
    ring: { w: 72, h: 72, border: NEON_SOFT, bg: 'transparent', radius: '50%', style: 'dashed' },
    dot:  { w: 6,  h: 6,  bg: NEON, radius: '50%' },
    label: 'EXPLORE',
    color: NEON,
  },

  magnetic: {
    ring: { w: 70, h: 70, border: NEON, bg: NEON_FAINT, radius: '50%', style: 'solid' },
    dot:  { w: 6,  h: 6,  bg: '#ffffff', radius: '50%' },
    label: 'CLICK',
    color: NEON,
  },

  zoom: {
    ring: { w: 60, h: 60, border: NEON, bg: 'transparent', radius: '50%', style: 'solid' },
    dot:  { w: 12, h: 12, bg: '#ffffff', radius: '50%' },
    label: '+ ZOOM',
    color: NEON,
  },

  grab: {
    ring: { w: 44, h: 44, border: NEON_FAINT, bg: NEON_FAINT, radius: '50%', style: 'solid' },
    dot:  { w: 6,  h: 6,  bg: NEON, radius: '50%' },
    label: 'GRAB',
    color: NEON,
  },

  text: {
    ring: { w: 40, h: 6, border: NEON_SOFT, bg: 'transparent', radius: '3px', style: 'solid' },
    dot:  { w: 2,  h: 14, bg: '#ffffff', radius: '1px' },
    label: null,
  },

  link: {
    ring: { w: 20, h: 20, border: NEON, bg: NEON_FAINT, radius: '50%', style: 'solid' },
    dot:  { w: 6,  h: 6,  bg: NEON, radius: '50%' },
    label: null,
  },
}

interface ParticleProps extends ParticleData {
  onDone: () => void
}

const Particle: React.FC<ParticleProps> = ({ x, y, color, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        width: 4,
        height: 4,
        background: color,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9996,
        transform: 'translate(-50%,-50%)',
        animation: 'cursorParticleFade 0.8s forwards ease-out',
      }}
    />
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * CursorEffect
 *
 * Mount once at the root of your app. Hides the native cursor globally.
 *
 * Trigger states by adding data attributes to any element:
 *   data-cursor="<state>"           — activates a cursor state
 *   data-cursor-label="MY LABEL"    — overrides the default label text
 *   data-cursor-color="#hex"        — dynamically tints the cursor
 *
 * Available states:
 *   view | drag | read | explore | magnetic | zoom | grab | text | link
 *
 * @example
 *   <button data-cursor="magnetic" data-cursor-label="GO">Click me</button>
 *   <section data-cursor="explore">Creative zone</section>
 *   <img data-cursor="zoom" alt="..." />
 */
const CursorEffect: React.FC<CursorEffectProps> = ({
  trailStates = ['explore', 'view'],
}) => {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  const mousePos           = useRef<Vec2>({ x: -100, y: -100 })
  const ringPos            = useRef<Vec2>({ x: -100, y: -100 })
  const rafRef             = useRef<number>(0)
  const stateRef           = useRef<CursorStateName>('default')
  const colorRef = useRef<string>(NEON)
  const particleIdRef      = useRef<number>(0)
  const lastParticlePosRef = useRef<Vec2>({ x: 0, y: 0 })
  const frameRef           = useRef<number>(0)

  const [particles, setParticles] = useState<ParticleData[]>([])

  // Inject keyframe animation once
  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'cursor-effect-keyframes'
    style.textContent = `
      @keyframes cursorParticleFade {
        0%   { opacity: 0.8; transform: translate(-50%,-50%) scale(1); }
        100% { opacity: 0;   transform: translate(-50%,-50%) scale(0.1); }
      }
    `
    if (!document.getElementById('cursor-effect-keyframes')) {
      document.head.appendChild(style)
    }
    return () => { style.remove() }
  }, [])

  const removeParticle = useCallback((id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id))
  }, [])

  const spawnTrail = useCallback((x: number, y: number, color: string) => {
    const id = particleIdRef.current++
    const jitter = () => (Math.random() - 0.5) * 10
    setParticles(prev => [
      ...prev.slice(-20),
      { id, x: x + jitter(), y: y + jitter(), color },
    ])
  }, [])

  // Apply cursor state directly to DOM (avoids re-renders in the hot path)
  const applyState = useCallback(
    (stateName: string, overrideLabel?: string | null, overrideColor?: string | null) => {
      const key = (stateName as CursorStateName) in STATES
        ? (stateName as CursorStateName)
        : 'default'
      const cfg = STATES[key]

      const dot  = dotRef.current
      const ring = ringRef.current
      const lbl  = labelRef.current
      if (!dot || !ring || !lbl) return

      const ringColor = overrideColor ?? cfg.ring.border
      colorRef.current = ringColor

      ring.style.width        = `${cfg.ring.w}px`
      ring.style.height       = `${cfg.ring.h}px`
      ring.style.borderColor  = ringColor
      ring.style.background   = cfg.ring.bg
      ring.style.borderRadius = cfg.ring.radius
      ring.style.borderStyle  = cfg.ring.style

      dot.style.width        = `${cfg.dot.w}px`
      dot.style.height       = `${cfg.dot.h}px`
      dot.style.background   = overrideColor ?? cfg.dot.bg
      dot.style.borderRadius = cfg.dot.radius

      const text = overrideLabel ?? cfg.label
      lbl.textContent = text ?? ''
      lbl.style.opacity = text ? '1' : '0'
    },
    []
  )

  // Animation loop
  useEffect(() => {
    const LERP = 0.12

    const loop = () => {
      const { x: mx, y: my } = mousePos.current
      let   { x: rx, y: ry } = ringPos.current

      rx += (mx - rx) * LERP
      ry += (my - ry) * LERP
      ringPos.current = { x: rx, y: ry }

      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`
        dotRef.current.style.top  = `${my}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`
        ringRef.current.style.top  = `${ry}px`
      }
      if (labelRef.current) {
        labelRef.current.style.left = `${mx}px`
        labelRef.current.style.top  = `${my}px`
      }

      // Particle trail
      frameRef.current++
      const dx   = mx - lastParticlePosRef.current.x
      const dy   = my - lastParticlePosRef.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (
        dist > 14 &&
        frameRef.current % 3 === 0 &&
        trailStates.includes(stateRef.current)
      ) {
        spawnTrail(mx, my, colorRef.current)
        lastParticlePosRef.current = { x: mx, y: my }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [spawnTrail, trailStates])

  // Global mouse event listeners
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest('[data-cursor]')
      const state       = el?.getAttribute('data-cursor')       ?? 'default'
      const labelAttr   = el?.getAttribute('data-cursor-label') ?? null
      const colorAttr   = el?.getAttribute('data-cursor-color') ?? null
      stateRef.current  = state as CursorStateName
      applyState(state, labelAttr, colorAttr)
    }

    const onDown = () => {
      if (dotRef.current)  dotRef.current.style.transform  = 'translate(-50%,-50%) scale(0.6)'
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(0.85)'
    }

    const onUp = () => {
      if (dotRef.current)  dotRef.current.style.transform  = 'translate(-50%,-50%) scale(1)'
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup',   onUp)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup',   onUp)
    }
  }, [applyState])

  // Hide native cursor globally
  useEffect(() => {
    document.body.style.cursor = 'none'
    return () => { document.body.style.cursor = '' }
  }, [])

  const base: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    transform: 'translate(-50%,-50%)',
  }

  const ringTransition =
    'width 0.3s cubic-bezier(.23,1,.32,1), height 0.3s cubic-bezier(.23,1,.32,1), border-color 0.25s, background 0.25s, border-radius 0.3s, opacity 0.2s'

  return (
    <>
      {particles.map(pt => (
        <Particle
          key={pt.id}
          {...pt}
          onDone={() => removeParticle(pt.id)}
        />
      ))}

      {/* Inner dot — snaps to exact cursor position */}
      <div
        ref={dotRef}
        style={{
          ...base,
          width: 6,
          height: 6,
          background: '#f0e8d0',
          borderRadius: '50%',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s, background 0.2s, border-radius 0.2s, transform 0.15s',
        }}
      />

      {/* Outer ring — lags behind with spring easing */}
      <div
        ref={ringRef}
        style={{
          ...base,
          width: 36,
          height: 36,
          border: '1.5px solid #00ffff',
          borderRadius: '50%',
          zIndex: 9998,
          transition: ringTransition,
        }}
      />

      {/* Floating label */}
      <div
        ref={labelRef}
        style={{
          ...base,
          transform: 'translate(14px, -18px)',
          zIndex: 9997,
          fontSize: 9,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#f0e8d0',
          opacity: 0,
          transition: 'opacity 0.2s',
          fontFamily: 'Courier New, monospace',
          whiteSpace: 'nowrap',
        }}
      />
    </>
  )
}

export default CursorEffect
export type { CursorStateName }

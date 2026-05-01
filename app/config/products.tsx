import React from 'react'

export type Product = {
  icon: React.ReactNode
  label: string
  desc: string
  href: string
  description: string
  capabilitiesLabel?: string
  bullets: string[]
  buttonLabel?: string
}
export const title = "OUR PRODUCTS"
export const subTitle = "RexCrux delivers symbolic-structural first intelligence systems built on a modular stack that operates above numerical AI, post-quantum, and below physical systems."

export const products = {
  label: 'Product',
  list: [
    {
      icon: "/rexcrux/foldshield.png",
      label: 'FOLDSHIELD++',
      desc: 'Symbolic Protein Folding & Mutation Intelligence',
      href: '/foldshield',
      description: 'Symbolic Protein Folding & Mutation Intelligence that models protein structure as symbolic topology to analyze mutation-driven structural change.',
      capabilitiesLabel: 'Capabilities:',
      bullets: [
        'ΔΔG reasoning without brute-force simulation',
        'Structural entropy diagnostics',
        'Mutation impact prediction',
        'Folding collapse analysis',
      ],
      buttonLabel: 'Know More',
    },
    {
      icon: "/rexcrux/raindrop.png",
      label: 'RAINDROP™',
      desc: 'Markets as entropy-driven symbolic systems',
      href: '/raindrop',
      description:
        'RainDrop models markets as entropy-driven symbolic systems rather than treating price movement as time-series noise. It focuses on structural behavior, regime transitions, and systemic risk rather than short-term prediction.',
      capabilitiesLabel: 'Capabilities:',
      bullets: [
        'Non-correlation-based diversification',
        'Structural risk identification',
        'Early-warning entropy triggers',
        'Regime detection',
      ],
      buttonLabel: 'Know More',
    },
    {
      icon: "/rexcrux/qphase.png",
      label: 'QPHASE™',
      desc: 'Translates symbolic structure into executable quantum programs',
      href: '/qphase',
      description:
        'QPhase translates symbolic structure into executable quantum programs while preserving physical and mathematical invariants. It enables quantum workflows that remain interpretable, portable, and topology-aware across hardware platforms.',
      capabilitiesLabel: 'Capabilities:',
      bullets: [
        'Measurement-based and braid-based models',
        'Hardware-agnostic transpilation',
        'Topological circuit optimization',
        'Hamiltonian-preserving compilation'
      ],
      buttonLabel: 'Know More',
    },
  ] satisfies Product[],
}
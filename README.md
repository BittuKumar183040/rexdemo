# RexCrux Developer Platform 🌐

RexCrux is a **symbolic-first developer platform** designed to build,
experiment, and deploy hybrid **symbolic--numerical systems**. It
empowers developers and researchers to create interpretable, extensible,
and scalable computational models with modern tooling.

------------------------------------------------------------------------

## 🚀 Overview

RexCrux provides a complete ecosystem that combines:

-   🧠 Symbolic computation
-   ⚙️ Numerical processing
-   🔗 Seamless integration into ML pipelines
-   📊 Visualization and experimentation tools

------------------------------------------------------------------------

## 🛠 Tech Stack

-   Frontend: Next.js, TypeScript, TailwindCSS
-   Deployment: Vercel

------------------------------------------------------------------------

## 📦 Project Structure

rexcrux/
│
├── app/ # Next.js App Router
│ ├── about/ # About page
│ ├── contact/ # Contact page
│ ├── research/ # Research section/pages
│ ├── components/ # Shared UI components
│ ├── config/ # App configs/constants
│ ├── sections/ # Page sections (modular UI blocks)
│ │
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Homepage
│ ├── globals.css # Global styles
│ └── favicon.ico
│
├── public/ # Static assets
│ ├── icon/ # Icons
│ ├── research/ # Research assets
│ ├── rexcrux/ # Branding assets
│ ├── slider/ # Carousel/media
│ ├── solutions/ # Solution visuals
│ ├── team/ # Team images
│ └── *.png / manifest files
│
├── .next/ # Build output (auto-generated)
├── node_modules/ # Dependencies
│
├── next.config.ts # Next.js config
├── tsconfig.json # TypeScript config
├── eslint.config.mjs # Linting rules
├── postcss.config.mjs # PostCSS config
├── package.json # Dependencies & scripts
├── package-lock.json
└── README.md

------------------------------------------------------------------------

## ⚡ Getting Started

### Install

npm install

### Run

npm run dev

App: http://localhost:3000

------------------------------------------------------------------------

## 🌍 Deployment

Deploy easily on Vercel.

------------------------------------------------------------------------

## 👨‍💻 Author

Bittu Kumar

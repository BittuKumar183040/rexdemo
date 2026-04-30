'use client'

const ResearchHero = () => {
  return (
    <div className="relative w-full mb-20 h-120 overflow-hidden bg-white text-black">
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,black_1px,transparent_1px),linear-gradient(to_bottom,black_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 flex flex-col justify-center gap-10 px-10">
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 lg:px-40">

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight max-w-4xl">
          Research & <span className="text-cyan-500">White Papers</span>
        </h1>

        <p className="mt-6 text-sm md:text-lg text-black/60 max-w-2xl" >
          Exploring symbolic systems, invariant structures, and next-generation intelligence frameworks.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-white to-transparent" />

    </div>
  )
}

export default ResearchHero
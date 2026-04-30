const AboutHero = () => {
  return (
    <div className="relative w-full h-120 overflow-hidden bg-white text-black">

      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,black_1px,transparent_1px),linear-gradient(to_bottom,black_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 lg:px-40">

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight max-w-4xl">
          Designing <span className="text-cyan-500">Structured Intelligence</span>
        </h1>

        <p className="mt-6 text-sm md:text-lg text-black/60 max-w-2xl">
          We are building systems that move beyond traditional AI — grounded in symbolic structures,
          invariant reasoning, and composable intelligence. Our work focuses on creating interpretable,
          modular frameworks that operate across domains, from research to real-world applications.
        </p>

        {/* <p className="mt-4 text-sm md:text-base text-black/40 max-w-xl">
          At Rexcrux, we believe intelligence is not just prediction — it is structure, consistency, and the ability to evolve systems with clarity.
        </p> */}

      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-white to-transparent" />

    </div>
  )
}

export default AboutHero

const ContactHero = () => {
  return (
    <div className="relative w-full mb-20 h-120 overflow-hidden bg-white text-black">
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,black_1px,transparent_1px),linear-gradient(to_bottom,black_1px,transparent_1px)] bg-size-[40px_40px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_60%)]" />
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-20 lg:px-40">

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight max-w-4xl">
          Let &apos; s <span className="text-cyan-500">Connect</span>
        </h1>

        <p className="mt-6 text-sm md:text-lg text-black/60 max-w-2xl" >
          Whether you &apos; re exploring collaboration, research, or product integration — we’re here to engage.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-white to-transparent" />

    </div>
  )
}

export default ContactHero
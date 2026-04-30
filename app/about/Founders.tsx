import Image from "next/image"
import GradientLabel from "../components/GradientLabel"
import { TEAM } from "../config/team"

export type Founder = {
  name: string
  role: string
  image: string
}

const FoundersSection = () => {
  return (
    <section className="mb-20 px-2.5 md:px-2.5 lg:px-25 flex flex-col gap-10 justify-between w-full bg-white dark:bg-black">

      <div className="flex flex-col gap-3">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          <GradientLabel label="MEET THE TEAM" size="3xl" weight="normal" />
        </h2>
        <p className="text-black/60 max-w-xl text-sm md:text-base">
          The minds shaping structured intelligence — combining research, systems thinking, and real-world execution.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {TEAM.map((founder, i) => (
          <div key={i} className="flex flex-col border border-black/10 rounded-sm overflow-hidden transition-all duration-300 ">
            <div className="relative w-full aspect-square overflow-hidden">
              <Image src={founder.image} alt={founder.name} fill className="object-cover transition-transform duration-500" />
            </div>

            <div className="p-4 flex flex-col gap-1 bg-white">
              <p className="text-sm font-medium tracking-tight">
                {founder.name}
              </p>
              <p className="text-xs text-black/50">
                {founder.role}
              </p>

              <div className="mt-3 h-px w-full bg-black/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400 -translate-x-full transition-transform duration-500" />
              </div>
            </div>

          </div>
        ))}

      </div>

    </section>
  )
}

export default FoundersSection
import Button from '../components/Button'
import CursorEffect from '../components/CursorEffect'
import GradientLabel from '../components/GradientLabel'
import ParticleGrid from '../components/ParticleGrid'
import { carrers_list } from '../config/careers'

export type CARRERS = {
  title: string
  location: string
  type: string
  link: string
}

const Carrers = () => {
  const hasJobs = carrers_list.length > 0

  return (
    <section className="mb-20 px-2.5 md:px-2.5 lg:px-25 flex flex-col gap-10 justify-between w-full bg-white dark:bg-black">

      <div className="flex flex-col gap-4 max-w-2xl">
        <GradientLabel label="CAREERS" size="3xl" weight="normal" />

        <p className="text-black/60 dark:text-white/60">
          Join us in building next-generation intelligence systems. We are always looking for curious minds and builders.
        </p>
      </div>

      <div className="flex flex-col gap-4">

        {hasJobs ? (
          carrers_list.map((job, i) => (
            <a
              key={i}
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-black/10 dark:border-white/10 p-5 flex items-center justify-between hover:border-cyan-400 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col">
                <p className="text-sm font-medium text-black dark:text-white">
                  {job.title}
                </p>
                <p className="text-xs text-black/50 dark:text-white/50">
                  {job.location} • {job.type}
                </p>
              </div>

              <div className="text-xs uppercase tracking-widest text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition">
                Apply →
              </div>
            </a>
          ))
        ) : (
          <div className=" relative p-6 flex z-10 flex-col border text-center border-black/10 dark:border-white/10">
            <div className='absolute left-0 top-0 h-full w-full -z-10'>
              <ParticleGrid />  
            </div> 
            <p className="text-lg text-black dark:text-white mb-4">
              No openings at the moment
            </p>
            <div className=' flex justify-between'>
              <p className="text-sm text-black/50 dark:text-white/50 max-w-md">
                We’re not hiring right now, but we’re always excited to connect with talented individuals.
                Feel free to reach out or check back soon for future opportunities.
              </p>
              <a href="https://www.linkedin.com/company/rexcrux/" >
                <Button label='LinkedIn' />
              </a>
            </div>

            <div className="mt-6 text-xs uppercase tracking-widest text-cyan-500">
              Stay Connected
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

export default Carrers
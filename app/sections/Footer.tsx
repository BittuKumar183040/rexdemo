import Image from 'next/image'
import GradientLabel from '../components/GradientLabel'
import { SocialIcon } from '../components/SocialIcons'
import { HorizontalScale } from '../components/Lines'
import ParticleGrid from '../components/ParticleGrid'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="relative px-2.5 md:px-2.5 lg:px-25 flex gap-10 flex-wrap-reverse justify-between w-full">
      <div className='absolute left-0 top-0 h-full w-full z-0'>
        <ParticleGrid />  
      </div> 
      <div className="flex flex-col space-y-4 z-10">
        <div className="flex flex-col gap-6 max-w-md">
          <div className="flex items-center gap-2">
            <Image
              src="/rexcrux/64.png"
              sizes=''
              width={32}
              height={32}
              alt="Rexcrux logo"
            />
            <GradientLabel label="REXCRUX" />
          </div>

          <p className="text-lg leading-relaxed">
            Symbolic intelligence infrastructure for financial modeling,
            computational biology, quantum computing, and more.
          </p>

          <div className="flex flex-col gap-1">
            <p className="text-sm">Email</p>
            <p className="text-2xl">
              info@rexcrux.com
            </p>
          </div>

          <div className="flex items-center gap-4 mt-2 cursor-pointer">
            <SocialIcon href="https://www.facebook.com/620183561187722" src="/icon/facebook.png" />
            <SocialIcon href="https://www.linkedin.com/in/marcos-guerrero-ceo-rpa-86740b25?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Booy0crZPRhOJ85ZSX4jdUQ%3D%3D" src="/icon/linkedin.png" />
            {/* <SocialIcon href="#" iconSize={15} src="/icon/twitter.png" />
            <SocialIcon href="#" src="/icon/youtube.png" /> */}
          </div>
        </div>
        <div className="h-px w-full bg-gray-200" />
        <p className="text-xs w-full text-gray-500 mb-4">
          Copyright © {year} Rexcrux - All Rights Reserved.
        </p>
      </div>
      <div className=' w-1/2'>
        <HorizontalScale />
      </div>
    </footer>
  )
}

export default Footer
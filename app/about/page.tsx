import AboutHero from "./HeroSection"
import FoundersSection from "./Founders"
import Seperator from "../components/Seperator"
import FAQSection from "../sections/FAQ"
import Footer from "../sections/Footer"
import Carrers from "./Carrers"
import DeveloperPlatform from "./DeveloperPlatform"

const AboutPage = () => {
  return (
    <div className="w-full bg-white text-black">
      <AboutHero />
      <DeveloperPlatform />
      <FoundersSection />
      <Seperator />
      <Carrers />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default AboutPage
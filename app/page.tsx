import Seperator from "./components/Seperator";
import DrivenSolutions from "./sections/DrivenSolutions";
import FAQSection from "./sections/FAQ";
import Footer from "./sections/Footer";
import HeroSection from "./sections/HeroSection";
import PlatformSlider from "./sections/Platform";
import Products from "./sections/Products";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <PlatformSlider />
        <Seperator />
      <Products />
        <Seperator />
      <DrivenSolutions />
        <Seperator />
      <FAQSection />
      <Footer />
    </div>
  );
}

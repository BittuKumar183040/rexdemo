'use client'

import Image from "next/image";
import Footer from "../sections/Footer";
import FAQSection from "../sections/FAQ";
import GradientLabel from "../components/GradientLabel";
import ResearchSection from "./Research";
import ResearchHero from "./HeroSection";

export default function Home() {
  return (
    <>
      <ResearchHero />

      <div className="mb-20 px-2.5 md:px-2.5 lg:px-25 flex flex-col gap-10 justify-between w-full bg-white dark:bg-black">
        <div className="w-full">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex-1 h-px" />
          </div>
          <GradientLabel label="RESEARCH" size="3xl" weight="medium" />
          <p className="text-lg max-w-2xl leading-relaxed font-light mt-4">
            RexCrux is grounded in topology, information theory, symbolic logic, computational physics, and algebraic structures.
          </p>
        </div>

        <div className="w-full">
          <div className="mb-8 flex items-center gap-3">
            <span
              className="text-md uppercase tracking-[0.3em]"
            >
              Publications & White Papers
            </span>
            <div className="flex-1 h-px bg-linear-to-r from-cyan-500/60 to-transparent" />
          </div>
          <ResearchSection />
        </div>
      </div>
      <FAQSection />
      <Footer />
    </>
  );
}

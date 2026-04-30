'use client'

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { researchAndPaper } from "../config/research";
import GridConnections from "../components/GridConnections";
import UniversalCard from "../components/UniversalCard";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

export interface ResearchAndPaperProps {
    title: string;
    tag: string;
    version?: string;
    desc: string;
    documentation: string;
}

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
});

export default function ResearchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [selectedPdf, setSelectedPdf] = useState<ResearchAndPaperProps | null>(null);

  useEffect(() => {
    if (!labelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { x: -16, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col gap-6 mt-10">
      <GridConnections>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {researchAndPaper.map((paper, index) => (
            <UniversalCard
              key={index}
              index={index}
              tag={paper.tag}
              version={paper.version}
              title={paper.title}
              description={paper.desc}
              footerLabel="Read Paper"
              onClick={() => setSelectedPdf(paper)}
            />
          ))}

        </div>
      </GridConnections>
      {selectedPdf && (
        <PdfViewer
          data={selectedPdf}
          onClose={() => setSelectedPdf(null)}
        />
      )}
    </div>
  );
}
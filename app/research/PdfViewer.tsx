"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Document, Page, pdfjs } from "react-pdf";
import gsap from "gsap";
import Button from "../components/Button";
import { ResearchAndPaperProps } from "./Research";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  data: ResearchAndPaperProps;
  onClose: () => void;
};

const isGoogleDrive = (url: string) =>
  url.includes("drive.google.com");

const getDrivePreview = (url: string) => {
  const match = url.match(/\/d\/(.*?)\//);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
};

const PdfViewer = ({data, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(800);

  const isDrive = isGoogleDrive(data.documentation);
  const finalUrl = isDrive ? getDrivePreview(data.documentation) : data.documentation;

  /* 🔥 stop lenis */
  useEffect(() => {
    const lenis = window.__lenisInstance;
    lenis?.stop();
    return () => lenis?.start();
  }, []);

  useEffect(() => {
    if (!ref.current || !contentRef.current) return;

    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    gsap.fromTo(
      contentRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3 }
    );
  }, []);

  useEffect(() => {
    const update = () => {
      setPageWidth(Math.min(900, window.innerWidth - 40));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const modal = (<section ref={ref} role="dialog"
    aria-modal="true"
    onWheel={(e) => e.stopPropagation()}
    onClick={(e) => e.stopPropagation()}
    style={{ height: "100dvh", zIndex: 2147483647, isolation: "isolate"}}
    className="fixed flex flex-col h-dvh w-full bg-black text-white"
  >
    <nav className="flex justify-between items-center px-2.5 md:px-2.5 lg:px-25 py-2 w-full bg-black z-50">
      <span>{data.title}</span>
      <Button label="Close" onClick={onClose} showIcon />
    </nav>

    <div ref={contentRef} className="flex-1 overflow-y-auto h-full flex justify-center" onWheel={(e) => e.stopPropagation()}>
      {isDrive ? (
        <iframe src={finalUrl} className="w-full h-full border-0" />
      ) : (
        <Document file={finalUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from(new Array(numPages), (_, i) => (
            <Page key={i} pageNumber={i + 1} width={pageWidth} />
          ))}
        </Document>
      )}
    </div>
  </section>
  );

  return typeof window !== "undefined" ? createPortal(modal, document.body) : null;
};

export default PdfViewer;
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Document, Page, pdfjs } from "react-pdf";
import Button from "../components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PdfViewerProps = {
  url: string;
  onClose: () => void;
};

const PdfViewer = ({ url, onClose }: PdfViewerProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const lenis = window.__lenisInstance;
    if (!lenis) return;
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchUrl = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch PDF (${res.status})`);

        const contentType = res.headers.get("content-type") ?? "";

        if (contentType.includes("application/json")) {
          const json = await res.json();
          if (!cancelled)
            setResolvedUrl(json.url ?? json.signedUrl ?? json.fileUrl ?? json.downloadUrl);
        } else {
          const blob = await res.blob();
          if (!cancelled) setResolvedUrl(URL.createObjectURL(blob));
        }
      } catch (err) {
        if (!cancelled) setLoadError((err as Error).message);
      }
    };

    fetchUrl();
    return () => { cancelled = true; };
  }, [url]);

  useEffect(() => {
    return () => {
      if (resolvedUrl?.startsWith("blob:")) URL.revokeObjectURL(resolvedUrl);
    };
  }, [resolvedUrl]);

  useEffect(() => {
    if (!backdropRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);


  const handleClose = () => {
    if (!backdropRef.current || !contentRef.current) {
      onClose();
      return;
    }
    gsap
      .timeline({ onComplete: onClose })
      .to(contentRef.current, { y: 20, opacity: 0, duration: 0.2, ease: "power2.in" })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") setPageNumber((p) => Math.min(p + 1, numPages));
      if (e.key === "ArrowLeft") setPageNumber((p) => Math.max(p - 1, 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [numPages]);

  const modal = (<section ref={backdropRef} role="dialog"
    aria-modal="true"
    onWheel={(e) => e.stopPropagation()}
    onClick={(e) => e.stopPropagation()}
    style={{ height: "100dvh", zIndex: 2147483647, isolation: "isolate", overflowY: "scroll" }}
    className="fixed h-dvh w-full bg-black/10 backdrop-blur-xl"
  >
    <div className="flex flex-col overflow-hidden" onClick={handleClose} >
      <div
        className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/60 backdrop-blur-md shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <Button label="Close" onClick={handleClose} showIcon />

        <div className="flex items-center gap-4 text-white/80 text-sm font-medium">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => p - 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft />
          </button>

          <span className="tabular-nums">
            {numPages > 0 ? `${pageNumber} / ${numPages}` : "—"}
          </span>

          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber((p) => p + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center
                       bg-white/10 hover:bg-white/20 disabled:opacity-30
                       disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="flex items-center gap-2 text-white/50 text-sm">
          <span className="hidden sm:inline">Go to</span>
          <input
            type="number"
            min={1}
            max={numPages}
            value={pageNumber}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (v >= 1 && v <= numPages) setPageNumber(v);
            }}
            className="w-14 text-center bg-white/10 border border-white/15 rounded-md
                       px-2 py-1 text-white text-sm focus:outline-none focus:border-white/40
                       [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      <div
        ref={contentRef}
        className="flex-1 flex justify-center py-8 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {loadError ? (
          <div className="flex flex-col items-center gap-3 text-red-400 my-auto">
            <span className="text-3xl">⚠</span>
            <p className="text-sm">{loadError}</p>
            <button
              onClick={handleClose}
              className="text-xs underline text-white/50 hover:text-white"
            >
              Close viewer
            </button>
          </div>
        ) : !resolvedUrl ? (
          <div className="flex flex-col items-center gap-3 text-white/40 my-auto">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
            <span className="text-sm">Loading document…</span>
          </div>
        ) : (
          <Document
            file={resolvedUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(err) => setLoadError(err.message)}
            loading={
              <div className="flex flex-col items-center gap-3 text-white/40 my-auto">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
                <span className="text-sm">Rendering…</span>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              width={Math.min(900, window.innerWidth - 48)}
              className="rounded-lg overflow-hidden shadow-2xl"
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        )}
      </div>
    </div>
  </section>
  );
  return typeof window !== "undefined" ? createPortal(modal, document.body) : null;
};

export default PdfViewer;
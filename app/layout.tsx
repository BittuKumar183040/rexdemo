import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "./sections/Navbar";
import CursorEffect from "./components/CursorEffect";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rexcrux",
  description: "Symbolic intelligence infrastructure for financial modeling, computational biology, quantum computing, and more. Find out more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${raleway.variable} h-dvh antialiased`}
    >
      <body className="min-h-full w-full flex flex-col">
        <SmoothScrollProvider>
          <Navbar />
          {/* <CursorEffect /> */}
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

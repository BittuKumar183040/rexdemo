'use client'

import { useEffect, useRef } from 'react'
import GradientLabel from '../components/GradientLabel'
import ProductCard from '../components/ProductCard'
import { products, subTitle, title } from '../config/products'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from 'gsap'
import { Image } from 'lucide-react'
import ParticleCanvas from '../components/ParticleCanvas'

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const projectTextRef = useRef<HTMLParagraphElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !labelRef.current) return;
    if (window.innerWidth < 768) return;
    const ctx = gsap.context(() => {

      gsap.fromTo(
        projectTextRef.current,
        {
          x: "100%",
          y: 0,
          scale: 0.95
        },
        {
          x: "-150%",
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: labelRef.current,
        pinSpacing: false,
      });

      const cards = gsap.utils.toArray(".product-card");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      cards.forEach((card: any, i) => {
        gsap.fromTo(
          card,
          { scale: 0.92 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "center 50%",
              scrub: true,
            },
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full px-2.5 md:px-2.5 lg:px-25 py-20 overflow-hidden"
    >
      <div className="absolute font-bold inset-0 overflow-hidden pointer-events-none">
        <p
          ref={projectTextRef}
          className="fixed bottom-0 left-0 text-[300px] md:text-[600px] opacity-10 whitespace-nowrap bg-linear-to-b from-gray-400 to-transparent bg-clip-text text-transparent"
        >
          PRODUCTS
        </p>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
        <div className="flex flex-col gap-6" ref={labelRef}>
          <GradientLabel label={title} size="3xl" weight="normal" />

          <p className="max-w-150 text-xl">
            {subTitle}
          </p>
          {/* {window.innerWidth >= 768 ?
            <div className=' w-full bg-gray-200 h-auto aspect-square'>
              <ParticleCanvas />
            </div> : null
          } */}
        </div>
        <div className="" ref={cardsContainerRef}>
          <div className='flex flex-col gap-10 md:my-100'>
            {products.list.map((product, index) => (
              <ProductCard
                key={product.label}
                index={index}
                logo={product.icon}
                title={product.label}
                description={product.description}
                capabilitiesLabel={product.capabilitiesLabel}
                bullets={product.bullets}
                buttonLabel={product.buttonLabel}
                buttonHref={product.href}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
'use client'

import Footer from "../sections/Footer";
import FAQSection from "../sections/FAQ";
import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";

export default function Home() {
  return (<>
    <ContactHero />
    <div className=" mb-20 px-2.5 md:px-2.5 lg:px-25 flex gap-10 flex-wrap-reverse justify-between w-full bg-white dark:bg-black">
      <div className="flex flex-col justify-between">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-50 mb-14">
          <div>
            <h2 className="text-3xl md:text-4xl font-thin uppercase text-zinc-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-base text-zinc-600">Research, platform, and partnership inquiries</p>
          </div>
          <div className="flex items-start">
            <p className="text-sm text-zinc-500 leading-relaxed">
              We welcome inquiries from researchers, developers, partners, and organizations interested in RexCruxs platform and technologies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-50 items-start">
          <div>
            <ContactForm />
            <div className="mt-10 pt-6 border-t border-zinc-100">
              <h3 className="text-lg font-semibold tracking-widest uppercase text-zinc-800 mb-1">
                Send Us a Message
              </h3>
              <p className="text-[10px] tracking-widest text-zinc-400 uppercase">
                Feel free to write us and ask any question you have
              </p>
            </div>
          </div>

            <iframe
              title="map"
              className="w-full h-full"
              style={{ minHeight: 380 }}
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=3838%20Watt%20Avenue,%20Suite%20E-510+(Rexcrux)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
      </div>
    </div>
    <FAQSection />
    <Footer />
  </>
  );
}

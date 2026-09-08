"use client";

import { useState } from "react";
import {
  FaSolarPanel,
  FaBatteryThreeQuarters,
  FaNetworkWired,
} from "react-icons/fa";
import Image from "next/image";
import { themePalette } from "@/lib/palette";
import { useTheme } from "next-themes";
import Navigation from "@/components/header";
import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";
import ServicesGrid from "@/components/services-grid";
import WhyChooseUs from "@/components/why-choose-us";
import BenefitsSection from "@/components/benefits-section";
import FAQSection from "@/components/faq-section";
import FormSection from "../components/formSection";
import CTASection from "@/components/cta-section";
import TestimonialsSection from "@/components/testimonials-section";
import Footer from "@/components/footer";

function PremiumFeatures() {
  const { resolvedTheme } = useTheme();
  return (
    <section
      className={`${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : "bg-[#f7f9fb]"} py-20 px-12`}
      id="tech"
    >
      <div className="mx-auto max-w-container-max">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="mb-4 block font-label-caps tracking-widest text-[#7c5800] uppercase">
              Premium Components
            </span>
            <h2
              className={`mb-6 font-headline-md text-[2rem] text-on-background ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
            >
              Industry-Leading Technology
            </h2>
            <p
              className={`mb-8 font-body-lg text-[1.1rem] ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
            >
              We don't compromise on quality. SolarPrecision partners
              exclusively with top-tier manufacturers to provide you with the
              most efficient, durable, and aesthetically pleasing solar
              equipment available.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: FaSolarPanel,
                  title: "Monocrystalline High-Efficiency Panels",
                  desc: "Our sleek, all-black panels deliver maximum power output per square foot, ensuring optimal performance even in low-light conditions.",
                },
                {
                  icon: FaBatteryThreeQuarters,
                  title: "Intelligent Battery Storage",
                  desc: "Store excess energy for use during peak rate times or grid outages. Our smart battery systems seamlessly integrate with your home network.",
                },
                {
                  icon: FaNetworkWired,
                  title: "Microinverter Technology",
                  desc: "Advanced microinverters optimize each panel independently, guaranteeing maximum system yield even if some panels are shaded.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#005d90]/10">
                    <span className="material-symbols-outlined text-[#005d90]">
                      {<item.icon />}
                    </span>
                  </div>
                  <div>
                    <h4
                      className={`mb-2 text-lg ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`font-body-md ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-150 overflow-hidden rounded-2xl shadow-2xl">
            <div className="absolute inset-0 bg-cover bg-center">
              <Image
                alt="Solar installation company"
                width={500}
                height={700}
                src="/images/industrial2.jfif"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EdgesComponent() {
  const { resolvedTheme } = useTheme();
  return (
    <section
      className={`py-20 px-10 border-t border-b ${resolvedTheme === "dark" ? `${themePalette.dark.backgroundPrimary} border-gray-700` : `${themePalette.light.backgroundPrimary} border-[#bfc7d1]/30`}`}
    >
      <div className="mx-auto max-w-container-max">
        <div className="mb-16 text-center">
          <h2
            className={`mb-4 text-[2rem] font-semibold ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : "text-[#191c1e]"}`}
          >
            The GR-Tech Edge
          </h2>
          <p
            className={`mx-auto max-w-2xl text-[1.1rem] ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
          >
            See how our standards stack up against the rest of the solar
            industry.
          </p>
        </div>

        <div
          className={`border-t mx-auto max-w-4xl overflow-hidden rounded-2xl border shadow-sm `}
        >
          <div
            className={`grid grid-cols-3 ${resolvedTheme === "dark" ? "bg-[#191c1e]" : "bg-[#f2f4f6]"} font-headline-sm text-on-background`}
          >
            <div className={`p-6 text-slate-500`}>Feature</div>
            <div
              className={`p-6 text-center ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
            >
              Industry Average
            </div>
            <div
              className={`p-6 text-center font-bold ${resolvedTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}
            >
              GR-Tech
            </div>
          </div>
          {[
            ["Panel Efficiency", "15% - 18%", "22%+"],
            ["Installation Speed", "3-6 Weeks", "1-2 Weeks"],
            ["Warranty Duration", "10-15 Years", "25 Years"],
            ["After-install support", "little to none", "Extensive"],
          ].map(([feature, avg, precision], index) => (
            <div key={feature} className={`grid grid-cols-3 items-center`}>
              <div
                className={`p-6 font-body-lg ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
              >
                {feature}
              </div>
              <div
                className={`p-6 text-center ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
              >
                {avg}
              </div>
              <div
                className={`${resolvedTheme === "dark" ? themePalette.dark.translucent_bg : "bg-[#cde5ff]/10"} p-6 text-center border-0 text-lg font-semibold text-amber-500`}
              >
                {precision}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default function Page() {
  return (
    <div className="w-full bg-zinc-950 text-white overflow-hidden">
      <Navigation />
      <Hero />
      <AboutSection />
      <PremiumFeatures />
      <ServicesGrid />
      <WhyChooseUs />
      <BenefitsSection />
      <EdgesComponent />
      <TestimonialsSection />
      <FormSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </div>
  );
}

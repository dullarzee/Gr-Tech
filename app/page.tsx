"use client";

import { useState } from "react";
import {
  ChevronDown,
  Sun,
  Zap,
  Award,
  DollarSign,
  Leaf,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/header";
import Hero from "@/components/hero";
import AboutSection from "@/components/about-section";
import ServicesGrid from "@/components/services-grid";
import WhyChooseUs from "@/components/why-choose-us";
import BenefitsSection from "@/components/benefits-section";
import FAQSection from "@/components/faq-section";
import CTASection from "@/components/cta-section";
import TestimonialsSection from "@/components/testimonials-section";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <div className="w-full bg-zinc-950 text-white overflow-hidden">
      <Navigation />
      <Hero />
      <AboutSection />
      <ServicesGrid />
      <WhyChooseUs />
      <BenefitsSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </div>
  );
}

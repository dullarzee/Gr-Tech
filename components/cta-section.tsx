"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { themePalette } from "@/lib/palette";
import { useTheme } from "next-themes";

export default function CTASection() {
  const { theme } = useTheme();

  return (
    <section
      className={`py-20 px-6 ${theme === "dark" ? "bg-gradient-to-r" : "bg-gradient-to-br"} ${theme === "dark" ? "from-emerald-950/50 to-zinc-950" : "from-emerald-300 via-emerald-300 via-2% to-zinc-100"}`}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className={`text-5xl font-bold mb-6 ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
        >
          Switch to Solar Energy Today
        </h2>
        <p
          className={`mb-8 text-lg ${theme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
        >
          Join thousands of homeowners and businesses already saving with clean,
          renewable energy.
        </p>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg group">
          Get Started Now
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
}

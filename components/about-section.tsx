"use client";

import { themePalette } from "@/lib/palette";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function AboutSection() {
  const { theme, resolvedTheme } = useTheme();
  return (
    <div
      className={`${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
    >
      <motion.section
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`py-20 px-6 border-t ${theme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
      >
        <div
          className={`max-w-4xl mx-auto ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
        >
          <div className="mb-8">
            <p className="text-xs text-amber-400 font-semibold mb-3">
              About GR-Tech
            </p>
            <h2 className="text-4xl font-bold mb-6">
              We are a trusted solar energy solutions provider
            </h2>
            <p className="text-zinc-400 mb-4">
              delivering modern and efficient solar systems for residential,
              commercial, and industrial needs.
            </p>
          </div>

          <p className="text-zinc-400 leading-relaxed">
            Our team of expert engineers and technicians ensures customized
            system design, precise planning, and safe installation tailored to
            each project&apos;s unique requirements. We incorporate cutting-edge
            components to guarantee reliable performance and long-term
            efficiency.
          </p>
        </div>
      </motion.section>
    </div>
  );
}

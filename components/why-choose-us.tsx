"use client";

import { Award, Zap, Users, TrendingUp } from "lucide-react";
import { themePalette } from "@/lib/palette";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhyChooseUs() {
  const { theme } = useTheme();

  const reasons = [
    { icon: Award, text: "Experienced and skilled team" },
    { icon: Zap, text: "High-quality solar products" },
    { icon: TrendingUp, text: "Affordable pricing" },
    { icon: Users, text: "Hassle-after-sales support" },
  ];

  return (
    <section
      className={`py-20 px-6 bg-linear-to-br lg:bg-linear-to-r ${theme === "dark" ? "from-zinc-900 to-emerald-950/30" : "from-zinc-100 via-zinc-100 via-65% to-emerald-100"}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs text-amber-400 font-semibold mb-3">Quality</p>
            <h2
              className={`text-4xl font-bold mb-8 ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              Why Choose Us
            </h2>
            <ul className="space-y-4">
              {reasons.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li
                    key={idx}
                    className={`flex items-center gap-4 ${theme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Right - Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative h-96 rounded-2xl bg-linear-to-br from-zinc-800/50 to-emerald-900/30 border border-emerald-500/20 overflow-hidden flex items-center justify-center"
          >
            <div className="text-center h-full w-full">
              <Image
                alt="Engineers working on rooftop"
                src="/images/rooftopSolarInstall.jpg"
                width={200}
                height={200}
                className="object-cover aspect-square h-full w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

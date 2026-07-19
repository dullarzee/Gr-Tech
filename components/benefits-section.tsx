"use client";

import { TrendingDown, Leaf, Clock, Zap } from "lucide-react";
import { themePalette } from "@/lib/palette";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function BenefitsSection() {
  const { theme } = useTheme();

  const benefits = [
    {
      icon: TrendingDown,
      title: "Lower electricity bills",
      color: "text-amber-400",
    },
    { icon: Leaf, title: "Eco-friendly energy", color: "text-emerald-400" },
    { icon: Clock, title: "Long-term cost savings", color: "text-cyan-400" },
    {
      icon: Zap,
      title: "Backup power during outages",
      color: "text-amber-300",
    },
  ];

  return (
    <section
      className={`py-20 px-6 ${theme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`text-4xl font-bold mb-12 text-center ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
        >
          Benefits of Solar Energy
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`p-6 rounded-xl hover:border-amber-400/30 transition-all group cursor-pointer ${theme === "dark" ? themePalette.dark.chip_style : themePalette.light.chip_style}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <h3 className="font-semibold group-hover:text-amber-400 transition-colors">
                    {benefit.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

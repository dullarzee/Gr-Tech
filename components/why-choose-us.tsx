"use client";

import { Award, Zap, Users, TrendingUp } from "lucide-react";
import { themePalette } from "@/lib/palette";
import { useTheme } from "next-themes";

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
      className={`py-20 px-6 bg-gradient-to-r ${theme === "dark" ? "from-zinc-900 to-emerald-950/30" : "from-zinc-100 via-zinc-100 via-65% to-emerald-100"}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
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
                    <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right - Image placeholder */}
          <div className="relative h-96 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-emerald-900/30 border border-emerald-500/20 overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-32 h-32 mx-auto text-emerald-400/30 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 19l9-2m0 0l-12-5m12 5l-12-5m12 5v-7m0-7l-9 2m0 0l12-5m-12 5l12-5"
                />
              </svg>
              <p className="text-zinc-500 text-sm">Solar Technology Stack</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

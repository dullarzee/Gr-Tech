"use client";

import { Sun, Zap, Wrench } from "lucide-react";
import { themePalette } from "@/lib/palette";
import { useTheme } from "next-themes";

export default function ServicesGrid() {
  const { theme } = useTheme();
  const services = [
    {
      icon: Sun,
      title: "Residential Solar",
      description:
        "High-performance and cost-saving solar installation for homes.",
      gradient:
        theme === "dark"
          ? "from-amber-500/20 to-amber-600/10"
          : "from-amber-500/60 to-amber-600/60",
      border: theme === "dark" ? "border-amber-500/30" : "border-amber-700/60",
      bgColor: theme === "dark" ? "bg-amber-500/10" : "bg-amber-600/60",
    },
    {
      icon: Zap,
      title: "Solar Inverter Solutions",
      description:
        "Advanced inverter systems optimizing solar energy conversion.",
      gradient:
        theme === "dark"
          ? "from-emerald-500/20 to-emerald-600/10"
          : "from-emerald-500/60 to-emerald-600/60",
      border:
        theme === "dark" ? "border-emerald-500/30" : "border-emerald-700/60",
      bgColor: theme === "dark" ? "bg-emerald-500/10" : "bg-emerald-600/60",
    },
    {
      icon: Wrench,
      title: "Industrial & Commercial",
      description: "Custom electrical and solar troubleshooting services.",
      gradient:
        theme === "dark"
          ? "from-cyan-500/20 to-cyan-600/10"
          : "from-cyan-500/60 to-cyan-600/60",
      border: theme === "dark" ? "border-cyan-500/30" : "border-cyan-700/60",
      bgColor: theme === "dark" ? "bg-cyan-500/10" : "bg-cyan-600/60",
    },
  ];

  return (
    <section
      className={`py-20 px-6 ${theme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs text-amber-400 font-semibold mb-3">Services</p>
          <h2
            className={`text-4xl font-bold ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
          >
            Our Services
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className={`group p-8 rounded-2xl bg-gradient-to-br ${service.gradient} border ${service.border} backdrop-blur-md hover:border-amber-400/50 transition-all duration-300 cursor-pointer hover:translate-y-[-4px]`}
              >
                <div
                  className={`w-12 h-12 rounded-lg ${service.bgColor} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                <p
                  className={`text-sm ${theme === "dark" ? themePalette.dark.paragragh_text : "text-white"} leading-relaxed`}
                >
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Sun, Zap, CctvIcon, DollarSign } from "lucide-react";
import { themePalette } from "@/lib/palette";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function ServicesGrid() {
  const { theme } = useTheme();
  const services = [
    {
      icon: Sun,
      title: "Residential and Industrial Solar",
      description:
        "High-performance and cost-saving solar installation for homes and custom electrical for industrial enviroments including solar troubleshooting services.",
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
      icon: CctvIcon,
      title: "Smart Security & CCTV Surveillance Installation",
      description:
        "Protect what matters most with intelligent, 24/7 surveillance networks. We design and install high-definition IP cameras, smart doorbells, and remote-view monitoring systems customized to your property layout.",
      gradient:
        theme === "dark"
          ? "from-cyan-500/20 to-cyan-600/10"
          : "from-cyan-500/60 to-cyan-600/60",
      border: theme === "dark" ? "border-cyan-500/30" : "border-cyan-700/60",
      bgColor: theme === "dark" ? "bg-cyan-500/10" : "bg-cyan-600/60",
    },
    {
      icon: DollarSign,
      title: "Sale of solar Panels, Inverters and other solar devices",
      description:
        "Break free from unpredictable grid power and expensive fueling costs. We supply and configure tier-1 solar panels, high-efficiency hybrid inverters, and durable deep-cycle batteries engineered for uninterrupted power.",
      gradient:
        theme === "dark"
          ? "from-red-500/20 to-red-600/10"
          : "from-red-500/60 to-red-600/60",
      border: theme === "dark" ? "border-red-500/30" : "border-red-700/60",
      bgColor: theme === "dark" ? "bg-red-500/10" : "bg-red-600/60",
    },
  ];

  return (
    <section
      className={`py-20 px-6 ${theme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="text-xs text-amber-400 font-semibold mb-3">
              Services
            </p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`text-4xl font-bold ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
          >
            Our Services
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-2">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7 * (1 + (idx % 3)),
                  ease: "easeOut",
                }}
                className={`group p-8 rounded-2xl bg-linear-to-br ${service.gradient} border ${service.border} backdrop-blur-md hover:border-amber-400/50 transition-all duration-300 cursor-pointer hover:-translate-y-1`}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

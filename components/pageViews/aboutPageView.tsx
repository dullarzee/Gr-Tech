"use client";

import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";
import Navigation from "@/components/header";
import Footer from "@/components/footer";
import { Award, Users, Target, Leaf } from "lucide-react";
import CTASection from "../cta-section";
import { motion } from "framer-motion";

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We're committed to reducing carbon emissions and promoting clean energy adoption worldwide.",
  },
  {
    icon: Users,
    title: "Innovation",
    description:
      "Continuous research and development to bring cutting-edge solar technology to our customers.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "Highest quality standards in every installation, backed by expert technicians and rigorous testing.",
  },
  {
    icon: Award,
    title: "Reliability",
    description:
      "Industry-leading warranties, 24/7 support, and a track record of customer satisfaction.",
  },
];

const stats = [
  { number: "15,000+", label: "Systems Installed" },
  { number: "45,000+", label: "Homes Powered" },
  { number: "500,000+", label: "MWh Generated" },
  { number: "12 Years", label: "Industry Experience" },
];

const team = [
  {
    name: "Sarah Mitchell",
    role: "CEO & Founder",
    bio: "Renewable energy visionary with 15+ years in the solar industry.",
  },
  {
    name: "James Chen",
    role: "Chief Technical Officer",
    bio: "Expert engineer specializing in system design and optimization.",
  },
  {
    name: "Maria Rodriguez",
    role: "Operations Manager",
    bio: "Ensures seamless execution of every project from start to finish.",
  },
  {
    name: "David Thompson",
    role: "Customer Relations",
    bio: "Dedicated to providing exceptional support and satisfaction.",
  },
];

export default function AboutPageView() {
  const { resolvedTheme } = useTheme();
  return (
    <main
      className={`min-h-screen overflow-hidden ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
    >
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-8">
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-32 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span
              className={`block mb-2 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              About
            </span>
            <span className="bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              GR Technologies
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`text-center text-zinc-400 text-lg max-w-3xl mx-auto ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
          >
            Empowering homes and businesses with clean, renewable solar energy
            solutions since 2012.
          </motion.p>
        </div>
      </section>

      {/* Mission Statement */}
      <motion.section
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`px-6 md:px-8 py-20 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className={`p-12 rounded-3xl ${resolvedTheme === "dark" ? themePalette.dark.translucent_bg : themePalette.light.translucent_bg}`}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              Our Mission
            </h2>
            <p
              className={`text-lg leading-relaxed mb-6 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
            >
              At GR Tech, our mission is to make clean, renewable energy
              accessible and affordable for everyone. We believe that solar
              energy is the key to a sustainable future, and we&apos;re
              dedicated to helping individuals and businesses harness the power
              of the sun.
            </p>
            <p
              className={`text-lg leading-relaxed ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
            >
              Through innovative technology, expert service, and unwavering
              commitment to our customers, we&apos;re transforming the way
              people power their lives.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section
        className={`px-6 md:px-8 py-20 ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl font-bold text-center mb-16 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
          >
            Our Impact
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 * (1 + idx), ease: "easeOut" }}
                key={stat.label}
                className={`text-center p-6 rounded-2xl ${resolvedTheme === "dark" ? themePalette.dark.chip_style : themePalette.light.chip_style}`}
              >
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">
                  {stat.number}
                </div>
                <p className="text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        className={`px-6 md:px-8 py-20 ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl font-bold text-center mb-16 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
          >
            Our Values
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`p-8 rounded-3xl hover:border-amber-400/50 transition-all duration-300 ${resolvedTheme === "dark" ? themePalette.dark.chip_style : themePalette.light.chip_style}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3
                    className={`text-xl font-bold mb-3 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                  >
                    {value.title}
                  </h3>
                  <p className="text-zinc-400">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        className={`px-6 md:px-8 py-20 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-4xl md:text-5xl font-bold text-center mb-6 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
          >
            Meet Our Team
          </h2>
          <p
            className={`text-center max-w-2xl mx-auto mb-16 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
          >
            Experienced professionals dedicated to delivering excellence in
            every solar project.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 * (1 + idx), ease: "easeOut" }}
                className={`group p-6 h-70 rounded-2xl bg-linear-to-br backdrop-blur-sm hover:border-emerald-400/60 transition-all duration-300 ${resolvedTheme === "dark" ? "from-emerald-500/15 to-emerald-600/10 border border-emerald-500/30" : "from-emerald-500/30 to-emerald-600/40 border border-emerald-500/50"}`}
              >
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-amber-400/40 to-amber-500/30 mb-4"></div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-emerald-400 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-zinc-400">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <CTASection
          Heading=" Join the Solar Revolution"
          paragraph=" Become part of a global movement toward sustainable, clean energy."
        />
      </motion.div>

      <Footer />
    </main>
  );
}

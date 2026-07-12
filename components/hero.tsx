"use client";

import { Zap, Sunrise, Droplet, ZapIcon, Sun } from "lucide-react";
import DotField from "./DotField";
import Image from "next/image";
import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";

export default function Hero() {
  const { theme } = useTheme();
  return (
    <section
      className={`relative w-full min-h-screen bg-linear-to-b overflow-hidden pt-32 pb-16 ${theme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
    >
      {/* <div style={{ width: "100%", height: "100%", position: "relative" }}> */}
      {/* <DotField */}
      {/* // dotRadius={1.5}
        // dotSpacing={14}
        // cursorRadius={500}
        // cursorForce={0.1}
        // bulgeOnly
        // bulgeStrength={67}
        // glowRadius={160}
        // sparkle={false}
        // waveAmplitude={0}
        // gradientFrom="rgba(168, 85, 247, 0.35)"
        // gradientTo="rgba(180, 151, 207, 0.25)"
        // glowColor="#120F17"
        ///> */}
      {/* </div> */}
      {/* Subtle background gradients */}
      <div
        className={`absolute bottom-0 w-full h-[90%] rounded-full blur-3xl ${theme === "dark" ? "bg-emerald-800/10" : "bg-amber-500/20"}`}
      ></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm ${theme === "dark" ? themePalette.dark.chip_style : themePalette.light.chip_style}`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs">Solar Solutions, Simplified</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1
          className={`text-center text-4xl md:text-6xl lg:text-7xl font-bold mb-16 leading-tight tracking-tight ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
        >
          <span>Powering Tomorrow,</span>
          <span>
            <span className="bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              {/* ☀️  */}Today
            </span>
          </span>
        </h1>

        {/* Main Content - Asymmetric Layout */}
        <div className="relative grid md:grid-cols-[25%_45%_30%] gap-8 items-start mb-16">
          {/* Left Column - Cards */}
          <div className="space-y-4">
            {/* Environment Score Card */}
            <div className="group">
              <div className="flex items-center justify-start mb-2">
                <div
                  className={`relative w-40 h-40 rounded-full ${theme === "dark" ? themePalette.dark.translucent_bg : themePalette.light.translucent_bg}`}
                >
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3f3f46"
                      strokeWidth="6"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="6"
                      strokeDasharray="251.2"
                      strokeDashoffset="25.12"
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wide">
                      Environment
                    </div>
                    <span className="text-2xl font-bold">99/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Power Savings Card */}
            <div
              className={`group p-6 rounded-3xl space-y-5 ${theme === "dark" ? themePalette.dark.translucent_bg : themePalette.light.translucent_bg}`}
            >
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400 font-bold">
                    $
                  </div>
                  <span className="text-sm font-semibold">Power Savings</span>
                </div>
                <div className="text-xs text-zinc-400 mb-2">
                  Monthly Savings
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-700/50 overflow-hidden">
                  <div className="h-full w-4/5 bg-linear-to-r from-emerald-400 to-emerald-500 rounded-full"></div>
                </div>
                <div className="text-xs text-emerald-400 mt-3 font-semibold">
                  High
                </div>
              </section>

              <section>
                <div className="text-xs text-zinc-400 mb-2 uppercase tracking-wide font-semibold">
                  Energy
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-700/50 overflow-hidden">
                  <div className="h-full w-[90%] bg-linear-to-r from-amber-400 to-amber-500 rounded-full mb-3" />
                </div>
                <div className="text-lg font-bold text-amber-300">
                  Renewable
                </div>
              </section>
            </div>
          </div>

          {/* Center - House Visualization */}
          <div className="relative flex items-center justify-center order-first md:order-0">
            <div className="relative w-full aspect-square flex items-start justify-center">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-linear-to-b from-cyan-400/10 via-transparent to-transparent rounded-full blur-2xl opacity-50"></div>

              {/* House SVG */}
              <Image
                src="/images/homeImage.png"
                alt="House"
                loading="eager"
                className="w-full"
                width={200}
                height={200}
              />
              {/* Floating Tags around house - positioned exactly like original */}

              {/* Top Right - IP68 */}
              <div className="absolute flex flex-col items-center justify-center gap-2 -top-8 mx-auto h-32">
                <div
                  className={`inline-flex items-center justify-center gap-2 shrink-0 px-3 py-2 rounded-full text-xs font-semibold text-cyan-300 ${theme === "dark" ? themePalette.dark.translucent_bg : themePalette.light.translucent_bg}`}
                >
                  <div className="flex items-center justify-center h-6 w-6 bg-white/20 backdrop-blur-sm rounded-full p-0.5">
                    <Droplet className="w-full text-green-400 mx-auto" />
                  </div>
                  <span>
                    IP68 <span className="text-white">Waterproof</span>
                  </span>
                </div>
                <div className="w-0.5 bg-zinc-500 h-4/5 rounded-full" />
              </div>

              {/* Left - Sun Power */}
              <div className="absolute flex items-center gap-2 top-24 -left-10 md:top-13 md:-left-8 -rotate-55 md:rotate-0 h-32 w-58">
                <div
                  className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs ${theme === "dark" ? themePalette.dark.translucent_bg : themePalette.light.translucent_bg} ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                >
                  <div className="flex items-center justify-center h-6 w-6 bg-white/20 backdrop-blur-sm rounded-full p-0.5">
                    <Sun className="w-full text-green-400 mx-auto" />
                  </div>
                  <div className="text-white font-semibold shrink-0">
                    Sun Power
                  </div>
                </div>
                <div className="w-full bg-zinc-500 h-0.5 rounded-full" />
              </div>

              <div className="absolute flex flex-col md:flex-row items-center gap-2 md:top-16 md:-right-6 md:h-32 h-60 md:w-58 mx-auto md:mx-0 bottom-0 md:bottom-auto">
                <div className="h-full w-0.5 md:w-full bg-zinc-500 md:h-0.5 rounded-full" />
                <div
                  className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs ${theme === "dark" ? themePalette.dark.translucent_bg : themePalette.light.translucent_bg}`}
                >
                  <div className="flex items-center justify-center h-6 w-6 bg-white/20 backdrop-blur-sm rounded-full p-0.5">
                    <ZapIcon className="w-full text-green-400 mx-auto" />
                  </div>
                  <div className="text-xs font-semibold text-emerald-300">
                    500 W
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className="space-y-4">
            {/* Description */}
            <div
              className={`p-4 flex flex-col rounded-3xl text-xs leading-relaxed text-zinc-100 ${theme === "dark" ? themePalette.dark.translucent_bg : themePalette.light.translucent_bg}`}
            >
              <div className="inline-flex items-center justify-between gap-2 mb-2">
                <span className="text-sm font-semibold leading-tight pr-2">
                  From Sun to Socket Seamlessly
                </span>
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-linear-to-b from-yellow-600 to-yellow-800">
                  <Sunrise className="w-6 h-6 text-slate-800" />
                </div>
              </div>
              <section className="w-full flex items-center justify-center">
                <Image
                  src="/images/solarpanel.webp"
                  className="w-[85%]"
                  alt="Solar Panel"
                  loading="eager"
                  width={100}
                  height={30}
                />
              </section>
              <p className="text-justify">
                The effortless flow of clean energy from the sun directly into
                your home or business. It highlights the simplicity of solar
                technology.
              </p>
            </div>

            {/* Solar Solutions Badge */}
            <div className="p-4 rounded-3xl bg-linear-to-br from-amber-400/15 to-amber-500/10 border border-amber-400/30 backdrop-blur-sm">
              <div className="text-xs text-zinc-400 mb-2 uppercase tracking-wide font-semibold">
                Latest
              </div>
              <div className="text-2xl font-bold text-amber-300 mb-1">2026</div>
              <div className="text-xs text-zinc-400">Technology</div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-8 py-6 rounded-lg text-base">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="text-slate-600 border-zinc-600 hover:border-amber-400 hover:text-amber-400 font-semibold px-8 py-6 rounded-lg text-base"
          >
            Learn More
          </Button>
        </div> */}
      </div>

      {/* grassland image*/}
      <div className="bg-black/10">
        <Image
          src="/images/grassland.png"
          className="absolute bottom-[-25%] w-full z-0 filter brightness-60"
          alt="grassland"
          loading="eager"
          width="500"
          height="200"
        />
      </div>
      {theme === "dark" && (
        <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-zinc-950 to-transparent" />
      )}
    </section>
  );
}

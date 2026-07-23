"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { themePalette } from "@/lib/palette";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import WhatsappUsButton from "./ui/whatsappUsButton";
import { useRouter } from "next/navigation";

export default function CTASection({
  Heading = "Switch to Solar Energy Today",
  paragraph = "Join thousands of homeowners and businesses already saving with clean, renewable energy.",
}) {
  const { theme, resolvedTheme } = useTheme();
  const router = useRouter();

  return (
    <div className={`${resolvedTheme === "dark" ? "bg-black" : "bg-white"}`}>
      <motion.section
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`py-20 px-6 ${theme === "dark" ? "bg-linear-to-r" : "bg-linear-to-br"} ${theme === "dark" ? "from-emerald-950/50 to-zinc-950" : "from-emerald-300 via-emerald-300 via-2% to-zinc-100"}`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-5xl font-bold mb-6 ${theme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
          >
            {Heading}
          </h2>
          <p
            className={`mb-8 text-lg ${theme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
          >
            {paragraph}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/contact")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 text-lg group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <WhatsappUsButton phoneNumber={2349162706881} />
          </div>
        </div>
      </motion.section>
    </div>
  );
}

import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";
import { Button } from "./button";

export default function NewsletterSection() {
  const { resolvedTheme } = useTheme();
  return (
    <section className="px-4 md:px-8 py-16 border-t border-zinc-800/30">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className={`text-3xl font-bold mb-4 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
        >
          Stay Updated
        </h2>
        <p
          className={`mb-8 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
        >
          Subscribe to our newsletter for the latest solar tips, industry news,
          and exclusive content.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className={`flex-1 px-6 py-3 rounded-lg /border border-zinc-700/50 focus:outline-none focus:border-amber-400 ${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}
          />
          <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-8 py-3">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}

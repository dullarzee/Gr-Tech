import { categories } from "@/app/resources/page";
import { ResourceTypes } from "@/types";
import { Clock, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";

export default function ResourceCard({
  resource,
}: {
  resource: ResourceTypes;
}) {
  const { resolvedTheme } = useTheme();
  return (
    <a
      key={resource.id}
      href="#"
      className={`group p-6 rounded-2xl /border border-zinc-700/30 hover:border-amber-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/10 flex flex-col ${resolvedTheme === "dark" ? themePalette.dark.translucent_bg : themePalette.light.backgroundPrimary}`}
    >
      {/* Image/Icon */}
      <div className="w-full h-40 rounded-lg bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 flex items-center justify-center mb-4 text-5xl group-hover:scale-105 transition-transform">
        {resource.image}
      </div>

      {/* Category Badge */}
      <div className="mb-3">
        <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase">
          {categories.find((c) => c.id === resource.category)?.name}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`font-bold text-lg mb-3 group-hover:text-amber-400 transition-colors line-clamp-2 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
      >
        {resource.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-zinc-400 mb-4 flex-grow line-clamp-3">
        {resource.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-700/30">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Clock className="w-3 h-3" />
          {resource.readTime} min read
        </div>
        <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  );
}

"use client";

import Navigation from "@/components/header";
import Footer from "@/components/footer";
import NewsletterSection from "@/components/ui/newsletterSection";
import { useState } from "react";
import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";
import ResourceCard from "@/components/ui/resourceCard";

const resources = [
  {
    id: 1,
    title: "The Complete Guide to Residential Solar Installation",
    category: "guide",
    excerpt:
      "Learn everything you need to know about installing solar panels for your home, from permits to maintenance.",
    readTime: 12,
    date: "2024-01-15",
    image: "📘",
  },
  {
    id: 2,
    title: "Solar Panel Efficiency: What You Need to Know",
    category: "article",
    excerpt:
      "Understanding panel efficiency ratings, temperature coefficients, and how they impact your system's performance.",
    readTime: 8,
    date: "2024-01-10",
    image: "⚡",
  },
  {
    id: 3,
    title: "Battery Storage Systems: 2024 Comparison",
    category: "comparison",
    excerpt:
      "Compare lithium, lead-acid, and hybrid battery systems to find the best storage solution for your needs.",
    readTime: 15,
    date: "2024-01-05",
    image: "🔋",
  },
  {
    id: 4,
    title: "How Solar Inverters Work: Technical Deep Dive",
    category: "technical",
    excerpt:
      "Everything about string, micro, and hybrid inverters - their benefits, limitations, and optimal use cases.",
    readTime: 10,
    date: "2023-12-28",
    image: "📦",
  },
  {
    id: 5,
    title: "Federal Tax Credits and Incentives 2024",
    category: "guide",
    excerpt:
      "A complete breakdown of the 30% ITC, state incentives, and local rebates available to solar customers.",
    readTime: 9,
    date: "2023-12-20",
    image: "💵",
  },
  {
    id: 6,
    title: "Maximizing Your Solar Output: 5 Pro Tips",
    category: "tips",
    excerpt:
      "Expert recommendations on panel angle, shading analysis, maintenance, and monitoring for peak performance.",
    readTime: 7,
    date: "2023-12-15",
    image: "💡",
  },
  {
    id: 7,
    title: "Solar + Grid Connection: Understanding Net Metering",
    category: "article",
    excerpt:
      "How net metering works, why it matters, and how to maximize credits for excess solar generation.",
    readTime: 11,
    date: "2023-12-10",
    image: "🔌",
  },
  {
    id: 8,
    title: "Commercial Solar Solutions for Businesses",
    category: "guide",
    excerpt:
      "ROI analysis, system sizing, and business benefits for commercial and industrial solar installations.",
    readTime: 14,
    date: "2023-12-01",
    image: "🏢",
  },
  {
    id: 9,
    title: "Solar Maintenance: Keep Your System Running Strong",
    category: "tips",
    excerpt:
      "Essential maintenance tasks, cleaning schedules, and troubleshooting common issues to ensure longevity.",
    readTime: 6,
    date: "2023-11-25",
    image: "🛠️",
  },
];

export const categories = [
  { id: "all", name: "All Resources" },
  { id: "guide", name: "Guides" },
  { id: "article", name: "Articles" },
  { id: "tips", name: "Tips & Tricks" },
  { id: "comparison", name: "Comparisons" },
  { id: "technical", name: "Technical" },
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { resolvedTheme } = useTheme();

  const filteredResources = resources
    .filter(
      (r) => selectedCategory === "all" || r.category === selectedCategory,
    )
    .filter((r) => r.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Navigation />
      <main
        className={`min-h-screen pt-24 ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
      >
        {/* Hero Section */}
        <section className="px-4 md:px-8 py-16 border-b border-zinc-800/30">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              Solar Resources & Learning Center
            </h1>
            <p className="text-zinc-400 text-lg">
              Expert guides, technical articles, and tips to help you understand
              solar energy and make informed decisions.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section
          className={`px-4 md:px-8 py-12 /border-b border-zinc-800/30 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-6 py-3 rounded-lg /border /border-zinc-700/50 placeholder-zinc-500 focus:outline-none focus:border-amber-400 ${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-amber-400 text-zinc-950"
                      : `${resolvedTheme === "dark" ? `${themePalette.dark.chip_style} hover:bg-zinc-800` : `${themePalette.light.chip_style} hover:bg-zinc-200`}`
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section
          className={`px-4 md:px-8 py-16 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
        >
          <div className="max-w-6xl mx-auto">
            {filteredResources.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p
                  className={`text-lg ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                >
                  No resources found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Topics */}
        <section className="px-4 md:px-8 py-16 border-t border-zinc-800/30">
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-3xl font-bold mb-12 text-center ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              Popular Topics
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "Getting Started", count: 12 },
                { title: "System Design", count: 18 },
                { title: "Installation", count: 15 },
                { title: "Maintenance", count: 10 },
              ].map((topic) => (
                <a
                  key={topic.title}
                  href="#"
                  className={`group p-6 rounded-2xl /border border-zinc-700/30 hover:border-amber-400/50 transition-all text-center hover:shadow-lg hover:shadow-amber-400/10 ${resolvedTheme === "dark" ? themePalette.dark.chip_style : themePalette.light.chip_style}`}
                >
                  <h3 className="font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {topic.count} articles
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}

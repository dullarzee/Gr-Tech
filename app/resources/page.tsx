"use client";

import Navigation from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

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

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Resources" },
    { id: "guide", name: "Guides" },
    { id: "article", name: "Articles" },
    { id: "tips", name: "Tips & Tricks" },
    { id: "comparison", name: "Comparisons" },
    { id: "technical", name: "Technical" },
  ];

  const filteredResources = resources
    .filter(
      (r) => selectedCategory === "all" || r.category === selectedCategory,
    )
    .filter((r) => r.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-zinc-950 pt-24">
        {/* Hero Section */}
        <section className="px-4 md:px-8 py-16 border-b border-zinc-800/30">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Solar Resources & Learning Center
            </h1>
            <p className="text-zinc-400 text-lg">
              Expert guides, technical articles, and tips to help you understand
              solar energy and make informed decisions.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="px-4 md:px-8 py-12 border-b border-zinc-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
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
                      : "bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            {filteredResources.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <a
                    key={resource.id}
                    href="#"
                    className="group p-6 rounded-2xl bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border border-zinc-700/30 hover:border-amber-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/10 flex flex-col"
                  >
                    {/* Image/Icon */}
                    <div className="w-full h-40 rounded-lg bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 flex items-center justify-center mb-4 text-5xl group-hover:scale-105 transition-transform">
                      {resource.image}
                    </div>

                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold uppercase">
                        {
                          categories.find((c) => c.id === resource.category)
                            ?.name
                        }
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-lg mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
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
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-zinc-400 text-lg">
                  No resources found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Topics */}
        <section className="px-4 md:px-8 py-16 border-t border-zinc-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
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
                  className="group p-6 rounded-2xl bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 border border-zinc-700/30 hover:border-amber-400/50 transition-all text-center hover:shadow-lg hover:shadow-amber-400/10"
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
        <section className="px-4 md:px-8 py-16 border-t border-zinc-800/30">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-zinc-400 mb-8">
              Subscribe to our newsletter for the latest solar tips, industry
              news, and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
              <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-8 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

"use client";

import Navigation from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { ProductTypes } from "@/types";
import { toast } from "sonner";
import ProductCard from "@/components/ui/productCard";
import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";
import { useRouter } from "next/navigation";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const { resolvedTheme } = useTheme();

  const router = useRouter();
  const categories = [
    { id: "all", name: "All Products" },
    { id: "solarpanel", name: "Solar Panels" },
    { id: "inverter", name: "Inverters" },
    { id: "battery", name: "Batteries" },
    { id: "accessory", name: "Accessories" },
  ];

  const sortByOptions = [
    { label: "Most Popular", value: "popular" },
    { label: "Price: Low to High", value: "low" },
    { label: "Price: High to Low", value: "high" },
    { label: "Highest Rated", value: "rating" },
    { label: "Newest", value: "newest" },
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await axios.get(BEendpoints.get_products(limit, sortBy));
        console.log(res.data);
        if (res.data.ok) setProducts(res.data.data);
        else throw new Error("failed to fetch products");
      } catch (err) {
        console.log(err);
        toast.error(
          err instanceof Error ? err.message : "couldn't fetch products",
        );
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [sortBy]);

  const filteredProducts: ProductTypes[] =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p: ProductTypes) => p.category.toLowerCase() === selectedCategory,
        );

  return (
    <>
      <Navigation />
      <main
        className={`min-h-screen pt-24 ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
      >
        {/* Hero Section */}
        <section className="relative px-4 md:px-8 py-16 /border-b border-zinc-800/30">
          <div className="max-w-7xl mx-auto">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              Premium Solar Products
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl">
              Discover our curated collection of high-efficiency solar panels,
              inverters, batteries, and accessories.{" "}
              <span className="hidden md:inline">
                All products are certified and backed by industry-leading
                warranties.
              </span>
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section
          className={`px-4 md:px-8 py-16 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Sidebar Filters */}
              {/*visible for on large screen*/}
              <div className="lg:col-span-1 hidden lg:block">
                <div className="sticky top-32">
                  <div className="mb-8">
                    <h3
                      className={`text-lg font-bold mb-4 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                    >
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedCategory === cat.id
                              ? "bg-amber-400 text-zinc-950 font-semibold"
                              : `hover:bg-zinc-800/50 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3
                      className={`text-lg font-bold mb-4 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                    >
                      Sort By
                    </h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-400 ${resolvedTheme === "dark" ? themePalette.dark.chip_style : themePalette.light.chip_style}`}
                    >
                      {sortByOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    className={`p-4 rounded-lg border hidden lg:block ${resolvedTheme === "dark" ? themePalette.dark.translucent_bg : themePalette.light.translucent_bg}`}
                  >
                    <h4
                      className={`font-semibold mb-3 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                    >
                      Need Help?
                    </h4>
                    <p
                      className={`text-sm text-zinc-300 mb-4 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                    >
                      Our solar experts are ready to help you choose the perfect
                      products for your system.
                    </p>
                    <Button
                      onClick={() => router.push("/contact")}
                      className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300 text-sm font-semibold"
                    >
                      Consult an Expert
                    </Button>
                  </div>
                </div>
              </div>

              {/*filters visible on mobile screen */}
              <div className="block lg:hidden">
                <Button
                  onClick={() => setShowFilters((prev) => !prev)}
                  variant={showFilters ? "secondary" : "outline"}
                  className={`mb-4 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                >
                  {showFilters ? "Hide filters" : "Show filters"}
                </Button>

                {showFilters && (
                  <div>
                    <div className="mb-8">
                      <h3
                        className={`text-lg font-bold mb-4 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                      >
                        Categories
                      </h3>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                              selectedCategory === cat.id
                                ? "bg-amber-400 text-zinc-950 font-semibold"
                                : `hover:bg-zinc-800/50 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`
                            }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3
                        className={`text-lg font-bold mb-4 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                      >
                        Sort By
                      </h3>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-400 ${resolvedTheme === "dark" ? themePalette.dark.chip_style : themePalette.light.chip_style}`}
                      >
                        {sortByOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-8">
                  <p className="text-sm text-zinc-400">
                    Showing {filteredProducts?.length} products
                  </p>
                </div>

                {loading ? (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-400/20 mb-4">
                      <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-zinc-400">Loading products...</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts?.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
                {!loading && (
                  <section className="flex items-center justify-center p-6 mt-15 col-span-3">
                    <Button
                      onClick={() => setLimit((prev) => prev + 10)}
                      className="bg-amber-400"
                    >
                      Show more
                    </Button>
                  </section>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-8 py-16 border-t border-zinc-800/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={`text-3xl font-bold mb-4 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              Ready to Go Solar?
            </h2>
            <p className="text-zinc-400 mb-8">
              Build your custom solar system or schedule a consultation with our
              solar experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/services")}
                className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-8 py-6"
              >
                Build Your System
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/contact")}
                className={`hover:font-semibold px-8 py-6 ${resolvedTheme === "dark" ? themePalette.dark.translucent_bg + themePalette.dark.text_light : themePalette.light.translucent_bg + themePalette.light.text_dark}`}
              >
                Schedule Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

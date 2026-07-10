"use client";

import Navigation from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Zap, Battery, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { ProductTypes } from "@/types";
import { toast } from "sonner";
import Image from "next/image";
import ProductCard from "@/components/ui/productCard";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "solarpanel", name: "Solar Panels" },
    { id: "inverter", name: "Inverters" },
    { id: "battery", name: "Batteries" },
    { id: "accessory", name: "Accessories" },
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(BEendpoints.get_products());
        console.log(res.data);
        if (res.data.ok) setProducts(res.data.data);
        else throw new Error("failed to fetch products");
      } catch (err) {
        console.log(err);
        toast.error(
          err instanceof Error ? err.message : "couldn't fetch products",
        );
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts: ProductTypes[] =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p: ProductTypes) => p.category.toLowerCase() === selectedCategory,
        );

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-zinc-950 pt-24">
        {/* Hero Section */}
        <section className="relative px-4 md:px-8 py-16 border-b border-zinc-800/30">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Solar Products
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl">
              Discover our curated collection of high-efficiency solar panels,
              inverters, batteries, and accessories. All products are certified
              and backed by industry-leading warranties.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1">
                <div className="sticky top-32">
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedCategory === cat.id
                              ? "bg-amber-400 text-zinc-950 font-semibold"
                              : "hover:bg-zinc-800/50 text-zinc-300"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">Sort By</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-4 py-2 text-sm text-zinc-300 focus:outline-none focus:border-amber-400"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-br from-amber-400/10 to-amber-500/5 border border-amber-400/30">
                    <h4 className="font-semibold mb-3">Need Help?</h4>
                    <p className="text-sm text-zinc-300 mb-4">
                      Our solar experts are ready to help you choose the perfect
                      products for your system.
                    </p>
                    <Button className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300 text-sm font-semibold">
                      Consult an Expert
                    </Button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-8">
                  <p className="text-sm text-zinc-400">
                    Showing {filteredProducts.length} products
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-8 py-16 border-t border-zinc-800/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Go Solar?</h2>
            <p className="text-zinc-400 mb-8">
              Build your custom solar system or schedule a consultation with our
              solar experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-8 py-6">
                Build Your System
              </Button>
              <Button
                variant="outline"
                className="border-zinc-600 hover:border-amber-400 hover:text-amber-400 text-zinc-100 font-semibold px-8 py-6"
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

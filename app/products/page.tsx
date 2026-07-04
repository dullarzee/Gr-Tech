"use client";

import Navigation from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Zap, Battery, Sun } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "SolarPanel 400W",
    category: "solar-panels",
    price: 450,
    image: "🟫",
    rating: 4.8,
    reviews: 124,
    specs: ["400W Output", "Monocrystalline", "1.65 m²", "22% Efficiency"],
    description:
      "Premium monocrystalline solar panel with high efficiency and durability.",
  },
  {
    id: 2,
    name: "SolarPanel 550W",
    category: "solar-panels",
    price: 580,
    image: "🟫",
    rating: 4.9,
    reviews: 89,
    specs: ["550W Output", "Monocrystalline", "2.28 m²", "24% Efficiency"],
    description:
      "High-output monocrystalline panel perfect for commercial installations.",
  },
  {
    id: 3,
    name: "SolarPanel 600W",
    category: "solar-panels",
    price: 680,
    image: "🟫",
    rating: 4.7,
    reviews: 156,
    specs: ["600W Output", "Monocrystalline", "2.72 m²", "25% Efficiency"],
    description:
      "Ultra-efficient solar panel with excellent temperature coefficient.",
  },
  {
    id: 4,
    name: "PowerMax 5000 Inverter",
    category: "inverters",
    price: 1200,
    image: "📦",
    rating: 4.9,
    reviews: 203,
    specs: ["5000W Capacity", "95% Efficiency", "3-Phase", "WiFi Enabled"],
    description: "Three-phase inverter with advanced monitoring capabilities.",
  },
  {
    id: 5,
    name: "PowerMax 8000 Inverter",
    category: "inverters",
    price: 1800,
    image: "📦",
    rating: 4.8,
    reviews: 167,
    specs: ["8000W Capacity", "96% Efficiency", "3-Phase", "WiFi Enabled"],
    description:
      "Heavy-duty inverter for large residential and commercial systems.",
  },
  {
    id: 6,
    name: "PowerMax 12000 Inverter",
    category: "inverters",
    price: 2400,
    image: "📦",
    rating: 4.7,
    reviews: 98,
    specs: ["12000W Capacity", "97% Efficiency", "3-Phase", "WiFi Enabled"],
    description:
      "Enterprise-grade inverter for industrial solar installations.",
  },
  {
    id: 7,
    name: "LithioPower 10kWh Battery",
    category: "batteries",
    price: 2500,
    image: "🔋",
    rating: 4.9,
    reviews: 145,
    specs: ["10 kWh Capacity", "LiFePO4", "6000 Cycles", "99% Round Trip"],
    description: "Advanced lithium battery system with exceptional cycle life.",
  },
  {
    id: 8,
    name: "LithioPower 15kWh Battery",
    category: "batteries",
    price: 3500,
    image: "🔋",
    rating: 4.8,
    reviews: 112,
    specs: ["15 kWh Capacity", "LiFePO4", "6000 Cycles", "99% Round Trip"],
    description: "Premium battery solution for maximum energy storage.",
  },
  {
    id: 9,
    name: "LithioPower 20kWh Battery",
    category: "batteries",
    price: 4500,
    image: "🔋",
    rating: 4.9,
    reviews: 78,
    specs: ["20 kWh Capacity", "LiFePO4", "6000 Cycles", "99% Round Trip"],
    description:
      "Enterprise storage solution with industrial-grade reliability.",
  },
  {
    id: 10,
    name: "Mounting System Pro",
    category: "accessories",
    price: 300,
    image: "⚙️",
    rating: 4.6,
    reviews: 234,
    specs: [
      "Adjustable Angles",
      "Aluminum Frame",
      "Weather Resistant",
      "4 Panels",
    ],
    description:
      "Durable mounting hardware for reliable solar panel installation.",
  },
  {
    id: 11,
    name: "Hybrid Charge Controller",
    category: "accessories",
    price: 450,
    image: "⚙️",
    rating: 4.7,
    reviews: 189,
    specs: ["60A Rating", "MPPT Technology", "Dual Input", "LCD Display"],
    description: "Advanced MPPT controller for optimal energy harvesting.",
  },
  {
    id: 12,
    name: "Monitoring System Plus",
    category: "accessories",
    price: 250,
    image: "⚙️",
    rating: 4.8,
    reviews: 312,
    specs: [
      "Real-time Monitoring",
      "Mobile App",
      "Cloud Storage",
      "API Access",
    ],
    description:
      "Complete monitoring solution with mobile app and cloud analytics.",
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "solar-panels", name: "Solar Panels" },
    { id: "inverters", name: "Inverters" },
    { id: "batteries", name: "Batteries" },
    { id: "accessories", name: "Accessories" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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
                    <div
                      key={product.id}
                      className="group p-6 rounded-2xl bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 border border-zinc-700/30 hover:border-amber-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/10"
                    >
                      {/* Product Image Placeholder */}
                      <div className="w-full h-48 rounded-lg bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 flex items-center justify-center mb-4 text-5xl">
                        {product.image}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-zinc-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-zinc-400">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-zinc-400 mb-4">
                        {product.description}
                      </p>

                      {/* Specs */}
                      <div className="space-y-1 mb-4">
                        {product.specs.map((spec, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-zinc-400 flex items-center gap-2"
                          >
                            <Zap className="w-3 h-3 text-amber-400" />
                            {spec}
                          </div>
                        ))}
                      </div>

                      {/* Price and Button */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-zinc-500">Starting at</p>
                          <p className="text-2xl font-bold text-amber-400">
                            ${product.price}
                          </p>
                        </div>
                        <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 p-3 rounded-lg">
                          <ShoppingCart className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
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

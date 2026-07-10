"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  Zap,
  Check,
  Package,
  Truck,
  RotateCcw,
  Award,
} from "lucide-react";
import { BEendpoints } from "@/constants/urls/backendUrls";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import { ProductTypes } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState<ProductTypes | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSpecs, setSelectedSpecs] = useState("default");

  useEffect(() => {
    // Fetch product data
    const productId = params.id as string;
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(BEendpoints.get_single_product(productId));
        if (res.data.ok) setProduct(res.data.data);
        else throw new Error(res.data.message || "failed to fetch products");
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity,
      specs: selectedSpecs,
      category: product.category,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-400/20 mb-4">
            <div className="w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
          </div>
          <p className="text-zinc-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || "Product not found"}</p>
          <Button
            onClick={() => router.back()}
            className="bg-amber-400 text-zinc-950 hover:bg-amber-300"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Link
            href="/products"
            className="hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Product Image */}
          <div>
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl /p-6 /md:p-8 aspect-square flex items-center justify-center">
              <Image
                alt={`image of ${product.name}`}
                src={product.imageUrl}
                width={500}
                height={500}
                className="rounded-sm w-full h-full"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="mb-3 inline-block px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full">
                <span className="text-xs font-semibold text-amber-400">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.ratings)
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.ratings}</span>
                <span className="text-zinc-400">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-zinc-400 mb-6 leading-relaxed line-clamp-4">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <p className="text-zinc-400 text-sm mb-2">Price</p>
                <p className="text-4xl md:text-5xl font-bold text-amber-400">
                  ${product.price.toLocaleString()}
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.stock > 0 ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">
                      In Stock
                    </span>
                  </>
                ) : (
                  <span className="text-red-400 font-semibold">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg w-fit p-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">
                Select Variant
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {["Standard", "Premium", "Professional"].map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedSpecs(variant)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      selectedSpecs === variant
                        ? "bg-amber-400 text-zinc-950"
                        : "bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 hover:border-amber-400/50"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 md:space-y-0 md:flex gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`flex-1 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  addedToCart
                    ? "bg-emerald-500 text-white hover:bg-emerald-500"
                    : "bg-amber-400 text-zinc-950 hover:bg-amber-300"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button className="flex-1 md:flex-none px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2">
                <Heart className="w-5 h-5" />
                <span className="hidden md:inline">Save</span>
              </Button>
              <Button className="flex-1 md:flex-none px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                <span className="hidden md:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Features */}
          <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6">
              Features & Specifications
            </h3>
            <ul className="space-y-3">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            {/* Warranty */}
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6 flex items-start gap-4">
              <Award className="w-8 h-8 text-amber-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Warranty</h4>
                <p className="text-sm text-zinc-400">{10}</p>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6 flex items-start gap-4">
              <Truck className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Fast Shipping</h4>
                <p className="text-sm text-zinc-400">
                  Free shipping on orders over $500
                </p>
              </div>
            </div>

            {/* Returns */}
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6 flex items-start gap-4">
              <RotateCcw className="w-8 h-8 text-blue-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Easy Returns</h4>
                <p className="text-sm text-zinc-400">
                  30-day money-back guarantee
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6 flex items-start gap-4">
              <Package className="w-8 h-8 text-cyan-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-1">Expert Support</h4>
                <p className="text-sm text-zinc-400">
                  24/7 customer support team
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products CTA */}
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold mb-6">Ready to Go Solar?</h3>
          <Link href="/products">
            <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-8 py-3 rounded-lg">
              Browse More Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

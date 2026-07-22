"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import {
  Trash2,
  ShoppingCart,
  Package,
  ArrowRight,
  ChevronLeft,
  Zap,
  Lock,
} from "lucide-react";
import Header from "@/components/header";
import CartItemCard from "@/components/ui/cartItemCard";
import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";

export default function CartPage() {
  const { items, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const { resolvedTheme } = useTheme();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    setLoading(true);
    try {
      router.push("/checkout");
    } catch (error) {
      console.error("[v0] Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmClearCart = () => {
    setShowClearModal(false);
    clearCart();
  };

  const handleContinueShopping = () => {
    router.push("/products");
  };

  return (
    <div
      className={`min-h-screen max-w-screen pt-20 ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
    >
      <Header />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Link
            href="/"
            className={`hover:text-amber-400 transition-colors ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-amber-400">Shopping Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1
            className={`text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
          >
            <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-amber-400" />
            Your Cart
          </h1>
          <p className="text-zinc-400">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Empty Message */}
            <div className="md:col-span-2">
              <div
                className={`rounded-2xl p-12 md:p-16 text-center ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
              >
                <div className="flex justify-center mb-6">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
                  >
                    <Package
                      className={`w-10 h-10 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                    />
                  </div>
                </div>
                <h2
                  className={`text-2xl font-bold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                >
                  Your cart is empty
                </h2>
                <p
                  className={`mb-8 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                >
                  Looks like you haven&apos;t added any solar products yet.
                  Start exploring!
                </p>
                <Button
                  onClick={handleContinueShopping}
                  className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-8 py-3 rounded-lg inline-flex items-center gap-2"
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 ">
            {/* Cart Items */}
            <div className="w-full md:col-span-2 space-y-4 md:px-auto">
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}

              {/* Continue Shopping */}
              <div className="flex items-center gap-2 pt-4">
                <ChevronLeft className="w-4 h-4 text-zinc-500" />
                <button
                  onClick={handleContinueShopping}
                  className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold"
                >
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className={`md:col-span-1 px-4 md:px-auto`}>
              <div
                className={`/border border-zinc-700/50 rounded-2xl p-6 md:p-8 sticky top-24 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
              >
                <h3
                  className={`text-xl font-bold mb-6 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                >
                  Order Summary
                </h3>

                {/* Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-zinc-700/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Subtotal</span>
                    <span
                      className={`text-sm ${resolvedTheme === "dark" ? `${themePalette.dark.text_light}` : themePalette.light.text_dark}`}
                    >
                      <span className={`text-sm`}>&#8358;</span>
                      {total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Shipping</span>
                    <span className="font-semibold text-emerald-400">Free</span>
                  </div>
                  {/* <div className="flex justify-between text-sm">
                    <span
                      className={`text-zinc-400 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
                    >
                      Tax (estimated)
                    </span>
                    <span
                      className={`text-sm ${resolvedTheme === "dark" ? `${themePalette.dark.text_light}` : themePalette.light.text_dark}`}
                    >
                      <span className="text-sm">&#8358;</span>
                      {(total * 0.1).toLocaleString()}
                    </span>
                  </div> */}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-8">
                  <span
                    className={`text-lg font-bold ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                  >
                    Total:
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-amber-400">
                    <span className="text-sm">&#8358;</span>
                    {total.toLocaleString()}
                  </span>
                </div>

                {/* Checkout CTA */}
                {!isAuthenticated ? (
                  <div className="space-y-3 mb-6">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                      <p className="text-xs text-blue-300 flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" />
                        Sign in to checkout
                      </p>
                    </div>
                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
                    >
                      Sign In & Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Proceed to Checkout"}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </Button>
                )}

                {/* Clear Cart */}
                <button
                  onClick={() => setShowClearModal(true)}
                  className="w-full mt-3 py-2 text-red-400 hover:text-red-300 text-sm font-semibold transition-colors"
                >
                  Clear Cart
                </button>

                {/* Info Cards */}
                <div className="space-y-3 mt-8 pt-8 border-t border-zinc-700/50">
                  <div className="text-xs text-zinc-400">✓ Secure checkout</div>
                  <div className="text-xs text-zinc-400">
                    ✓ Free shipping on orders over $500
                  </div>
                  <div className="text-xs text-zinc-400">
                    ✓ 30-day money-back guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showClearModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="translucent w-full max-w-lg rounded-3xl border border-zinc-700/70 bg-zinc-950/95 p-6 shadow-2xl backdrop-blur-xl text-white">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-bold">Clear cart?</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  This will remove all items from your cart. This action cannot
                  be undone.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="rounded-2xl border border-zinc-700/70 bg-zinc-800/80 px-4 py-3 text-sm font-semibold text-zinc-200 hover:bg-zinc-700/80 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearCart}
                  className="rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-400 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

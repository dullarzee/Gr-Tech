'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import {
  Trash2,
  ShoppingCart,
  Package,
  ArrowRight,
  ChevronLeft,
  Zap,
  Lock,
} from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    setLoading(true)
    try {
      // Sync cart with backend
      // await syncWithBackend()
      router.push('/checkout')
    } catch (error) {
      console.error('[v0] Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleContinueShopping = () => {
    router.push('/products')
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-amber-400">Shopping Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-amber-400" />
            Your Shopping Cart
          </h1>
          <p className="text-zinc-400">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Empty Message */}
            <div className="md:col-span-2">
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-12 md:p-16 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-zinc-800/50 flex items-center justify-center">
                    <Package className="w-10 h-10 text-zinc-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-zinc-400 mb-8">Looks like you haven&apos;t added any solar products yet. Start exploring!</p>
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
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-24 md:w-32 h-32 sm:h-24 md:h-32 bg-zinc-700/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-8 h-8 md:w-10 md:h-10 text-amber-400/50" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <h3 className="text-lg md:text-xl font-bold mb-1 truncate">{item.name}</h3>
                      <p className="text-sm text-zinc-400">{item.specs}</p>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Price</p>
                        <p className="text-lg md:text-xl font-bold text-amber-400">${item.price.toLocaleString()}</p>
                      </div>

                      {/* Quantity Control */}
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Quantity</p>
                        <div className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg w-fit p-1">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-colors"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Subtotal</p>
                        <p className="text-lg md:text-xl font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
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
            <div className="md:col-span-1">
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6 md:p-8 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                {/* Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-zinc-700/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="font-semibold">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Shipping</span>
                    <span className="font-semibold text-emerald-400">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Tax (estimated)</span>
                    <span className="font-semibold">${(total * 0.1).toLocaleString()}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl md:text-3xl font-bold text-amber-400">
                    ${(total * 1.1).toLocaleString()}
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
                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </Button>
                )}

                {/* Clear Cart */}
                <button
                  onClick={() => clearCart()}
                  className="w-full mt-3 py-2 text-red-400 hover:text-red-300 text-sm font-semibold transition-colors"
                >
                  Clear Cart
                </button>

                {/* Info Cards */}
                <div className="space-y-3 mt-8 pt-8 border-t border-zinc-700/50">
                  <div className="text-xs text-zinc-400">
                    ✓ Secure checkout
                  </div>
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
    </div>
  )
}

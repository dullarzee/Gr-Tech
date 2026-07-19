"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import {
  ArrowLeft,
  ShoppingCart,
  Lock,
  Check,
  Truck,
  Package,
  CreditCard,
} from "lucide-react";
import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";

export default function CheckoutPage() {
  const { items, total, submitOrder, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    // Contact Info
    email: user?.email || "",
    fullName: user?.name || "",
    phone: "",
    // Shipping Address
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Nigeria",
    // Billing Address
    sameAsShipping: true,
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    // Payment
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
    // Additional
    notes: "",
  });

  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
      >
        <div className="text-center">
          <Lock className="w-16 h-16 text-amber-400 mx-auto mb-4" />
          <h1
            className={`text-2xl font-bold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
          >
            Sign In Required
          </h1>
          <p
            className={`mb-6 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
          >
            You must be logged in to checkout
          </p>
          <Link href="/auth/login">
            <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-8 py-3">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
      >
        <div className="text-center">
          <ShoppingCart className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h1
            className={`text-2xl font-bold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
          >
            Your cart is empty
          </h1>
          <p
            className={`mb-6 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
          >
            Add items to your cart before checking out
          </p>
          <Link href="/products">
            <Button className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold px-8 py-3">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (
      !formData.phone.trim() ||
      formData.phone.length < 10 ||
      isNaN(Number(formData.phone))
    )
      newErrors.phone = "Valid phone number is required";
    if (!formData.street.trim())
      newErrors.street = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    //if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'

    // if (!formData.sameAsShipping) {
    //   if (!formData.billingStreet.trim()) newErrors.billingStreet = 'Billing street is required'
    //   if (!formData.billingCity.trim()) newErrors.billingCity = 'Billing city is required'
    //   if (!formData.billingState.trim()) newErrors.billingState = 'Billing state is required'
    //   if (!formData.billingZipCode.trim()) newErrors.billingZipCode = 'Billing ZIP code is required'
    // }

    // if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{13,19}$/)) newErrors.cardNumber = 'Valid card number is required'
    // if (!formData.cardExpiry.match(/^\d{2}\/\d{2}$/)) newErrors.cardExpiry = 'Use MM/YY format'
    // if (!formData.cardCvc.match(/^\d{3,4}$/)) newErrors.cardCvc = 'Valid CVC is required'
    // if (!formData.cardName.trim()) newErrors.cardName = 'Card holder name is required'

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target as any;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const isSuccess = await submitOrder({
        name: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        streetAddress: formData.street,
        city: formData.city,
        state: formData.state,
        products: items,
      });
      if (isSuccess) {
        setOrderPlaced(true);
        clearCart();
      }
    } catch (error) {
      console.error("[v0] Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div
        className={`min-h-screen pt-20 px-4 ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
      >
        <div className="max-w-2xl mx-auto py-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
                <Check className="w-10 h-10 text-emerald-400" />
              </div>
            </div>
            <h1
              className={`text-3xl md:text-4xl font-bold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              Order Placed Successfully!
            </h1>
            <p
              className={`mb-6 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
            >
              Thank you for your purchase. We&apos;re processing your order.
            </p>
          </div>

          {/* Order Details */}
          <div
            className={`rounded-2xl p-8 mb-8 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
          >
            <h2
              className={`text-xl font-bold mb-6 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
            >
              Order Details
            </h2>
            <div className="space-y-4 mb-6 pb-6 border-b border-zinc-700/50">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p
                      className={`font-semibold ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                    >
                      {item.name}
                    </p>
                    <p
                      className={`text-sm ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
                    >
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p
                    className={`font-semibold ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                  >
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span
                className={`text-lg font-bold ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
              >
                Total:
              </span>
              <span className="text-2xl font-bold text-amber-400">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4 mb-8">
            <div
              className={`rounded-xl p-4 flex items-start gap-3 ${resolvedTheme === "dark" ? themePalette.dark.translucent_bg : themePalette.light.translucent_bg}`}
            >
              <Truck className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
              <div>
                <p
                  className={`font-semibold ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                >
                  Shipping
                </p>
                <p
                  className={`text-sm ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                >
                  You will be contacted by our team soonest
                </p>
              </div>
            </div>
            {/* <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-xl p-4 flex items-start gap-3">
              <Package className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold">Tracking</p>
                <p className="text-sm text-zinc-400">We&apos;ll send you tracking information via email</p>
              </div>
            </div> */}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/products" className="flex-1">
              <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 rounded-lg">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold py-3 rounded-lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-20 px-4 ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.backgroundPrimary}`}
    >
      <div className="max-w-6xl mx-auto py-8">
        {/* Back Link */}
        <Link
          href="/cart"
          className="flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        {/* Header */}
        <h1
          className={`text-3xl md:text-4xl font-bold mb-12 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
        >
          Checkout
        </h1>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div
                className={`/border border-zinc-700/50 rounded-2xl p-6 md:p-8 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
              >
                <h2
                  className={`text-xl font-bold mb-6 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                >
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
                    >
                      Email <span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg transition ${
                        errors.email
                          ? "border-red-500/50 focus:border-red-400/50"
                          : `${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
                    >
                      Full Name <span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg transition ${
                        errors.fullName
                          ? "border-red-500/50 focus:border-red-400/50"
                          : `${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`
                      }`}
                      required
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
                    >
                      Phone <span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg transition ${
                        errors.phone
                          ? "border-red-500/50 focus:border-red-400/50"
                          : `${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`
                      }`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div
                className={`rounded-2xl p-6 md:p-8 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
              >
                <h2
                  className={`text-xl font-bold mb-6 ${resolvedTheme === "dark" ? themePalette.dark.text_light : themePalette.light.text_dark}`}
                >
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
                    >
                      Street Address<span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg ${`${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}`}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-sm font-semibold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
                      >
                        City<span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg ${`${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-semibold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
                      >
                        State<span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg ${`${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}`}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-semibold mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
                    >
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg ${`${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}`}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              {/* <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700/50 rounded-lg focus:border-amber-400/50 focus:outline-none text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700/50 rounded-lg focus:border-amber-400/50 focus:outline-none text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">CVC</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700/50 rounded-lg focus:border-amber-400/50 focus:outline-none text-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 text-zinc-950 hover:bg-amber-300 font-bold py-4 rounded-lg text-lg disabled:opacity-50"
              >
                {loading ? "Processing Payment..." : "Submit order"}
              </Button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-1">
            <div
              className={`rounded-2xl p-6 md:p-8 sticky top-24 ${resolvedTheme === "dark" ? themePalette.dark.chip_style : themePalette.light.chip_style}`}
            >
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-zinc-700/50 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs text-zinc-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold">
                      <span className="text-xs">₦</span>
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-zinc-700/50 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="font-semibold">
                    <span className="text-xs">₦</span>
                    {total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Shipping</span>
                  <span className="font-semibold text-emerald-400">Free</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-zinc-400">Tax (est.)</span>
                  <span className="font-semibold">
                    <span className="text-x">₦</span>
                    {(total * 0.1).toLocaleString()}
                  </span>
                </div> */}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold text-amber-400">
                  <span className="text-xs">₦</span>
                  {total.toLocaleString()}
                </span>
              </div>

              {/* Security Info */}
              <div className="mt-8 pt-6 border-t border-zinc-700/50 text-xs text-zinc-400 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                Secure SSL Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

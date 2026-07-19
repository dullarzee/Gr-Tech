import { CartItem } from "@/lib/cart-context";
import { Zap, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";

export default function CartItemCard({ item }: { item: CartItem }) {
  const [qty, setQty] = useState(item.quantity);
  const { updateQuantity, removeItem } = useCart();
  const { resolvedTheme } = useTheme();

  const handleQtyUpdate = (itemId: string, qty: number) => {
    let timeoutId = undefined;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      updateQuantity(itemId, qty);
    }, 1500);
  };
  return (
    <>
      <div
        key={item.id}
        className={`border rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6 max-w-full ${resolvedTheme === "dark" ? `${themePalette.dark.chip_style} border-zinc-700/50` : `${themePalette.light.chip_style} border-zinc-400/50`}`}
      >
        {/* Product Image */}
        <div className="w-full max-w-screen sm:w-24 md:w-32 h-32 sm:h-24 md:h-32 bg-zinc-700/30 rounded-lg flex items-center justify-center shrink-0">
          <Image
            alt={`Image of ${item.name}`}
            src={item.imageUrl}
            width={50}
            height={50}
            className="w-full h-full"
            loading="eager"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="mb-3">
            <h3 className="text-lg md:text-xl font-bold mb-1 line-clamp-1">
              {item.name}
            </h3>
            <p className="text-sm text-zinc-400">{item.specs}</p>
          </div>

          {/* Price and Quantity */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Price</p>
              <p className="text-lg md:text-xl font-bold text-amber-400">
                <span className="text-sm">&#8358;</span>
                {item.price.toLocaleString()}
              </p>
            </div>

            {/* Quantity Control */}
            <div>
              <p className="text-xs text-zinc-500 mb-1">Quantity</p>
              <div
                className={`flex items-center gap-2 border border-zinc-700/50 rounded-lg w-fit p-1 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.bg_secondary}`}
              >
                <button
                  onClick={() => {
                    handleQtyUpdate(item.id, Math.max(1, qty - 1));
                    setQty((prev) => prev - 1);
                  }}
                  className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-colors"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-semibold">
                  {qty}
                </span>
                <button
                  onClick={() => {
                    handleQtyUpdate(item.id, qty + 1);
                    setQty((prev) => prev + 1);
                  }}
                  className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div>
              <p className="text-xs text-zinc-500 mb-1">Subtotal</p>
              <p className="text-lg md:text-xl font-bold">
                <span className="text-sm">&#8358;</span>
                {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeItem(item.id)}
          className="shrink-0 w-10 h-10 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}

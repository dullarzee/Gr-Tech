import { ProductTypes } from "@/types";
import Image from "next/image";
import { Button } from "./button";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }: { product: ProductTypes }) => {
  const [showView, setShowView] = useState(false);
  const router = useRouter();
  return (
    <div
      key={product.id}
      className="group p-6 rounded-2xl bg-gradient-to-br h-130 from-zinc-800/40 to-zinc-900/40 border border-zinc-700/30 hover:border-amber-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/10"
    >
      {/* Product Image Placeholder */}
      <Image
        alt={`image of ${product.name}`}
        src={product.imageUrl}
        width={200}
        height={200}
        className="w-full h-48 rounded-lg bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 flex items-center justify-center mb-4 text-5xl"
      />

      <section className="flex flex-col justify-between h-[57%]">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
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
            <span className="text-xs text-zinc-400">
              {product.ratings} ({product.reviews})
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-zinc-400 mb-4 line-clamp-5">
            {product.description}
          </p>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">Starting at</p>
            <p className="text-2xl font-bold text-amber-400">
              ${product.price}
            </p>
          </div>
          <div
            role="button"
            onClick={() => router.push(`/products/${product.id}`)}
          >
            <Button
              onMouseOver={() => setShowView(true)}
              onMouseOut={() => setShowView(false)}
              className={`bg-amber-400 text-zinc-950 p-3 rounded-lg w-12 transition duration-300 ${showView ? "bg-white" : "bg-amber-400"}`}
            >
              {!showView ? (
                <ShoppingCart className="w-5 h-5" />
              ) : (
                <span>View</span>
              )}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCard;

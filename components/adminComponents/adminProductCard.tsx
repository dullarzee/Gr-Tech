import { ProductTypes } from "@/types";
import { ImageIcon, Edit3, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AdminProductCard({
  product,
  setDeleteTarget,
}: {
  product: ProductTypes;
  setDeleteTarget: React.Dispatch<React.SetStateAction<ProductTypes | null>>;
}) {
  return (
    <div
      key={product.id}
      className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 h-100"
    >
      <div className="h-40 bg-zinc-900/70">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-500">
            <ImageIcon className="mr-2 h-5 w-5" /> No image
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between h-3/5 p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="font-semibold line-clamp-2">{product.name}</h3>
          <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-1 text-xs text-amber-400">
            {product.category}
          </span>
        </div>
        <p className="mb-3 line-clamp-3 text-sm text-zinc-400">
          {product.description}
        </p>
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="text-amber-400">
            ₦{product.price?.toLocaleString()}
          </span>
          <span className="text-zinc-400">Stock: {product.stock}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/products/edit/${product.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
          >
            <Edit3 className="h-4 w-4" /> Edit
          </Link>
          <button
            onClick={() => setDeleteTarget(product)}
            className="flex items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

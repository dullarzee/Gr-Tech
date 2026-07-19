"use client";

import { Button } from "@/components/ui/button";
import { ProductTypes } from "@/types";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { toast } from "sonner";
import { Edit3, Trash2, Image as ImageIcon } from "lucide-react";
import DeleteConfirmModal from "@/components/adminComponents/deleteConfirmModal";
import AdminProductCard from "@/components/adminComponents/adminProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<ProductTypes | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(BEendpoints.get_products());
      if (!res.data.ok) throw new Error("failed to fetch products");
      setProducts(res.data.data);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Unable to load products",
      );
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await axios.delete(
        BEendpoints.delete_product(deleteTarget.id),
      );
      if (!res.data.ok)
        throw new Error(res.data.message || "Product not deleted");
      setProducts((prev) =>
        prev.filter((product) => product.id !== deleteTarget.id),
      );
      toast.success(`Deleted ${deleteTarget.name}`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Product deletion failed",
      );
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <div className="rounded-xl border border-zinc-700/50 bg-linear-to-br from-zinc-800/50 to-zinc-900/50 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Product Management</h2>
            <p className="text-sm text-zinc-400">
              Manage inventory, edit details, and remove products.
            </p>
          </div>
          <Link href="/admin/products/add">
            <Button className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300">
              Add Product
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <AdminProductCard
              key={product.id}
              product={product}
              setDeleteTarget={setDeleteTarget}
            />
          ))}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete this product?"
        description={`This will permanently remove ${deleteTarget?.name ?? "this product"}. This action can't be undone.`}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}

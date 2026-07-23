"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { ProductTypes } from "@/types";
import ProductImageUploader from "@/components/adminComponents/productImageUploader";
import DeleteConfirmModal from "@/components/adminComponents/deleteConfirmModal";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "SOLARPANEL",
  variant: "",
  imageUrl: "",
  features: "",
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axios.get(BEendpoints.get_single_product(productId));
        if (!res.data.ok)
          throw new Error(res.data.message || "Unable to load product");

        const product = res.data.data as ProductTypes;
        setForm({
          name: product.name,
          description: product.description,
          price: String(product.price),
          stock: String(product.stock),
          category: product.category,
          variant: product.variant ?? "",
          imageUrl: product.imageUrl ?? "",
          features: (product.features ?? []).join("\n"),
        });
        setPreview(product.imageUrl ?? null);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load product",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadProduct();
  }, [productId]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await axios.delete(BEendpoints.delete_product(deleteTarget));
      if (!res.data.ok)
        throw new Error(res.data.message || "Product not deleted");
      toast.success("Product deleted");
      router.push("/admin/products");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Product deletion failed",
      );
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    try {
      let imageUrl = form.imageUrl;
      console.log("image content type:", contentType);

      if (selectedImage && base64Image) {
        const uploadRes = await axios.post(BEendpoints.upload_product_image, {
          imageBase64: base64Image,
          fileName: `${Date.now()}-${selectedImage.name}`,
          contentType,
        });

        if (uploadRes.data?.ok) {
          imageUrl = uploadRes.data.data.imageUrl;
        }
      }

      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category,
        variant: form.variant,
        imageUrl: imageUrl,
        features: form.features.split("\n").filter(Boolean),
        images: imageUrl ? [imageUrl] : [],
        ratings: [],
      };

      const response = await axios.put(
        BEendpoints.update_product(productId),
        payload,
      );
      if (!response.data?.ok) throw new Error("Unable to update product");

      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update product",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">
        <Loader2 className="mr-3 h-6 w-6 animate-spin text-amber-400" />
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-zinc-100">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="rounded-full border border-zinc-700 p-2 hover:bg-zinc-900"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <p className="text-sm text-zinc-400">Products</p>
            <h1 className="text-2xl font-semibold">Edit product</h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDeleteTarget(productId)}
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
        >
          Delete product
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl"
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <label className="block text-sm text-zinc-300">
              <span className="mb-2 block">Product name</span>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none"
              />
            </label>

            <label className="block text-sm text-zinc-300">
              <span className="mb-2 block">Description</span>
              <textarea
                name="description"
                required
                rows={5}
                value={form.description}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none"
              />
            </label>

            <label className="block text-sm text-zinc-300">
              <span className="mb-2 block">Features (one per line)</span>
              <textarea
                name="features"
                rows={5}
                value={form.features}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none"
              />
            </label>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-zinc-300">
                <span className="mb-2 block">Category</span>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none"
                >
                  <option value="SOLARPANEL">Solar Panel</option>
                  <option value="INVERTER">Inverter</option>
                  <option value="BATTERY">Battery</option>
                  <option value="ACCESSORY">Accessory</option>
                </select>
              </label>

              <label className="block text-sm text-zinc-300">
                <span className="mb-2 block">Variant</span>
                <input
                  name="variant"
                  value={form.variant}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none"
                />
              </label>

              <label className="block text-sm text-zinc-300">
                <span className="mb-2 block">Price</span>
                <input
                  name="price"
                  type="number"
                  required
                  value={form.price}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none"
                />
              </label>

              <label className="block text-sm text-zinc-300">
                <span className="mb-2 block">Stock</span>
                <input
                  name="stock"
                  type="number"
                  required
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none"
                />
              </label>
            </div>

            <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/40 p-3">
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
                Product image
              </p>
              <p className="mb-3 text-sm text-zinc-400">
                Upload a product photo using JPEG, PNG, HEIF, HEIC, WEBP, or
                AVIF.
              </p>
              <ProductImageUploader
                value={preview}
                onFileSelected={(file, previewUrl, base64, mimeType) => {
                  setSelectedImage(file);
                  setPreview(previewUrl);
                  setBase64Image(base64 ?? null);
                  setContentType(mimeType ?? null);
                  setForm((prev) => ({
                    ...prev,
                    imageUrl: previewUrl ?? prev.imageUrl,
                  }));
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>

      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete this product?"
        description="This will permanently remove the product from the catalog. This action can't be undone."
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

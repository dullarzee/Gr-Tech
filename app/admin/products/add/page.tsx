"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { ArrowLeft, Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import ProductImageUploader from "@/components/adminComponents/productImageUploader";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "SOLARPANEL",
    variant: "",
    imageUrl: "",
    features: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

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
        ...form,
        imageUrl,
        price: Number(form.price),
        stock: Number(form.stock),
        features: form.features.split("\n").filter(Boolean),
        images: imageUrl ? [imageUrl] : [],
        ratings: [],
      };

      console.log("image content type:", contentType);
      console.log("image upload payload: ", payload);

      const response = await axios.post(BEendpoints.add_product, payload);
      if (!response.data?.ok) throw new Error("Unable to create product");

      toast.success("Product added successfully");
      router.push("/admin/products");
    } catch (error) {
      toast.error((error as Error).message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-zinc-100">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/products"
          className="rounded-full border border-zinc-700 p-2 hover:bg-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <p className="text-sm text-zinc-400">Products</p>
          <h1 className="text-2xl font-semibold">Add new product</h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <PlusCircle className="h-5 w-5 text-amber-400" />
          <h2 className="text-lg font-semibold">Product information</h2>
        </div>

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
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <PlusCircle className="h-4 w-4" />
            )}
            {loading ? "Saving..." : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
}

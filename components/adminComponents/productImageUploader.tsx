"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";

interface ProductImageUploaderProps {
  value?: string | null;
  onFileSelected: (
    file: File | null,
    preview: string | null,
    base64?: string | null,
    contentType?: string | null,
  ) => void;
  label?: string;
}

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/heif",
  "image/heic",
  "image/webp",
  "image/avif",
];

const allowedImageExtensions = [".jpg", ".jpeg", ".png", ".heif", ".heic", ".webp", ".avif"];

export default function ProductImageUploader({
  value,
  onFileSelected,
  label = "Product photo",
}: ProductImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(value ?? null);
  }, [value]);

  const readFileAsBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Could not read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (file: File | null) => {
    if (!file) {
      setPreview(null);
      onFileSelected(null, null, null, null);
      return;
    }

    const fileName = file.name.toLowerCase();
    const isAllowedType = allowedImageTypes.includes(file.type) || allowedImageExtensions.some((ext) => fileName.endsWith(ext));

    if (!isAllowedType) {
      toast.error("Only JPEG, PNG, HEIF, HEIC, WEBP, and AVIF images are supported.");
      return;
    }

    const base64 = await readFileAsBase64(file);
    const objectUrl = URL.createObjectURL(file);
    const contentType = file.type || "application/octet-stream";
    setPreview(objectUrl);
    onFileSelected(file, objectUrl, base64, contentType);
  };

  const clearSelection = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    onFileSelected(null, null, null);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-200">{label}</p>
        {preview ? (
          <button
            type="button"
            onClick={clearSelection}
            className="inline-flex items-center gap-1 rounded-full cursor-pointer border border-zinc-700 px-2 py-1 text-xs text-zinc-300"
          >
            <X className="h-3.5 w-3.5" /> Remove
          </button>
        ) : null}
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          const file = event.dataTransfer.files?.[0] ?? null;
          void handleFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-8 text-center transition ${
          isDragging
            ? "border-amber-400 bg-amber-400/10"
            : "border-zinc-700 bg-zinc-900/60 hover:border-amber-400/50"
        }`}
      >
        {preview ? (
          <div className="w-full">
            <img
              src={preview}
              alt="Product preview"
              className="mx-auto h-48 w-full rounded-xl object-cover"
            />
          </div>
        ) : (
          <>
            <div className="mb-3 rounded-full bg-amber-400/10 p-3 text-amber-400">
              <ImagePlus className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-zinc-200">
              Drop an image here or click to browse
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Allowed formats: JPEG, PNG, HEIF, HEIC, WEBP, AVIF
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0] ?? null;
          void handleFile(file);
        }}
      />
    </div>
  );
}

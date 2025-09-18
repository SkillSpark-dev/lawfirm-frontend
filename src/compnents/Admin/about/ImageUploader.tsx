"use client";

import React from "react";
import Image from "next/image";

interface ImageUploadProps {
  selectedFile: File | null;
  currentImageUrl?: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
}

export default function ImageUpload({
  selectedFile,
  currentImageUrl,
  onFileChange,
  label = "Upload Image",
  className = ""
}: ImageUploadProps) {
  const imagePreview = selectedFile ? URL.createObjectURL(selectedFile) : currentImageUrl;

  return (
    <div className={className}>
      <label className="block mb-1 font-medium">{label}</label>

      {imagePreview && (
        <div className="relative w-full max-w-sm h-60 mb-2">
          <Image src={imagePreview} alt="Preview" fill className="rounded object-cover" />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="w-full border rounded p-2"
      />
    </div>
  );
}

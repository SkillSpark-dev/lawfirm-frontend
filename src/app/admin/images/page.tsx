"use client";

import React, { useState } from "react";
import ImageGrid from "./ImageGrid";
import ImageForm from "./ImageForm";

export default function ImagesPage() {
  const [images, setImages] = useState([
    { id: 1, url: "https://placekitten.com/300/200", title: "Cute Kitten", description: "Lovely cat photo" },
    { id: 2, url: "https://placekitten.com/301/200", title: "Another Kitten", description: "Playful kitten" },
  ]);

  const addImage = (newImage: { url: string; title: string; description: string }) => {
    setImages([...images, { id: images.length + 1, ...newImage }]);
  };

  const updateImage = (id: number, updated: { title: string; description: string }) => {
    setImages(images.map((img) => (img.id === id ? { ...img, ...updated } : img)));
  };

  const deleteImage = (id: number) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Image Management</h1>

      {/* Upload Form */}
      <ImageForm addImage={addImage} />

      {/* Image Grid */}
      <ImageGrid images={images} updateImage={updateImage} deleteImage={deleteImage} />
    </div>
  );
}

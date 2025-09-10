"use client";

import React, { useState } from "react";

type Image = {
  id: number;
  url: string;
  title: string;
  description: string;
};

export default function ImageGrid({
  images,
  updateImage,
  deleteImage,
}: {
  images: Image[];
  updateImage: (id: number, updated: { title: string; description: string }) => void;
  deleteImage: (id: number) => void;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: "", description: "" });

  const startEdit = (img: Image) => {
    setEditingId(img.id);
    setForm({ title: img.title, description: img.description });
  };

  const saveEdit = (id: number) => {
    updateImage(id, form);
    setEditingId(null);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {images.map((img) => (
        <div key={img.id} className="bg-white shadow rounded-lg overflow-hidden">
          <img src={img.url} alt={img.title} className="w-full h-40 object-cover" />
          <div className="p-4">
            {editingId === img.id ? (
              <>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border rounded p-2 mb-2"
                />
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border rounded p-2 mb-2"
                />
                <button onClick={() => saveEdit(img.id)} className="bg-green-600 text-white px-3 py-1 rounded mr-2">
                  Save
                </button>
                <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-3 py-1 rounded">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="font-bold">{img.title}</h3>
                <p className="text-sm text-gray-600">{img.description}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => startEdit(img)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => deleteImage(img.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

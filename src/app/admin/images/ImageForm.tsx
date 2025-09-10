"use client";

import React, { useState } from "react";

export default function ImageForm({ addImage }: { addImage: (img: { url: string; title: string; description: string }) => void }) {
  const [form, setForm] = useState({ url: "", title: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url || !form.title) return;
    addImage(form);
    setForm({ url: "", title: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-6 max-w-md">
      <h2 className="text-lg font-semibold mb-4">Upload New Image</h2>

      <input
        type="text"
        name="url"
        placeholder="Image URL"
        value={form.url}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-3"
        required
      />

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-3"
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-3"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Image
      </button>
    </form>
  );
}

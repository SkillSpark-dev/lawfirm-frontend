"use client";

import { useEffect, useState, useRef } from "react";

interface AboutHeroSection {
  _id?: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  image?: { url: string; public_id?: string } | null;
}

export default function AdminAboutHeroPage() {
  const [sections, setSections] = useState<AboutHeroSection[]>([]);
  const [form, setForm] = useState<AboutHeroSection>({
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    image: null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetchSections();
  }, []);

  async function fetchSections() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/info`);
      const data = await res.json();
      setSections(data.data || []);
    } catch (err) {
      console.error("Failed to fetch sections:", err);
    }
    setLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]);
  }

  function resetForm() {
    setForm({ title: "", description: "", buttonText: "", buttonLink: "", image: null });
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleEdit(section: AboutHeroSection) {
    setForm(section);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (form.buttonText) formData.append("buttonText", form.buttonText);
      if (form.buttonLink) formData.append("buttonLink", form.buttonLink);
      if (imageFile) formData.append("image", imageFile);

      const token = localStorage.getItem("token");
      const url = form._id
        ? `${API_BASE}/api/v1/info/${form._id}`
        : `${API_BASE}/api/v1/info`;
      const method = form._id ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save");

      setMessage({ type: "success", text: form._id ? "Updated!" : "Created!" });
      resetForm();
      await fetchSections();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }

    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this section?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/v1/info/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      if (!res.ok) throw new Error("Failed to delete");
      setMessage({ type: "success", text: "Deleted successfully" });
      await fetchSections();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  }

  return (
    <div className="relative min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      {/* Fullscreen Loading Overlay */}
      {(loading || saving) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg font-medium">
              {saving ? "Saving..." : "Loading..."}
            </p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center">Admin — About Hero Sections</h1>

      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow-md p-6 max-w-3xl mx-auto mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {form._id ? "Edit Section" : "Create Section"}
        </h2>

        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium">Button Text</label>
            <input
              type="text"
              name="buttonText"
              value={form.buttonText || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Button Link</label>
            <input
              type="text"
              name="buttonLink"
              value={form.buttonLink || ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <label className="block mb-2 font-medium">Image</label>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} />
        {form.image?.url && !imageFile && (
          <img
            src={form.image.url}
            alt="Current"
            className="mt-2 w-48 h-32 object-cover rounded"
          />
        )}
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="mt-2 w-48 h-32 object-cover rounded"
          />
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {saving ? "Saving..." : form._id ? "Update" : "Create"}
          </button>
          {form._id && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-100 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="max-w-4xl mx-auto">
        {sections.length === 0 && !loading ? (
          <p className="text-center text-gray-500">No sections found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {sections.map((sec) => (
              <div
                key={sec._id}
                className="bg-white shadow p-4 rounded flex flex-col md:flex-row gap-4"
              >
                <img
                  src={sec.image?.url}
                  alt={sec.title}
                  className="w-full md:w-40 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold">{sec.title}</h3>
                  <p className="text-sm text-gray-600">{sec.description}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(sec)}
                      className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sec._id!)}
                      className="bg-red-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                    {sec.buttonLink && (
                      <a
                        href={sec.buttonLink}
                        target="_blank"
                        rel="noreferrer"
                        className="border px-3 py-1 rounded text-sm"
                      >
                        Visit
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

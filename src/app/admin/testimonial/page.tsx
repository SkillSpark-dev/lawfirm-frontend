"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import API_BASE from "@/app/BaseUrl";
interface Testimonial {
  _id: string;
  clientName: string;
  clientProfession: string;
  feedback: string;
  clientImage?: { url: string; public_id?: string };
}

export default function AdminTestimonials() {
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({
    clientName: "",
    clientProfession: "",
    feedback: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;



const fetchTestimonials = useCallback(async () => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE}/api/v1/testimonial`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setTestimonials(data.data || []);
    else setError(data.message || "Failed to fetch testimonials");
  } catch {
    setError("Something went wrong while fetching testimonials");
  } finally {
    setLoading(false);
  }
}, [token]); // ✅ token is stable dependency

useEffect(() => {
  fetchTestimonials();
}, [fetchTestimonials]); // ✅ safe now

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection & preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return alert("You must be logged in");
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("clientName", form.clientName);
      formData.append("clientProfession", form.clientProfession);
      formData.append("feedback", form.feedback);
      if (selectedImage) formData.append("image", selectedImage);

      const url = editing
        ? `${API_BASE}/api/v1/testimonial/${editing._id}`
        : `${API_BASE}/api/v1/testimonial`;

      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());
      alert(`Testimonial ${editing ? "updated" : "created"} successfully!`);
      resetForm();
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      alert("Error saving testimonial");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({ clientName: "", clientProfession: "", feedback: "" });
    setSelectedImage(null);
    setPreview(null);
    setEditing(null);
  };

  const handleEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ clientName: t.clientName, clientProfession: t.clientProfession, feedback: t.feedback });
    setPreview(t.clientImage?.url || null);
    setSelectedImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/testimonial/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(await res.text());
      alert("Testimonial deleted successfully!");
      fetchTestimonials();
    } catch {
      alert("Error deleting testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6 relative">
      {loading && <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>}

      <h1 className="text-2xl font-bold mb-6">Admin Testimonials</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold">{editing ? "Edit" : "Add"} Testimonial</h2>

        <input type="text" name="clientName" value={form.clientName} onChange={handleChange} placeholder="Client Name" className="w-full border rounded p-2" required />
        <input type="text" name="clientProfession" value={form.clientProfession} onChange={handleChange} placeholder="Client Profession" className="w-full border rounded p-2" required />
        <textarea name="feedback" value={form.feedback} onChange={handleChange} placeholder="Feedback" className="w-full border rounded p-2" rows={4} required />

        <div>
          <input type="file" onChange={handleImageChange} className="w-full border rounded p-2" />
          {preview && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-20 h-20 relative">
              <Image src={preview} alt="Preview" fill className=" rounded-full object-cover" />
              </div>
              <button type="button" className="text-red-500" onClick={() => { setPreview(null); setSelectedImage(null); }}>
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button type="submit" disabled={submitting} className={`px-6 py-2 rounded text-white ${submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>
            {editing ? "Update" : "Add"} Testimonial
          </button>
          {editing && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
        </div>
      </form>

      {/* Error */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Testimonials List */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.length === 0 ? <p>No testimonials found.</p> :
            testimonials.map((t) => (
              <div key={t._id} className="bg-white shadow rounded p-4 space-y-2">
                <div className="flex items-center gap-4">
                  {t.clientImage?.url ? <Image src={t.clientImage.url} alt={t.clientName} width={128} height={128} className=" rounded-full object-cover" /> : <div className="w-16 h-16 bg-gray-200 rounded-full" />}
                  <div>
                    <h3 className="font-bold">{t.clientName}</h3>
                    <p className="text-sm text-gray-600">{t.clientProfession}</p>
                  </div>
                </div>
                <p className="mt-2">{t.feedback}</p>
                <div className="flex gap-2 mt-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => handleEdit(t)}>Edit</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(t._id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

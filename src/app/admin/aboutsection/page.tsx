"use client";

import { useState, useEffect, useCallback } from "react";
import HeroForm from "@/compnents/Admin/aboutsection/HeroForm";
import HeroSectionList from "@/compnents/Admin/aboutsection/HeroSectionList";

interface AboutHeroSection {
  _id?: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  image: { url: string; public_id?: string } | null;
}

interface ApiResponse<T> {
  data: T;
  message: string;
}

// Strongly typed form data
interface HeroFormData {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function AdminAboutHeroPage() {
  const [sections, setSections] = useState<AboutHeroSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editSection, setEditSection] = useState<AboutHeroSection | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const fetchSections = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/info`);
      const data: ApiResponse<AboutHeroSection[]> = await res.json();
      setSections(data.data || []);
    } catch (err) {
      console.error("Failed to fetch sections:", err);
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleSubmit = async (formData: HeroFormData, file: File | null) => {
    setSaving(true);
    setMessage(null);
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v) form.append(k, v);
      });
      if (file) form.append("image", file);

      const token = localStorage.getItem("token");
      const url = editSection?._id ? `${API_BASE}/api/v1/info/${editSection._id}` : `${API_BASE}/api/v1/info`;
      const method = editSection?._id ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        body: form,
      });

      const result: ApiResponse<AboutHeroSection> = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed");

      setMessage({ type: "success", text: editSection?._id ? "Updated!" : "Created!" });
      setEditSection(null);
      await fetchSections();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setMessage({ type: "error", text: errorMessage });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      {(loading || saving) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg font-medium">{saving ? "Saving..." : "Loading..."}</p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center">Admin — About Hero Sections</h1>

      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded text-sm ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <HeroForm editSection={editSection} onSubmit={handleSubmit} saving={saving} resetEdit={() => setEditSection(null)} />
      <HeroSectionList sections={sections} onEdit={setEditSection} onDelete={handleDelete} />
    </div>
  );
}

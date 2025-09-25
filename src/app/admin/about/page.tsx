"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useForm, useFieldArray, Control, UseFormRegister } from "react-hook-form";
import API_BASE from "@/app/BaseUrl";
interface AboutStat {
  label: string;
  value: string;
}

interface AboutData {
  _id?: string;
  title: string;
  subtitle: string;
  image?: { url: string; public_id?: string };
  stats: AboutStat[];
}

// ✅ Hero Image Preview
const HeroImagePreview: React.FC<{
  selectedFile: File | null;
  currentUrl?: string;
}> = ({ selectedFile, currentUrl }) => {
  if (selectedFile) {
    return (
      <div className="relative w-full h-64 max-w-sm mb-2">
        <Image
          src={URL.createObjectURL(selectedFile)}
          alt="Preview"
          fill
          className="object-cover rounded"
        />
      </div>
    );
  }
  if (currentUrl) {
    return (
      <div className="relative w-full h-64 max-w-sm mb-2">
        <Image
          src={currentUrl}
          alt="Current Hero"
          fill
          className="object-cover rounded"
        />
      </div>
    );
  }
  return null;
};

// ✅ Stats Section Component
const StatsSection: React.FC<{
  control: Control<AboutData>;
  register: UseFormRegister<AboutData>;
  statFields: { id: string }[];
  appendStat: (stat: AboutStat) => void;
  removeStat: (index: number) => void;
}> = ({ register, statFields, appendStat, removeStat }) => (
  <section>
    <h2 className="text-lg font-semibold mb-2">Stats</h2>
    {statFields.map((s, i) => (
      <div key={s.id} className="flex gap-2 mb-2">
        <input
          {...register(`stats.${i}.label` as const)}
          placeholder="Label"
          className="border rounded p-2 flex-1"
        />
        <input
          {...register(`stats.${i}.value` as const)}
          placeholder="Value"
          className="border rounded p-2 flex-1"
        />
        <button
          type="button"
          onClick={() => removeStat(i)}
          className="bg-red-600 text-white px-2 rounded"
        >
          ✕
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => appendStat({ label: "", value: "" })}
      className="bg-green-600 text-white px-4 py-1 rounded"
    >
      + Add Stat
    </button>
  </section>
);

export default function AdminAboutPage() {
 
  const [about, setAbout] = useState<AboutData | null>(null);
  const [selectedHeroFile, setSelectedHeroFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, control, handleSubmit, reset } = useForm<AboutData>({
    defaultValues: {
      title: "",
      subtitle: "",
      stats: [{ label: "", value: "" }],
      image: { url: "", public_id: "" },
    },
  });

  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({
    control,
    name: "stats",
  });

  // ✅ Fetch About Data
  const fetchAbout = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_BASE}/api/v1/about`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok && data.data) {
        setAbout(data.data);
        reset({
          title: data.data.title || "",
          subtitle: data.data.subtitle || "",
          stats: Array.isArray(data.data.stats) ? data.data.stats : [{ label: "", value: "" }],
          image: data.data.image || { url: "", public_id: "" },
        });
        setSelectedHeroFile(null);
      } else {
        console.error("Failed to fetch About:", data.message);
      }
    } catch (err) {
      console.error("Error fetching About:", err);
    } finally {
      setLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  // ✅ File Change
  const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHeroFile(e.target.files?.[0] || null);
  };

  // ✅ Submit (Create / Update)
  const onSubmit = async (data: AboutData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      formData.append("stats", JSON.stringify(data.stats));
      if (selectedHeroFile) formData.append("image", selectedHeroFile);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const url = about?._id
        ? `${API_BASE}/api/v1/about/${about._id}`
        : `${API_BASE}/api/v1/about`;
      const method = about?._id ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to save About");

      await fetchAbout();
      setSelectedHeroFile(null);
      alert("✅ About page saved successfully!");
    } catch (err) {
      console.error("Error saving About:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-6 bg-gray-50 min-h-screen space-y-6">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg font-medium">Please wait...</p>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-center sm:text-left mb-6">Admin About Page</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-6 space-y-6">
        {/* ✅ Hero Section */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Hero Section</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Title</label>
            <input {...register("title", { required: true })} className="w-full border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Subtitle</label>
            <textarea {...register("subtitle", { required: true })} className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Hero Image</label>
            <HeroImagePreview selectedFile={selectedHeroFile} currentUrl={about?.image?.url} />
            <input type="file" accept="image/*" onChange={handleHeroFileChange} className="w-full border rounded p-2" />
          </div>
        </section>

        {/* ✅ Stats Section */}
        <StatsSection
          control={control}
          register={register}
          statFields={statFields}
          appendStat={appendStat}
          removeStat={removeStat}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
        >
          {about?._id ? "Update About Page" : "Create About Page"}
        </button>
      </form>
    </div>
  );
}

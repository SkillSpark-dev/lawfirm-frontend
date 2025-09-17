"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

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

  // Fetch About Data
  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/about`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setAbout(data.data);
        reset(data.data);
      } else {
        console.error("Failed to fetch about:", data.message);
      }
    } catch (err) {
      console.error("Error fetching About:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHeroFile(e.target.files?.[0] || null);
  };

  const onSubmit = async (data: AboutData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      if (selectedHeroFile) formData.append("image", selectedHeroFile);

      data.stats.forEach((stat, i) => {
        formData.append(`stats[${i}][label]`, stat.label);
        formData.append(`stats[${i}][value]`, stat.value);
      });

      const url = about?._id
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/about/${about._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/about`;

      const method = about?._id ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      await fetchAbout();
      setSelectedHeroFile(null);
      alert("About page saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving About page. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg font-medium">Please wait...</p>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-center sm:text-left mb-6">
        Admin About Page
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow rounded-lg p-6 space-y-6"
      >
        {/* Hero Section */}
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
            {selectedHeroFile ? (
              <img
                src={URL.createObjectURL(selectedHeroFile)}
                alt="Preview"
                className="mb-2 w-full max-w-sm rounded"
              />
            ) : about?.image?.url ? (
              <img src={about.image.url} alt="Current Hero" className="mb-2 w-full max-w-sm rounded" />
            ) : null}
            <input type="file" onChange={handleHeroFileChange} className="w-full border rounded p-2" />
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <h2 className="text-lg font-semibold mb-2">Stats</h2>
          {statFields.map((s, i) => (
            <div key={s.id} className="flex gap-2 mb-2">
              <input
                {...register(`stats.${i}.label`)}
                placeholder="Label"
                className="border rounded p-2 flex-1"
              />
              <input
                {...register(`stats.${i}.value`)}
                placeholder="Value"
                className="border rounded p-2 flex-1"
              />
              <button
                type="button"
                onClick={() => removeStat(i)}
                className="bg-red-600 text-white px-2 rounded"
              >
                X
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Save About Page
        </button>
      </form>
    </div>
  );
}

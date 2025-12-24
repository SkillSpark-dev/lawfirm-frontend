"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import API_BASE from "@/app/BaseUrl";

// --- Types ---
interface Service {
  _id: string;
  serviceCardTitle: string;
  serviceCardDescription: string;
  serviceCardFeatures: string[];
  image?: { url: string; public_id?: string } | null;
}

// --- Zod Schema ---
const serviceSchema = z.object({
  serviceCardTitle: z.string().min(1, "Card title is required"),
  serviceCardDescription: z.string().min(1, "Card description is required"),
  serviceCardFeatures: z.string().min(1, "At least one feature is required"),
  image: z.any().optional(),
});

type ServiceFormInputs = z.infer<typeof serviceSchema>;

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormInputs>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceCardTitle: "",
      serviceCardDescription: "",
      serviceCardFeatures: "",
    },
  });

  // --- Fetch Services ---
  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/v1/services`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const data: { data: Service[]; message: string } = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch services");
      setServices(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // --- Submit Handler ---
  const onSubmit: SubmitHandler<ServiceFormInputs> = async (formData) => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const body = new FormData();

      body.append("serviceCardTitle", formData.serviceCardTitle);
      body.append("serviceCardDescription", formData.serviceCardDescription);
      body.append(
        "serviceCardFeatures",
        JSON.stringify(
          formData.serviceCardFeatures
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean)
        )
      );

      if (formData.image?.[0]) body.append("image", formData.image[0]);

      const res = await fetch(
        `${API_BASE}/api/v1/services${editingId ? `/${editingId}` : ""}`,
        {
          method: editingId ? "PUT" : "POST",
          body,
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save service");

      alert(editingId ? "Service updated!" : "Service created!");
      reset();
      setEditingId(null);
      fetchServices();
    } catch (err) {
      alert(` Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  // --- Edit Handler ---
  const handleEdit = (service: Service) => {
    setEditingId(service._id);
    reset({
      serviceCardTitle: service.serviceCardTitle,
      serviceCardDescription: service.serviceCardDescription,
      serviceCardFeatures: service.serviceCardFeatures.join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Delete Handler ---
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/v1/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete service");
      alert(" Service deleted!");
      fetchServices();
    } catch (err) {
      alert(` Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="p-8 text-center">⏳ Loading services...</p>;
  if (error)
    return (
      <p className="p-8 text-center text-red-500">{error}</p>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto relative">
      {(saving || loading) && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">
        {editingId ? "✏️ Edit Service" : "➕ Add New Service"}
      </h1>

      {/* Service Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 mb-6"
      >
        <input
          {...register("serviceCardTitle")}
          placeholder="Card Title"
          className="border p-2 rounded w-full"
        />
        {errors.serviceCardTitle && (
          <p className="text-red-500">{errors.serviceCardTitle.message}</p>
        )}

        <input
          {...register("serviceCardDescription")}
          placeholder="Card Description"
          className="border p-2 rounded w-full"
        />
        {errors.serviceCardDescription && (
          <p className="text-red-500">{errors.serviceCardDescription.message}</p>
        )}

        <input
          {...register("serviceCardFeatures")}
          placeholder="Features (comma separated)"
          className="border p-2 rounded w-full"
        />
        {errors.serviceCardFeatures && (
          <p className="text-red-500">{errors.serviceCardFeatures.message}</p>
        )}

        <input type="file" {...register("image")} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : editingId ? "Update Service" : "Create Service"}
        </button>
      </form>

      {/* Service List */}
      <h2 className="text-xl font-semibold mb-4">Existing Services</h2>
      <div className="grid gap-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              {service.image?.url && (
               <div className="relative w-20 h-14">
  <Image
    src={service.image.url}
    alt={service.serviceCardTitle}
    fill
    className="rounded object-cover"
  />
</div>

              )}
              <div>
                <h3 className="text-lg font-bold">{service.serviceCardTitle}</h3>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(service)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

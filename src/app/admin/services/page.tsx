"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

interface ServiceDetail {
  title: string;
  description: string;
  keyServices: string[];
}

interface Service {
  _id: string;
  category: string;
  description: string;
  serviceCardTitle: string;
  serviceCardDescription: string;
  serviceCardFeatures: string[];
  image?: { url: string } | string | null;
  details?: ServiceDetail[];
}

type ServiceFormInputs = {
  category: string;
  description: string;
  serviceCardTitle: string;
  serviceCardDescription: string;
  serviceCardFeatures: string;
  image: FileList;
  details: {
    title: string;
    description: string;
    keyServices: string;
  }[];
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<ServiceFormInputs>({
    defaultValues: { category: "", description: "", serviceCardTitle: "", serviceCardDescription: "", serviceCardFeatures: "", details: [] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "details" });

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/services`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch services");
      setServices(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const onSubmit = async (formData: ServiceFormInputs) => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const body = new FormData();
      body.append("category", formData.category);
      body.append("description", formData.description);
      body.append("serviceCardTitle", formData.serviceCardTitle);
      body.append("serviceCardDescription", formData.serviceCardDescription);
      body.append("serviceCardFeatures", JSON.stringify(formData.serviceCardFeatures.split(",").map(f => f.trim()).filter(Boolean)));
      body.append("details", JSON.stringify(formData.details.map(d => ({
        title: d.title,
        description: d.description,
        keyServices: d.keyServices.split(",").map(k => k.trim()).filter(Boolean),
      }))));
      if (formData.image?.[0]) body.append("image", formData.image[0]);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/services${editingId ? `/${editingId}` : ""}`, {
        method: editingId ? "PUT" : "POST",
        body,
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save service");

      alert(editingId ? "✅ Service updated!" : "✅ Service created!");
      reset();
      setEditingId(null);
      fetchServices();
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service._id);
    reset({
      category: service.category,
      description: service.description,
      serviceCardTitle: service.serviceCardTitle,
      serviceCardDescription: service.serviceCardDescription,
      serviceCardFeatures: service.serviceCardFeatures.join(", "),
      details: (service.details || []).map(d => ({
        title: d.title,
        description: d.description,
        keyServices: Array.isArray(d.keyServices) ? d.keyServices.join(", ") : "",
      })),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete service");
      alert("🗑️ Service deleted!");
      fetchServices();
    } catch (err: any) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-8 text-center">⏳ Loading services...</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 max-w-6xl mx-auto relative">
      {/* Overlay Spinner */}
      {(saving || loading) && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">{editingId ? "✏️ Edit Service" : "➕ Add New Service"}</h1>

      {/* Service Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-xl shadow mb-8">
        {/* ...form fields same as before... */}
      </form>

      {/* Existing Services */}
      <h2 className="text-xl font-semibold mb-4">Existing Services</h2>
      <div className="grid gap-4">
        {services.map(service => (
          <div key={service._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div className="flex items-center gap-4">
              {service.image && (
                <img src={typeof service.image === "string" ? service.image : service.image.url} alt={service.serviceCardTitle} className="w-20 h-14 object-cover rounded" />
              )}
              <div>
                <h3 className="text-lg font-bold">{service.serviceCardTitle}</h3>
                <p className="text-gray-500">{service.category}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(service)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
              <button onClick={() => handleDelete(service._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

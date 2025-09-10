"use client";

import { useState, ChangeEvent } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  image?: string;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([
    { id: 1, title: "Corporate Law", description: "Business legal support" },
    { id: 2, title: "Family Law", description: "Divorce, custody, and more" },
  ]);

  const [form, setForm] = useState<Omit<Service, "id">>({
    title: "",
    description: "",
    image: "",
  });

  const [editId, setEditId] = useState<number | null>(null);

  const handleChange = (field: "title" | "description", value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, image: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!form.title || !form.description) return;
    setServices([...services, { id: Date.now(), ...form }]);
    setForm({ title: "", description: "", image: "" });
  };

  const handleEdit = (service: Service) => {
    setEditId(service.id);
    setForm({ title: service.title, description: service.description, image: service.image });
  };

  const handleSaveEdit = () => {
    if (editId === null) return;
    setServices(
      services.map((s) =>
        s.id === editId ? { id: editId, ...form } : s
      )
    );
    setEditId(null);
    setForm({ title: "", description: "", image: "" });
  };

  const handleDelete = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({ title: "", description: "", image: "" });
    }
  };

  const handleSaveAll = () => {
    console.log("Saved services:", services);
    alert("All services saved!");
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold">Manage Services</h1>

      {/* Form for Add/Edit */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-4 max-w-2xl">
        <h2 className="text-lg font-semibold">{editId ? "Edit Service" : "Add Service"}</h2>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Service Title"
        />
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full border rounded p-2"
          rows={3}
          placeholder="Service Description"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 border rounded p-4" />
          {form.image && (
            <img src={form.image} alt="preview" className="w-24 h-24 object-cover rounded mt-2" />
          )}
        </div>
        <div className="flex gap-4">
          {editId ? (
            <>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditId(null);
                  setForm({ title: "", description: "", image: "" });
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Add Service
            </button>
          )}
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 space-y-4 overflow-x-auto">
        {services.length === 0 && <p className="text-gray-500">No services found</p>}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-4 shadow flex flex-col gap-2">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-32 object-cover rounded"
                />
              ) : (
                <div className="w-full h-32 bg-gray-200 rounded" />
              )}
              <h3 className="font-semibold">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save All Button */}
      <button
        onClick={handleSaveAll}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save All
      </button>
    </div>
  );
}

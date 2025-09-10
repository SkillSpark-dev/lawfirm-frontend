"use client";

import { useState } from "react";

interface Case {
  id: number;
  title: string;
  client: string;
  status: string;
  description: string;
}

export default function AdminCasesPage() {
  const [cases, setCases] = useState<Case[]>([
    { id: 1, title: "Corporate Merger", client: "ABC Ltd", status: "Open", description: "Merger legal documentation." },
    { id: 2, title: "Divorce Settlement", client: "John Doe", status: "Closed", description: "Divorce case finalized." },
  ]);

  const [form, setForm] = useState<Omit<Case, "id">>({
    title: "",
    client: "",
    status: "",
    description: "",
  });

  const [editId, setEditId] = useState<number | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new case
  const handleAdd = () => {
    if (!form.title || !form.client || !form.status || !form.description) return;
    setCases([...cases, { id: Date.now(), ...form }]);
    setForm({ title: "", client: "", status: "", description: "" });
  };

  // Start editing a case
  const handleEdit = (c: Case) => {
    setEditId(c.id);
    setForm({ title: c.title, client: c.client, status: c.status, description: c.description });
  };

  // Save edited case
  const handleSave = () => {
    if (editId === null) return;
    setCases(cases.map((c) => (c.id === editId ? { id: editId, ...form } : c)));
    setEditId(null);
    setForm({ title: "", client: "", status: "", description: "" });
  };

  // Delete case
  const handleDelete = (id: number) => {
    setCases(cases.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Case Management</h1>

      {/* Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-6 max-w-lg">
        <h2 className="text-lg font-semibold mb-4">{editId ? "Edit Case" : "Add New Case"}</h2>

        <input
          type="text"
          name="title"
          placeholder="Case Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
          required
        />
        <input
          type="text"
          name="client"
          placeholder="Client Name"
          value={form.client}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
          required
        >
          <option value="">Select Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        <textarea
          name="description"
          placeholder="Case Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
          rows={3}
          required
        />

        <div className="flex gap-4">
          {editId ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditId(null);
                  setForm({ title: "", client: "", status: "", description: "" });
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
              + Add Case
            </button>
          )}
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Cases</h2>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">Title</th>
                <th className="border p-2">Client</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Description</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.id} className="border-b">
                  <td className="border p-2">{c.title}</td>
                  <td className="border p-2">{c.client}</td>
                  <td className="border p-2">{c.status}</td>
                  <td className="border p-2">{c.description}</td>
                  <td className="border p-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {cases.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-4">
                    No cases found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-4 md:hidden">
          {cases.map((c) => (
            <div key={c.id} className="border rounded-lg p-4 shadow-sm">
              <p className="font-semibold">{c.title}</p>
              <p className="text-sm text-gray-600">Client: {c.client}</p>
              <p className="text-sm text-gray-600">Status: {c.status}</p>
              <p className="mt-2">{c.description}</p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(c)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

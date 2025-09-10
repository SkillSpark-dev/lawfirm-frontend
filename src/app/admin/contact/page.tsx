"use client";

import { useState } from "react";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", message: "Need legal help." },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543210", message: "Book appointment." },
  ]);

  const [form, setForm] = useState<Omit<Contact, "id">>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [editId, setEditId] = useState<number | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new contact
  const handleAdd = () => {
    if (!form.name || !form.email || !form.message || !form.phone) return;
    setContacts([...contacts, { id: Date.now(), ...form }]);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  // Start editing a contact
  const handleEdit = (c: Contact) => {
    setEditId(c.id);
    setForm({ name: c.name, email: c.email, phone: c.phone, message: c.message });
  };

  // Save edited contact
  const handleSave = () => {
    if (editId === null) return;
    setContacts(contacts.map((c) => (c.id === editId ? { id: editId, ...form } : c)));
    setEditId(null);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  // Delete contact
  const handleDelete = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Contact Management</h1>

      {/* Form */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6 max-w-lg mx-auto sm:mx-0">
        <h2 className="text-lg font-semibold mb-4">{editId ? "Edit Contact" : "Add New Contact"}</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          rows={3}
          required
        />

        <div className="flex flex-col sm:flex-row gap-3">
          {editId ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditId(null);
                  setForm({ name: "", email: "", phone: "", message: "" });
                }}
                className="flex-1 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAdd}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              + Add Contact
            </button>
          )}
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Contacts</h2>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Message</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                  <td className="border p-2">{c.name}</td>
                  <td className="border p-2">{c.email}</td>
                  <td className="border p-2">{c.phone}</td>
                  <td className="border p-2">{c.message}</td>
                  <td className="border p-2 flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-4">
                    No contacts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-4 md:hidden">
          {contacts.map((c) => (
            <div key={c.id} className="border rounded-lg p-4 shadow-sm">
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-600">{c.email}</p>
              <p className="text-sm text-gray-600">{c.phone}</p>
              <p className="mt-1 text-gray-700">{c.message}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                <button
                  onClick={() => handleEdit(c)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {contacts.length === 0 && (
            <p className="text-center text-gray-500 py-4">No contacts found</p>
          )}
        </div>
      </div>
    </div>
  );
}

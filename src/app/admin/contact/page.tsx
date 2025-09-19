"use client";
import { useEffect, useState } from "react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  number: string;
  message: string;
  createdAt: string;
}

interface ContactResponse {
  data: Contact[];
}

export default function AdminContactsPage() {
  const API_BASE="https://lawservicesbackend.onrender.com"
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/v1/contact`);
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data: ContactResponse = await res.json();
      setContacts(data.data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/contact/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete contact");
      fetchContacts(); // refresh list
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete contact");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen space-y-6 relative">
      <h1 className="text-2xl font-bold text-center sm:text-left">Contact Submissions</h1>

      {/* Loading Overlay */}
      {(loading || saving) && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Desktop Table */}
      <div className="hidden sm:block bg-white shadow rounded-lg p-4 sm:p-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Number</th>
              <th className="border p-2">Date</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((c) => (
                <tr key={c._id} className="border-b hover:bg-gray-50">
                  <td className="border p-2">{c.name}</td>
                  <td className="border p-2">{c.email}</td>
                  <td className="border p-2">{c.number}</td>
                  <td className="border p-2">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border p-2 text-center space-x-2">
                    <button
                      onClick={() => setSelectedContact(c)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
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
      <div className="grid gap-4 sm:hidden">
        {contacts.length > 0 ? (
          contacts.map((c) => (
            <div key={c._id} className="border rounded-lg p-4 shadow-sm bg-white">
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-600">{c.email}</p>
              <p className="text-sm text-gray-600">{c.number}</p>
              <p className="text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setSelectedContact(c)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No contacts found</p>
        )}
      </div>

      {/* Modal for Viewing Contact */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 space-y-3 relative">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold">Contact Details</h2>
            <p><span className="font-semibold">Name:</span> {selectedContact.name}</p>
            <p><span className="font-semibold">Email:</span> {selectedContact.email}</p>
            <p><span className="font-semibold">Number:</span> {selectedContact.number}</p>
            <p><span className="font-semibold">Message:</span> {selectedContact.message}</p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(selectedContact.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

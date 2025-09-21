"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

const API_BASE = "https://lawservicesbackend.onrender.com";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const router = useRouter();

  // ✅ Token from localStorage
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/login"); // redirect if no token
      return;
    }
    fetchContacts();
  }, [token]);

  // ✅ Fetch contacts
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/v1/contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized – please log in");
        throw new Error("Failed to fetch contacts");
      }

      const data: ContactResponse = await res.json();
      setContacts(data.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete contact
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized – please log in");
        throw new Error("Failed to delete contact");
      }

      await fetchContacts(); // refresh list
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete contact");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen space-y-6 relative">
      <h1 className="text-2xl font-bold text-center sm:text-left">
        Contact Submissions
      </h1>

      {/* Loading Overlay */}
      {(loading || saving) && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Table for desktop */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Number</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact._id} className="border-t">
                  <td className="px-4 py-2">{contact.name}</td>
                  <td className="px-4 py-2">{contact.email}</td>
                  <td className="px-4 py-2">{contact.number}</td>
                  <td className="px-4 py-2">{contact.message}</td>
                  <td className="px-4 py-2">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="sm:hidden space-y-4">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white shadow-md rounded-lg p-4 space-y-2"
            >
              <p className="font-medium">Name: {contact.name}</p>
              <p>Email: {contact.email}</p>
              <p>Number: {contact.number}</p>
              <p>Message: {contact.message}</p>
              <p>
                Date: {new Date(contact.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(contact._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No contacts found.</p>
        )}
      </div>
    </div>
  );
}

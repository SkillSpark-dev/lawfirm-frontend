"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AppointmentData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
}

const API_BASE = "https://lawservicesbackend.onrender.com";

const AdminAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const getToken = (): string | null => localStorage.getItem("token");

  // Reusable fetch with auth
  const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = getToken();
    if (!token) {
      router.push("/admin/login"); // redirect if no token
      return;
    }

    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || res.statusText || "Request failed");
    }

    return res.json();
  };

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await authFetch(`${API_BASE}/api/v1/appointment`);
      setAppointments(data.data || []);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  // Delete a single appointment
  const deleteAppointment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await authFetch(`${API_BASE}/api/v1/appointment/${id}`, { method: "DELETE" });
      fetchAppointments(); // refresh list
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to delete appointment");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Appointments</h1>

      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {error && !loading && (
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={fetchAppointments}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && appointments.length === 0 && !error && (
        <p className="text-center text-gray-600 mt-4">No appointments found.</p>
      )}

      <ul className="space-y-4 max-w-4xl mx-auto mt-4">
        {appointments.map((appt) => (
          <li
            key={appt._id}
            className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition flex justify-between items-center"
          >
            <div>
              <p><strong>Name:</strong> {appt.name}</p>
              <p><strong>Email:</strong> {appt.email}</p>
              <p><strong>Phone:</strong> {appt.phone}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => deleteAppointment(appt._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminAppointmentsPage;

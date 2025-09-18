"use client";
import React, { useState, useEffect } from "react";

interface AppointmentData {
  _id: string;
  name: string;
  email: string;
  number: string;
  date: string;
  time: string;
}


const Page = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/appointment`
      );
      if (!res.ok) throw new Error("Failed to fetch appointments");
      const data = await res.json();
      setAppointments(data.data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">Appointments</h1>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center text-red-500">
          <p className="mb-2">Error: {error}</p>
          <button
            onClick={fetchAppointments}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Appointment List */}
      {!loading && !error && (
        <>
          {appointments.length === 0 ? (
            <p className="text-center text-gray-600">
              No appointments found.
            </p>
          ) : (
            <ul className="space-y-4 max-w-2xl mx-auto">
              {appointments.map((appt) => (
                <li
                  key={appt._id}
                  className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
                >
                  <p><strong>Name:</strong> {appt.name}</p>
                  <p><strong>Email:</strong> {appt.email}</p>
                  <p><strong>Number:</strong> {appt.number}</p>
                  <p><strong>Date:</strong> {appt.date}</p>
                  <p><strong>Time:</strong> {appt.time}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Page;

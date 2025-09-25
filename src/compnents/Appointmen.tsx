"use client";

import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // callback to refresh list
}

const API_BASE = "https://lawservicesbackend.onrender.com";

const Appointment: React.FC<AppointmentFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`${API_BASE}/api/v1/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to book appointment");

      setSuccess("✅ Appointment booked successfully!");
      setFormData({ name: "", email: "", phone: "", date: "", time: "" });

      setTimeout(() => {
        setSuccess(null);
        onClose();
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to book appointment");
      console.error("Booking failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg md:max-w-xl p-6 relative">
        {/* Cross button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          title="Close"
        >
          <RiCloseLine size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">
          Book an Appointment
        </h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && <p className="text-green-500 text-center mb-2">{success}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 text-sm md:text-base mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-white text-gray-900 text-sm md:text-base"
                required
              />
            </div>
          ))}

          <div className="flex flex-col md:flex-row gap-4">
            {["date", "time"].map((field) => (
              <div className="flex-1" key={field}>
                <label className="block text-gray-700 text-sm md:text-base mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-white text-gray-900 text-sm md:text-base"
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between px-6  mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-32 h-8 sm:w-auto px-4 py-2 bg-gray-300 text-gray-900 text-sm rounded-md hover:bg-gray-400 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-32 h-8 sm:w-auto px-4 py-2 bg-amber-600 text-white  text-sm rounded-lg hover:bg-amber-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointment;

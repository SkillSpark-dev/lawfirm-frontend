"use client";

import React, { useState } from "react";

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const Appointment: React.FC<AppointmentFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to book appointment");
      setSuccess("✅ Appointment booked successfully!");
      setFormData({ name: "", email: "", number: "", date: "", time: "" });

      // Close modal after 1.5s
      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg md:max-w-xl p-6 relative">
        <h2 className="text-lg md:text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          Book an Appointment
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm md:text-base text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-sm md:text-base text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-sm md:text-base text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white text-sm md:text-base"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm md:text-base text-gray-700 dark:text-gray-300">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white text-sm md:text-base"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm md:text-base text-gray-700 dark:text-gray-300">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white text-sm md:text-base"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
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

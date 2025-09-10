"use client";

import React, { useState } from "react";

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const Appointment: React.FC<AppointmentFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg md:max-w-xl p-6 relative">
        <h2 className="text-lg md:text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          Book an Appointment
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm md:text-base text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-sm md:text-base text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-sm md:text-base text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              type="tel"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white text-sm md:text-base"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm md:text-base text-gray-700 dark:text-gray-300">Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white text-sm md:text-base"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm md:text-base text-gray-700 dark:text-gray-300">Time</label>
              <input
                type="time"
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
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointment;

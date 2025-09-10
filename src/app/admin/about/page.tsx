// app/admin/about/page.tsx
"use client";

import { useState } from "react";

export default function AdminAboutPage() {
  const [description, setDescription] = useState(
    "We are a law firm dedicated to providing top legal services..."
  );

  const handleSave = () => {
    console.log("Saved:", description);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage About Page</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border rounded-lg p-2"
        />

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}

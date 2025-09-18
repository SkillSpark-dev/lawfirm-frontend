"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminHomePage() {
  const [headline, setHeadline] = useState("");
  const [subHeadline, setSubHeadline] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Fetch initial data (simulated)
  useEffect(() => {
    const fetchData = async () => {
      const data = {
        headline: "Welcome to Our Law Firm",
        subHeadline: "Your trusted legal partner",
        imageUrl: "/placeholder-home.jpg",
      };
      setHeadline(data.headline);
      setSubHeadline(data.subHeadline);
      setPreviewUrl(data.imageUrl);
    };
    fetchData();
  }, []);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Save data
  const handleSave = async () => {
    if (!headline.trim() || !subHeadline.trim()) {
      alert("Headline and subheadline are required.");
      return;
    }

    setIsSaving(true);
    setSaveMessage("");

    try {
      const formData = new FormData();
      formData.append("headline", headline);
      formData.append("subHeadline", subHeadline);
      if (image) formData.append("image", image);

      // Simulate API call
      console.log("Saving data:", { headline, subHeadline, image });

      setSaveMessage("Changes saved successfully!");
    } catch (error) {
      console.error("Save failed", error);
      setSaveMessage("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  // Reset/Delete
  const handleDelete = () => {
    setHeadline("");
    setSubHeadline("");
    setImage(null);
    setPreviewUrl(null);
    setSaveMessage("Content reset.");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center sm:text-left">
        Manage Home Page
      </h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {/* Headline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Headline
          </label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm sm:text-base"
          />
        </div>

        {/* SubHeadline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sub Headline
          </label>
          <input
            type="text"
            value={subHeadline}
            onChange={(e) => setSubHeadline(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg p-2 text-sm sm:text-base"
          />
        </div>

        {/* Image Upload & Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Homepage Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500"
          />

          {previewUrl && (
            <div className="relative w-full h-64 mt-3 rounded-lg shadow overflow-hidden">
              <Image
                src={previewUrl}
                alt="Homepage Preview"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 rounded-lg text-white transition ${
              isSaving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition"
          >
            Reset / Delete Content
          </button>
        </div>

        {/* Message */}
        {saveMessage && <p className="text-sm text-green-600">{saveMessage}</p>}
      </div>
    </div>
  );
}

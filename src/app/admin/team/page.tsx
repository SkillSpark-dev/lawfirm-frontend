"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaLinkedin, FaFacebook } from "react-icons/fa";

interface SocialLinks {
  linkedin?: string;
  facebook?: string;
}

interface TeamMember {
  _id?: string;
  name: string;
  position: string;
  bio: string;
  image?: { public_id?: string; url?: string };
  socialLinks?: SocialLinks;
}

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamMember>({
    defaultValues: {
      name: "",
      position: "",
      bio: "",
      socialLinks: { linkedin: "", facebook: "" },
    },
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  /** Fetch Team Members */
  async function fetchTeam() {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/team`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTeam(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  /** Handle Image Preview */
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }

  /** Submit Form */
  async function onSubmit(data: TeamMember) {
    if (!token) return alert("You must be logged in");
    setSubmitting(true);

    try {
      const url = editId
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/${editId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team`;
      const method = editId ? "PATCH" : "POST";

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("position", data.position);
      formData.append("bio", data.bio || "");
      formData.append("socialLinks", JSON.stringify(data.socialLinks || {}));

      if (selectedFile) formData.append("image", selectedFile);

      const res = await fetch(url, {
        method,
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save");
      }

      reset();
      setSelectedFile(null);
      setPreview(null);
      setEditId(null);
      fetchTeam();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  /** Edit Member */
  function handleEdit(member: TeamMember) {
    setEditId(member._id || null);
    reset({
      ...member,
      image: member.image,
    });
    setPreview(member.image?.url || null);
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /** Delete Member */
  async function handleDelete(id?: string) {
    if (!id || !confirm("Are you sure you want to delete this member?")) return;
    if (!token) return alert("You must be logged in");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete");
      }
      fetchTeam();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen space-y-6 relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-center sm:text-left">Manage Team</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow rounded-lg p-6 max-w-lg mx-auto space-y-4"
      >
        <h2 className="text-lg font-semibold">{editId ? "Edit Member" : "Add Member"}</h2>

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input {...register("name", { required: "Name is required" })} className="w-full border rounded p-2" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Position</label>
          <input {...register("position", { required: "Position is required" })} className="w-full border rounded p-2" />
          {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea {...register("bio")} rows={3} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border rounded p-2" />
          {preview && (
            <div className="flex items-center gap-2 mt-2">
              <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded" />
              <button type="button" onClick={() => { setPreview(null); setSelectedFile(null); }} className="text-red-500">
                Remove
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">LinkedIn</label>
          <input {...register("socialLinks.linkedin")} placeholder="LinkedIn URL" className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Facebook</label>
          <input {...register("socialLinks.facebook")} placeholder="Facebook URL" className="w-full border rounded p-2" />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 px-4 py-2 rounded text-white ${submitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
          >
            {editId ? "Save Changes" : "+ Add Member"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => { setEditId(null); reset(); setPreview(null); setSelectedFile(null); }}
              className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Team Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.length ? (
          team.map((m) => (
            <div key={m._id} className="bg-white shadow rounded-lg p-4 flex flex-col items-center space-y-2">
              {m.image?.url ? (
                <img src={m.image.url} alt={m.name} className="w-24 h-24 object-cover rounded-full" />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full" />
              )}
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-gray-600">{m.position}</p>
              <p className="text-sm text-gray-600 text-center">{m.bio}</p>
              <div className="flex gap-2 mt-1">
                {m.socialLinks?.linkedin && (
                  <a href={m.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <FaLinkedin size={20} />
                  </a>
                )}
                {m.socialLinks?.facebook && (
                  <a href={m.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-900">
                    <FaFacebook size={20} />
                  </a>
                )}
              </div>
              <div className="flex gap-2 mt-2 w-full">
                <button onClick={() => handleEdit(m)} className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                  Edit
                </button>
                <button onClick={() => handleDelete(m._id)} className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No team members found</p>
        )}
      </div>
    </div>
  );
}

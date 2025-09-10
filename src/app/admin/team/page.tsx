"use client";

import { useState, ChangeEvent } from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  photo?: string; // base64
  position?: string;
  description?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([
    {
      id: 1,
      name: "Alice Johnson",
      role: "Manager",
      email: "alice@example.com",
      position: "CEO",
      description: "Leading the company",
      social: { linkedin: "", twitter: "", facebook: "" },
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Developer",
      email: "bob@example.com",
      position: "Frontend Developer",
      description: "Building amazing UI",
      social: { linkedin: "", twitter: "", facebook: "" },
    },
  ]);

  const [form, setForm] = useState<Omit<TeamMember, "id">>({
    name: "",
    role: "",
    email: "",
    photo: "",
    position: "",
    description: "",
    social: { linkedin: "", twitter: "", facebook: "" },
  });

  const [editId, setEditId] = useState<number | null>(null);

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("social.")) {
      const key = name.split(".")[1];
      setForm({
        ...form,
        social: { ...form.social, [key]: value },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
/*************  ✨ Windsurf Command ⭐  *************/
    // Once the image has been read, set the form photo to the read image
    // as a base64 string.
/*******  309acba2-3533-4f48-ba5b-2afd3cd261bc  *******/    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, photo: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  // Add new member
  const handleAdd = () => {
    if (!form.name || !form.role || !form.email) return;
    setTeam([...team, { id: Date.now(), ...form }]);
    resetForm();
  };

  // Edit member
  const handleEdit = (member: TeamMember) => {
    setEditId(member.id);
    setForm({ ...member });
  };

  // Save edited member
  const handleSave = () => {
    if (editId === null) return;
    setTeam(team.map((m) => (m.id === editId ? { id: editId, ...form } : m)));
    setEditId(null);
    resetForm();
  };

  // Delete member
  const handleDelete = (id: number) => {
    setTeam(team.filter((m) => m.id !== id));
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      email: "",
      photo: "",
      position: "",
      description: "",
      social: { linkedin: "", twitter: "", facebook: "" },
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Manage Team
      </h1>

      {/* Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-6 max-w-lg mx-auto">
        <h2 className="text-lg font-semibold mb-4">
          {editId ? "Edit Team Member" : "Add Team Member"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          className="w-full border rounded p-2 mb-3"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded p-2 mb-3"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full mb-3 border rounded p-2"
        />
        {form.photo && (
          <img
            src={form.photo}
            alt="Preview"
            className="w-24 h-24 object-cover rounded mb-3"
          />
        )}

        <div className="space-y-2">
          <h3 className="font-semibold">Social Links</h3>
          <input
            type="text"
            name="social.linkedin"
            placeholder="LinkedIn"
            value={form.social?.linkedin || ""}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="text"
            name="social.twitter"
            placeholder="Twitter"
            value={form.social?.twitter || ""}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="text"
            name="social.facebook"
            placeholder="Facebook"
            value={form.social?.facebook || ""}
            onChange={handleChange}
            className="w-full border rounded p-2 mb-2"
          />
        </div>

        <div className="flex gap-4 flex-wrap mt-4">
          {editId ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Add Member
            </button>
          )}
        </div>
      </div>

      {/* Team Table / Cards */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Team Members</h2>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-2">Photo</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Position</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Social</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((m) => (
                <tr key={m.id} className="border-b">
                  <td className="border p-2">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    )}
                  </td>
                  <td className="border p-2">{m.name}</td>
                  <td className="border p-2">{m.role}</td>
                  <td className="border p-2">{m.position}</td>
                  <td className="border p-2">{m.description}</td>
                  <td className="border p-2">{m.email}</td>
                  <td className="border p-2 flex flex-col gap-1">
                    {m.social?.linkedin && (
                      <a
                        href={m.social.linkedin}
                        className="text-blue-600 underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {m.social?.twitter && (
                      <a
                        href={m.social.twitter}
                        className="text-blue-400 underline"
                      >
                        Twitter
                      </a>
                    )}
                    {m.social?.facebook && (
                      <a
                        href={m.social.facebook}
                        className="text-blue-800 underline"
                      >
                        Facebook
                      </a>
                    )}
                  </td>
                  <td className="border p-2 flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={() => handleEdit(m)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {team.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center text-gray-500 py-4"
                  >
                    No team members found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-4 md:hidden">
          {team.map((m) => (
            <div
              key={m.id}
              className="border rounded-lg p-4 shadow-sm flex flex-col items-start"
            >
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.name}
                  className="w-24 h-24 object-cover rounded-full mb-2"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-2" />
              )}
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-gray-600">{m.role}</p>
              <p className="text-sm text-gray-600">{m.position}</p>
              <p className="text-sm text-gray-700">{m.description}</p>
              <p className="text-sm text-gray-600">{m.email}</p>
              <div className="flex flex-col gap-1 mt-2">
                {m.social?.linkedin && (
                  <a href={m.social.linkedin} className="text-blue-600 underline">
                    LinkedIn
                  </a>
                )}
                {m.social?.twitter && (
                  <a href={m.social.twitter} className="text-blue-400 underline">
                    Twitter
                  </a>
                )}
                {m.social?.facebook && (
                  <a href={m.social.facebook} className="text-blue-800 underline">
                    Facebook
                  </a>
                )}
              </div>
              <div className="flex gap-2 mt-3 w-full">
                <button
                  onClick={() => handleEdit(m)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import React,{ useState , useRef} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface AboutHeroSection {
  _id?: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  image: { url: string; public_id?: string } | null;
}

const aboutSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  buttonText: z.string().optional(),
  buttonLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type AboutFormData = z.infer<typeof aboutSchema>;

interface HeroFormProps {
  editSection: AboutHeroSection | null;
  onSubmit: (data: AboutFormData, file: File | null) => void;
  saving: boolean;
  resetEdit: () => void;
}

export default function HeroForm({ editSection, onSubmit, saving, resetEdit }: HeroFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema),
    defaultValues: editSection || undefined,
  });

  // Update form when editSection changes
  React.useEffect(() => {
    if (editSection) {
      reset({
        title: editSection.title,
        description: editSection.description,
        buttonText: editSection.buttonText || "",
        buttonLink: editSection.buttonLink || "",
      });
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [editSection, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
  };

  const submit = (data: AboutFormData) => onSubmit(data, imageFile);

  return (
    <form onSubmit={handleSubmit(submit)} className="bg-white rounded shadow-md p-6 max-w-3xl mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-4">{editSection ? "Edit Section" : "Create Section"}</h2>

      <label className="block mb-2 font-medium">Title</label>
      <input {...register("title")} className="w-full border rounded px-3 py-2 mb-1" />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      <label className="block mb-2 font-medium">Description</label>
      <textarea {...register("description")} rows={4} className="w-full border rounded px-3 py-2 mb-1" />
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2 font-medium">Button Text</label>
          <input {...register("buttonText")} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Button Link</label>
          <input {...register("buttonLink")} className="w-full border rounded px-3 py-2" />
          {errors.buttonLink && <p className="text-red-500 text-sm">{errors.buttonLink.message}</p>}
        </div>
      </div>

      <label className="block mb-2 font-medium">Image</label>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      {imageFile && (
        <div className="relative w-48 h-32 mt-2">
          <Image src={URL.createObjectURL(imageFile)} alt="Preview" fill className="object-cover rounded" />
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <button type="submit" disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {saving ? "Saving..." : editSection ? "Update" : "Create"}
        </button>
        {editSection && (
          <button
            type="button"
            onClick={() => { reset(); resetEdit(); setImageFile(null); }}
            className="bg-gray-100 px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

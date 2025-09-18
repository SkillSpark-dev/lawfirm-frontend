"use client";

import Image from "next/image";

interface AboutHeroSection {
  _id?: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  image: { url: string; public_id?: string } | null;
}

interface HeroSectionListProps {
  sections: AboutHeroSection[];
  onEdit: (section: AboutHeroSection) => void;
  onDelete: (id: string) => void;
}

export default function HeroSectionList({ sections, onEdit, onDelete }: HeroSectionListProps) {
  if (sections.length === 0) return <p className="text-center text-gray-500">No sections found.</p>;

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
      {sections.map((sec) => (
        <div key={sec._id} className="bg-white shadow p-4 rounded flex flex-col md:flex-row gap-4">
          {sec.image?.url ? (
            <div className="relative w-full md:w-40 h-28">
              <Image src={sec.image.url} alt={sec.title} fill className="object-cover rounded" />
            </div>
          ) : (
            <div className="w-full md:w-40 h-28 bg-gray-200 rounded flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

          <div className="flex-1">
            <h3 className="font-bold">{sec.title}</h3>
            <p className="text-sm text-gray-600">{sec.description}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => onEdit(sec)} className="bg-blue-600 text-white text-sm px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => onDelete(sec._id!)} className="bg-red-600 text-white text-sm px-3 py-1 rounded">
                Delete
              </button>
              {sec.buttonLink && (
                <a href={sec.buttonLink} target="_blank" rel="noreferrer" className="border px-3 py-1 rounded text-sm">
                  Visit
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

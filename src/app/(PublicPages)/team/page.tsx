"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface TeamMember {
  _id?: string; // if MongoDB provides _id
  id?: string | number;
  name: string;
  image?: string; // fallback if using mockdata
  position?: string;
  bio: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

function TeamPage() {
  const [services, setServices] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team`
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server error ${res.status}: ${text}`);
        }

        const data = await res.json();

        if (!data.data || !Array.isArray(data.data)) {
          throw new Error("Invalid data format from backend");
        }

        setServices(data.data);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return <p className="p-8 text-center text-lg">Loading team...</p>;
  }

  if (error) {
    return (
      <p className="p-8 text-center text-red-500">
        Error fetching team: {error}
      </p>
    );
  }

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Our Team</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {services.map((member) => (
            <div
              key={member._id || member.id}
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-shadow"
            >
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <Image
                  src={ member.image || ""}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
              <p className="text-gray-500 mt-2 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamPage;

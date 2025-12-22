"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";

import { cardsVariants, imageVariants, textVariants } from "@/app/animation";
import API_BASE from "@/app/BaseUrl";

interface SocialLinks {
  linkedin?: string;
  facebook?: string;
}

interface TeamMember {
  _id?: string;
  name: string;
  position?: string;
  bio: string;
  image?: { url?: string } | string;
  socialLinks?: SocialLinks;
}

interface TeamApiResponse {
  data: TeamMember[];
}

interface TeamListProps {
  limit?: number;
}

export default function TeamList({ limit }: TeamListProps) {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/team`);
        if (!res.ok) throw new Error(`Server error ${res.status}`);

        const data: TeamApiResponse = await res.json();
        if (!Array.isArray(data.data)) {
          throw new Error("Invalid data format from backend");
        }

        setTeam(data.data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Failed to fetch team");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) return <p className="p-8 text-center">Loading team...</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;

  const displayedTeam = limit ? team.slice(0, limit) : team;

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto text-center">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Meet Our Team
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {displayedTeam.map((member, index) => {
          const imageSrc =
            typeof member.image === "object"
              ? member.image?.url || "/placeholder.png"
              : member.image || "/placeholder.png";

          return (
            <motion.div
              key={member._id}
              custom={index}
              variants={cardsVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              className="p-6 rounded-3xl shadow-lg text-center"
            >
              <motion.div className="w-32 h-32 mx-auto mb-4 relative" variants={imageVariants}>
                <Image
                  src={imageSrc}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </motion.div>

              <motion.h3 className="text-xl font-semibold" variants={textVariants}>
                {member.name}
              </motion.h3>

              {member.position && (
                <p className="text-gray-600 text-sm font-semibold">
                  {member.position}
                </p>
              )}

              <p className="text-gray-500 text-sm mt-2">
                {member.bio.slice(0, 100)}...
              </p>

              <div className="flex justify-center gap-4 mt-4">
                {member.socialLinks?.linkedin && (
                  <a href={member.socialLinks.linkedin} target="_blank">
                    <FaLinkedin size={20} />
                  </a>
                )}
                {member.socialLinks?.facebook && (
                  <a href={member.socialLinks.facebook} target="_blank">
                    <FaFacebook size={20} />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

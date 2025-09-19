"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";

import { cardsVariants, imageVariants, textVariants } from "@/app/animation";  

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

const TeamPage: React.FC = () => {
  const API_BASE="https://lawservicesbackend.onrender.com"
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {

        const res = await fetch(`${API_BASE}/api/v1/team`);
        if (!res.ok) throw new Error(`Server error ${res.status}`);

        const data: TeamApiResponse = await res.json();
        if (!data.data || !Array.isArray(data.data)) {
          throw new Error("Invalid data format from backend");
        }

        setTeam(data.data);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) setError(err.message);
        else setError("Failed to fetch team");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) return <p className="p-8 text-center text-gray-700">Loading team...</p>;
  if (error) return <p className="p-8 text-center text-red-500">Error fetching team: {error}</p>;

  return (
    <section className="flex items-center justify-center py-16 px-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
        >
          Meet Our Team
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 px-10">
          {team.length > 0 ? (
            team.map((member, index) => {
              const imageSrc =
                member.image && typeof member.image === "object"
                  ? member.image.url || "/placeholder.png"
                  : typeof member.image === "string"
                  ? member.image
                  : "/placeholder.png";

              return (
                <motion.div
                  key={member._id}
                  custom={index}
                  variants={cardsVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex flex-col justify-center items-center p-6 rounded-3xl shadow-lg text-center cursor-pointer"
                >
                  <motion.div className="w-32 h-32 mx-auto mb-4 relative" variants={imageVariants}>
                    <Image
                      src={imageSrc}
                      alt={member.name || "Team member"}
                      fill
                      className="rounded-full object-cover"
                      sizes="(max-width: 640px) 128px, (max-width: 768px) 128px, 128px"
                    />
                  </motion.div>

                  <motion.h3 className="text-xl font-semibold" custom={0} variants={textVariants}>
                    {member.name}
                  </motion.h3>

                  {member.position && (
                    <motion.p
                      className="text-gray-600 mt-1 text-sm font-semibold"
                      custom={1}
                      variants={textVariants}
                    >
                      {member.position}
                    </motion.p>
                  )}

                  <motion.p
                    className="text-gray-500 mt-2 text-sm"
                    custom={2}
                    variants={textVariants}
                  >
                    {member.bio.slice(0, 100)}
                  </motion.p>

                  <motion.div
                    className="flex justify-center items-center gap-4 mt-4"
                    custom={3}
                    variants={textVariants}
                  >
                    {member.socialLinks?.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        aria-label="LinkedIn Profile"
                      >
                        <FaLinkedin size={20} />
                      </a>
                    )}
                    {member.socialLinks?.facebook && (
                      <a
                        href={member.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-800 hover:text-blue-900 transition-colors"
                        aria-label="Facebook Profile"
                      >
                        <FaFacebook size={20} />
                      </a>
                    )}
                  </motion.div>
                </motion.div>
              );
            })
          ) : (
            <p className="text-gray-500 col-span-full text-center">No team members found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamPage;

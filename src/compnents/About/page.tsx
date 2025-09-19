"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { imagesVariants, textsVariants, buttonsVariants } from"@/app/animation";

interface AboutStat {
  label: string;
  value: string;
}

interface AboutData {
  title: string;
  subtitle?: string;
  description?: string;
  image?: { url: string };
  stats?: AboutStat[];
}

const About = () => {
  const API_BASE="https://lawservicesbackend.onrender.com"
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch(`${API_BASE}/api/v1/about`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (res.ok) setAboutData(data.data);
        else throw new Error(data.message || "Failed to fetch About");
      } catch (err) {
        console.error("Error fetching About:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  if (loading)
    return <div className="flex justify-center items-center h-60 text-xl text-gray-600">Loading About...</div>;

  if (!aboutData)
    return <div className="flex justify-center items-center h-60 text-xl text-red-600">Failed to load About data.</div>;

  return (
    <section className="px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
      {/* Left side (image) */}
      <motion.div className="w-full md:w-1/2" initial="hidden" animate="visible" variants={imagesVariants}>
        <Image
          src={aboutData.image?.url || "/justichero.jpg"}
          alt="About our law firm"
          width={500}
          height={400}
          className="rounded-2xl shadow-lg object-cover"
        />
      </motion.div>

      {/* Right side (content) */}
      <motion.div className="w-full md:w-1/2 space-y-6" initial="hidden" animate="visible">
        <motion.h2 className="text-3xl font-bold text-gray-950" custom={1} variants={textsVariants}>
          {aboutData.title}
        </motion.h2>
        {aboutData.subtitle && (
          <motion.p className="text-gray-950 text-sm" custom={2} variants={textsVariants}>
            {aboutData.subtitle}
          </motion.p>
        )}

        {aboutData.stats && aboutData.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-6 mt-6">
            {aboutData.stats.map((stat, index) => (
              <motion.div key={index} className="text-center" custom={index + 3} variants={textsVariants}>
                <h3 className="text-4xl font-bold text-green-600">{stat.value}</h3>
                <p className="text-blue-950 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contact Button */}
        <motion.div className="mt-10">
          <Link href="/contact">
            <motion.button
              className="flex items-center gap-2 text-black hover:text-white transition-colors border-b bg-blue-700 py-2 px-4 rounded-2xl text-sm font-bold hover:bg-blue-900 cursor-pointer"
              variants={buttonsVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;

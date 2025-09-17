"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion} from "framer-motion";
import { heroImageVariants, heroTextVariants, heroVariants,statVariants } from "@/app/animation";
interface AboutStat {
  label: string;
  value: string;
}

interface AboutData {
  title: string;
  subtitle: string;
  image?: { url: string };
  stats?: AboutStat[];
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/about`);
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
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading About...
      </div>
    );
  if (!aboutData)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        Failed to load About data.
      </div>
    );

 
  const statColors = ["bg-white", "bg-blue-100", "bg-red-100", "bg-green-100"];

  return (
    <div className="space-y-16 px-4 md:px-8 lg:px-16 py-12">
      {/* Hero Section */}
      <motion.section
        className="flex flex-col md:flex-row items-center gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="w-full md:w-1/2 text-center md:text-left space-y-4" variants={heroVariants}>
          <motion.p className="text-3xl md:text-5xl font-bold text-gray-900" variants={heroTextVariants}>
            {aboutData.title}
          </motion.p>
          <motion.p className="text-gray-700 text-base md:text-lg lg:text-xl" variants={heroTextVariants}>
            {aboutData.subtitle}
          </motion.p>
        </motion.div>

        {aboutData.image?.url && (
          <motion.div className="w-full md:w-1/2 flex justify-center" variants={heroImageVariants}>
            <Image
              src={aboutData.image.url}
              alt="About Hero"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg object-cover w-full max-w-lg"
            />
          </motion.div>
        )}
      </motion.section>

      {/* Stats Section */}
      {aboutData.stats?.length && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center py-12">
          {aboutData.stats.map((s, i) => (
            <motion.div
              key={i}
              className={`${statColors[i % statColors.length]} p-6 rounded-lg shadow cursor-pointer`}
              variants={statVariants[i % statVariants.length]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: "0px 15px 25px rgba(0,0,0,0.15)" }}
            >
              <p className="text-3xl md:text-4xl font-bold text-blue-800">{s.value}</p>
              <p className="text-gray-700 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </section>
      )}
    </div>
  );
}

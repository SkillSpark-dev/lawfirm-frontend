"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { imagesVariants, textsVariants, buttonsVariants } from"@/app/animation";
import API_BASE from "@/app/BaseUrl"
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
    <section className=" px-4 sm:px-8 md:px-16 lg:px-40 py-8 md:py-16 flex flex-col md:flex-row items-center gap-10">

      {/* Left side (image) */}
      <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  variants={imagesVariants}
>
        <Image
          src={aboutData.image?.url || "/justichero.jpg"}
          alt="About our law firm"
          width={500}
          height={400}
          className="rounded-xl shadow-lg object-cover"
        />
      </motion.div>

      {/* Right side (content) */}
      <motion.div className="w-full md:w-1/2 space-y-6" initial="hidden" whileInView="visible" viewport={{once: false, amount: 0.3}} variants={textsVariants}>
        <motion.h2 className="text-3xl font-bold text-white" custom={1} variants={textsVariants}>
          {aboutData.title}
        </motion.h2>
        {aboutData.subtitle && (
          <motion.p className="text-white text-sm" custom={2} variants={textsVariants}>
            {aboutData.subtitle}
          </motion.p>
        )}

        {aboutData.stats && aboutData.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-6 mt-6">
            {aboutData.stats.map((stat, index) => (
              <motion.div key={index} className="text-center" custom={index + 3} variants={textsVariants}>
                <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
                <p className="text-white text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contact Button */}
        <motion.div className="mt-10">
          <Link href="/contact">
            <motion.button
              className="flex items-center gap-2 text-white  transition-colors  bg-amber-500 py-2 px-4 rounded-xl text-sm font-bold hover:bg-amber-600 cursor-pointer"
              variants={buttonsVariants}
              initial="hidden"
                whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
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

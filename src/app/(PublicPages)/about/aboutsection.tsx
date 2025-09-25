"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion} from "framer-motion";
import { sectionVariants, buttonVariants } from "@/app/animation";
interface AboutHeroSection {
  _id: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  image?: { url: string } | null;
}

export default function AboutHeroPublicPage() {
   const API_BASE="https://lawservicesbackend.onrender.com"
  const [sections, setSections] = useState<AboutHeroSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    
    const fetchSections = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/info`);
        const data = await res.json();
        setSections(data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load sections");
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  const colors = ["bg-white", "bg-blue-50", "bg-red-50", "bg-green-50"];
  

  
  return (
    <div className="max-w-6xl mx-auto space-y-12 px-4 md:px-8 lg:px-16 py-12">
      {sections.map((section, index) => (
        <motion.section
          key={section._id}
          className={`rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          } ${colors[index % colors.length]}`}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={sectionVariants}
        >
          {section.image?.url && (
            <div className="md:w-1/2 flex-shrink-0 relative aspect-[4/3]">
              <Image
                src={section.image.url}
                alt={section.title}
                fill
                className=" object-cover"
              />
            </div>
          )}
          <div className="p-6 md:w-1/2 flex flex-col justify-center text-center md:text-left mb:mt-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.title}</h2>
            <p className="text-gray-700 mb-4">{section.description}</p>
            {section.buttonText && section.buttonLink && (
              <motion.div
                className="mt-4 flex justify-center md:justify-start"
                variants={buttonVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <a
                  href={section.buttonLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition"
                >
                  {section.buttonText}
                </a>
              </motion.div>
            )}
          </div>
        </motion.section>
      ))}
    </div>
  );
}

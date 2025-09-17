"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cardVariants, elementVariants, cardColors } from "@/app/animation";

interface ServiceDetail {
  title: string;
  description: string;
  keyServices: string[];
}

interface Service {
  _id: string;
  category: string;
  description: string;
  image?: { url: string } | null;
  serviceCardTitle: string;
  serviceCardDescription: string;
  serviceCardFeatures?: string[];
  details?: ServiceDetail[];
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/services`);
        if (!res.ok) throw new Error(`Server error ${res.status}`);

        const data = await res.json();
        if (!data.data || !Array.isArray(data.data)) throw new Error("Invalid backend data");

        setServices(data.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p className="p-8 text-center text-lg animate-pulse">⏳ Loading services...</p>;
  if (error) return <p className="p-8 text-center text-red-600">❌ Failed to fetch services: {error}</p>;

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      >
        Our Services
      </motion.h1>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services available yet.</p>
      ) : (
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              className={`rounded-2xl shadow cursor-pointer overflow-hidden ${cardColors[index % cardColors.length]}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <Link href={`/services/${service._id}`} className="block">
                <motion.div className="relative w-full h-48" variants={elementVariants[0]}>
                  <Image
                    src={service.image?.url || "/placeholder.jpg"}
                    alt={service.serviceCardTitle || service.category}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <div className="p-5 space-y-3">
                  <motion.h2 className="text-xl font-semibold text-gray-800" variants={elementVariants[1]}>
                    {service.serviceCardTitle || service.category}
                  </motion.h2>

                  <motion.p className="text-gray-600 text-sm" variants={elementVariants[2]}>
                    {(service.serviceCardDescription || service.description)?.slice(0, 150)}...
                  </motion.p>

                  {service.serviceCardFeatures?.length && (
                    <motion.ul className="list-disc list-inside text-gray-700 text-sm" variants={elementVariants[3]}>
                      {service.serviceCardFeatures.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </motion.ul>
                  )}

                  {service.details?.length && (
                    <motion.p className="text-xs text-gray-500 italic" variants={elementVariants[4]}>
                      Includes: {service.details[0].title}
                      {service.details.length > 1 && " + more"}
                    </motion.p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

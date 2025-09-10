"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Service {
  _id: string;
  category: string;
  description: string;
  image: string | null;
  serviceCardTitle: string;
  serviceCardDescription: string;
  serviceCardFeatures: string[];
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/services`
        );

        // If backend returns non-200, throw error
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server error ${res.status}: ${text}`);
        }

        const data = await res.json();

        // Make sure data.data exists
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

    fetchServices();
  }, []);

  if (loading) {
    return <p className="p-8 text-center text-lg">Loading services...</p>;
  }

  if (error) {
    return (
      <p className="p-8 text-center text-red-500">
        Error fetching services: {error}
      </p>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map(
          (service) => (
            console.log(service),
            (
              <Link
                key={service._id}
                href={`/services/${service._id}`}
                className="block p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-2xl font-semibold">
                    {service.serviceCardTitle}
                  </h2>
                  <Image
                    src={service?.image || ""}
                    alt={service.category}
                    width={400}
                    height={200}
                    className="rounded-xl"
                  />
                  <p className="text-gray-600 mt-2">
                    {service.serviceCardDescription?.slice(0, 150) ||
                      service.description.slice(0, 150)}
                    ...
                  </p>

                  {service.serviceCardFeatures &&
                    service.serviceCardFeatures.length > 0 && (
                      <>
                        <h3 className="text-lg font-semibold mt-4">
                          Features:
                        </h3>
                        <ul className="flex flex-col text-gray-700">
                          {service.serviceCardFeatures.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </>
                    )}
                </div>
              </Link>
            )
          )
        )}
      </div>
    </div>
  );
}

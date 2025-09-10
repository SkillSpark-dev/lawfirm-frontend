"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/assets/mockdata"; // make sure this file exports an array

function ServicesPage() {
  return (
    <div className="bg-gray-300 min-h-screen mt-19">
      {/* Page Title */}
      <div className="flex justify-center items-center text-5xl font-bold py-12">
        <p>Our Services</p>
      </div>

      {/* Service Cards */}
      <section className="py-10 px-6 grid md:grid-cols-3 gap-10 container mx-auto">
        {servicesData.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.id}`} // 👈 navigate to service detail page
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
          >
            <div className="w-45 h-45 relative mx-auto mb-4">
              <Image
                src={service.icon}
                alt={service.title}
                fill
                className="object-contain h-45 w-45"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm text-center">
              {service.description}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default ServicesPage;

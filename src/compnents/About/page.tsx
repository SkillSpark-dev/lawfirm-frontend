import React from "react";
import { aboutData } from "@/assets/mockdata";
import Image from "next/image";
import Link from "next/link"; // ✅ import from next/link

const About = () => {
  return (
    <section className="px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
      {/* Left side (image) */}
      <div className="w-full md:w-1/2">
        <Image
          src="/justichero.jpg"
          alt="About our law firm"
          width={500}
          height={400}
          className="rounded-2xl shadow-lg"
        />
      </div>

      {/* Right side (content) */}
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-3xl font-bold text-white">{aboutData.title}</h2>
        <p className="text-white text-sm">{aboutData.description}</p>

        <div className="grid grid-cols-2 gap-6 mt-6">
          {aboutData.stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <h3 className="text-4xl font-bold text-amber-600">{stat.value}</h3>
              <p className="text-white text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Read More button */}
        <div className="mt-10">
          <Link
          href="/contact"
        
        >
          <button className="flex items-center gap-2 text-black hover:text-white transition-colors border-b bg-amber-500 py-2 px-4 rounded-2xl text-sm text-bold hover:bg-amber-700 cursor-pointer">Contact Us</button>
        </Link>
        </div>
      </div>
    </section>
  );
};

export default About;

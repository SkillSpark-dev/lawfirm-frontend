"use client";

import React from "react";
import Image from "next/image";
import Header from "@/compnents/Header";
import Footer from "@/compnents/Footer";
import About from "@/compnents/About/page"; // ✅ Make sure it's a component, not a page
import { url } from "node:inspector";

function AboutPage() {
  const aboutData = [
    {
      id: 1,
      title: "About Us",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/ladystatue.jpg", // ✅ must be inside /public
    },

    {
      id: 2,
      title: "Our Values",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "/justic.jpg",
    },
  ];

  return (
    <div className="bg-gray-100">
      <div className="bg-gray-400" >
        <About />
      </div>

      {/* About Section */}
      <div className="container mx-auto  py-10 bg- mt-10">
        {aboutData.map((about) => (
          <div
            key={about.id}
            className="flex flex-col md:flex-row justify-center items-center gap-10 mt-10 p-10 "
          >
            {/* Text */}
            <div className="w-full md:w-1/2 ">
              <h2 className="text-3xl font-bold text-gray-950 mb-4">
                {about.title}
              </h2>
              <p className="text-gray-950 text-sm mb-4">{about.description}</p>
              <div>
                <button className="bg-blue-800 hover:bg-blue-950 text-white py-2 px-4 rounded cursor-pointer">
                  <a href="/contact">Contact Us</a>
                </button>
              </div>
            </div>
            {/* Image */}
            <div>
              <Image
                src={about.image}
                alt={about.title}
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutPage;

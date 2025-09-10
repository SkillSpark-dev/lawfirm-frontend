"use client";
import React, { useState } from "react";
import { heroData } from "@/assets/mockdata";
import Image from "next/image";
import Banner from "@/compnents/Home/Banner";
import Appointment from "../Appointmen";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Appointment Data:", data);
    setIsOpen(false); // close after submit
  };

  return (
    <>
      <div>
        <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 gap-10 relative">
          {/* Left side (text) */}
          <div className="max-w-xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-shadow-white">
              {heroData.title}
            </h1>
            <p className="text-white text-lg">{heroData.subtitle}</p>
          </div>

          {/* Right side */}
          <div className="mt-50 md:mt-0 px-10 ">
            <p className="text-white text-small">
              We partner with companies to minimize risks, maximize
              opportunities, and drive success.
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="inline-block px-6 py-3 bg-amber-600 text-white text-sm font-bold rounded-lg shadow pointer-cursor hover:bg-amber-700 transition mt-10"
            >
              {heroData.buttonText}
            </button>
          </div>
        </section>
      </div>

      <div className="absolute right-0 -bottom-32 w-[70%]">
        <Banner />
      </div>

      {isOpen && (
        <Appointment isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Hero;

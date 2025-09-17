"use client";

import React, { useState } from "react";
import { heroData } from "@/assets/mockdata";
import Banner from "@/compnents/Home/Banner";
import Appointment from "../Appointmen";
import { motion } from "framer-motion";
import {
  bannertextVariants,
  contentVariants,
  bannerbuttonVariants,
  bannerVariants,
} from "@/app/animation";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Appointment Data:", data);
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 gap-10">
          {/* Left side (text) */}
          <motion.div
            className="max-w-xl space-y-6"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={bannertextVariants}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-shadow-white">
              {heroData.title}
            </h1>
            <p className="text-white text-lg">{heroData.subtitle}</p>
          </motion.div>

          {/* Right side */}
          <motion.div
            className="mt-10 md:mt-0 px-10"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            <p className="text-white text-small">
              We partner with companies to minimize risks, maximize
              opportunities, and drive success.
            </p>

            <motion.button
              onClick={() => setIsOpen(true)}
              className="inline-block px-6 py-3 bg-amber-600 text-white text-sm font-bold rounded-lg shadow pointer-cursor hover:bg-amber-700 transition mt-10"
              variants={bannerbuttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {heroData.buttonText}
            </motion.button>
          </motion.div>
        </section>
      </div>

      {/* Banner: Always rendered, but positioned with Tailwind responsive classes */}
      <motion.div
        className="relative md:absolute md:right-0 md:-bottom-32 w-full md:w-[70%] mt-6 md:mt-0"
        initial="hidden"
        animate="visible"
        variants={bannerVariants}
      >
        <Banner />
      </motion.div>

      {isOpen && <Appointment isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Hero;

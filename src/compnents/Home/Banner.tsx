import React from "react";
import { BsShieldLockFill } from "react-icons/bs";
import TestimonialSlider from "./TestimonialSlider";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

function Banner() {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[60vh]">
        
        {/* Left Card */}
        <div className="w-full md:flex-1 bg-gray-200 flex flex-col justify-center items-start p-6 sm:p-8">
          <div className="text-2xl sm:text-3xl text-black mb-3 sm:mb-4">
            <BsShieldLockFill />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-950">
            Litigation & Dispute Resolution
          </h2>
          <Link
            href="/services"
            className="flex items-center gap-2 text-sm sm:text-base font-medium text-black hover:text-blue-600"
          >
            Services <FaArrowRight />
          </Link>
        </div>

        {/* Middle Image */}
        <div className="w-full md:flex-1 relative h-64 sm:h-80 md:h-full">
          <Image
            src="/ladystatue.jpg"
            alt="Lady Statue"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Testimonial */}
        <div className="w-full md:flex-1 bg-blue-100 flex flex-col justify-center p-6 sm:p-8 text-gray-900">
          <TestimonialSlider />
        </div>
      </div>
    </div>
  );
}

export default Banner;

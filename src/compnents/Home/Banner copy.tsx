"use client";

import React from "react";
import Image from "next/image";
import { BsShieldLockFill } from "react-icons/bs";
import Slider, { Settings } from "react-slick";
import { testimonialsData } from "@/assets/mockdata";

// Define testimonial type
interface Testimonial {
  id: number;
  name: string;
  role: string;
  feedback: string;
  image: string;
}

function Banner() {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
    ),
    appendDots: (dots) => (
      <div style={{ bottom: "-30px" }}>
        <ul className="flex justify-center gap-3">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="flex  justify-center items-center border-2 border-white gap-2 rounded-lg h-60 w-full p-4">
      {/* Left section */}
      <div className="flex flex-col items-start gap-4 bg-amber-50 h-60 rounded-lg p-4">
        <div className="text-3xl text-blue-600">
          <BsShieldLockFill />
        </div>
        <p className="text-sm font-semibold text-gray-950">
          Litigation & Dispute Resolution
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
          See Services
        </button>
      </div>

      {/* Middle image */}
      <div className="w-full">
        <img
          src="/ladystatue.jpg"
          alt="Statue of Lady Justice"
          className="h-full w-full object-cover rounded-lg shadow"
        />
      </div>

      {/* Testimonial slider */}
      <div className="w-80 hidden">
       <Slider {...settings}>
          {testimonialsData.map((item,index) => (
            <div
              key={index}
              className="max-w-xs text-center bg-green-300 rounded-lg h-60 p-4 shadow flex flex-col justify-center"
            >
              <div className="flex justify-center mb-3">
                <img
                  src={item.image}
                  alt={`${index}`} 
                  className="h-16 w-16 rounded-full object-cover border"
                />
              </div>
              <p className="italic text-gray-950 text-sm mb-2">"{item.feedback}"</p>
              <div className="text-sm text-black">
                <p className="font-semibold text-gray-950">{item.name}</p>
                <p className="text-gray-700">{item.role}</p>
              </div> 
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Banner;

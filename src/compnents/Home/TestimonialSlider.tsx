"use client";

import React from "react";
import Slider, { Settings } from "react-slick";
import { testimonialsData } from "@/assets/mockdata";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const TestimonialSlider = () => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: () => (
      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
    ),
    
  };

  return (
    <div className="w-70 bg-white rounded-lg shadow p-4 flex flex-col justify-center h-80">
      <Slider {...settings}>
        {testimonialsData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center px-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 rounded-full object-cover border mb-3"
            />
            <p className="italic text-gray-900 text-sm mb-2">
              "{item.feedback}"
            </p>
            <div className="text-sm text-black">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-700">{item.role}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Testimonial {
  _id: string;
  clientName: string;
  clientProfession: string;
  feedback: string;
  clientImage?: { url: string };
}

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: () => <div className="w-2 h-2 bg-gray-400 rounded-full"></div>,
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/testimonial`);
        const data = await res.json();
        if (res.ok && data.data) setTestimonials(data.data);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow p-4 flex flex-col justify-center h-80">
      {testimonials.length === 0 ? (
        <p className="text-center text-gray-500">No testimonials available</p>
      ) : (
        <Slider {...settings}>
         {testimonials.map((item) => (
  <div key={item._id} className="flex flex-col items-center text-center px-4">
    {item.clientImage?.url && (
      <div className="relative w-20 h-20 mb-3">
  <Image
    src={item.clientImage.url}
    alt={item.clientName}
    fill
    className="rounded-full object-cover border"
  />
</div>

    )}
    <p className="italic text-gray-900 text-sm mb-2">&quot;{item.feedback}&quot;</p>
    <div className="text-sm text-black">
      <p className="font-semibold">{item.clientName}</p>
      <p className="text-gray-700">{item.clientProfession}</p>
    </div>
  </div>
))}

        </Slider>
      )}
    </div>
  );
};

export default TestimonialSlider;

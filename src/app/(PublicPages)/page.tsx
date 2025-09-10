import Header from "@/compnents/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { headerData } from "@/assets/mockdata"; // make sure it's exported correctly
import Hero from "@/compnents/Home/hero";
import Services from "@/compnents/Services/page";
import AboutPage from "@/compnents/About/page";
import Team from "@/compnents/Team/page";
import Footer from "@/compnents/Footer";
import MainLayout from "@/compnents/Layout/MainLayout";
function Page() {
  return (
    <div className="text-3xl flex flex-col gap-8">
      <div className="bg-[url('/lawbackground.jpg')] bg-cover bg-center min-h-screen text-white">
        <Hero />
      </div>

      <div className="bg-gray-200 p-5  ">
        <Services />
        <div style={{ backgroundImage: "url('/aboutbg.png')" }}>
          <AboutPage />
        </div>
        <Team />
      </div>

      {/* <Link href="/admin/login"><Login/></Link> */}
    </div>
  );
}

export default Page;

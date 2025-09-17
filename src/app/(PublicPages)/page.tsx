import React from "react";
import Hero from "@/compnents/Home/hero";
import AboutPage from "@/compnents/About/page";
import TeamPage from "./team/page";
import ServicesPage from "./services/page";
function Page() {
  return (
    <div className="text-3xl flex flex-col gap-8" >
      <div className="bg-[url('/lawbackground.jpg')] bg-cover bg-center min-h-screen text-white mb-10">
        <Hero />
      </div>
       <ServicesPage/>
       <AboutPage />
     <TeamPage/>
    </div>
  );
}

export default Page;

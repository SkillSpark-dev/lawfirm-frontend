
import React from "react";
import Hero from "@/compnents/Home/hero";
import AboutPage from "@/compnents/About/page";
import TeamList from "@/compnents/TeamList";
import ServicesPage from "../../compnents/servicesCard"


function Page() {
  return (
    <div className="conatainer mx-auto overflow-hidden text-3xl flex flex-col gap-8" >
   
      <div className="bg-[url('/lawbackground.jpg')] bg-cover bg-center min-h-screen text-white mb-10">
        <Hero />
      </div>
    
         <ServicesPage limit={4} />
       <div className="bg-[url('/lawbackground.jpg')] "> 
         <AboutPage />
            </div>
     
  <TeamList limit={3}/>

    
    </div>
  );
}

export default Page;



import React from "react";
import ServicesList from "@/compnents/servicesCard";

export default function ServicesPage() {
  return (
    <div className="text-3xl flex flex-col gap-8">
      {/* Full services list without limit */}
      <ServicesList />
    </div>
  );
}

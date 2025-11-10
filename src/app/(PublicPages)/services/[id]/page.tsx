import Image from "next/image";
import { notFound } from "next/navigation";
import API_BASE from "@/app/BaseUrl";

interface ServiceDetail {
  _id: string;
  title: string;
  description: string;
  keyServices?: string[];
}

interface Service {
  _id: string;
  serviceCardTitle?: string;
  category: string;
  serviceCardDescription?: string;
  description?: string;
  image?: { url: string };
  serviceCardFeatures?: string[];
  details?: ServiceDetail[];
}

// Generate static paths for all services
export async function generateStaticParams() {
  const res = await fetch(`${API_BASE}/api/v1/services`, { cache: "force-cache" });
  if (!res.ok) return [];

  const data = await res.json();
  const services: Service[] = data?.data || [];

  return services
    .filter((service) => service._id)
    .map((service) => ({ id: service._id }));
}

// Page component
export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // UPDATED: Await the params
  const { id } = await params;

  const res = await fetch(`${API_BASE}/api/v1/services/${id}`, { cache: "force-cache" });
  if (!res.ok) notFound();

  const data = await res.json();
  const service: Service = data?.data;
  if (!service) notFound();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
        {service.image?.url && (
          <Image
            src={service.image.url}
            alt={service.category}
            className="rounded-xl shadow w-full md:w-1/2 object-cover"
            width={800}
            height={500}
          />
        )}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {service.serviceCardTitle || service.category}
          </h1>
          <p className="text-gray-700 mb-6">
            {service.serviceCardDescription || service.description}
          </p>
          {service.serviceCardFeatures?.length && (
            <div className="flex flex-col px-20">
              <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {service.serviceCardFeatures.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {service.details?.length && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {service.details.map((detail: ServiceDetail) => (
            <div key={detail._id} className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">{detail.title}</h2>
              <p className="text-gray-600 mb-3">{detail.description}</p>
              {detail.keyServices?.length && (
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {detail.keyServices.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

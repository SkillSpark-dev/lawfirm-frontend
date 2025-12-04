import Image from "next/image";
import { notFound } from "next/navigation";
import API_BASE from "@/app/BaseUrl";

/* FORCE STATIC GENERATION (REQUIRED FOR output: export) */
export const dynamic = "force-static";
export const dynamicParams = false; // ← ADDED: Required for static export
export const revalidate = 0;

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

interface ApiResponse<T> {
  data: T;
}

/* REQUIRED FOR STATIC EXPORT */
export async function generateStaticParams(): Promise<{ id: string }[]> {
  try {
    console.log("🔍 Fetching services for static generation...");
    
    const res = await fetch(`${API_BASE}/api/v1/services`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch services:", res.status);
      return [];
    }

    const data: ApiResponse<Service[]> = await res.json();
    
    const params = (data.data || []).map((service) => ({
      id: service._id,
    }));
    
    console.log("✅ Generated static params for", params.length, "services");
    
    return params;
  } catch (error) {
    console.error("❌ Error in generateStaticParams:", error);
    return [];
  }
}

/* PAGE COMPONENT */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${API_BASE}/api/v1/services/${id}`, {
    cache: "force-cache",
  });

  if (!res.ok) notFound();

  const data: ApiResponse<Service | null> = await res.json();
  const service = data?.data;

  if (!service) notFound();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto max-w-7xl" key={id}>
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start gap-10 mb-12">
        {service.image?.url && (
          <Image
            src={service.image.url}
            alt={service.serviceCardTitle || service.category}
            width={800}
            height={500}
            className="rounded-xl shadow-lg w-full md:w-1/2 object-cover"
          />
        )}

        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {service.serviceCardTitle ?? service.category}
          </h1>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {service.serviceCardDescription ?? service.description}
          </p>

          {Array.isArray(service.serviceCardFeatures) &&
            service.serviceCardFeatures.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  Key Features
                </h2>

                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {service.serviceCardFeatures.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>

      {/* DETAILS SECTION */}
      {Array.isArray(service.details) && service.details.length > 0 && (
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Service Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.details.map((detail) => (
              <div
                key={detail._id}
                className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {detail.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {detail.description}
                </p>

                {Array.isArray(detail.keyServices) &&
                  detail.keyServices.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {detail.keyServices.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
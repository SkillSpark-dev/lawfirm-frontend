import { notFound } from "next/navigation";
import { servicesData } from "@/assets/mockdata";

interface Props {
  params: Promise<{ id: string }>; // 👈 must be Promise
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params; // 👈 await required
  const service = servicesData.find((s) => String(s.id) === id);

  if (!service) {
    notFound();
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
      <p className="text-gray-700 mb-6">{service.description}</p>

      {service.details && (
        <div className="space-y-6">
          {service.details.map((detail) => (
            <div
              key={detail.id}
              className="p-6 bg-gray-50 rounded-xl shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-2">{detail.title}</h2>
              <p className="text-gray-600 mb-3">{detail.description}</p>

              {detail.keyServices && (
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

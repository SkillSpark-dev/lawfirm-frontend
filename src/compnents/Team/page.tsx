import Image from "next/image";
import Link from "next/link"; // ✅ import for routing
import { teamData } from "@/assets/mockdata"; // adjust path as needed

const Team = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamData.map((member) => (
            <Link
              key={member.id}
              href={`/team`} // ✅ dynamic route for each member
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition block"
            >
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

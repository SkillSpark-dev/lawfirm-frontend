"use client";

import {
  Briefcase,
  Users,
  DollarSign,
  CheckSquare,
} from "lucide-react";

const stats = [
  {
    title: "Total Cases",
    value: "142",
    change: "+12%",
    changeType: "positive",
    icon: Briefcase,
  },
  {
    title: "Active Clients",
    value: "86",
    change: "+5%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Revenue This Month",
    value: "$42,580",
    change: "+18%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Pending Tasks",
    value: "24",
    change: "-3%",
    changeType: "negative",
    icon: CheckSquare,
  },
];

export default function DashboardStats() {
  if (!stats.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No stats available
      </div>
    );
  }

  return (
    <section
      aria-label="Dashboard statistics"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.changeType === "positive";

        return (
          <div
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p
                  className={`text-sm font-medium ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div className="flex-shrink-0 rounded-full bg-gray-100 p-3">
                <Icon className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

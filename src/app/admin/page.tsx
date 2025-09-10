// app/admin/dashboard/page.tsx
import DashboardStats from "@/compnents/Admin/DashboardStates";
import RecentCases from "@/compnents/Admin/RecentCases";
import RevenueChart from "@/compnents/Admin/ReveneuChart";

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome to your law firm management dashboard
        </p>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Charts and recent cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <div className="bg-white p-4 rounded-lg shadow overflow-auto">
          <RevenueChart />
        </div>

        {/* Recent Cases table / component */}
        <div className="bg-white p-4 rounded-lg shadow overflow-auto">
          <RecentCases />
        </div>
      </div>
    </div>
  );
}

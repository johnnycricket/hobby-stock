import { Package, TrendingUp, Users, AlertCircle } from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      name: "Total Items",
      value: "0",
      icon: Package,
      change: "+0%",
      changeType: "neutral" as const,
    },
    {
      name: "Active Projects",
      value: "0",
      icon: TrendingUp,
      change: "+0%",
      changeType: "positive" as const,
    },
    {
      name: "Categories",
      value: "0",
      icon: Users,
      change: "+0%",
      changeType: "neutral" as const,
    },
    {
      name: "Low Stock",
      value: "0",
      icon: AlertCircle,
      change: "0",
      changeType: "negative" as const,
    },
  ];

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Overview of your hobby inventory and projects.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : stat.changeType === "negative"
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full btn btn-primary text-left">
              Add New Item
            </button>
            <button className="w-full btn btn-secondary text-left">
              Create Project
            </button>
            <button className="w-full btn btn-secondary text-left">
              View Inventory
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="text-gray-500 text-center py-8">
            <p>No recent activity</p>
            <p className="text-sm mt-1">
              Start by adding some items to your inventory
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

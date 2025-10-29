"use client";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import Layout from "./Layout";
import { Clock, DollarSign, Projector, Users } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  // Pie Chart Data
  const pieData = [
    { name: "Pending", value: 30, color: "#FFD700" },
    { name: "Active", value: 40, color: "#007BFF" },
    { name: "Completed", value: 20, color: "#28A745" },
    { name: "On Hold", value: 10, color: "#DC3545" },
  ];

  const COLORS = ["#FFD700", "#007BFF", "#28A745", "#DC3545"];

  // Sales Data for Bar Chart
  const salesData = [
    { month: "Jan", sales: 4000, revenue: 2400 },
    { month: "Feb", sales: 3000, revenue: 1398 },
    { month: "Mar", sales: 2000, revenue: 9800 },
    { month: "Apr", sales: 2780, revenue: 3908 },
    { month: "May", sales: 1890, revenue: 4800 },
    { month: "Jun", sales: 2390, revenue: 3800 },
  ];

  // Revenue Data for Line Chart
  const revenueData = [
    { month: "Jan", revenue: 4000, profit: 2400 },
    { month: "Feb", revenue: 3000, profit: 1398 },
    { month: "Mar", revenue: 2000, profit: 9800 },
    { month: "Apr", revenue: 2780, profit: 3908 },
    { month: "May", revenue: 1890, profit: 4800 },
    { month: "Jun", revenue: 2390, profit: 3800 },
  ];

  // Stats Cards Data
  const statsCards = [
    {
      title: "Total Revenue",
      value: "$45,231",
      description: "+20.1% from last month",
      icon: <DollarSign />,
      color: "bg-green-50 text-green-700 border-green-200",
    },
    {
      title: "New Customers",
      value: "1,234",
      description: "+18% from last month",
      icon: <Users />,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Active Projects",
      value: "42",
      description: "+5 from last week",
      icon: <Projector />,
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      title: "Pending Tasks",
      value: "12",
      description: "-2 from yesterday",
      icon: <Clock />,
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
          <p className="font-medium">{`${payload[0].name} : ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Welcome back! Here's what's happening today.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm border p-6 ${card.color}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium mb-2">{card.title}</p>
                    <h3 className="text-2xl font-bold mb-1">{card.value}</h3>
                    <p className="text-xs opacity-75">{card.description}</p>
                  </div>
                  <span className="text-2xl">{card.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Pie Chart Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Project Status
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      formatter={(value, entry) => (
                        <span style={{ color: "#333", fontSize: "14px" }}>
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Monthly Sales
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#007BFF" name="Sales" />
                    <Bar dataKey="revenue" fill="#28A745" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Additional Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Revenue Trend
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#007BFF"
                      strokeWidth={2}
                      name="Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="#28A745"
                      strokeWidth={2}
                      name="Profit"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  {
                    activity: "New project assigned",
                    time: "2 minutes ago",
                    user: "John Doe",
                  },
                  {
                    activity: "Payment received",
                    time: "1 hour ago",
                    user: "Sarah Smith",
                  },
                  {
                    activity: "Meeting scheduled",
                    time: "3 hours ago",
                    user: "Mike Johnson",
                  },
                  {
                    activity: "Project completed",
                    time: "1 day ago",
                    user: "Emily Brown",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.activity}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.user} • {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

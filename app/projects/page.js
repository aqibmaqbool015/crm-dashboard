"use client";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import Layout from "../components/Layout";

export default function ProjectDetail() {
  const router = useRouter();

  const project = {
    id: 1,
    title: "403 greenlume",
    type: "Web App",
    description:
      "Kofejob is a freelancers marketplace where you can post projects & get instant help.",
    projectId: "#12145",
    value: "$03,50,000",
    dueDate: "15 Oct 2023",
    totalHours: 100,
    priority: "High",
    status: "Active",
    progress: 2,
    totalProgress: 4,
    lastUpdated: "24/10/2023: 10:45 pm",
    pendingUpdates: ["sloge 5", "sloge 10", "sloge 6 are incomplete"],
    requestedUpdates: ["sloge 4", "sloge 10", "sloge 9"],
  };

  const pieData = [
    { name: "Pending", value: 30, color: "#FFD700" },
    { name: "Active", value: 40, color: "#007BFF" },
    { name: "Completed", value: 20, color: "#28A745" },
    { name: "On Hold", value: 10, color: "#DC3545" },
  ];

  const COLORS = ["#FFD700", "#007BFF", "#28A745", "#DC3545"];

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

  const handleCardClick = (projectId) => {
    router.push(`/detail/${projectId}`);
  };
  const handleClick = () => {
    router.push("/create-project");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto cursor-pointer">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  All Projects
                </h1>
              </div>
              <button
                onClick={handleClick}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Create Projects
              </button>
              {/* <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div> */}
            </div>
          </div>
          <div className="" onClick={handleCardClick}>
            <div className="grid md:grid-cols-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div>
                <div className="h-64 mb-6">
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
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Project Name - 403 greenlume
                  </h2>
                </div>
                <div className="mb-6">
                  <h3 className="text-md font-semibold text-gray-800 mb-3">
                    Pending update:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.pendingUpdates.map((update, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-2 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-lg font-medium"
                      >
                        {update}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-md font-semibold text-gray-800 mb-3">
                    Request update:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.requestedUpdates.map((update, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-2 bg-blue-50 border border-blue-200 text-blue-800 text-sm rounded-lg font-medium"
                      >
                        {update}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Last updated:</span>{" "}
                    {project.lastUpdated}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

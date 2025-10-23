"use client";
import { useRouter } from "next/navigation";
import Layout from "./Layout";

export default function Dashboard() {
  const router = useRouter();
  
  const projects = [
    {
      id: 1,
      title: "TrueVset!",
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
    },
    {
      id: 2,
      title: "Dreamschat",
      type: "Web App",
      description:
        "Kofejob is a freelancers marketplace where you can post projects & get instant help.",
      projectId: "#12146",
      value: "$02,15,000",
      dueDate: "19 Oct 2023",
      totalHours: 80,
      priority: "High",
      status: "Active",
      progress: 2,
      totalProgress: 4,
    },
    {
      id: 3,
      title: "TrueVset!",
      type: "Web App",
      description:
        "Kofejob is a freelancers marketplace where you can post projects & get instant help.",
      projectId: "#12147",
      value: "$01,45,000",
      dueDate: "12 Oct 2023",
      totalHours: 75,
      priority: "High",
      status: "Active",
      progress: 2,
      totalProgress: 4,
    },
  ];

  const handleCardClick = (projectId) => {
    router.push(`/detail/${projectId}`);
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600">Home &gt; Projects</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                High
              </button>
              <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                Active
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleCardClick(project.id)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Priority and Status */}
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                {project.priority}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                {project.status}
              </span>
            </div>

            {/* Project Title and Type */}
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm">{project.type}</p>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Project Details */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Project ID :</span>
                <span className="font-medium">{project.projectId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Value :</span>
                <span className="font-medium">{project.value}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Due Date :</span>
                <span className="font-medium">{project.dueDate}</span>
              </div>
            </div>

            {/* Progress Section */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Total Hours : {project.totalHours}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {project.progress}/{project.totalProgress}
                </span>
              </div>

              {/* Progress Dots */}
              <div className="flex space-x-2">
                {[...Array(project.totalProgress)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index < project.progress ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
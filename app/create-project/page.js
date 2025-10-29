"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/Layout";

export default function CreateProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectAddress: "",
    projectLeadBy: "",
    projectQuality: "good", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Project Data:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Project created successfully!");
      router.push("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
        
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Project
            </h1>
            <p className="text-gray-600 mt-2">
              Fill in the details below to create a new project.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Project Address */}
              <div>
                <label
                  htmlFor="projectAddress"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Project Address *
                </label>
                <textarea
                  id="projectAddress"
                  name="projectAddress"
                  rows={3}
                  required
                  value={formData.projectAddress}
                  onChange={handleChange}
                  placeholder="Enter complete project address..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Project Lead By */}
              <div>
                <label
                  htmlFor="projectLeadBy"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Project Lead By *
                </label>
                <input
                  type="text"
                  id="projectLeadBy"
                  name="projectLeadBy"
                  required
                  value={formData.projectLeadBy}
                  onChange={handleChange}
                  placeholder="Enter project lead name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Project Quality */}
              <div>
                <label
                  htmlFor="projectQuality"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Project Quality *
                </label>
                <select
                  id="projectQuality"
                  name="projectQuality"
                  required
                  value={formData.projectQuality}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </div>
                  ) : (
                    "Create Project"
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </Layout>
  );
}

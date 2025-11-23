"use client";
import { useState } from "react";
import Layout from "../components/Layout";

export default function AddInspectionPage() {
  const [formData, setFormData] = useState({
    address: "",
    toTechnician: "",
    report: "",
    compliantBox: "",
    technicianToInspector: "",
    expectedDate: "",
    markedResolved: "",
    projectCompletionStatus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Inspection created successfully!");
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Create Inspection
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          {/* To Technike (Order/pending order) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Technike
            </label>
            <select
              name="toTechnician"
              value={formData.toTechnician}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            >
              <option value="">Select Option</option>
              <option value="Order">Order</option>
              <option value="Pending Order">Pending Order</option>
            </select>
          </div>

          {/* Report (Pass/Fail) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report
            </label>
            <select
              name="report"
              value={formData.report}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            >
              <option value="">Select Report</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          </div>

          {/* Compliant box */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compliant box
            </label>
            <textarea
              name="compliantBox"
              value={formData.compliantBox}
              onChange={handleInputChange}
              placeholder="Enter compliant details"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              required
            />
          </div>

          {/* Tecnike to Ispector (Assigned/Pending/Resolved) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tecnike to Ispector
            </label>
            <select
              name="technicianToInspector"
              value={formData.technicianToInspector}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            >
              <option value="">Select Status</option>
              <option value="Assigned">Assigned</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Expected date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected date
            </label>
            <input
              type="date"
              name="expectedDate"
              value={formData.expectedDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          {/* Marked Resolved */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marked Resolved
            </label>
            <select
              name="markedResolved"
              value={formData.markedResolved}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Project Completion status (Approved/Pending) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Completion status
            </label>
            <select
              name="projectCompletionStatus"
              value={formData.projectCompletionStatus}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            >
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Create Inspection Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
              Create Inspection
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

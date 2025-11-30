"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/app/components/Layout";
import axiosClient from "@/lib/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateComplaint } from "@/lib/store/slices/complaintsSlice";

export default function EditComplaintPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [complaintId, setComplaintId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    description: "",
    status: "",
    assigned_to: "",
  });

  // Client-side only initialization
  useEffect(() => {
    if (params.id) {
      setComplaintId(params.id);
    }
  }, [params.id]);

  // Fetch complaint data
  useEffect(() => {
    if (!complaintId) return;

    const fetchComplaint = async () => {
      try {
        const response = await axiosClient.get(`/complaints/${complaintId}`);
        const complaint = response.data.data;

        setFormData({
          address: complaint.address || "",
          description: complaint.description || "",
          status: complaint.status || "",
          assigned_to: complaint.assigned_to || "",
        });
      } catch (error) {
        console.error("Error fetching complaint:", error);
        toast.error("Failed to load complaint data");
        // router.push("/complaint");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaint();
  }, [complaintId, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!complaintId) {
      toast.error("Invalid complaint ID");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        address: formData.address,
        description: formData.description,
        status: formData.status,
        assigned_to: formData.assigned_to
          ? parseInt(formData.assigned_to)
          : null,
      };

      const response = await axiosClient.put(
        `/complaints/${complaintId}`,
        payload
      );

      dispatch(updateComplaint(response.data.data));
      toast.success("Complaint updated successfully!");

      setTimeout(() => {
        router.push("/complaint");
      }, 1500);
    } catch (error) {
      console.error("Update error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update complaint";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!complaintId || isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading complaint data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Edit Complaint
                </h1>
                <p className="text-gray-500 mt-1">Update complaint details</p>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Assigned To (User ID) */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned To (User ID)
                </label>
                <input
                  type="number"
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleInputChange}
                  placeholder="Enter user ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div> */}

              {/* Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => router.push("/complaint")}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Updating..." : "Update Complaint"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </Layout>
  );
}

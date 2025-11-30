"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Layout from "@/app/components/Layout";
import axiosClient from "@/lib/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "@/lib/store/hooks";
import {
  updateTrustmark,
  setSubmitting,
} from "@/lib/store/slices/trustmarkSlice";

export default function EditTrustmarkPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const trustmarkId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    description: "",
    status: "",
  });
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);

  // Fetch trustmark data
  useEffect(() => {
    const fetchTrustmark = async () => {
      try {
        const response = await axiosClient.get(
          `/trust-mark-audit/${trustmarkId}`
        );
        const trustmark = response.data.data;

        setFormData({
          address: trustmark.address || "",
          description: trustmark.description || "",
          status: trustmark.status || "",
        });

        // Agar existing photos hain to set karein
        if (trustmark.photos) {
          setExistingPhotos(trustmark.photos);
        }
      } catch (error) {
        toast.error("Failed to load trustmark data");
        // router.push("/trustmark");
      } finally {
        setIsLoading(false);
      }
    };

    if (trustmarkId) {
      fetchTrustmark();
    }
  }, [trustmarkId, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Text fields add karein
      formDataToSend.append("address", formData.address);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("status", formData.status);

      // Photos add karein
      photos.forEach((photo) => {
        formDataToSend.append("photos[]", photo);
      });

      const response = await axiosClient.post(
        `/trust-mark-audit/${trustmarkId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Redux mein update karein
      dispatch(updateTrustmark(response.data.data));

      toast.success("Trustmark updated successfully!");

      setTimeout(() => {
        router.push("/trustmark");
      }, 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update trustmark";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading trustmark data...</p>
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
                  Edit Trustmark Audit
                </h1>
                <p className="text-gray-600 mt-1">
                  Update trustmark audit details
                </p>
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
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Photos */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photos
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Select multiple photos to upload
                </p>

                {photos.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Selected Photos:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {existingPhotos.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Existing Photos:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {existingPhotos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={photo.url}
                            alt={`Existing ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div> */}

              {/* Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => router.push("/trustmark")}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Updating..." : "Update Trustmark"}
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

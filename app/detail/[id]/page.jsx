"use client";
import { useParams, useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { useState } from "react";

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id;
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [editTextValue, setEditTextValue] = useState("");

  const [tableData, setTableData] = useState([
    { id: 1, name: "John Doe", text: "Initial review completed" },
    { id: 2, name: "Jane Smith", text: "Documentation verified" },
    { id: 3, name: "Mike Johnson", text: "Quality check passed" },
  ]);

  const handleEdit = () => {
    setEditTextValue(textAreaValue);
    setIsEditModalOpen(true);
  };

  const handleApproved = () => {
    setIsApproveModalOpen(true);
  };

  const handleRequestedUpdate = () => {
    console.log("Requested Update button clicked");
  };

  const handleNote = () => {
    console.log("Note button clicked");
  };

  const handleUpdate = () => {
    setTextAreaValue(editTextValue);
    setIsEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseApproveModal = () => {
    setIsApproveModalOpen(false);
  };
  // Add these functions in your component
  const handleApproveItem = (itemId) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, status: "Approved" } : item
      )
    );
  };

  const handleRejectItem = (itemId) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, status: "Rejected" } : item
      )
    );
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Project Details - {projectId}
            </h1>
            <p className="text-gray-600">Home &gt; Projects &gt; Detail</p>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Stage 1</h2>

        <textarea
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none outline-none shadow-none"
        />

        {/* Buttons Container */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleApproved}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Approved
          </button>
          <button
            onClick={handleRequestedUpdate}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Requested Update
          </button>
          <button
            onClick={handleNote}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Note
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Stage 1</h3>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <textarea
                value={editTextValue}
                onChange={(e) => setEditTextValue(e.target.value)}
                placeholder="Edit your text here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none outline-none shadow-none"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {isApproveModalOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleCloseApproveModal}
          ></div>

          <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Stage 1
                  </h3>
                  <button
                    onClick={handleCloseApproveModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body - Table */}
              <div className="flex-1 overflow-auto p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Name
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Text
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            {item.name}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                            {item.text}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-sm">
                            {item.status === "Approved" ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Approved
                              </span>
                            ) : item.status === "Rejected" ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Rejected
                              </span>
                            ) : (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleApproveItem(item.id)}
                                  className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectItem(item.id)}
                                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

"use client";
import { useParams, useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import {
  AudioWaveform,
  AudioWaveformIcon,
  Download,
  ListChecks,
  Save,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setProjectStages, setStageLoading, setStageError } from "../../../lib/store/slices/projectSlice";
import axiosClient from "@/lib/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const projectId = params.id;

  // Redux state
  const { projectStages, stageLoading, stageError } = useSelector((state) => state.projects);

  // Local states
  const [textAreaValues, setTextAreaValues] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editTextValue, setEditTextValue] = useState("");
  const [editNoteValue, setEditNoteValue] = useState("");
  const [activeStage, setActiveStage] = useState(1);
  const [editingStageId, setEditingStageId] = useState(null);
  const [lastEntryIds, setLastEntryIds] = useState({});

  // Fetch project stages from API
  useEffect(() => {
    const fetchProjectStages = async () => {
      try {
        dispatch(setStageLoading(true));
        const response = await axiosClient.get(`/projects/${projectId}/stages`);

        if (response.data && response.data.stages) {
          dispatch(setProjectStages(response.data));

          // Initialize textarea values from stage entries
          const initialValues = {};
          const entryIds = {};

          response.data.stages.forEach(stage => {
            if (stage.stage_entries && stage.stage_entries.length > 0) {
              // Get latest entry content
              const latestEntry = stage.stage_entries[stage.stage_entries.length - 1];
              initialValues[stage.stage_id] = latestEntry.content || '';
              entryIds[stage.stage_id] = latestEntry.id;
            } else {
              initialValues[stage.stage_id] = '';
              entryIds[stage.stage_id] = null;
            }
          });

          setTextAreaValues(initialValues);
          setLastEntryIds(entryIds);

          toast.success("Project stages loaded successfully!");
        } else {
          toast.warn("No stages data found");
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch project stages";
        dispatch(setStageError(errorMsg));
        toast.error(errorMsg);
      } finally {
        dispatch(setStageLoading(false));
      }
    };

    if (projectId) {
      fetchProjectStages();
    }
  }, [dispatch, projectId]);

  // Handle textarea change
  const handleTextareaChange = (stageId, value) => {
    setTextAreaValues(prev => ({
      ...prev,
      [stageId]: value
    }));
  };

  // Check if stage has entries
  const hasEntries = (stageId) => {
    const stage = projectStages.find(s => s.stage_id === stageId);
    return stage && stage.stage_entries && stage.stage_entries.length > 0;
  };

  // Get last entry ID for a stage
  const getLastEntryId = (stageId) => {
    return lastEntryIds[stageId] || null;
  };

  // Save or update stage content
  const saveOrUpdateStageContent = async (stageId, content) => {
    try {
      const stage = projectStages.find(s => s.stage_id === stageId);
      if (!stage) {
        toast.error("Stage not found");
        return;
      }

      const hasEntry = hasEntries(stageId);
      const entryId = getLastEntryId(stageId);

      if (hasEntry && entryId) {
        // UPDATE - PUT API
        // Use stage_id (from API response) not project_stage_id
        const response = await axiosClient.put(
          `/projects/${projectId}/stages/${stageId}/entries/${entryId}`,
          { content: content }
        );

        if (response.data) {
          toast.success("Stage content updated successfully!");
          // Update last entry ID if needed
          setLastEntryIds(prev => ({ ...prev, [stageId]: entryId }));
        }
      } else {
        // CREATE - POST API
        // Use stage_id (from API response) not project_stage_id
        const response = await axiosClient.post(
          `/projects/${projectId}/stages/${stageId}/entries`,
          {
            content: content
            // user_id backend se automatically handle ho raha hoga
          }
        );

        if (response.data) {
          toast.success("Stage content saved successfully!");
          // Store the new entry ID
          if (response.data.id) {
            setLastEntryIds(prev => ({ ...prev, [stageId]: response.data.id }));
          }
        }
      }

      // Refresh stages data after save/update
      setTimeout(() => {
        const fetchProjectStages = async () => {
          const response = await axiosClient.get(`/projects/${projectId}/stages`);
          if (response.data && response.data.stages) {
            dispatch(setProjectStages(response.data));

            // Update entry IDs after refresh
            const newEntryIds = {};
            response.data.stages.forEach(stage => {
              if (stage.stage_entries && stage.stage_entries.length > 0) {
                const latestEntry = stage.stage_entries[stage.stage_entries.length - 1];
                newEntryIds[stage.stage_id] = latestEntry.id;
              }
            });
            setLastEntryIds(prev => ({ ...prev, ...newEntryIds }));
          }
        };
        fetchProjectStages();
      }, 500);

    } catch (error) {
      console.error("API Error Details:", error);
      const errorMsg = error.response?.data?.message || error.message || "Failed to save/update content";
      toast.error(errorMsg);
    }
  };

  // Handle save/update button click
  const handleSaveOrUpdate = (stageId) => {
    const content = textAreaValues[stageId] || '';
    if (content.trim()) {
      saveOrUpdateStageContent(stageId, content);
    } else {
      toast.warning("Please enter some content before saving");
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleApproved = () => {
    setIsApproveModalOpen(true);
  };

  const handleRequestedUpdate = () => {
    console.log("Requested Update button clicked");
  };

  const handleNote = () => {
    setIsNoteModalOpen(true);
  };

  const handleUpdate = () => {
    if (editingStageId) {
      setTextAreaValues(prev => ({
        ...prev,
        [editingStageId]: editTextValue
      }));
      saveOrUpdateStageContent(editingStageId, editTextValue);
    }
    setIsEditModalOpen(false);
    setEditingStageId(null);
  };

  const handleUpdateNote = () => {
    // Handle note update logic
    setIsNoteModalOpen(false);
  };

  const handleCloseModalNote = () => {
    setIsEditModalOpen(false);
    setEditingStageId(null);
  };

  const handleCloseApproveModal = () => {
    setIsApproveModalOpen(false);
  };

  const handleCloseNoteModal = () => {
    setIsNoteModalOpen(false);
  };

  // Function to get stage entries for table
  const getStageEntriesForTable = (stage) => {
    if (!stage.stage_entries || stage.stage_entries.length === 0) return [];

    return stage.stage_entries.map((entry, index) => ({
      id: entry.id || index,
      stage: stage.stage_id,
      name: `User ${entry.user_id}`,
      text: entry.content,
      status: "Pending",
      created_at: entry.created_at
    }));
  };

  if (stageLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading stages...</div>
        </div>
      </Layout>
    );
  }

  if (stageError) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error: {stageError}</div>
        </div>
      </Layout>
    );
  }

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
            onClick={handleNote}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Add Note
          </button>
        </div>
      </div>

      <div className="my-3">
        <button
          onClick={handleNote}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors mx-3"
        >
          Add Note
        </button>
      </div>

      {/* Dynamic Stages Grid */}
      <div className="grid grid-cols-12 gap-4">
        {projectStages.map((stage) => {
          const hasEntry = hasEntries(stage.stage_id);

          return (
            <div key={stage.project_stage_id} className="col-span-12 md:col-span-4">
              <div className="bg-white h-full rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {stage.stage_name}
                </h2>
                <p className="text-[13px] text-gray-600 mb-2 whitespace-pre-line">
                  {stage.stage_title}
                </p>

                {/* Editable textarea */}
                <textarea
                  value={textAreaValues[stage.stage_id] || ''}
                  onChange={(e) => handleTextareaChange(stage.stage_id, e.target.value)}
                  placeholder="Type your content here..."
                  className="w-full min-h-[280px] p-3 border text-[10px] border-gray-300 rounded-lg resize-none outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

                {/* Status Badge */}
                <div className="mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${stage.status === 'completed' ? 'bg-green-100 text-green-800' :
                    stage.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                    {stage.status?.charAt(0).toUpperCase() + stage.status?.slice(1) || 'Pending'}
                  </span>
                  {stage.entries_count > 0 && (
                    <span className="ml-2 text-xs text-gray-500">
                      {stage.entries_count} entries
                    </span>
                  )}
                </div>

                {/* Buttons Container */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      setActiveStage(stage.stage_id);
                      handleApproved();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    title="Approve"
                  >
                    <ListChecks />
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    title="Audio"
                  >
                    <AudioWaveformIcon />
                  </button>
                  <button
                    onClick={() => {
                      setEditingStageId(stage.stage_id);
                      setEditTextValue(textAreaValues[stage.stage_id] || '');
                      setIsEditModalOpen(true);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    title="Edit"
                  >
                    <AudioWaveform />
                  </button>

                  {/* Conditional Save/Update Button */}
                  {hasEntry ? (
                    <button
                      onClick={() => handleSaveOrUpdate(stage.stage_id)}
                      className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
                      title="Update"
                    >
                      <Save />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSaveOrUpdate(stage.stage_id)}
                      className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
                      title="Save"
                    >
                      <Download />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Edit {projectStages.find(s => s.stage_id === editingStageId)?.stage_name || 'Stage'}
              </h3>
            </div>
            <div className="p-6">
              <textarea
                value={editTextValue}
                onChange={(e) => setEditTextValue(e.target.value)}
                placeholder="Edit your text here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none outline-none shadow-none"
              />
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCloseModalNote}
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

      {/* Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Add Note</h3>
            </div>
            <div className="p-6">
              <textarea
                value={editNoteValue}
                onChange={(e) => setEditNoteValue(e.target.value)}
                placeholder="Add your note here..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none outline-none shadow-none"
              />
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCloseNoteModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateNote}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleCloseApproveModal}
          ></div>
          <div className="fixed right-0 top-0 h-full w-full max-w-5xl bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Stage {activeStage}
                  </h3>
                  <button
                    onClick={handleCloseApproveModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Dynamic Tabs based on project stages */}
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {projectStages.map((stage) => (
                    <button
                      key={stage.stage_id}
                      onClick={() => setActiveStage(stage.stage_id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeStage === stage.stage_id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {stage.stage_name}
                    </button>
                  ))}
                </div>
              </div>

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
                      {getStageEntriesForTable(
                        projectStages.find(stage => stage.stage_id === activeStage) || {}
                      ).map((item) => (
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
                <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" />
    </Layout>
  );
}
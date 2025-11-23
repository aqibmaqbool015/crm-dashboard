"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../components/Layout";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setUsers,
  setLoading,
  setError,
  deleteUser,
} from "@/lib/store/slices/usersSlice";
import axiosClient from "@/lib/axiosClient";
import { toast } from "react-toastify";

export default function UsersPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { users, pagination, isLoading, error } = useAppSelector(
    (state) => state.users
  );
  console.log("usersusers", users);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fetch users
  const fetchUsers = async (page = 1) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosClient.get(`/admin/fetch-users?page=${page}`);

      const transformedUsers = response?.data?.data?.map((user, index) => ({
        id: user?.id,
        number: (page - 1) * response.data.meta.per_page + index + 1,
        name: user?.full_name,
        email: user?.email,
        moduleName: user?.module_name || "No modules",
        createdAt: user?.created_at,
        formattedDate: formatDate(user?.created_at),
      }));

      dispatch(
        setUsers({
          users: transformedUsers,
          pagination: response?.data?.meta,
        })
      );
    } catch (error) {
      dispatch(setError("Failed to load users"));
      toast.error("Failed to load users");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosClient.delete(`/admin/users/${userId}`);
        dispatch(deleteUser(userId));
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      fetchUsers(newPage);
    }
  };

  // Rest of your UI code remains exactly the same...
  // [Keep all your existing JSX code here - it will work without changes]

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                <p className="text-gray-600 mt-1">
                  Manage system users and their permissions.
                </p>
              </div>
              <button
                onClick={() => router.push("/create-user")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
              >
                <Plus className="w-5 h-5 text-white mx-1" />
                Add User
              </button>
            </div>
          </div>

          {/* Your existing table JSX */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Module Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users?.map((user) => (
                    <tr key={user?.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user?.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                        {user?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user?.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 max-w-xs truncate">
                          {user?.moduleName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user?.formattedDate}
                        {/*  */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user?.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {users?.length > 0 && (
              <div className="mt-6 flex items-center justify-between p-4">
                <div className="text-sm text-gray-700">
                  Showing{" "}
                  {(pagination.current_page - 1) * pagination.per_page + 1} to{" "}
                  {Math.min(
                    pagination.current_page * pagination.per_page,
                    pagination.total
                  )}{" "}
                  of {pagination.total} results
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handlePageChange(pagination.current_page - 1)
                    }
                    disabled={pagination.current_page === 1}
                    className="p-2 border rounded disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm">
                    Page {pagination.current_page} of {pagination.last_page}
                  </span>
                  <button
                    onClick={() =>
                      handlePageChange(pagination.current_page + 1)
                    }
                    disabled={pagination.current_page === pagination.last_page}
                    className="p-2 border rounded disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

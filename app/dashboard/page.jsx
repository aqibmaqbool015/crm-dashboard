"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardPage() {
    const router = useRouter();
    const { userInfo } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!userInfo) {
            router.push("/auth/login");
        }
    }, [userInfo, router]);

    if (!userInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <ProtectedRoute>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span>Welcome, {userInfo?.name || userInfo?.email}</span>
                        <button
                            onClick={() => {
                                // Handle logout through Redux
                                if (typeof window !== 'undefined') {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user");
                                }
                                router.push("/auth/login");
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Your dashboard content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Total Users</h3>
                        <p className="text-2xl font-bold">150</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Projects</h3>
                        <p className="text-2xl font-bold">45</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Inspections</h3>
                        <p className="text-2xl font-bold">89</p>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
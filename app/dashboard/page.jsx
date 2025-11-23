"use client";
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { authService } from '@/services/authService';

export default function DashboardPage() {
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        window.location.href = '/auth/login';
    };

    return (
        <ProtectedRoute>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span>Welcome, {user?.name || user?.email}</span>
                        <button
                            onClick={handleLogout}
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
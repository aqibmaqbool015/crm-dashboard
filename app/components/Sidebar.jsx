"use client";
import { usePathname } from "next/navigation";
import { LayoutDashboard, File, Settings, MessageSquare, Projector, User, InspectIcon, Activity, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();
  
  // Get user from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // All menu items
  const allMenuItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/" },
    { name: "All Projects", icon: <Projector />, path: "/projects" },
    { name: "Users", icon: <User />, path: "/users" },
    { name: "Complaint", icon: <File />, path: "/complaint" },
    { name: "Trustmark Audit", icon: <Settings />, path: "/trustmark" },
    { name: "C3 Inspection", icon: <InspectIcon />, path: "/inspection" },
    { name: "Notifications", icon: <AlertCircle />, path: "/notifications" },
    { name: "Activity Screen", icon: <Activity />, path: "/activity" },
    { name: "Chat", icon: <MessageSquare />, path: "/chat" },
  ];

  // Only C3 Inspection for non-admin users
  const userMenuItems = [
    { name: "C3 Inspection", icon: <InspectIcon />, path: "/inspection" },
  ];

  // Determine which menu items to show
  const getMenuItems = () => {
    if (!userInfo) {
      return userMenuItems; // Default to minimal menu
    }
    
    // Check if user is admin (is_admin = true)
    if (userInfo.is_admin === true || userInfo.role === 'admin') {
      return allMenuItems;
    }
    
    // For non-admin users
    return userMenuItems;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-bold text-gray-800">CRMS</h1>
            {userInfo && (
              <p className="text-xs text-gray-500 mt-1">
                {userInfo.full_name || userInfo.email}
                {userInfo.is_admin && <span className="ml-1">(Admin)</span>}
              </p>
            )}
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-4 mb-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main Menu
            </h2>
          </div>

          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === item.path
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
"use client";

import { LayoutDashboard, File, Settings, MessageSquare } from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard /> },
    { name: "Services", icon: <File /> },
    { name: "Settings", icon: <Settings /> },
    { name: "Chat", icon: <MessageSquare /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
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
          <h1 className="text-xl font-bold text-gray-800">CRMS</h1>
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
                <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors">
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

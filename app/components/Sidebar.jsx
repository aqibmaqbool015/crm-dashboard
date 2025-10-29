"use client";
import { usePathname } from "next/navigation";
import { LayoutDashboard, File, Settings, MessageSquare, Projector, User } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/" },
    { name: "All Projects", icon: <Projector />, path: "/projects" },
    { name: "Users", icon: <User />, path: "/users" },
    { name: "Services", icon: <File />, path: "/services" },
    { name: "Settings", icon: <Settings />, path: "/settings" },
    { name: "Chat", icon: <MessageSquare />, path: "/chat" },
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

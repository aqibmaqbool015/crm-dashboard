"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import { Bell, CheckCircle2, AlertCircle } from "lucide-react";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "info",
      title: "New user registered",
      message: "Bilal has joined your system.",
      date: "2025-11-02 10:30 AM",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Server Maintenance",
      message: "Scheduled maintenance tonight from 12 AM to 2 AM.",
      date: "2025-11-01 8:00 PM",
      read: true,
    },
    {
      id: 3,
      type: "success",
      title: "Backup Completed",
      message: "System backup was completed successfully.",
      date: "2025-10-30 5:45 PM",
      read: true,
    },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Notifications
              </h1>
              <p className="text-gray-600 mt-1">
                Stay updated with the latest system alerts and updates.
              </p>
            </div>
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg divide-y">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-5 flex justify-between items-start ${
                    n.read ? "bg-white" : "bg-blue-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {n.type === "success" && (
                      <CheckCircle2 className="text-green-500 w-5 h-5 mt-1" />
                    )}
                    {n.type === "warning" && (
                      <AlertCircle className="text-yellow-500 w-5 h-5 mt-1" />
                    )}
                    {n.type === "info" && (
                      <Bell className="text-blue-500 w-5 h-5 mt-1" />
                    )}

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {n.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {n.message}
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        {n.date}
                      </span>
                    </div>
                  </div>

                  {!n.read && (
                    <button
                      onClick={() => handleMarkAsRead(n.id)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Bell className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No notifications
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  You’re all caught up for now!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

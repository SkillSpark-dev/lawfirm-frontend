"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RiSearchLine,
  RiNotification3Line,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiCloseLine,
  RiDashboardLine,
  RiFolderChartLine,
  RiUserLine,
  RiCalendarLine,
  RiTeamLine,
  RiMessage3Line,
  RiFileListLine,
} from "react-icons/ri";

interface User {
  name: string;
  role: string;
  email: string;
}

export default function AdminNavbar() {
  const router = useRouter();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Example user (replace with auth data)
  const user: User = {
    name: "Jane Doe",
    role: "Administrator",
    email: "admin@legalease.com",
  };

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/admin/login");
  };

  const notifications = [
    {
      id: 1,
      title: "New case assigned",
      message: "You have been assigned to Smith vs. Johnson",
      time: "10 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Client appointment",
      message: "Meeting with Robert Brown in 30 minutes",
      time: "1 hour ago",
      read: false,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const NAV_ITEMS = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <RiDashboardLine size={20} /> },
    { href: "/admin/cases", label: "Cases", icon: <RiFolderChartLine size={20} /> },
    { href: "/admin/appointments", label: "Appointments", icon: <RiCalendarLine size={20} /> },
    { href: "/admin/clients", label: "Clients", icon: <RiUserLine size={20} /> },
    { href: "/admin/services", label: "Services", icon: <RiFileListLine size={20} /> },
    { href: "/admin/team", label: "Team", icon: <RiTeamLine size={20} /> },
    { href: "/admin/messages", label: "Messages", icon: <RiMessage3Line size={20} /> },
    { href: "/admin/settings", label: "Settings", icon: <RiSettings4Line size={20} /> },
  ];

  return (
    <>
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Hamburger */}
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <RiMenuLine size={20} />
            </button>
            <Link href="/admin/dashboard" className="ml-2 flex items-center">
              <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="ml-2 font-semibold text-blue-800 hidden sm:block">
                LegalEase Admin
              </span>
            </Link>
          </div>

          {/* Center: Search (hidden on small screens) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <RiSearchLine className="absolute inset-y-0 left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cases, clients, or documents..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right: Notifications, Settings, Profile */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <button
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 relative"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <RiNotification3Line size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b">
                    <h3 className="font-medium text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 border-b hover:bg-gray-50 ${
                          !n.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{n.title}</h4>
                          <span className="text-xs text-gray-500">{n.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Settings shortcut */}
            <button className="hidden sm:inline-flex p-2 rounded-md text-gray-600 hover:bg-gray-100">
              <RiSettings4Line size={18} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 p-1 rounded-md hover:bg-gray-100"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-800 font-semibold text-sm">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    href="/admin/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <RiSettings4Line className="mr-2" />
                    Settings
                  </Link>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <RiLogoutBoxRLine className="mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <RiSearchLine className="absolute inset-y-0 left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 lg:hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="font-semibold text-blue-800">LegalEase</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <RiCloseLine size={20} />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {NAV_ITEMS.map(({ href, label, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {icon}
                    <span className="ml-3">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

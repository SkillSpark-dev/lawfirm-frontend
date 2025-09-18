"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiDashboardLine,
  RiFolderChartLine,
  RiMoneyDollarCircleLine,
  RiFileListLine,
  RiMenuLine,
  RiCloseLine,
  RiTeamLine,
} from "react-icons/ri";
import { ImImages } from "react-icons/im";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navLinks: NavItem[] = [
  { href: "/admin/home", label: "Home", icon: <RiDashboardLine size={20} /> },
  { href: "/admin/about", label: "About", icon: <RiDashboardLine size={20} /> },
  { href: "/admin/aboutsection", label: "About Section", icon: <RiDashboardLine size={20} /> },
  { href: "/admin/appointment", label: "Appointment", icon: <RiFolderChartLine size={20} /> },
  { href: "/admin/team", label: "Team", icon: <RiTeamLine size={20} /> },
  { href: "/admin/services", label: "Services", icon: <RiMoneyDollarCircleLine size={20} /> },
  { href: "/admin/contact", label: "Contact", icon: <RiFileListLine size={20} /> },
  { href: "/admin/testimonial", label: "Testimonial", icon: <ImImages size={20} /> },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1024);
      setMobileOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) setCollapsed((prev) => !prev);
    else setMobileOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    if (window.innerWidth < 1024) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-blue-850 text-gray-950 shadow-lg z-50
          flex flex-col transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-700 bg-cyan-950">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="relative w-8 h-8 rounded overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-sm sm:text-base">Murali Dhar Mishra</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded hover:bg-blue-700 transition-colors"
          >
            {collapsed ? <RiMenuLine size={20} /> : <RiCloseLine size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 sm:p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navLinks.map(({ href, label, icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      flex items-center rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm transition-color
                      ${isActive ? "bg-blue-700 text-white" : "text-gray-950 hover:bg-blue-700 hover:text-white"}
                    `}
                    onClick={closeMobileSidebar}
                  >
                    <span className="flex-shrink-0">{icon}</span>
                    {!collapsed && <span className="ml-3">{label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-blue-700">
          <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">A</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Murali Dhar Mishra</p>
                  <p className="text-xs text-blue-200">Administrator</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile menu button */}
      {!mobileOpen && (
        <button
          className="fixed bottom-4 left-4 bg-blue-850 text-white p-3 rounded-full shadow-lg z-40 lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <RiMenuLine size={20} />
        </button>
      )}
    </>
  );
}

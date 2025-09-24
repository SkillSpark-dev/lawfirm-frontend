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
  RiCloseLine,
  RiTeamLine,
} from "react-icons/ri";
import { ImImages } from "react-icons/im";
import { TbFileDescription } from "react-icons/tb";
import { CiCircleInfo } from "react-icons/ci";
interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  logout: () => void;
  setMobileOpen?: (open: boolean) => void; // optional for desktop
}

const navLinks: NavItem[] = [
  { href: "/admin/home", label: "Home", icon: <RiDashboardLine size={20} /> },
  { href: "/admin/about", label: "About", icon: <CiCircleInfo size={20} /> },
  { href: "/admin/aboutsection", label: "About Section", icon: <TbFileDescription  size={20} /> },
  { href: "/admin/appointment", label: "Appointment", icon: <RiFolderChartLine size={20} /> },
  { href: "/admin/team", label: "Team", icon: <RiTeamLine size={20} /> },
  { href: "/admin/services", label: "Services", icon: <RiMoneyDollarCircleLine size={20} /> },
  { href: "/admin/contact", label: "Contact", icon: <RiFileListLine size={20} /> },
  { href: "/admin/testimonial", label: "Testimonial", icon: <ImImages size={20} /> },
];

export default function Sidebar({ logout, setMobileOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setCollapsed(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-700 bg-cyan-950">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8 rounded overflow-hidden">
              <Image src="/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <span className="font-semibold text-sm sm:text-base">Murali Dhar Mishra</span>
          </div>
        )}

        {/* Mobile Close Button */}
        {isMobile && setMobileOpen && (
          <button
            className="p-1 rounded hover:bg-blue-700 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <RiCloseLine size={20} />
          </button>
        )}
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
                  className={`flex items-center rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-sm transition-colors
                  ${isActive ? "bg-blue-700 text-white" : "text-gray-950 hover:bg-blue-700 hover:text-white"}`}
                >
                  <span className="flex-shrink-0">{icon}</span>
                  <span className="ml-3">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer with logout */}
      <div className="p-4 border-t border-blue-700 mt-auto">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 rounded hover:bg-red-600 hover:text-white transition-colors w-full"
        >
          <RiCloseLine size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

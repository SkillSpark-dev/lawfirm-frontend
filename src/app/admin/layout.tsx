"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Sidebar from "@/compnents/Admin/sidebar";
import { GiHamburgerMenu } from "react-icons/gi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<null | { token: string }>(null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
    setSidebarOpen(false);
  }, [router]);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setUser({ token });
  }, [router]);

  if (!mounted) return null;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0 lg:h-screen fixed lg:top-0 lg:left-0 z-50">
        <Sidebar logout={logout} />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-blue-800 text-white z-50 transform transition-transform duration-300 shadow-lg lg:hidden`}
        style={{ transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <Sidebar logout={logout} setMobileOpen={setSidebarOpen} />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col w-full lg:ml-64 p-4 sm:p-6 lg:p-8 overflow-auto transition-all duration-300">
        {children}
      </main>

      {/* Mobile toggle button */}
      {!sidebarOpen && (
        <button
          className="fixed top-4 right-4 z-[60] p-3 bg-gray-800 text-white rounded-full shadow-lg lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <GiHamburgerMenu size={20} />
        </button>
      )}
    </div>
  );
}

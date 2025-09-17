"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar/page";
import { GiHamburgerMenu } from "react-icons/gi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<null | object>(null);

  useEffect(() => {
    setMounted(true);

    // ✅ Check auth token
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // (Optional) You could validate token with backend
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/validate`, {
    //   headers: { Authorization: `Bearer ${token}` }
    // })
    //   .then(res => {
    //     if (!res.ok) throw new Error("Invalid token");
    //     return res.json();
    //   })
    //   .then(data => setUser(data.user))
    //   .catch(() => router.push("/login"));

    // For now, just mark user as logged in
    setUser({ token });
  }, [router]);

  if (!mounted) return null;
  if (!user) return null; // no user yet → show nothing (or a loading spinner)

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0 lg:h-screen fixed lg:top-0 lg:left-0 z-20">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Panel */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-blue-850 text-white z-50 transform transition-transform duration-300 lg:hidden shadow-lg`}
        style={{ transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full lg:ml-64 p-4 sm:p-6 lg:p-8 overflow-auto transition-all duration-300">
        {children}
      </main>

      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-60 p-3 bg-blue-850 text-white rounded-full shadow-lg lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <GiHamburgerMenu size={20} />
      </button>
    </div>
  );
}

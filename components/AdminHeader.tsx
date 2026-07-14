"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Store, LogOut, LayoutDashboard, ChevronRight, RefreshCw } from "lucide-react";

interface AdminHeaderProps {
  onRefresh?: () => void;
  title?: string;
  subtitle?: string;
  backHref?: string;
}

export default function AdminHeader({ onRefresh, title, subtitle, backHref }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const isDetail = !!backHref;

  return (
    <header className="bg-gradient-to-r from-[#011f6d] via-[#0a2f8a] to-[#011f6d] shadow-lg">
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          {/* Brand */}
          <Link href="/admin" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-[#ffaa4d] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Store size={14} className="text-[#011f6d]" />
            </div>
            <span className="text-white font-bold text-sm tracking-tight">Admin Panel</span>
            <span className="hidden sm:block text-white/30 text-xs">— UMKM Desa Kanten</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
                title="Refresh data"
              >
                <RefreshCw size={14} />
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs px-3 py-1.5 rounded-lg hover:bg-white/10 transition"
            >
              <LogOut size={13} />
              <span className="hidden sm:block">Keluar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Page title bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-white/40 text-xs mb-2">
          <LayoutDashboard size={11} />
          <Link href="/admin" className="hover:text-white/70 transition">Dashboard</Link>
          {isDetail && (
            <>
              <ChevronRight size={10} />
              <span className="text-white/60">{title}</span>
            </>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {backHref && (
              <Link
                href={backHref}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
              >
                <ChevronRight size={16} className="rotate-180" />
              </Link>
            )}
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">
                {title ?? "Dashboard"}
              </h1>
              {subtitle && (
                <p className="text-white/50 text-xs mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Decorative accent */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ffaa4d] opacity-80" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffaa4d] opacity-50" />
            <span className="w-1 h-1 rounded-full bg-[#ffaa4d] opacity-30" />
          </div>
        </div>
      </div>
    </header>
  );
}

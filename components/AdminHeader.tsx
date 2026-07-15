"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, LayoutDashboard } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  onRefresh?: () => void;
}

export default function AdminHeader({ title, subtitle, backHref, onRefresh }: AdminHeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Left: back / logo */}
          <div className="flex items-center gap-3">
            {backHref ? (
              <Link
                href={backHref}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#011f6d] hover:bg-[#011f6d]/8 transition"
                aria-label="Kembali"
              >
                <ArrowLeft size={16} />
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#011f6d] rounded-lg flex items-center justify-center shrink-0">
                  <LayoutDashboard size={13} className="text-white" />
                </div>
              </div>
            )}

            <div className="leading-tight">
              <p className="font-bold text-gray-900 text-sm">{title}</p>
              {subtitle && <p className="text-[11px] text-gray-400">{subtitle}</p>}
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#011f6d] hover:bg-[#011f6d]/8 transition"
                aria-label="Refresh"
              >
                <RefreshCw size={14} />
              </button>
            )}
            <button
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                router.push("/admin/login");
              }}
              className="text-xs text-gray-400 hover:text-red-500 transition px-2 py-1 rounded-lg hover:bg-red-50 font-medium"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

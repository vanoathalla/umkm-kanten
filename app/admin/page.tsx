"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, type UMKMRow } from "@/lib/supabase";
import { Plus, Pencil, Trash2, LogOut, Store, RefreshCw, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const [umkmList, setUmkmList] = useState<UMKMRow[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("umkm")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setUmkmList(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Hapus "${nama}"? Aksi ini tidak bisa dibatalkan.`)) return;
    setDeleting(id);
    await supabase.from("umkm").delete().eq("id", id);
    setDeleting(null);
    fetchData();
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Topbar */}
      <header className="bg-[#011f6d] px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#ffaa4d] rounded-lg flex items-center justify-center">
            <Store size={16} className="text-[#011f6d]" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Admin Panel</p>
            <p className="text-white/40 text-[10px]">UMKM Desa Kanten</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
            title="Refresh"
          >
            <RefreshCw size={15} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs px-3 py-1.5 rounded-lg hover:bg-white/10 transition"
          >
            <LogOut size={13} /> Keluar
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total UMKM", value: umkmList.length },
            { label: "Featured",   value: umkmList.filter(u => u.featured).length },
            { label: "RT Terisi",  value: new Set(umkmList.map(u => u.rt)).size },
            { label: "Kategori",   value: new Set(umkmList.map(u => u.kategori)).size },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-[#011f6d] dark:text-[#ffaa4d]">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Header list */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900 dark:text-white text-base">Daftar UMKM</h2>
          <Link
            href="/admin/umkm/baru"
            className="flex items-center gap-1.5 bg-[#011f6d] hover:bg-[#1a3d96] text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
          >
            <Plus size={14} /> Tambah UMKM
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">
            <AlertCircle size={15} /> {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-gray-400 text-sm">Memuat data...</div>
          ) : umkmList.length === 0 ? (
            <div className="py-16 text-center">
              <Store size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Belum ada UMKM. Tambahkan yang pertama!</p>
              <Link href="/admin/umkm/baru" className="inline-flex items-center gap-1.5 mt-4 bg-[#011f6d] text-white text-xs font-semibold px-4 py-2 rounded-xl">
                <Plus size={13} /> Tambah UMKM
              </Link>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/10 text-xs text-gray-400 uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-medium">Nama</th>
                  <th className="text-left px-3 py-3 font-medium hidden sm:table-cell">RT</th>
                  <th className="text-left px-3 py-3 font-medium hidden sm:table-cell">Kategori</th>
                  <th className="text-right px-5 py-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {umkmList.map((u, i) => (
                  <tr
                    key={u.id}
                    className={`border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition ${i % 2 === 0 ? "" : ""}`}
                  >
                    <td className="px-5 py-3">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm truncate max-w-[200px]">{u.nama}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{u.whatsapp || "—"}</p>
                    </td>
                    <td className="px-3 py-3 hidden sm:table-cell">
                      <span className="text-xs bg-[#011f6d]/8 dark:bg-[#ffaa4d]/10 text-[#011f6d] dark:text-[#ffaa4d] px-2 py-1 rounded-full">
                        {u.rt}
                      </span>
                    </td>
                    <td className="px-3 py-3 hidden sm:table-cell text-xs text-gray-500 dark:text-gray-400">{u.kategori}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/umkm/${u.id}`}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#011f6d]/8 hover:bg-[#011f6d] text-[#011f6d] hover:text-white transition"
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </Link>
                        <button
                          onClick={() => handleDelete(u.id, u.nama)}
                          disabled={deleting === u.id}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-500 text-red-500 hover:text-white transition disabled:opacity-50"
                          title="Hapus"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

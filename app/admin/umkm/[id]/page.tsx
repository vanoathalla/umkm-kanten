"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, type UMKMRow } from "@/lib/supabase";
import { ChevronLeft, Plus, Trash2, Save, Loader2 } from "lucide-react";
import Link from "next/link";

const kategoriList = ["Makanan", "Minuman", "Kerajinan", "Fashion", "Pertanian", "Jasa", "Lainnya"];
const rtList = ["RT 01", "RT 02", "RT 03", "RT 04", "RT 05"];

const emptyForm: Omit<UMKMRow, "created_at"> = {
  id: "", nama: "", logo: "", cover: "", kategori: "Makanan",
  deskripsi: "", sejarah: "", alamat: "", rt: "RT 01",
  maps: "", whatsapp: "", instagram: "", facebook: "",
  shopee: "", tokopedia: "", jamOperasional: "",
  featured: false, produk: [], galeri: [],
};

type ProdukItem = { id: string; nama: string; foto: string; harga: number; deskripsi: string; status: string };

const input = "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#011f6d] outline-none";
const inputSm = "w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg px-2 py-1.5 text-xs focus:ring-2 focus:ring-[#011f6d] outline-none";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-gray-500">{label}</label>
    {children}
  </div>
);

export default function UMKMFormPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const isNew = id === "baru";
  const router = useRouter();

  const [form, setForm]       = useState<Omit<UMKMRow, "created_at">>(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isNew) return;
    supabase.from("umkm").select("*").eq("id", id).single().then(({ data }) => {
      if (data) setForm(data);
      setLoading(false);
    });
  }, [id, isNew]);

  const set = (key: keyof typeof form, val: unknown) =>
    setForm(f => ({ ...f, [key]: val }));

  const addProduk = () => {
    const np: ProdukItem = { id: Date.now().toString(), nama: "", foto: "", harga: 0, deskripsi: "", status: "tersedia" };
    set("produk", [...form.produk, np]);
  };

  const updateProduk = (i: number, key: keyof ProdukItem, val: string | number) => {
    const p = [...form.produk] as ProdukItem[];
    p[i] = { ...p[i], [key]: val };
    set("produk", p);
  };

  const removeProduk = (i: number) => {
    set("produk", (form.produk as ProdukItem[]).filter((_, idx) => idx !== i));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      id: form.id || form.nama.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    };

    const { error } = isNew
      ? await supabase.from("umkm").insert(payload)
      : await supabase.from("umkm").update(payload).eq("id", id);

    setSaving(false);
    if (error) { setError(error.message); return; }
    setSuccess(true);
    setTimeout(() => router.push("/admin"), 1000);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 size={24} className="animate-spin text-[#011f6d]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Topbar */}
      <header className="bg-[#011f6d] px-4 sm:px-6 py-4 flex items-center gap-3">
        <Link href="/admin" className="text-white/60 hover:text-white transition">
          <ChevronLeft size={20} />
        </Link>
        <div>
          <p className="text-white font-bold text-sm">{isNew ? "Tambah UMKM Baru" : "Edit UMKM"}</p>
          <p className="text-white/40 text-[10px]">{isNew ? "Isi form di bawah" : `ID: ${id}`}</p>
        </div>
      </header>

      <form onSubmit={handleSave} className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Error / Success */}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">Tersimpan! Mengarahkan...</div>}

        {/* Informasi Dasar */}
        <Section title="Informasi Dasar">
          <Field label="Nama UMKM *">
            <input required value={form.nama} onChange={e => set("nama", e.target.value)}
              className={input} placeholder="Contoh: Barokah Snack Bu Sugiyem" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Kategori *">
              <select value={form.kategori} onChange={e => set("kategori", e.target.value)} className={input}>
                {kategoriList.map(k => <option key={k}>{k}</option>)}
              </select>
            </Field>
            <Field label="RT *">
              <select value={form.rt} onChange={e => set("rt", e.target.value)} className={input}>
                {rtList.map(r => <option key={r}>{r}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Deskripsi Singkat *">
            <textarea required value={form.deskripsi} onChange={e => set("deskripsi", e.target.value)}
              rows={3} className={input} placeholder="Deskripsi singkat tentang UMKM..." />
          </Field>
          <Field label="Sejarah / Cerita UMKM">
            <textarea value={form.sejarah} onChange={e => set("sejarah", e.target.value)}
              rows={4} className={input} placeholder="Cerita latar belakang dan perjalanan UMKM..." />
          </Field>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="featured" checked={form.featured}
              onChange={e => set("featured", e.target.checked)}
              className="w-4 h-4 accent-[#011f6d]" />
            <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">
              Tampilkan di bagian UMKM Unggulan
            </label>
          </div>
        </Section>

        {/* Kontak & Lokasi */}
        <Section title="Kontak & Lokasi">
          <Field label="Alamat *">
            <input required value={form.alamat} onChange={e => set("alamat", e.target.value)}
              className={input} placeholder="Alamat lengkap..." />
          </Field>
          <Field label="No. WhatsApp * (format: 628xxx)">
            <input required value={form.whatsapp} onChange={e => set("whatsapp", e.target.value)}
              className={input} placeholder="628123456789" />
          </Field>
          <Field label="Jam Operasional *">
            <input required value={form.jamOperasional} onChange={e => set("jamOperasional", e.target.value)}
              className={input} placeholder="08.00 - 17.00 WIB (Setiap Hari)" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Instagram (opsional)">
              <input value={form.instagram} onChange={e => set("instagram", e.target.value)}
                className={input} placeholder="username_tanpa_@" />
            </Field>
            <Field label="Facebook (opsional)">
              <input value={form.facebook} onChange={e => set("facebook", e.target.value)}
                className={input} placeholder="nama.facebook" />
            </Field>
            <Field label="Shopee (opsional)">
              <input value={form.shopee} onChange={e => set("shopee", e.target.value)}
                className={input} placeholder="https://shopee.co.id/..." />
            </Field>
            <Field label="Tokopedia (opsional)">
              <input value={form.tokopedia} onChange={e => set("tokopedia", e.target.value)}
                className={input} placeholder="https://tokopedia.com/..." />
            </Field>
          </div>
          <Field label="Link Google Maps (opsional)">
            <input value={form.maps} onChange={e => set("maps", e.target.value)}
              className={input} placeholder="https://maps.google.com/?q=..." />
          </Field>
        </Section>

        {/* Produk */}
        <Section title="Produk">
          <div className="space-y-3">
            {(form.produk as ProdukItem[]).map((p, i) => (
              <div key={p.id} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Produk {i + 1}</span>
                  <button type="button" onClick={() => removeProduk(i)}
                    className="text-red-400 hover:text-red-600 transition">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Nama Produk">
                    <input value={p.nama} onChange={e => updateProduk(i, "nama", e.target.value)}
                      className={inputSm} placeholder="Nama produk" />
                  </Field>
                  <Field label="Harga (Rp)">
                    <input type="number" value={p.harga} onChange={e => updateProduk(i, "harga", Number(e.target.value))}
                      className={inputSm} placeholder="15000" />
                  </Field>
                </div>
                <Field label="Deskripsi Produk">
                  <input value={p.deskripsi} onChange={e => updateProduk(i, "deskripsi", e.target.value)}
                    className={inputSm} placeholder="Deskripsi singkat produk..." />
                </Field>
                <Field label="Status">
                  <select value={p.status} onChange={e => updateProduk(i, "status", e.target.value)} className={inputSm}>
                    <option value="tersedia">Tersedia</option>
                    <option value="habis">Habis</option>
                  </select>
                </Field>
              </div>
            ))}
          </div>
          <button type="button" onClick={addProduk}
            className="flex items-center gap-2 text-[#011f6d] dark:text-[#ffaa4d] text-sm font-semibold hover:underline mt-1">
            <Plus size={15} /> Tambah Produk
          </button>
        </Section>

        {/* Simpan */}
        <div className="flex items-center gap-3 pb-8">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 bg-[#011f6d] hover:bg-[#1a3d96] text-white font-semibold px-6 py-3 rounded-xl transition disabled:opacity-50 text-sm">
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-600 transition">Batal</Link>
        </div>
      </form>
    </div>
  );
}



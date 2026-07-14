"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { supabase, type UMKMRow } from "@/lib/supabase";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";

const kategoriList = ["Makanan", "Minuman", "Kerajinan", "Fashion", "Pertanian", "Jasa", "Lainnya"];
const rtList = ["RT 01", "RT 02", "RT 03", "RT 04", "RT 05"];

type FormData = Omit<UMKMRow, "created_at"> & {
  instagram: string;
  facebook: string;
  shopee: string;
  tokopedia: string;
  jamOperasional: string;
};

const emptyForm: FormData = {
  id: "", nama: "", logo: "", cover: "", kategori: "Makanan",
  deskripsi: "", sejarah: "", alamat: "", rt: "RT 01",
  maps: "", whatsapp: "", instagram: "", facebook: "",
  shopee: "", tokopedia: "", jamOperasional: "",
  featured: false, produk: [], galeri: [],
};

type ProdukItem = { id: string; nama: string; foto: string; harga: number; deskripsi: string; status: string };

const input = "w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[#011f6d] outline-none placeholder-gray-400";
const inputSm = "w-full bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[#011f6d] outline-none placeholder-gray-400";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
    <h2 className="text-base font-bold text-gray-900 mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-gray-500">{label}</label>
    {children}
  </div>
);

export default function UMKMFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "baru";
  const router = useRouter();

  const [form, setForm]       = useState<FormData>(emptyForm);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isNew) return;
    setLoading(true);
    supabase.from("umkm").select("*").eq("id", id).single().then(({ data, error }) => {
      if (data && !error) {
        // Map all DB fields (snake_case) to form fields (camelCase)
        setForm({
          id:             data.id ?? "",
          nama:           data.nama ?? "",
          logo:           (data as any).logo ?? "",
          cover:          (data as any).cover ?? "",
          kategori:       data.kategori ?? "Makanan",
          deskripsi:      data.deskripsi ?? "",
          sejarah:        (data as any).sejarah ?? "",
          alamat:         data.alamat ?? "",
          rt:             data.rt ?? "RT 01",
          maps:           (data as any).maps ?? "",
          whatsapp:       (data as any).whatsapp ?? "",
          instagram:      (data as any).instagram ?? "",
          facebook:       (data as any).facebook ?? "",
          shopee:         (data as any).shopee ?? "",
          tokopedia:      (data as any).tokopedia ?? "",
          jamOperasional: (data as any).jam_operasional ?? "",
          featured:       (data as any).featured ?? false,
          produk:         Array.isArray((data as any).produk) ? (data as any).produk : [],
          galeri:         Array.isArray((data as any).galeri) ? (data as any).galeri : [],
        });
      }
      setLoading(false);
    });
  }, [id, isNew]);

  const set = (key: keyof FormData, val: unknown) =>
    setForm(f => ({ ...f, [key]: val }));

  const addProduk = () => {
    const np: ProdukItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      nama: "", foto: "", harga: 0, deskripsi: "", status: "tersedia",
    };
    set("produk", [...(form.produk as ProdukItem[]), np]);
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

    // Map camelCase → snake_case for DB, exclude jamOperasional key
    const { jamOperasional, ...rest } = form;
    const payload = {
      ...rest,
      id: form.id.trim() || form.nama.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      jam_operasional: jamOperasional,
    };

    const { error: dbError } = isNew
      ? await supabase.from("umkm").insert(payload)
      : await supabase.from("umkm").update(payload).eq("id", id);

    setSaving(false);
    if (dbError) { setError(dbError.message); return; }
    setSuccess(true);
    setTimeout(() => router.push("/admin"), 1200);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 size={24} className="animate-spin text-[#011f6d]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title={isNew ? "Tambah UMKM Baru" : `Edit: ${form.nama || id}`}
        subtitle={isNew ? "Isi form di bawah" : `ID: ${id}`}
        backHref="/admin"
      />

      <form onSubmit={handleSave} className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* Error / Success */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
            Tersimpan! Mengarahkan...
          </div>
        )}

        {/* Informasi Dasar */}
        <Section title="Informasi Dasar">
          <Field label="Nama UMKM *">
            <input required value={form.nama} onChange={e => set("nama", e.target.value)}
              className={input} placeholder="Contoh: Barokah Snack Bu Sugiyem" />
          </Field>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
            <label htmlFor="featured" className="text-sm text-gray-700 cursor-pointer">
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
          <Field label="Jam Operasional">
            <input value={form.jamOperasional} onChange={e => set("jamOperasional", e.target.value)}
              className={input} placeholder="08.00 - 17.00 WIB (Setiap Hari)" />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
        <Section title="Produk (Opsional)">
          <div className="space-y-3">
            {(form.produk as ProdukItem[]).map((p, i) => (
              <div key={p.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
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
            className="flex items-center gap-2 text-[#011f6d] text-sm font-semibold hover:underline mt-1">
            <Plus size={15} /> Tambah Produk
          </button>
          {(form.produk as ProdukItem[]).length === 0 && (
            <p className="text-xs text-gray-400">Produk kosong — tab Produk tidak akan ditampilkan di halaman publik.</p>
          )}
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

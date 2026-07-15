"use client";
import { useEffect, useRef, useState, use } from "react";
import { useRouter } from "next/navigation";
import { supabase, type UMKMRow } from "@/lib/supabase";
import { uploadImage } from "@/lib/upload";
import { Save, Loader2, ImageIcon, X, Upload, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AdminHeader from "@/components/AdminHeader";

const kategoriList = ["Makanan", "Minuman", "Kerajinan", "Fashion", "Pertanian", "Jasa", "Lainnya"];
const rtList = ["RT 01", "RT 02", "RT 03", "RT 04", "RT 05"];

type FormData = Omit<UMKMRow, "created_at" | "produk"> & {
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
  featured: false, galeri: [],
};

const input = "w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[#011f6d] outline-none placeholder-gray-400";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
    <h2 className="text-base font-bold text-gray-900 mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-gray-500">{label}</label>
    {children}
    {hint && <p className="text-[11px] text-gray-400">{hint}</p>}
  </div>
);

// ── Reusable image upload field ──────────────────────────────────
function ImageUploadField({
  label,
  hint,
  value,
  onChange,
  uploadFolder,
  previewClass,
  previewWidth,
  previewHeight,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
  uploadFolder: string;
  previewClass: string;
  previewWidth: number;
  previewHeight: number;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadImage(file, uploadFolder);
      onChange(url);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
      // reset input so same file can be re-selected
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <Field label={label} hint={hint}>
      <div className="flex flex-col gap-2">
        {/* Preview */}
        <div
          className={`${previewClass} border-2 border-dashed border-gray-200 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center relative group cursor-pointer`}
          onClick={() => fileRef.current?.click()}
        >
          {value ? (
            <>
              <Image
                src={value}
                alt="preview"
                width={previewWidth}
                height={previewHeight}
                className="object-cover w-full h-full"
                unoptimized
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <div className="text-white text-xs font-semibold flex items-center gap-1.5">
                  <Upload size={14} /> Ganti foto
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-4">
              {uploading
                ? <Loader2 size={24} className="animate-spin text-[#011f6d] mx-auto" />
                : <>
                    <Upload size={22} className="text-gray-300 mx-auto mb-1.5" />
                    <p className="text-xs text-gray-400">Klik untuk upload foto</p>
                    <p className="text-[11px] text-gray-300 mt-0.5">JPG, PNG, WEBP — maks 5MB</p>
                  </>
              }
            </div>
          )}
          {uploading && value && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Loader2 size={24} className="animate-spin text-[#011f6d]" />
            </div>
          )}
        </div>

        {/* URL input — tetap bisa input manual */}
        <div className="flex gap-2">
          <input
            value={value}
            onChange={e => onChange(e.target.value)}
            className={input + " text-[11px]"}
            placeholder="Atau tempel URL gambar langsung..."
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-400 hover:border-red-200 transition"
              title="Hapus foto"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {uploadError && (
          <p className="text-[11px] text-red-500">{uploadError}</p>
        )}

        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </Field>
  );
}

// ── Galeri upload field ──────────────────────────────────────────
function GaleriField({
  items,
  onChange,
}: {
  items: string[];
  onChange: (items: string[]) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    setUploadError("");
    try {
      const urls = await Promise.all(files.map(f => uploadImage(f, "galeri")));
      onChange([...items, ...urls]);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const updateItem = (i: number, val: string) => {
    const g = [...items];
    g[i] = val;
    onChange(g);
  };

  const removeItem = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <Field label="Foto Galeri (opsional)">
      <div className="space-y-2">
        {/* Existing items */}
        {items.map((url, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div
              className="w-12 h-12 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shrink-0 flex items-center justify-center cursor-pointer hover:border-[#011f6d]/40 transition"
              onClick={() => fileRef.current?.click()}
            >
              {url
                ? <Image src={url} alt={`galeri-${i}`} width={48} height={48} className="object-cover w-full h-full" unoptimized />
                : <ImageIcon size={14} className="text-gray-300" />
              }
            </div>
            <input
              value={url}
              onChange={e => updateItem(i, e.target.value)}
              className={input + " text-[11px]"}
              placeholder={`URL foto galeri ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="shrink-0 text-gray-300 hover:text-red-400 transition"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {/* Upload + add buttons */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 text-xs bg-[#011f6d] text-white font-semibold px-3 py-2 rounded-lg hover:bg-[#1a3d96] transition disabled:opacity-50"
          >
            {uploading
              ? <Loader2 size={13} className="animate-spin" />
              : <Upload size={13} />
            }
            {uploading ? "Mengupload..." : "Upload Foto"}
          </button>
          <button
            type="button"
            onClick={() => onChange([...items, ""])}
            className="flex items-center gap-1 text-xs text-[#011f6d] font-semibold hover:underline"
          >
            <Plus size={13} /> Tambah URL
          </button>
        </div>

        {uploadError && <p className="text-[11px] text-red-500">{uploadError}</p>}

        {/* Hidden multi-file input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </Field>
  );
}

// ── Main form page ───────────────────────────────────────────────
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
          galeri:         Array.isArray((data as any).galeri) ? (data as any).galeri : [],
        });
      }
      setLoading(false);
    });
  }, [id, isNew]);

  const set = (key: keyof FormData, val: unknown) =>
    setForm(f => ({ ...f, [key]: val }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
            Tersimpan! Mengarahkan...
          </div>
        )}

        {/* ── Foto ── */}
        <Section title="Foto">
          <ImageUploadField
            label="Foto Profil (Logo)"
            hint="Tampil sebagai ikon bulat di kartu katalog."
            value={form.logo}
            onChange={v => set("logo", v)}
            uploadFolder="logo"
            previewClass="w-24 h-24"
            previewWidth={96}
            previewHeight={96}
          />

          <ImageUploadField
            label="Foto Cover"
            hint="Tampil sebagai banner di bagian atas halaman detail."
            value={form.cover}
            onChange={v => set("cover", v)}
            uploadFolder="cover"
            previewClass="w-full h-40"
            previewWidth={600}
            previewHeight={160}
          />

          <GaleriField
            items={form.galeri as string[]}
            onChange={v => set("galeri", v)}
          />
        </Section>

        {/* ── Informasi Dasar ── */}
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

        {/* ── Kontak & Lokasi ── */}
        <Section title="Kontak & Lokasi">
          <Field label="Alamat *">
            <input required value={form.alamat} onChange={e => set("alamat", e.target.value)}
              className={input} placeholder="Alamat lengkap..." />
          </Field>
          <Field label="No. WhatsApp (format: 628xxx)">
            <input value={form.whatsapp} onChange={e => set("whatsapp", e.target.value)}
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

        {/* ── Simpan ── */}
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

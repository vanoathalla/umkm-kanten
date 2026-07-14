// Hapus entry lama dengan format RT "RT 1", "RT 2", dll (tanpa nol)
const { createClient } = require('@supabase/supabase-js');
const sb = createClient(
  'https://wdodrsbjnizedysminvk.supabase.co',
  'sb_publishable_9CZOPNWuL181AtnrIzTUGA_6krcPNxU'
);

async function run() {
  // Ambil semua yg RT-nya format lama (1 digit, tanpa nol)
  const { data, error } = await sb.from('umkm').select('id, nama, rt')
    .in('rt', ['RT 1', 'RT 2', 'RT 3', 'RT 4', 'RT 5']);

  if (error) { console.error(error); process.exit(1); }

  console.log(`Ditemukan ${data.length} entry lama untuk dihapus:`);
  data.forEach(r => console.log(` [${r.id}] ${r.rt} | ${r.nama}`));

  if (data.length === 0) { console.log('Tidak ada yang perlu dihapus.'); return; }

  const ids = data.map(r => r.id);
  const { error: delErr } = await sb.from('umkm').delete().in('id', ids);
  if (delErr) { console.error('Delete error:', delErr); process.exit(1); }

  console.log(`\nBerhasil hapus ${ids.length} entry lama.`);
}

run();

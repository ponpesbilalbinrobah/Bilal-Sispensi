# SISPENSI SANTRI - Pondok Pesantren Bilal Bin Robah

Sistem Presensi & Pemantauan Keaktifan Santri • Pondok Pesantren Bilal Bin Robah.

## 📖 Deskripsi
Aplikasi web modern untuk manajemen absensi harian santri, penilaian keaktifan kegiatan halaqoh dan pelajaran, master data santri & ustadz, serta portal pantau untuk wali santri.

## ✨ Fitur Utama
- **Dashboard & Statistik Presensi:** Monitoring kehadiran santri harian, tingkat kehadiran, dan rata-rata skor keaktifan.
- **Form Input Presensi Ustadz:**
  - Pilihan slot kegiatan pondok & kelas dengan combobox interaktif (pencarian teks real-time & max 7 baris scroll).
  - Penilaian status (Hadir, Sakit, Izin, Alpa) dan skor keaktifan (1.0 s.d 5.0) per santri.
  - Alat cepat: *Tandai Semua Hadir* dan *Set Semua Skor Aktif*.
- **Master Data:**
  - Data Santri (tambah manual & import massal via template CSV/Spreadsheet).
  - Data Ustadz & Pengampu.
  - Master Kelas & Halaqoh.
  - 11 Master Slot Jadwal Kegiatan Pondok.
- **Rekapitulasi & Laporan:**
  - Filter rentang tanggal, slot waktu, kelas, dan status kehadiran.
  - Ekspor data rekap ke file CSV dan format cetak laporan resmi.
- **Kustomisasi Tampilan:**
  - Pilihan Mode Gelap (Dark Navy) & Mode Terang (Clean Light).
  - Pilihan warna aksen dan wallpaper tema pesantren.
- **Backend Database Google Spreadsheet (Opsional):**
  - Dilengkapi file `Code.gs` untuk integrasi database Google Sheets gratis via Google Apps Script Web App API.

## 🚀 Cara Menjalankan
Aplikasi ini berbasis Vanilla HTML, CSS, dan JavaScript tanpa perlu build step yang rumit.

1. Buka terminal pada folder proyek ini.
2. Jalankan server lokal:
   ```bash
   node server.js
   ```
3. Buka peramban (browser) di:
   ```
   http://localhost:3000/
   ```
   atau cukup buka file `index.html` secara langsung.

## 🔐 Akun Masuk Bawaan
- **Ustadz / Pengajar:** Pilih nama ustadz pada dropdown, masukkan kata sandi `guru123`.
- **Wali Santri:** Pilih menu *Pantau Keaktifan Ananda* (masuk instan tanpa sandi).
- **Admin:** Klik *Login Admin Pondok*, masukkan sandi `admin123`.

---
© 2026 Pondok Pesantren Bilal Bin Robah. All rights reserved.

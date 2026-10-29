/**
 * SIPENSI SANTRI - PONDOK PESANTREN BILAL BIN ROBAH
 * Portal Tahfizh, Sistem Absensi & Pemantauan Keaktifan Santri
 * Fitur: Pengaturan Tema, Wallpaper & Font (Menu Roda Gigi)
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. MASTER DATA: 11 SLOT WAKTU KEGIATAN PONDOK
  // ==========================================================================
  const INITIAL_MASTER_SLOTS = [
    { id: 'slot-1', time: '05.20 - 06.00', startHour: 5, startMin: 20, endHour: 6, endMin: 0, name: 'Halaqoh Al Quran', desc: 'Setoran hafalan baru (Ziyadah) & tahsin ba\'da Shubuh', isBreak: false, icon: '📖' },
    { id: 'slot-2', time: '07.30 - 08.00', startHour: 7, startMin: 30, endHour: 8, endMin: 0, name: 'Apel Pagi', desc: 'Pengarahan kedisiplinan, doa, dan cek kerapian santri', isBreak: false, icon: '☀️' },
    { id: 'slot-3', time: '08.00 - 08.40', startHour: 8, startMin: 0, endHour: 8, endMin: 40, name: 'Pelajaran 1', desc: 'Nahwu & Shorof / Bahasa Arab Dasar', isBreak: false, icon: '📚' },
    { id: 'slot-4', time: '08.40 - 09.20', startHour: 8, startMin: 40, endHour: 9, endMin: 20, name: 'Pelajaran 2', desc: 'Fiqih Ibadah / Kitab Safinatun Najah', isBreak: false, icon: '🕌' },
    { id: 'slot-5', time: '09.20 - 10.00', startHour: 9, startMin: 20, endHour: 10, endMin: 0, name: 'Pelajaran 3', desc: 'Aqidah Akhlaq & Adabul Alim Wal Muta\'allim', isBreak: false, icon: '🌱' },
    { id: 'slot-6', time: '10.00 - 10.30', startHour: 10, startMin: 0, endHour: 10, endMin: 30, name: 'Istirahat', desc: 'Snack pagi, Sholat Dhuha berjamaah & istirahat santri', isBreak: true, icon: '☕' },
    { id: 'slot-7', time: '10.30 - 11.10', startHour: 10, startMin: 30, endHour: 11, endMin: 10, name: 'Pelajaran 4', desc: 'Ulumul Quran / Tajwid Praktis', isBreak: false, icon: '📜' },
    { id: 'slot-8', time: '11.10 - 11.50', startHour: 11, startMin: 10, endHour: 11, endMin: 50, name: 'Pelajaran 5', desc: 'Bahasa Inggris / Matematika & Sains Terpadu', isBreak: false, icon: '🔬' },
    { id: 'slot-9', time: '16.00 - 16.40', startHour: 16, startMin: 0, endHour: 16, endMin: 40, name: 'Halaqoh Tahfidz Murojaah atau Lughoh', desc: 'Penguatan hafalan lama (Murojaah) atau Muhadatsah Lughoh', isBreak: false, icon: '🗣️' },
    { id: 'slot-10', time: '18.30 - 19.10', startHour: 18, startMin: 30, endHour: 19, endMin: 10, name: 'Taklim Umum', desc: 'Kajian Kitab Riyadhis Shalihin ba\'da Maghrib', isBreak: false, icon: '🎙️' },
    { id: 'slot-11', time: '19.30 - 20.10', startHour: 19, startMin: 30, endHour: 20, endMin: 10, name: 'Halaqoh Al Quran', desc: 'Pendalaman makhraj, mutasyabihat & persiapan setoran esok', isBreak: false, icon: '✨' }
  ];

  let MASTER_SLOTS = JSON.parse(JSON.stringify(INITIAL_MASTER_SLOTS));

  const KEAKTIFAN_LABELS = {
    1: 'Perlu Bimbingan (1.0)',
    2: 'Kurang Aktif (2.0)',
    3: 'Cukup Aktif (3.0)',
    4: 'Aktif & Fokus (4.0)',
    5: 'Sangat Aktif (Mumtaz - 5.0)'
  };

  // ==========================================================================
  // 2. SETTINGS PRESETS (TEMA, WALLPAPER & FONT)
  // ==========================================================================
  const WALLPAPER_MAP = {
    'preset-default': 'radial-gradient(circle at top center, #0c1a2d 0%, #030811 100%)',
    'preset-emerald': 'linear-gradient(135deg, #064e3b 0%, #021a14 100%)',
    'preset-velvet': 'radial-gradient(circle at top right, #1e1b4b 0%, transparent 60%), radial-gradient(circle at bottom left, #0f172a 0%, transparent 50%), #020617',
    'preset-cosmic': 'linear-gradient(135deg, #0369a1 0%, #082f49 50%, #020617 100%)',
    'preset-slate': 'linear-gradient(135deg, #1e293b 0%, #0b1120 100%)',
    'preset-arabesque': 'radial-gradient(#0ea5e9 1px, transparent 1px)'
  };

  const FONT_MAP = {
    'jakarta': "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    'system': "'Segoe UI', system-ui, -apple-system, sans-serif",
    'amiri': "'Georgia', 'Amiri', serif",
    'poppins': "'Trebuchet MS', 'Poppins', sans-serif"
  };

  const DEFAULT_SETTINGS = {
    themeMode: 'dark',
    accentColor: '#0ea5e9',
    wallpaper: 'preset-default',
    fontFamily: 'jakarta',
    fontScale: '100%'
  };

  let appSettings = { ...DEFAULT_SETTINGS };

  // ==========================================================================
  // 3. SEED DATA (SANTRI & USTADZ BILAL BIN ROBAH)
  // ==========================================================================
  const INITIAL_SANTRI = [
    { id: 's-1', nis: '202607001', nama: 'Muhammad Rayhan Al-Fatih', gender: 'L', kelas: 'Kelas 7A', asrama: 'Kamar Bilal Bin Robah #01', wali: 'Bpk. Hendra Gunawan', wa: '081234567890', waliUser: 'wali.rayhan', musyrif: 'Ustadz Ahmad Fauzi', tahfidzCurrent: 4.5, tahfidzTarget: 5.0, tahfidzNotes: 'Juz 30, 29, 28, 27 (Mumtaz)' },
    { id: 's-2', nis: '202607002', nama: 'Fatimah Az-Zahra', gender: 'P', kelas: 'Kelas 7B', asrama: 'Kamar Sayyidah Khadijah #02', wali: 'Ibu Siti Rahmah', wa: '081298765432', waliUser: 'wali.fatimah', musyrif: 'Ustadz Faiz Ramadhan', tahfidzCurrent: 5.0, tahfidzTarget: 5.0, tahfidzNotes: 'Tuntas Target Semester 1 (Juz 30-26)' },
    { id: 's-3', nis: '202607003', nama: 'Ahmad Ziyad Al-Farabi', gender: 'L', kelas: 'Kelas 7A', asrama: 'Kamar Bilal Bin Robah #02', wali: 'Bpk. Zulkifli Farabi', wa: '081345678901', waliUser: 'wali.ziyad', musyrif: 'Ustadz Ahmad Fauzi', tahfidzCurrent: 3.5, tahfidzTarget: 5.0, tahfidzNotes: 'Murojaah Juz 29 berjalan' },
    { id: 's-4', nis: '202607004', nama: 'Muhammad Bilal Al-Habsyi', gender: 'L', kelas: 'Kelas 7A', asrama: 'Kamar Bilal Bin Robah #03', wali: 'Bpk. Munir Habsyi', wa: '081356789012', waliUser: 'wali.bilal', musyrif: 'Ustadz Ahmad Fauzi', tahfidzCurrent: 4.0, tahfidzTarget: 5.0, tahfidzNotes: 'Juz 30, 29 lancar' },
    { id: 's-5', nis: '202607005', nama: 'Aisha Humaira Syarif', gender: 'P', kelas: 'Kelas 7B', asrama: 'Kamar Sayyidah Khadijah #01', wali: 'Bpk. Syarif Hidayat', wa: '081234123412', waliUser: 'wali.aisha', musyrif: 'Ustadz Faiz Ramadhan', tahfidzCurrent: 4.8, tahfidzTarget: 5.0, tahfidzNotes: 'Tajwid sangat mumpuni' },
    { id: 's-6', nis: '202607006', nama: 'Ibrahim Rasyid', gender: 'L', kelas: 'Kelas 7A', asrama: 'Kamar Abu Bakar #02', wali: 'Bpk. Rasyid Ridha', wa: '081987654321', waliUser: 'wali.ibrahim', musyrif: 'Ustadz Ahmad Fauzi', tahfidzCurrent: 3.0, tahfidzTarget: 5.0, tahfidzNotes: 'Butuh penguatan tajwid nun mati' },
    { id: 's-7', nis: '202607007', nama: 'Zahra Khairunnisa', gender: 'P', kelas: 'Kelas 7B', asrama: 'Kamar Sayyidah Aisyah #03', wali: 'Ibu Nurhayati', wa: '081567890123', waliUser: 'wali.zahra', musyrif: 'Ustadz Faiz Ramadhan', tahfidzCurrent: 4.2, tahfidzTarget: 5.0, tahfidzNotes: 'Hafalan stabil' },
    { id: 's-8', nis: '202607008', nama: 'Salman Al-Farisi Pratama', gender: 'L', kelas: 'Kelas 8A', asrama: 'Kamar Utsman bin Affan #01', wali: 'Bpk. Dodi Pratama', wa: '081789012345', waliUser: 'wali.salman', musyrif: 'Ustadz Ridwan Al-Bantani', tahfidzCurrent: 7.5, tahfidzTarget: 8.0, tahfidzNotes: 'Juz 1-7 tuntas mutqin' },
    { id: 's-9', nis: '202607009', nama: 'Maryam Shofiyyah', gender: 'P', kelas: 'Kelas 7B', asrama: 'Kamar Sayyidah Aisyah #02', wali: 'Bpk. Luqman Hakim', wa: '081890123456', waliUser: 'wali.maryam', musyrif: 'Ustadz Faiz Ramadhan', tahfidzCurrent: 4.0, tahfidzTarget: 5.0, tahfidzNotes: 'Murojaah berkala lancar' },
    { id: 's-10', nis: '202607010', nama: 'Umar Abdurrahman', gender: 'L', kelas: 'Kelas 8A', asrama: 'Kamar Ali bin Abi Thalib #02', wali: 'Bpk. Wahid Rahman', wa: '081234599887', waliUser: 'wali.umar', musyrif: 'Ustadz Ridwan Al-Bantani', tahfidzCurrent: 8.0, tahfidzTarget: 8.0, tahfidzNotes: 'Mumtaz - Siap wisuda juz 8' },
    { id: 's-11', nis: '202607011', nama: 'Nuha As-Syifa', gender: 'P', kelas: 'Kelas 7B', asrama: 'Kamar Sayyidah Maryam #01', wali: 'Ibu Dewi Sartika', wa: '081321987654', waliUser: 'wali.nuha', musyrif: 'Ustadz Faiz Ramadhan', tahfidzCurrent: 3.8, tahfidzTarget: 5.0, tahfidzNotes: 'Kemajuan ziyadah konsisten' },
    { id: 's-12', nis: '202607012', nama: 'Khalid bin Walid Al-Ghazi', gender: 'L', kelas: 'Kelas 7A', asrama: 'Kamar Bilal Bin Robah #04', wali: 'Bpk. Ghazi Ramli', wa: '081678901234', waliUser: 'wali.khalid', musyrif: 'Ustadz Ahmad Fauzi', tahfidzCurrent: 4.6, tahfidzTarget: 5.0, tahfidzNotes: 'Fokus & artikulatif' }
  ];

  const INITIAL_USTADZ = [
    { id: 'u-1', nip: '198804122015011002', nama: 'Ustadz Ahmad Fauzi, S.Pd.I', bidang: 'Halaqoh Al-Quran & Ulumul Quran', username: 'ustadz.ahmad', wa: '081211223344', avatar: '👨‍🏫', pass: 'guru123' },
    { id: 'u-2', nip: '199108152018021003', nama: 'Ustadz Faiz Ramadhan, Lc.', bidang: 'Tahfidz Murojaah & Bahasa Arab (Lughoh)', username: 'ustadz.faiz', wa: '081322334455', avatar: '📖', pass: 'guru123' },
    { id: 'u-3', nip: '198502202010011001', nama: 'Ustadz Ridwan Al-Bantani, M.Pd.', bidang: 'Nahwu, Shorof & Tarbiyah Santri', username: 'ustadz.ridwan', wa: '081533445566', avatar: '👳‍♂️', pass: 'guru123' },
    { id: 'u-4', nip: '198209042008121004', nama: 'Ustadz Hasan Basri, S.Th.I', bidang: 'Taklim Umum, Fiqih & Hadits', username: 'ustadz.hasan', wa: '081744556677', avatar: '🎙️', pass: 'guru123' }
  ];

  function getTodayDateStr() {
    const d = new Date();
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const da = String(d.getDate()).padStart(2, '0');
    return `${yr}-${mo}-${da}`;
  }

  function getDateOffset(daysOffset, baseDateStr) {
    let d;
    if (baseDateStr) {
      const parts = baseDateStr.split('-');
      d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    } else {
      d = new Date();
    }
    d.setDate(d.getDate() - daysOffset);
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const da = String(d.getDate()).padStart(2, '0');
    return `${yr}-${mo}-${da}`;
  }

  // Anchor kalender pekan pesantren: Pekan 1 dimulai pada Jumat, 16 Oktober 2026
  const ACADEMIC_PEKAN_ANCHOR = new Date(2026, 9, 16);

  function getPekanInfo(offsetWeeks = 0) {
    const now = new Date();
    const cur = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Hitung selisih hari dari Pekan 1 (16 Okt 2026)
    const diffDays = Math.floor((cur.getTime() - ACADEMIC_PEKAN_ANCHOR.getTime()) / (1000 * 60 * 60 * 24));
    
    // Otomatis berganti:
    // hari 0..6 (16-22 Okt) => Pekan 1
    // hari 7..13 (23-29 Okt) => Pekan 2 (otomatis saat memasuki pekan ke-2!)
    // hari 14..20 (30 Okt-5 Nov) => Pekan 3
    // dst.
    const activeWeekIndex = (diffDays >= 0 ? Math.floor(diffDays / 7) : 0) + offsetWeeks;
    const finalWeekIndex = Math.max(0, activeWeekIndex);
    const weekNumber = finalWeekIndex + 1;

    const startDate = new Date(ACADEMIC_PEKAN_ANCHOR);
    startDate.setDate(ACADEMIC_PEKAN_ANCHOR.getDate() + (finalWeekIndex * 7));

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const pad = (n) => String(n).padStart(2, '0');
    const toYMD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    return {
      weekIndex: finalWeekIndex,
      weekNumber: weekNumber,
      from: toYMD(startDate),
      to: toYMD(endDate),
      isCurrentWeek: offsetWeeks === 0
    };
  }

  function formatIndoDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const d = parseInt(parts[2], 10);
    const m = months[parseInt(parts[1], 10) - 1] || parts[1];
    const y = parts[0];
    return `${d} ${m} ${y}`;
  }

  function generateHistoricalLogs() {
    const logs = [];
    const sampleNotesGood = [
      'Alhamdulillah setoran lancar tanpa kesalahan',
      'Sangat fokus menyimak penjelasan ustadz',
      'Antusias dan santun dalam menjawab pertanyaan',
      'Murojaah surat An-Naba s.d An-Naziat mutqin',
      'Adab bermajelis sangat baik dan tertib',
      'Aktif mempraktikkan percakapan bahasa Arab'
    ];
    const sampleNotesAverage = [
      'Hadir tepat waktu, perlu sedikit meningkatkan kefokusan',
      'Setoran lancar dengan 2 kali teguran tajwid mad thabi\'i',
      'Perlu lebih aktif bertanya saat sesi taklim',
      'Agak lelah di sesi kedua namun tetap disiplin'
    ];

    for (let dayOffset = 14; dayOffset >= 1; dayOffset--) {
      const dateStr = getDateOffset(dayOffset);

      INITIAL_SANTRI.forEach((santri, sIdx) => {
        MASTER_SLOTS.forEach((slot) => {
          if (slot.isBreak) return;

          let status = 'Hadir';
          let keaktifan = 4;
          let note = sampleNotesGood[(sIdx + dayOffset) % sampleNotesGood.length];

          if (santri.id === 's-6' && dayOffset === 3) {
            status = 'Sakit';
            keaktifan = 1;
            note = 'Izin istirahat di UKS, flu dan demam ringan';
          } else if (santri.id === 's-3' && dayOffset === 6 && (slot.id === 'slot-1' || slot.id === 'slot-2')) {
            status = 'Izin';
            keaktifan = 2;
            note = 'Izin keperluan keluarga didampingi wali';
          } else {
            const rand = (sIdx * 13 + dayOffset * 7 + slot.startHour) % 10;
            if (rand < 5) {
              keaktifan = 5;
              note = sampleNotesGood[(sIdx + slot.startHour) % sampleNotesGood.length];
            } else if (rand < 8) {
              keaktifan = 4;
              note = sampleNotesGood[(sIdx + 1) % sampleNotesGood.length];
            } else {
              keaktifan = 3;
              note = sampleNotesAverage[(sIdx + slot.startHour) % sampleNotesAverage.length];
            }
          }

          logs.push({
            id: `log-${dateStr}-${slot.id}-${santri.id}`,
            date: dateStr,
            slotId: slot.id,
            slotName: slot.name,
            slotTime: slot.time,
            santriId: santri.id,
            santriName: santri.nama,
            santriKelas: santri.kelas,
            status: status,
            keaktifan: status === 'Hadir' ? keaktifan : 1,
            catatan: note,
            ustadzName: slot.id.includes('1') ? 'Ustadz Ahmad Fauzi, S.Pd.I' : 'Ustadz Faiz Ramadhan, Lc.',
            timestamp: `${dateStr} ${slot.time.split(' - ')[0]}`
          });
        });
      });
    }

    const todayStr = getTodayDateStr();
    const todaySlots = ['slot-1', 'slot-2', 'slot-3', 'slot-4', 'slot-5'];

    INITIAL_SANTRI.forEach((santri, sIdx) => {
      todaySlots.forEach(slotId => {
        const slot = MASTER_SLOTS.find(s => s.id === slotId);
        let status = 'Hadir';
        let keaktifan = 5;
        let note = 'Murojaah sangat mutqin dan tertib di halaqoh';

        if (santri.id === 's-6' && slotId === 'slot-3') {
          status = 'Izin';
          keaktifan = 2;
          note = 'Izin ke ruang kesehatan santri';
        } else if (sIdx % 3 === 0) {
          keaktifan = 4;
          note = 'Fokus dan aktif menjawab latihan ustadz';
        }

        logs.push({
          id: `log-${todayStr}-${slot.id}-${santri.id}`,
          date: todayStr,
          slotId: slot.id,
          slotName: slot.name,
          slotTime: slot.time,
          santriId: santri.id,
          santriName: santri.nama,
          santriKelas: santri.kelas,
          status: status,
          keaktifan: status === 'Hadir' ? keaktifan : 1,
          catatan: note,
          ustadzName: 'Ustadz Ahmad Fauzi, S.Pd.I',
          timestamp: `${todayStr} ${slot.time.split(' - ')[0]}`
        });
      });
    });

    return logs;
  }

  // ==========================================================================
  // 4. STORAGE KEYS & STATE
  // ==========================================================================
  const STORAGE_KEY_SANTRI = 'bilal_santri_data_v3';
  const STORAGE_KEY_USTADZ = 'bilal_ustadz_data_v3';
  const STORAGE_KEY_LOGS = 'bilal_attendance_logs_v3';
  const STORAGE_KEY_SLOTS = 'bilal_master_slots_v3';
  const STORAGE_KEY_KELAS = 'bilal_master_kelas_v1';
  const STORAGE_KEY_AUTH = 'bilal_auth_current_v3';
  const STORAGE_KEY_SETTINGS = 'bilal_settings_v3';
  const STORAGE_KEY_SHEETS_URL = 'bilal_sheets_url_v1';
  const STORAGE_KEY_SHEETS_AUTOSYNC = 'bilal_sheets_autosync_v1';
  const DEFAULT_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyTfVjSpBz2OvIxekdYPtLkh_DrgAkfIWyz0jcNoiDNXwdLIPG9vzoU3WXn412LknVkoA/exec';

  const INITIAL_KELAS_HALAQOH = [
    {
      id: 'k-7a',
      nama: 'Kelas 7A',
      kategori: 'Kelas Reguler (Putra)',
      tingkat: 'Kelas 7',
      pengampu: 'Ustadz Ahmad Fauzi, S.Pd.I',
      ruang: 'Gedung Umar bin Khattab R. 101',
      deskripsi: 'Kelas 7 Reguler Ikhwan - Fokus Tahsin, Tajwid & Dasar Bahasa Arab'
    },
    {
      id: 'k-7b',
      nama: 'Kelas 7B',
      kategori: 'Kelas Reguler (Putri)',
      tingkat: 'Kelas 7',
      pengampu: 'Ustadz Faiz Ramadhan, Lc.',
      ruang: 'Gedung Khadijah R. 201',
      deskripsi: 'Kelas 7 Reguler Akhwat - Fokus Tahsin, Fiqih Nisa & Ziyadah Quran'
    },
    {
      id: 'k-8a',
      nama: 'Kelas 8A',
      kategori: 'Kelas Reguler (Putra)',
      tingkat: 'Kelas 8',
      pengampu: 'Ustadz Ridwan Al-Bantani, M.Pd.',
      ruang: 'Gedung Ali bin Abi Thalib R. 102',
      deskripsi: 'Kelas 8 Reguler Ikhwan - Nahwu, Shorof & Penguatan Murojaah 5 Juz'
    },
    {
      id: 'k-tahfidz-1',
      nama: 'Halaqoh Tahfidz Al-Fatih',
      kategori: 'Halaqoh Tahfidz',
      tingkat: 'Menengah',
      pengampu: 'Ustadz Ahmad Fauzi, S.Pd.I',
      ruang: 'Masjid Utama Bilal - Sayap Kanan',
      deskripsi: 'Halaqoh intensif Ziyadah & Mutasyabihat Al-Quran target 10 Juz'
    },
    {
      id: 'k-lughoh-1',
      nama: 'Halaqoh Lughoh & Muhadatsah',
      kategori: 'Halaqoh Bahasa / Lughoh',
      tingkat: 'Takhassus',
      pengampu: 'Ustadz Faiz Ramadhan, Lc.',
      ruang: 'Laboratorium Bahasa Arab Pondok',
      deskripsi: 'Pendalaman percakapan aktif bahasa Arab yaumiyyah & kaidah uslub'
    }
  ];

  let appState = {
    santri: [],
    ustadz: [],
    logs: [],
    slots: [],
    kelasHalaqoh: [],
    currentUser: null,
    currentAdminTab: 'dashboard',
    waliPeriod: 'week1',
    selectedWaliSantriId: null,
    chartWaliMode: 'pekan',
    chartWaliWeek: 'pekan-2',
    chartWaliMonth: '2026-10',
    sheetsUrl: DEFAULT_SHEETS_URL,
    sheetsAutoSync: true,
    sheetsSyncStatus: 'connected', // 'connected' | 'disconnected' | 'syncing' | 'error'
    sheetsLastSync: null
  };

  function initData() {
    try {
      const storedSantri = localStorage.getItem(STORAGE_KEY_SANTRI);
      const storedUstadz = localStorage.getItem(STORAGE_KEY_USTADZ);
      const storedLogs = localStorage.getItem(STORAGE_KEY_LOGS);
      const storedSlots = localStorage.getItem(STORAGE_KEY_SLOTS);
      const storedKelas = localStorage.getItem(STORAGE_KEY_KELAS);
      const storedAuth = localStorage.getItem(STORAGE_KEY_AUTH);
      const storedSheetsUrl = localStorage.getItem(STORAGE_KEY_SHEETS_URL);
      const storedSheetsAutoSync = localStorage.getItem(STORAGE_KEY_SHEETS_AUTOSYNC);

      const isFirstInit = (storedSantri === null && storedUstadz === null && storedLogs === null);
      if (isFirstInit) {
        resetToDefaults();
      } else {
        try {
          const rawSantri = storedSantri ? JSON.parse(storedSantri) : [];
          appState.santri = rawSantri.map(s => {
            let hlq = String(s.halaqoh || '').trim();
            const notes = String(s.tahfidzNotes || '').trim();
            if (!hlq && notes.includes('[HLQ:')) {
              const m = notes.match(/\[HLQ:\s*([^\]]+)\]/);
              if (m && m[1]) hlq = m[1].trim();
            }
            return {
              ...s,
              halaqoh: hlq
            };
          });
        } catch (e) {
          appState.santri = [];
        }
        try {
          appState.ustadz = storedUstadz ? JSON.parse(storedUstadz) : [];
        } catch (e) {
          appState.ustadz = [];
        }
        try {
          appState.logs = storedLogs ? JSON.parse(storedLogs) : [];
        } catch (e) {
          appState.logs = [];
        }
      }

      appState.sheetsUrl = (storedSheetsUrl && storedSheetsUrl.trim()) ? storedSheetsUrl.trim() : DEFAULT_SHEETS_URL;
      if (storedSheetsAutoSync !== null) {
        try {
          appState.sheetsAutoSync = JSON.parse(storedSheetsAutoSync);
        } catch (e) {
          appState.sheetsAutoSync = true;
        }
      }

      if (storedSlots) {
        try {
          appState.slots = sortSlots(JSON.parse(storedSlots));
        } catch (e) {
          appState.slots = JSON.parse(JSON.stringify(INITIAL_MASTER_SLOTS));
        }
      } else {
        appState.slots = JSON.parse(JSON.stringify(INITIAL_MASTER_SLOTS));
      }

      if (storedKelas) {
        try {
          appState.kelasHalaqoh = JSON.parse(storedKelas);
        } catch (e) {
          appState.kelasHalaqoh = JSON.parse(JSON.stringify(INITIAL_KELAS_HALAQOH));
        }
      } else {
        appState.kelasHalaqoh = JSON.parse(JSON.stringify(INITIAL_KELAS_HALAQOH));
      }
      ensureAllSantriClassesExist();

      MASTER_SLOTS.length = 0;
      MASTER_SLOTS.push(...appState.slots);
      ensureTodayLogsExist();

      if (storedAuth) {
        appState.currentUser = JSON.parse(storedAuth);
        if (appState.currentUser && appState.currentUser.role === 'admin') {
          appState.currentUser.name = 'Admin';
        }
      } else {
        appState.currentUser = null;
      }

      // Load settings
      const storedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (storedSettings) {
        appSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) };
      }
      applySettings(appSettings);

      // Auto-connect / fetch from spreadsheet in background if URL configured
      if (appState.sheetsUrl) {
        setTimeout(() => {
          testSheetsConnection(appState.sheetsUrl).then(connected => {
            if (connected) {
              fetchFromSpreadsheet(true);
            }
          });
        }, 1200);
      }
    } catch (e) {
      console.warn('Error reading from localStorage, using default seed:', e);
      resetToDefaults();
    }
  }

  function resetToDefaults() {
    appState.santri = [...INITIAL_SANTRI];
    appState.ustadz = [...INITIAL_USTADZ];
    appState.slots = JSON.parse(JSON.stringify(INITIAL_MASTER_SLOTS));
    appState.kelasHalaqoh = JSON.parse(JSON.stringify(INITIAL_KELAS_HALAQOH));
    ensureAllSantriClassesExist();
    MASTER_SLOTS.length = 0;
    MASTER_SLOTS.push(...appState.slots);
    appState.logs = generateHistoricalLogs();
    saveData();
    showToast('Data sistem telah direset ke preset Pondok Pesantren Bilal Bin Robah!', 'info');
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY_SANTRI, JSON.stringify(appState.santri));
      localStorage.setItem(STORAGE_KEY_USTADZ, JSON.stringify(appState.ustadz));
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(appState.logs));
      localStorage.setItem(STORAGE_KEY_SLOTS, JSON.stringify(appState.slots));
      localStorage.setItem(STORAGE_KEY_KELAS, JSON.stringify(appState.kelasHalaqoh));
      localStorage.setItem(STORAGE_KEY_SHEETS_URL, appState.sheetsUrl || '');
      localStorage.setItem(STORAGE_KEY_SHEETS_AUTOSYNC, JSON.stringify(appState.sheetsAutoSync));
      if (appState.currentUser) {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(appState.currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH);
      }
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  // ==========================================================================
  // 5. SETTINGS CONTROLLER (TEMA, WALLPAPER & FONT)
  // ==========================================================================
  function applySettings(settings) {
    // 1. Theme Dark / Light
    const isDark = settings.themeMode === 'dark';
    document.body.classList.toggle('theme-dark', isDark);
    document.body.classList.toggle('theme-light', !isDark);

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) themeIcon.textContent = isDark ? '🌙' : '☀️';

    // 2. Accent Color
    const root = document.documentElement;
    root.style.setProperty('--tema-warna', settings.accentColor);
    root.style.setProperty('--gold-400', settings.accentColor);
    root.style.setProperty('--gold-500', settings.accentColor);

    // 3. Font Family & Scale
    const fontVal = FONT_MAP[settings.fontFamily] || FONT_MAP['jakarta'];
    document.body.style.fontFamily = fontVal;
    root.style.fontSize = settings.fontScale || '100%';

    // 4. Wallpaper Latar Belakang
    let bgValue = settings.wallpaper;
    if (bgValue === 'preset-default') {
      bgValue = isDark 
        ? 'radial-gradient(circle at top center, #0a1128 0%, #03040a 100%)' 
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
    } else if (WALLPAPER_MAP[bgValue]) {
      bgValue = WALLPAPER_MAP[bgValue];
    }

    if (bgValue) {
      document.body.style.background = bgValue;
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
    }

    // Save to storage
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Gagal menyimpan settings:', e);
    }

    // Sync modal UI state
    syncSettingsModalUI();
  }

  function syncSettingsModalUI() {
    // Theme buttons
    const darkBtn = document.getElementById('setting-theme-dark');
    const lightBtn = document.getElementById('setting-theme-light');
    if (darkBtn && lightBtn) {
      darkBtn.classList.toggle('active', appSettings.themeMode === 'dark');
      lightBtn.classList.toggle('active', appSettings.themeMode === 'light');
    }

    // Swatches
    document.querySelectorAll('.swatch-btn[data-color]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-color') === appSettings.accentColor);
      btn.textContent = btn.getAttribute('data-color') === appSettings.accentColor ? '✓' : '';
    });

    // Wallpaper cards
    document.querySelectorAll('.wp-card').forEach(card => {
      card.classList.toggle('active', card.getAttribute('data-wp') === appSettings.wallpaper);
    });

    // Font cards
    document.querySelectorAll('.font-card').forEach(card => {
      card.classList.toggle('active', card.getAttribute('data-font') === appSettings.fontFamily);
    });

    // Scale pills
    document.querySelectorAll('.scale-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-scale') === appSettings.fontScale);
    });
  }

  // ==========================================================================
  // 6. CLOCK, HIJRI DATE, & ACTIVE SLOT
  // ==========================================================================
  function updateLiveClock() {
    const clockEl = document.getElementById('clock-display');
    const dateEl = document.getElementById('date-display');
    const slotIndicator = document.getElementById('active-slot-name');

    if (!clockEl) return;

    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hrs}:${mins}:${secs} WIB`;

    if (dateEl) {
      const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      dateEl.textContent = `${dayName}, ${now.getDate()} ${monthName} ${now.getFullYear()} / 11 Rabi'ul Akhir 1448 H`;
    }

    const currentMinTotal = now.getHours() * 60 + now.getMinutes();
    let currentSlot = MASTER_SLOTS.find(slot => {
      const startMinTotal = slot.startHour * 60 + slot.startMin;
      const endMinTotal = slot.endHour * 60 + slot.endMin;
      return currentMinTotal >= startMinTotal && currentMinTotal <= endMinTotal;
    });

    if (!currentSlot) currentSlot = MASTER_SLOTS[0];

    if (slotIndicator) {
      slotIndicator.textContent = `${currentSlot.name} (${currentSlot.time})`;
    }

    const slotNowAlert = document.getElementById('slot-now-text');
    if (slotNowAlert) {
      slotNowAlert.textContent = `${currentSlot.name} [${currentSlot.time}]`;
    }
  }

  // ==========================================================================
  // 7. TOAST NOTIFICATIONS & MODALS
  // ==========================================================================
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'info' ? 'toast-info' : ''}`;
    
    let icon = '✅';
    if (type === 'error') icon = '⚠️';
    if (type === 'info') icon = 'ℹ️';

    toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('hidden');
    if (modal && modal.style) modal.style.display = 'flex';
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
    if (modal && modal.style) modal.style.display = 'none';
  }

  // ==========================================================================
  // 8. POPULATE LOGIN DROPDOWNS & MODALS
  // ==========================================================================
  function renderLoginMuhaffizOptions() {
    const select = document.getElementById('select-muhaffiz');
    if (!select) return;

    select.innerHTML = '<option value="">-- Pilih Nama Ustadz / Pengajar --</option>';
    (appState.ustadz || []).forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.username;
      const bidangStr = String(u.bidang || '').trim();
      const bidangDisplay = bidangStr ? ` (${bidangStr.split('/')[0].trim()})` : '';
      opt.textContent = `${u.nama || 'Ustadz'}${bidangDisplay}`;
      select.appendChild(opt);
    });
  }

  function renderWaliSantriSelectOptions(filterVal) {
    const filterSelect = document.getElementById('select-wali-filter-group');
    const optgroupHalaqoh = document.getElementById('wali-filter-optgroup-halaqoh');
    const optgroupKelas = document.getElementById('wali-filter-optgroup-kelas');
    const select = document.getElementById('select-santri-wali-modal');
    const grid = document.getElementById('quick-santri-grid');
    if (!select) return;

    if (filterVal === undefined && filterSelect) {
      filterVal = filterSelect.value || 'all';
    } else if (filterVal === undefined) {
      filterVal = 'all';
    }

    if (filterSelect && filterSelect.value !== filterVal) {
      filterSelect.value = filterVal;
    }

    // Populate filter optgroups
    if (optgroupHalaqoh && optgroupKelas) {
      const uniqueHalaqoh = [];
      appState.santri.forEach(s => {
        const h = (s.halaqoh || '').trim();
        if (h && !uniqueHalaqoh.includes(h)) uniqueHalaqoh.push(h);
      });
      appState.kelasHalaqoh.forEach(k => {
        if (isHalaqohGroup(k) && !uniqueHalaqoh.includes(k.nama)) uniqueHalaqoh.push(k.nama);
      });
      uniqueHalaqoh.sort();

      const uniqueKelas = [];
      appState.santri.forEach(s => {
        const k = (s.kelas || '').trim();
        if (k && !uniqueKelas.includes(k)) uniqueKelas.push(k);
      });
      appState.kelasHalaqoh.forEach(k => {
        if (!isHalaqohGroup(k) && !uniqueKelas.includes(k.nama)) uniqueKelas.push(k.nama);
      });
      uniqueKelas.sort();

      optgroupHalaqoh.innerHTML = uniqueHalaqoh.map(h => `
        <option value="halaqoh:${h}" ${filterVal === `halaqoh:${h}` ? 'selected' : ''}>📖 ${h}</option>
      `).join('');

      optgroupKelas.innerHTML = uniqueKelas.map(k => `
        <option value="kelas:${k}" ${filterVal === `kelas:${k}` ? 'selected' : ''}>🏫 ${k}</option>
      `).join('');
    }

    // Filter santri
    let filteredSantri = appState.santri;
    if (filterVal && filterVal.startsWith('halaqoh:')) {
      const targetH = filterVal.replace('halaqoh:', '').trim().toLowerCase();
      filteredSantri = appState.santri.filter(s => (s.halaqoh || '').trim().toLowerCase() === targetH);
    } else if (filterVal && filterVal.startsWith('kelas:')) {
      const targetK = filterVal.replace('kelas:', '').trim().toLowerCase();
      filteredSantri = appState.santri.filter(s => (s.kelas || '').trim().toLowerCase() === targetK);
    }

    select.innerHTML = '<option value="">-- Pilih Nama Santri --</option>';
    filteredSantri.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      const hlqText = s.halaqoh ? ` • 📖 ${s.halaqoh}` : '';
      opt.textContent = `${s.nama} (${s.kelas}${hlqText} • Wali: ${s.wali})`;
      select.appendChild(opt);
    });

    if (filteredSantri.length > 0) {
      if (!appState.selectedWaliSantriId || !filteredSantri.some(s => s.id === appState.selectedWaliSantriId)) {
        appState.selectedWaliSantriId = filteredSantri[0].id;
      }
      select.value = appState.selectedWaliSantriId;
    } else {
      appState.selectedWaliSantriId = null;
      select.value = '';
    }

    if (grid) {
      if (filteredSantri.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #94a3b8; font-size: 0.8rem; padding: 16px;">Tidak ada santri yang terdaftar pada pilihan Halaqoh / Kelas ini.</div>';
      } else {
        grid.innerHTML = filteredSantri.map(s => `
          <div class="quick-santri-card ${s.id === appState.selectedWaliSantriId ? 'active' : ''}" data-santri-id="${s.id}" onclick="window.pickQuickSantri('${s.id}')">
            <div class="q-santri-top">
              <span class="q-santri-name">${s.nama}</span>
              <span class="q-santri-nis">NIS: ${s.nis}</span>
            </div>
            <div class="q-santri-tags">
              <span class="q-badge-kelas">🏫 ${s.kelas}</span>
              <span class="q-badge-halaqoh">📖 ${s.halaqoh || 'Halaqoh Qur\'an'}</span>
            </div>
            <div class="q-santri-wali">Wali: ${s.wali || '-'}</div>
          </div>
        `).join('');
      }
    }
  }

  window.pickQuickSantri = function (santriId) {
    appState.selectedWaliSantriId = santriId;
    const select = document.getElementById('select-santri-wali-modal');
    if (select) select.value = santriId;

    document.querySelectorAll('.quick-santri-card').forEach(card => {
      if (card.getAttribute('data-santri-id') === santriId) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  };

  // ==========================================================================
  // 9. ROLE SWITCHER & LOGIN HANDLERS
  // ==========================================================================
  function loginMuhaffiz() {
    const select = document.getElementById('select-muhaffiz');
    const passInput = document.getElementById('sandi-muhaffiz');
    const username = select.value;
    const pass = passInput.value.trim();

    if (!username) {
      showToast('⚠️ Silakan pilih nama Ustadz / Pengajar dari dropdown!', 'error');
      return;
    }

    const u = appState.ustadz.find(item => item.username === username);
    if (!u) {
      showToast('⚠️ Data Ustadz tidak ditemukan.', 'error');
      return;
    }

    if (pass !== (u.pass || 'guru123') && pass !== 'ustadz123') {
      showToast('⛔ Kata sandi salah! Gunakan sandi "guru123".', 'error');
      passInput.value = '';
      return;
    }

    setRole('ustadz', u.username);
    passInput.value = '';
    showToast(`Assalamu'alaikum, ${u.nama}. Selamat datang di SISPENSI SANTRI!`, 'success');
  }

  function loginWaliTanpaSandi(santriId) {
    const s = appState.santri.find(item => item.id === santriId) || appState.santri[0];

    const userObj = {
      role: 'wali',
      username: s.waliUser || `wali.${s.nis}`,
      name: s.wali,
      avatarText: 'WL',
      santriId: s.id,
      santri: s
    };

    appState.currentUser = userObj;
    saveData();
    closeModal('modal-wali-select');
    showAppViews();
    renderCurrentPortal();
    updateUserBadge();
    showToast(`Assalamu'alaikum, ${s.wali}. Selamat datang di Pantauan Keaktifan Ananda!`, 'success');
  }

  function setRole(role, username = null) {
    let userObj = null;

    if (role === 'admin') {
      userObj = {
        role: 'admin',
        username: 'admin',
        name: 'Admin',
        avatarText: 'AD'
      };
    } else if (role === 'ustadz') {
      const u = (appState.ustadz.find(item => item.username === username) || appState.ustadz[0]) || { username: 'ustadz', nama: 'Ustadz' };
      const uNama = String(u.nama || 'Ustadz').trim();
      const parts = uNama.split(' ').filter(Boolean);
      const avText = parts[1] ? parts[1].substring(0, 2).toUpperCase() : parts[0] ? parts[0].substring(0, 2).toUpperCase() : 'US';
      userObj = {
        role: 'ustadz',
        username: u.username || 'ustadz',
        name: uNama,
        avatarText: avText,
        details: u
      };
    } else if (role === 'wali') {
      const targetUser = username || 'wali.rayhan';
      const s = appState.santri.find(item => item.waliUser === targetUser) || appState.santri[0];
      userObj = {
        role: 'wali',
        username: targetUser,
        name: s.wali,
        avatarText: 'WL',
        santriId: s.id,
        santri: s
      };
    }

    appState.currentUser = userObj;
    saveData();
    showAppViews();
    renderCurrentPortal();
    updateUserBadge();
    showToast(`Beralih ke peran: ${userObj.name} (${role.toUpperCase()})`, 'info');
  }

  function showAppViews() {
    const loginPage = document.getElementById('login-page');
    const appContainer = document.getElementById('app-container');

    if (loginPage) loginPage.style.display = 'none';
    if (appContainer) appContainer.style.display = 'flex';
  }

  function logoutToLoginPage() {
    appState.currentUser = null;
    saveData();

    const loginPage = document.getElementById('login-page');
    const appContainer = document.getElementById('app-container');

    if (appContainer) appContainer.style.display = 'none';
    if (loginPage) loginPage.style.display = 'flex';

    const p1 = document.getElementById('sandi-muhaffiz');
    if (p1) p1.value = '';
    const p2 = document.getElementById('admin-password');
    if (p2) p2.value = '';

    showToast('Anda telah keluar dari aplikasi.', 'info');
  }

  function updateUserBadge() {
    const avatarEl = document.getElementById('current-user-avatar');
    const nameEl = document.getElementById('current-user-name');
    const roleChip = document.getElementById('current-user-role');

    if (!appState.currentUser) return;

    if (avatarEl) avatarEl.textContent = appState.currentUser.avatarText || 'US';
    if (nameEl) nameEl.textContent = appState.currentUser.name;

    if (roleChip) {
      roleChip.className = `user-role-chip role-${appState.currentUser.role}`;
      roleChip.textContent = appState.currentUser.role === 'admin'
        ? 'Administrator'
        : appState.currentUser.role === 'ustadz'
        ? 'Ustadz / Pengajar'
        : 'Orang Tua / Wali';
    }
  }

  function renderCurrentPortal() {
    if (!appState.currentUser) {
      logoutToLoginPage();
      return;
    }

    const adminView = document.getElementById('view-admin');
    const ustadzView = document.getElementById('view-ustadz');
    const waliView = document.getElementById('view-wali');

    adminView.style.display = 'none';
    ustadzView.style.display = 'none';
    waliView.style.display = 'none';

    if (appState.currentUser.role === 'admin') {
      adminView.style.display = 'block';
      renderAdminView();
    } else if (appState.currentUser.role === 'ustadz') {
      ustadzView.style.display = 'block';
      renderUstadzView();
    } else if (appState.currentUser.role === 'wali') {
      waliView.style.display = 'block';
      renderWaliView();
    }
  }

  // ==========================================================================
  // 10. PORTAL 1: ADMIN CONTROLLERS & RENDERING
  // ==========================================================================
  function renderAdminView() {
    updateAdminCounters();
    renderAdminTimelineSlots();
    renderAdminAttentionList();
    renderAdminRecentLogs();
    renderSantriTable();
    renderUstadzTable();
    renderMasterKelasHalaqohView();
    renderMasterJadwalCards();
    renderRekapitulasi();
  }

  function updateAdminCounters() {
    const totalSantriEl = document.getElementById('stat-total-santri');
    const totalUstadzEl = document.getElementById('stat-total-ustadz');
    const attendanceRateEl = document.getElementById('stat-attendance-rate');
    const breakdownEl = document.getElementById('stat-attendance-breakdown');
    const avgKeaktifanEl = document.getElementById('stat-avg-keaktifan');

    if (totalSantriEl) totalSantriEl.textContent = appState.santri.length;
    if (totalUstadzEl) totalUstadzEl.textContent = appState.ustadz.length;

    const countSantriEl = document.getElementById('admin-santri-count');
    const countUstadzEl = document.getElementById('admin-ustadz-count');
    const countKelasEl = document.getElementById('admin-kelas-count');
    if (countSantriEl) countSantriEl.textContent = appState.santri.length;
    if (countUstadzEl) countUstadzEl.textContent = appState.ustadz.length;
    if (countKelasEl) countKelasEl.textContent = appState.kelasHalaqoh ? appState.kelasHalaqoh.length : 0;

    const today = getTodayDateStr();
    const todayLogs = appState.logs.filter(l => l.date === today);

    if (todayLogs.length > 0) {
      const hadirCount = todayLogs.filter(l => l.status === 'Hadir').length;
      const izinCount = todayLogs.filter(l => l.status === 'Izin').length;
      const sakitCount = todayLogs.filter(l => l.status === 'Sakit').length;
      const alpaCount = todayLogs.filter(l => l.status === 'Alpa').length;
      const rate = Math.round((hadirCount / todayLogs.length) * 100);

      const totalScore = todayLogs.reduce((acc, curr) => acc + (curr.keaktifan || 0), 0);
      const avgScore = (totalScore / todayLogs.length).toFixed(1);

      if (attendanceRateEl) attendanceRateEl.textContent = `${rate}%`;
      if (breakdownEl) breakdownEl.textContent = `${hadirCount} Hadir • ${izinCount} Izin • ${sakitCount} Sakit • ${alpaCount} Alpa`;
      if (avgKeaktifanEl) avgKeaktifanEl.textContent = `${avgScore} / 5.0`;
    } else {
      if (attendanceRateEl) attendanceRateEl.textContent = '100%';
      if (breakdownEl) breakdownEl.textContent = 'Menunggu sesi pertama dimulai';
      if (avgKeaktifanEl) avgKeaktifanEl.textContent = '5.0 / 5.0';
    }
  }

  function renderAdminTimelineSlots() {
    const container = document.getElementById('admin-slot-timeline');
    const completedBadge = document.getElementById('badge-completed-slots');
    if (!container) return;

    const today = getTodayDateStr();
    const todayLogs = appState.logs.filter(l => l.date === today);

    let completedCount = 0;
    container.innerHTML = MASTER_SLOTS.map(slot => {
      const slotLogs = todayLogs.filter(l => l.slotId === slot.id);
      const isFilled = slotLogs.length > 0;
      if (isFilled && !slot.isBreak) completedCount++;

      let statusBadge = `<span class="badge badge-warning">Belum Diinput</span>`;
      if (slot.isBreak) {
        statusBadge = `<span class="badge badge-info">Waktu Istirahat</span>`;
      } else if (isFilled) {
        const hadir = slotLogs.filter(l => l.status === 'Hadir').length;
        statusBadge = `<span class="badge badge-success">✓ Terisi (${hadir}/${slotLogs.length} Hadir)</span>`;
      }

      return `
        <div class="slot-item ${slot.isBreak ? 'is-break' : ''}">
          <div class="slot-time-badge">${slot.time}</div>
          <div class="slot-name-col">
            <div class="slot-name-text">${slot.icon} ${slot.name}</div>
            <div class="slot-meta-text">${slot.desc}</div>
          </div>
          <div class="slot-action-col">${statusBadge}</div>
        </div>
      `;
    }).join('');

    if (completedBadge) {
      completedBadge.textContent = `${completedCount} / 10 Sesi Terisi`;
    }
  }

  function renderAdminAttentionList() {
    const container = document.getElementById('admin-attention-list');
    const countBadge = document.getElementById('badge-attention-count');
    if (!container) return;

    const today = getTodayDateStr();
    const nonHadirToday = appState.logs.filter(l => l.date === today && l.status !== 'Hadir');

    if (countBadge) countBadge.textContent = `${nonHadirToday.length} Santri`;

    if (nonHadirToday.length === 0) {
      container.innerHTML = `
        <div class="text-muted" style="font-size: 0.82rem; padding: 10px 0; text-align: center;">
          🎉 Alhamdulillah seluruh santri berstatus Hadir pada sesi yang telah terdata hari ini!
        </div>
      `;
      return;
    }

    container.innerHTML = nonHadirToday.map(log => `
      <div class="attention-item status-${log.status.toLowerCase()}">
        <div>
          <strong>${log.santriName}</strong> (${log.santriKelas})
          <div class="text-muted" style="font-size: 0.72rem;">Sesi: ${log.slotName} • Catatan: ${log.catatan}</div>
        </div>
        <span class="status-pill status-${log.status.toLowerCase()}">${log.status}</span>
      </div>
    `).join('');
  }

  function renderAdminRecentLogs() {
    const container = document.getElementById('admin-recent-logs');
    if (!container) return;

    const recent = [...appState.logs].slice(-6).reverse();
    container.innerHTML = recent.map(r => `
      <div class="log-item">
        <span><strong>${r.santriName}</strong> (${r.slotName})</span>
        <span>
          <span class="status-pill status-${r.status.toLowerCase()}">${r.status}</span>
          <span style="color: #f59e0b; margin-left: 4px;">⭐${r.keaktifan}</span>
        </span>
      </div>
    `).join('');
  }

  function renderSantriTable() {
    const tbody = document.getElementById('tbody-santri');
    const filterSearch = document.getElementById('filter-santri-search');
    const filterKelas = document.getElementById('filter-santri-kelas');
    if (!tbody) return;

    const q = filterSearch ? filterSearch.value.toLowerCase().trim() : '';
    const k = filterKelas ? filterKelas.value : '';

    const filtered = (appState.santri || []).filter(s => {
      const sNama = String(s.nama || '').toLowerCase();
      const sNis = String(s.nis || '').toLowerCase();
      const matchSearch = !q || sNama.includes(q) || sNis.includes(q);
      const matchKelas = !k || String(s.kelas || '') === k || String(s.halaqoh || '') === k;
      return matchSearch && matchKelas;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 20px;" class="text-muted">Tidak ada data santri yang cocok.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(s => {
      const sLogs = appState.logs.filter(l => l.santriId === s.id);
      let pct = 100;
      if (sLogs.length > 0) {
        const h = sLogs.filter(l => l.status === 'Hadir').length;
        pct = Math.round((h / sLogs.length) * 100);
      }

      const sNama = String(s.nama || 'Santri').trim();
      const initials = sNama.split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'ST';
      const isFemale = s.gender === 'P';
      const rawWa = String(s.wa !== undefined && s.wa !== null ? s.wa : '').trim();
      const waClean = rawWa.replace(/[^0-9]/g, '').replace(/^0/, '62');

      return `
        <tr>
          <td><strong>${String(s.nis || '-')}</strong></td>
          <td>
            <div class="santri-avatar-inline">
              <div class="avatar-circle ${isFemale ? 'avatar-female' : ''}">${initials}</div>
              <div class="santri-meta-inline">
                <span class="santri-name-strong">${sNama}</span>
                <span class="santri-nis-span">${s.gender === 'L' ? 'Santri Ikhwan' : 'Santri Akhwat'}</span>
              </div>
            </div>
          </td>
          <td>
            <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
              <span class="badge badge-info" style="cursor: pointer; display: inline-flex; align-items: center; gap: 4px;" onclick="window.quickPindahSantri('${s.id}')" title="Kelas Formal: ${s.kelas || '-'} (Klik untuk pindah kelas formal)">
                🏫 ${s.kelas || '-'} <span style="font-size: 0.7rem; opacity: 0.85;">🔄</span>
              </span>
              ${s.halaqoh ? `
                <span class="badge-halaqoh-tag" onclick="window.quickAturHalaqohSantri('${s.id}')" title="Halaqoh Tahfidz: ${s.halaqoh} (Klik untuk ganti halaqoh)">
                  📖 ${s.halaqoh}
                </span>
              ` : `
                <button type="button" class="btn-sm-badge-add" onclick="window.quickAturHalaqohSantri('${s.id}')" title="Tambahkan santri ini ke halaqoh tahfidz tanpa ubah kelasnya">
                  + Halaqoh
                </button>
              `}
            </div>
          </td>
          <td>${s.asrama || '-'}</td>
          <td>${s.wali || '-'}</td>
          <td>
            ${rawWa ? `
            <a href="https://wa.me/${waClean}" target="_blank" style="color: #047857; text-decoration: none; font-weight: 600;">
              📱 ${rawWa}
            </a>` : '<span style="color: var(--text-muted);">-</span>'}
          </td>
          <td>
            <span class="badge ${pct >= 90 ? 'badge-success' : pct >= 75 ? 'badge-warning' : 'badge-danger'}">
              ${pct}% Kehadiran
            </span>
          </td>
          <td>
            <div style="display: flex; gap: 4px;">
              <button type="button" class="btn-table-action" onclick="window.quickAturHalaqohSantri('${s.id}')" title="Atur Halaqoh Tahfidz (Kelas Formal Tetap)" style="color: #10b981; background: rgba(16, 185, 129, 0.12);">📖</button>
              <button type="button" class="btn-table-action" onclick="window.quickPindahSantri('${s.id}')" title="Pindah Kelas Formal" style="color: #0284c7; background: rgba(2, 132, 199, 0.12);">🔄</button>
              <button type="button" class="btn-table-action" onclick="window.editSantri('${s.id}')" title="Edit Data">✏️</button>
              <button type="button" class="btn-table-action delete" onclick="window.deleteSantri('${s.id}')" title="Hapus Data">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderUstadzTable() {
    const tbody = document.getElementById('tbody-ustadz');
    if (!tbody) return;

    if (!Array.isArray(appState.ustadz) || appState.ustadz.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 24px; color: var(--text-muted);">Belum ada data ustadz. Klik "Tambah Ustadz Baru" untuk menambahkan pengajar.</td></tr>`;
      return;
    }

    const today = getTodayDateStr();

    tbody.innerHTML = appState.ustadz.map(u => {
      const uNama = String(u.nama || '').trim();
      const uNamaFirst = uNama.split(',')[0].trim();
      const uLogs = appState.logs.filter(l => l.date === today && l.ustadzName && String(l.ustadzName).includes(uNamaFirst));
      const sesiCount = new Set(uLogs.map(l => l.slotId)).size;
      const rawWa = String(u.wa !== undefined && u.wa !== null ? u.wa : '').trim();
      const waClean = rawWa.replace(/[^0-9]/g, '').replace(/^0/, '62');

      return `
        <tr>
          <td><strong>${String(u.nip || '-')}</strong></td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.2rem;">${u.avatar || '👳‍♂️'}</span>
              <strong>${uNama || 'Ustadz'}</strong>
            </div>
          </td>
          <td><span class="badge badge-primary">${String(u.bidang || '-')}</span></td>
          <td><code>${String(u.username || '-')}</code></td>
          <td>
            ${rawWa ? `
            <a href="https://wa.me/${waClean}" target="_blank" style="color: #047857; text-decoration: none; font-weight: 600;">
              📱 ${rawWa}
            </a>` : '<span style="color: var(--text-muted);">-</span>'}
          </td>
          <td>
            <span class="badge ${sesiCount > 0 ? 'badge-success' : 'badge-warning'}">
              ${sesiCount > 0 ? `✓ ${sesiCount} Sesi Diinput` : 'Belum Input Sesi'}
            </span>
          </td>
          <td>
            <div style="display: flex; gap: 4px;">
              <button type="button" class="btn-table-action" onclick="window.editUstadz('${u.id}')" title="Edit">✏️</button>
              <button type="button" class="btn-table-action delete" onclick="window.deleteUstadz('${u.id}')" title="Hapus">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function sortSlots(slots) {
    return slots.sort((a, b) => {
      const timeA = (parseInt(a.startHour, 10) || 0) * 60 + (parseInt(a.startMin, 10) || 0);
      const timeB = (parseInt(b.startHour, 10) || 0) * 60 + (parseInt(b.startMin, 10) || 0);
      return timeA - timeB;
    });
  }

  function calculateSlotDuration(slot) {
    const start = (parseInt(slot.startHour, 10) || 0) * 60 + (parseInt(slot.startMin, 10) || 0);
    const end = (parseInt(slot.endHour, 10) || 0) * 60 + (parseInt(slot.endMin, 10) || 0);
    const diff = end - start;
    return diff > 0 ? diff : 40;
  }

  function renderMasterJadwalCards() {
    const container = document.getElementById('slots-cards-grid');
    if (!container) return;

    // Update dynamic count in tab header
    const countBadge = document.getElementById('admin-slots-count');
    if (countBadge) countBadge.textContent = appState.slots.length;

    container.innerHTML = appState.slots.map((slot, index) => {
      const duration = calculateSlotDuration(slot);
      return `
        <div class="slot-detail-card ${slot.isBreak ? 'is-istirahat' : ''}">
          <div class="slot-card-header-row">
            <div class="slot-card-time">SLOT #${index + 1} • ${slot.time}</div>
            <div class="slot-card-actions">
              <button type="button" class="btn-slot-action edit" data-action="edit-slot" data-slot-id="${slot.id}" title="Ubah Slot Waktu">
                ✏️ Ubah
              </button>
              <button type="button" class="btn-slot-action delete" data-action="delete-slot" data-slot-id="${slot.id}" title="Hapus Slot">
                🗑️
              </button>
            </div>
          </div>
          <div class="slot-card-title">${slot.icon || '⏰'} ${slot.name}</div>
          <div class="slot-card-desc">${slot.desc || 'Kegiatan terstandar pondok'}</div>
          <div class="slot-card-footer">
            <span class="badge ${slot.isBreak ? 'badge-warning' : 'badge-info'}">
              ${slot.isBreak ? 'Non-Absensi (Jeda)' : 'Wajib Absensi & Keaktifan'}
            </span>
            <span class="slot-duration-pill">⏱️ ${duration} Menit</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events for edit & delete buttons
    container.querySelectorAll('[data-action="edit-slot"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const slotId = btn.getAttribute('data-slot-id');
        openEditSlotModal(slotId);
      });
    });

    container.querySelectorAll('[data-action="delete-slot"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const slotId = btn.getAttribute('data-slot-id');
        handleDeleteSlot(slotId);
      });
    });

    // Update filter dropdowns
    updateSlotDropdowns();
  }

  function setup24HourTimeInput(inputEl) {
    if (!inputEl) return;

    inputEl.addEventListener('input', () => {
      let raw = inputEl.value.replace(/[^0-9:.]/g, '').replace('.', ':');
      const digitsOnly = raw.replace(/:/g, '');
      if (digitsOnly.length === 4 && !raw.includes(':')) {
        raw = `${digitsOnly.slice(0, 2)}:${digitsOnly.slice(2, 4)}`;
      }
      inputEl.value = raw;
    });

    inputEl.addEventListener('blur', () => {
      let val = inputEl.value.trim().replace('.', ':');
      if (!val) {
        inputEl.value = '08:00';
        return;
      }
      if (/^\d{1,2}$/.test(val)) {
        let h = Math.min(23, Math.max(0, parseInt(val, 10)));
        inputEl.value = `${String(h).padStart(2, '0')}:00`;
        return;
      }
      if (/^\d{3,4}$/.test(val)) {
        let h = Math.min(23, parseInt(val.slice(0, -2), 10));
        let m = Math.min(59, parseInt(val.slice(-2), 10));
        inputEl.value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        return;
      }
      if (val.includes(':')) {
        let parts = val.split(':');
        let h = Math.min(23, Math.max(0, parseInt(parts[0], 10) || 0));
        let m = Math.min(59, Math.max(0, parseInt(parts[1], 10) || 0));
        inputEl.value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        return;
      }
      inputEl.value = '08:00';
    });
  }

  function openEditSlotModal(slotId) {
    const slot = appState.slots.find(s => s.id === slotId);
    if (!slot) return;

    document.getElementById('slot-edit-id').value = slot.id;
    document.getElementById('slot-name').value = slot.name || '';
    document.getElementById('slot-icon').value = slot.icon || '📖';

    const pad = (n) => String(n).padStart(2, '0');
    document.getElementById('slot-start-time').value = `${pad(slot.startHour)}:${pad(slot.startMin)}`;
    document.getElementById('slot-end-time').value = `${pad(slot.endHour)}:${pad(slot.endMin)}`;
    document.getElementById('slot-is-break').value = slot.isBreak ? 'true' : 'false';
    document.getElementById('slot-desc').value = slot.desc || '';

    const titleEl = document.getElementById('modal-slot-title');
    if (titleEl) titleEl.textContent = `Ubah Slot Waktu: ${slot.name}`;

    openModal('modal-slot');
  }

  function handleSaveSlotForm() {
    const editId = document.getElementById('slot-edit-id').value;
    const name = document.getElementById('slot-name').value.trim();
    const icon = document.getElementById('slot-icon').value;
    const startTimeStr = (document.getElementById('slot-start-time').value || '').trim().replace('.', ':');
    const endTimeStr = (document.getElementById('slot-end-time').value || '').trim().replace('.', ':');
    const isBreak = document.getElementById('slot-is-break').value === 'true';
    const desc = document.getElementById('slot-desc').value.trim();

    if (!name) {
      showToast('⚠️ Nama kegiatan tidak boleh kosong!', 'error');
      return;
    }

    if (!startTimeStr || !endTimeStr) {
      showToast('⚠️ Jam mulai dan jam selesai (format 24 jam) harus diisi!', 'error');
      return;
    }

    const [sH, sM] = startTimeStr.split(':').map(Number);
    const [eH, eM] = endTimeStr.split(':').map(Number);

    if (isNaN(sH) || isNaN(sM) || sH < 0 || sH > 23 || sM < 0 || sM > 59) {
      showToast('⚠️ Format waktu mulai salah! Gunakan format 24 jam 00:00 - 23:59 (contoh: 08:00 atau 16:30).', 'error');
      return;
    }

    if (isNaN(eH) || isNaN(eM) || eH < 0 || eH > 23 || eM < 0 || eM > 59) {
      showToast('⚠️ Format waktu selesai salah! Gunakan format 24 jam 00:00 - 23:59 (contoh: 08:40 atau 17:00).', 'error');
      return;
    }

    const pad = (n) => String(n).padStart(2, '0');
    const formattedTime = `${pad(sH)}.${pad(sM)} - ${pad(eH)}.${pad(eM)}`;

    if (editId) {
      const index = appState.slots.findIndex(s => s.id === editId);
      if (index !== -1) {
        appState.slots[index] = {
          ...appState.slots[index],
          name,
          icon,
          time: formattedTime,
          startHour: sH,
          startMin: sM,
          endHour: eH,
          endMin: eM,
          isBreak,
          desc
        };
        showToast(`Slot waktu "${name}" berhasil diperbarui!`, 'success');
      }
    } else {
      const newSlot = {
        id: `slot-${Date.now()}`,
        name,
        icon,
        time: formattedTime,
        startHour: sH,
        startMin: sM,
        endHour: eH,
        endMin: eM,
        isBreak,
        desc: desc || `Kegiatan ${name} Pondok Pesantren Bilal Bin Robah`
      };
      appState.slots.push(newSlot);
      showToast(`Slot waktu baru "${name}" berhasil ditambahkan!`, 'success');
    }

    // Sort chronologically
    appState.slots = sortSlots(appState.slots);

    // Sync MASTER_SLOTS
    MASTER_SLOTS.length = 0;
    MASTER_SLOTS.push(...appState.slots);

    saveData();
    syncSingleAction('sync_all', { slots: appState.slots });
    updateSheetsUI();
    renderMasterJadwalCards();
    renderAdminTimelineSlots();
    updateLiveClock();

    closeModal('modal-slot');
  }

  function handleDeleteSlot(slotId) {
    const slot = appState.slots.find(s => s.id === slotId);
    if (!slot) return;

    if (appState.slots.length <= 1) {
      showToast('⚠️ Minimal harus ada 1 slot waktu dalam jadwal!', 'error');
      return;
    }

    if (confirm(`Apakah Anda yakin ingin menghapus slot "${slot.name}" (${slot.time})?`)) {
      appState.slots = appState.slots.filter(s => s.id !== slotId);
      MASTER_SLOTS.length = 0;
      MASTER_SLOTS.push(...appState.slots);

      saveData();
      syncSingleAction('sync_all', { slots: appState.slots });
      updateSheetsUI();
      renderMasterJadwalCards();
      renderAdminTimelineSlots();
      updateLiveClock();
      showToast(`Slot "${slot.name}" telah dihapus!`, 'info');
    }
  }

  function handleResetSlots() {
    if (confirm('Kembalikan susunan slot waktu ke preset resmi 11 sesi standar Pondok Pesantren Bilal Bin Robah?')) {
      appState.slots = JSON.parse(JSON.stringify(INITIAL_MASTER_SLOTS));
      MASTER_SLOTS.length = 0;
      MASTER_SLOTS.push(...appState.slots);

      saveData();
      syncSingleAction('sync_all', { slots: appState.slots });
      updateSheetsUI();
      renderMasterJadwalCards();
      renderAdminTimelineSlots();
      updateLiveClock();
      showToast('Master slot berhasil dikembalikan ke standar 11 sesi!', 'success');
    }
  }

  let currentWeekOffset = 0;
  let currentRekapPreset = '1week';

  function ensureTodayLogsExist() {
    const today = getTodayDateStr();
    const hasToday = appState.logs.some(l => l.date === today);
    if (!hasToday && appState.santri.length > 0 && MASTER_SLOTS.length > 0) {
      const todaySlots = MASTER_SLOTS.filter(s => !s.isBreak).slice(0, 5);
      appState.santri.forEach((santri, sIdx) => {
        todaySlots.forEach(slot => {
          let status = 'Hadir';
          let keaktifan = 5;
          let note = 'Murojaah sangat mutqin dan tertib di halaqoh';
          if (santri.id === 's-6' && slot.id.includes('3')) {
            status = 'Izin';
            keaktifan = 2;
            note = 'Izin ke ruang kesehatan santri';
          } else if (sIdx % 3 === 0) {
            keaktifan = 4;
            note = 'Fokus dan aktif menjawab latihan ustadz';
          }
          const defaultUstadzNama = santri.musyrif || (appState.ustadz[0]?.nama || 'Ustadz Pembimbing');
          appState.logs.push({
            id: `log-${today}-${slot.id}-${santri.id}`,
            date: today,
            slotId: slot.id,
            slotName: slot.name,
            slotTime: slot.time,
            santriId: santri.id,
            santriName: santri.nama,
            santriKelas: santri.kelas,
            status: status,
            keaktifan: status === 'Hadir' ? keaktifan : 1,
            catatan: note,
            ustadzName: defaultUstadzNama,
            timestamp: `${today} ${slot.time.split(' - ')[0]}`
          });
        });
      });
      saveData();
    }
  }

  function setRekapPreset(presetName) {
    currentRekapPreset = presetName;
    const fromInput = document.getElementById('rekap-date-from');
    const toInput = document.getElementById('rekap-date-to');

    if (presetName === '1week') {
      currentWeekOffset = 0;
      const info = getPekanInfo(0);
      if (fromInput) fromInput.value = info.from;
      if (toInput) toInput.value = info.to;
    } else if (presetName === 'prevweek') {
      currentWeekOffset -= 1;
      const info = getPekanInfo(currentWeekOffset);
      if (fromInput) fromInput.value = info.from;
      if (toInput) toInput.value = info.to;
    } else if (presetName === 'nextweek') {
      currentWeekOffset += 1;
      const info = getPekanInfo(currentWeekOffset);
      if (fromInput) fromInput.value = info.from;
      if (toInput) toInput.value = info.to;
    } else if (presetName === '1month') {
      if (fromInput) fromInput.value = getDateOffset(29);
      if (toInput) toInput.value = getTodayDateStr();
    } else if (presetName === 'all') {
      if (fromInput) fromInput.value = '';
      if (toInput) toInput.value = '';
    }

    updateRekapPresetButtons(presetName);
    renderRekapitulasi();
  }

  function updateRekapPresetButtons(activePreset) {
    document.querySelectorAll('.btn-preset-range').forEach(btn => {
      const p = btn.getAttribute('data-preset');
      btn.classList.toggle('active', p === activePreset);
    });
  }

  function handleManualRekapDateChange() {
    const fromVal = document.getElementById('rekap-date-from')?.value;
    const toVal = document.getElementById('rekap-date-to')?.value;

    const curPekan = getPekanInfo(0);
    const prevPekan = getPekanInfo(-1);

    if (!fromVal && !toVal) {
      currentRekapPreset = 'all';
    } else if (fromVal === curPekan.from && toVal === curPekan.to) {
      currentRekapPreset = '1week';
      currentWeekOffset = 0;
    } else if (fromVal === prevPekan.from && toVal === prevPekan.to) {
      currentRekapPreset = 'prevweek';
      currentWeekOffset = -1;
    } else if (fromVal === getDateOffset(29) && toVal === getTodayDateStr()) {
      currentRekapPreset = '1month';
    } else {
      currentRekapPreset = 'custom';
    }

    updateRekapPresetButtons(currentRekapPreset);
    renderRekapitulasi();
  }

  function renderRekapitulasi() {
    const tbody = document.getElementById('tbody-rekapitulasi');
    if (!tbody) return;

    const fromInput = document.getElementById('rekap-date-from');
    const toInput = document.getElementById('rekap-date-to');

    // Default: otomatis pilih pekan aktif saat ini (otomatis berganti ke pekan ke-2 saat waktunya tiba)
    if (fromInput && toInput && !fromInput.value && !toInput.value && currentRekapPreset === '1week') {
      const activePekan = getPekanInfo(currentWeekOffset);
      fromInput.value = activePekan.from;
      toInput.value = activePekan.to;
    }

    const filterFrom = fromInput?.value;
    const filterTo = toInput?.value;
    const filterSlot = document.getElementById('rekap-filter-slot')?.value;
    const filterKelas = document.getElementById('rekap-filter-kelas')?.value;
    const filterStatus = document.getElementById('rekap-filter-status')?.value;

    const filtered = appState.logs.filter(log => {
      if (filterFrom && log.date < filterFrom) return false;
      if (filterTo && log.date > filterTo) return false;
      if (filterSlot && log.slotId !== filterSlot) return false;
      if (filterKelas && log.santriKelas !== filterKelas) return false;
      if (filterStatus && log.status !== filterStatus) return false;
      return true;
    });

    const totalRec = filtered.length;
    const countHadir = filtered.filter(l => l.status === 'Hadir').length;
    const countIzin = filtered.filter(l => l.status === 'Izin').length;
    const countSakit = filtered.filter(l => l.status === 'Sakit').length;
    const countAlpa = filtered.filter(l => l.status === 'Alpa').length;
    const pctHadir = totalRec > 0 ? Math.round((countHadir / totalRec) * 100) : 0;
    const sumScore = filtered.reduce((acc, c) => acc + (c.keaktifan || 0), 0);
    const avgScore = totalRec > 0 ? (sumScore / totalRec).toFixed(1) : '0.0';

    document.getElementById('rekap-total-records').textContent = totalRec;
    document.getElementById('rekap-count-hadir').textContent = countHadir;
    document.getElementById('rekap-pct-hadir').textContent = `${pctHadir}%`;
    document.getElementById('rekap-count-izin').textContent = countIzin;
    document.getElementById('rekap-count-sakit').textContent = countSakit;
    document.getElementById('rekap-count-alpa').textContent = countAlpa;
    document.getElementById('rekap-avg-score').textContent = avgScore;

    // Tampilkan data
    const displayList = [...filtered].reverse();

    // Format teks tanggal pekan saja (BERSIH TANPA KETERANGAN TAMBAHAN)
    let dateRangeText = '';
    if (filterFrom && filterTo) {
      dateRangeText = `${formatIndoDate(filterFrom)} – ${formatIndoDate(filterTo)}`;
    } else if (filterFrom) {
      dateRangeText = `Sejak ${formatIndoDate(filterFrom)}`;
    } else if (filterTo) {
      dateRangeText = `Hingga ${formatIndoDate(filterTo)}`;
    } else {
      dateRangeText = 'Semua Riwayat';
    }

    // Update Footer (Cukup tanggal pekan di kiri & jumlah data di kanan)
    const footerDate = document.getElementById('rekap-footer-date-text');
    if (footerDate) {
      footerDate.textContent = dateRangeText;
    }

    const footerCount = document.getElementById('rekap-footer-records-info');
    if (footerCount) {
      footerCount.textContent = `${displayList.length} Baris Data`;
    }

    // Update Period Indicator Badge di atas (Cukup tanggal pekan saja)
    const periodBadge = document.getElementById('rekap-period-indicator');
    if (periodBadge) {
      periodBadge.innerHTML = `<span class="period-dot active"></span> <strong>${dateRangeText}</strong>`;
    }

    if (displayList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 28px;" class="text-muted">Tidak ada data rekapitulasi pada rentang waktu atau filter ini.</td></tr>`;
      return;
    }

    tbody.innerHTML = displayList.map(r => `
      <tr>
        <td class="cell-date"><strong>${r.date}</strong></td>
        <td class="cell-slot">
          <div class="slot-name-compact" title="${r.slotName}">${r.slotName}</div>
          <div class="slot-time-compact">${r.slotTime}</div>
        </td>
        <td class="cell-santri">
          <strong class="santri-name-highlight" title="${r.santriName}">${r.santriName}</strong>
        </td>
        <td class="cell-kelas"><span class="badge badge-info">${r.santriKelas}</span></td>
        <td class="cell-status"><span class="status-pill status-${r.status.toLowerCase()}">${r.status}</span></td>
        <td class="cell-score">
          <span class="stars-gold">${'★'.repeat(r.keaktifan)}${'☆'.repeat(5 - r.keaktifan)}</span>
          <span class="score-badge-val">(${r.keaktifan}.0)</span>
        </td>
        <td class="cell-notes">
          <span class="notes-text" title="${(r.catatan || '-').replace(/"/g, '&quot;')}">${r.catatan || '-'}</span>
        </td>
        <td class="cell-ustadz">
          <span class="ustadz-name-compact" title="${r.ustadzName || '-'}">${r.ustadzName ? String(r.ustadzName).replace('Ustadz ', 'Ust. ') : '-'}</span>
        </td>
      </tr>
    `).join('');
  }

  // ==========================================================================
  // 11. PORTAL 2: USTADZ FORM INPUT
  // ==========================================================================
  function renderUstadzView() {
    const curU = appState.currentUser.details || appState.ustadz[0];

    const avatarEl = document.getElementById('ustadz-profile-avatar');
    const nameEl = document.getElementById('ustadz-profile-name');
    const metaEl = document.getElementById('ustadz-profile-meta');

    if (avatarEl) avatarEl.textContent = curU.avatar || '👨‍🏫';
    if (nameEl) nameEl.textContent = curU.nama;
    if (metaEl) metaEl.textContent = `NIP: ${curU.nip} • Pengampu: ${curU.bidang}`;

    const dateInput = document.getElementById('ustadz-input-date');
    if (dateInput && !dateInput.value) {
      dateInput.value = getTodayDateStr();
    }

    // Pastikan seluruh slot waktu & kelas terisi penuh dengan data terkini
    updateSlotDropdowns();
    updateKelasDropdowns();

    renderUstadzAttendanceInputTable();
    renderUstadzTodayHistory();
  }

  function renderUstadzAttendanceInputTable() {
    const tbody = document.getElementById('tbody-input-attendance');
    const dateInput = document.getElementById('ustadz-input-date');
    const slotSelect = document.getElementById('ustadz-input-slot');
    const kelasSelect = document.getElementById('ustadz-input-kelas');
    const badgeStatus = document.getElementById('badge-session-status');

    if (!tbody) return;

    const dateVal = dateInput ? dateInput.value : getTodayDateStr();
    const slotId = slotSelect ? slotSelect.value : 'slot-1';
    const kelasVal = kelasSelect ? kelasSelect.value : 'Kelas 7A';

    const targetClassObj = appState.kelasHalaqoh.find(k => k.nama.toLowerCase() === (kelasVal || '').toLowerCase());
    const isHalaqoh = targetClassObj ? isHalaqohGroup(targetClassObj) : (kelasVal.toLowerCase().includes('halaqoh') || kelasVal.toLowerCase().includes('tahfidz'));

    const santriList = isHalaqoh
      ? appState.santri.filter(s => (s.halaqoh || '').trim().toLowerCase() === kelasVal.trim().toLowerCase())
      : appState.santri.filter(s => (s.kelas || '').trim().toLowerCase() === kelasVal.trim().toLowerCase());

    const existingLogs = appState.logs.filter(l => l.date === dateVal && l.slotId === slotId);
    const isSaved = existingLogs.length > 0;

    if (badgeStatus) {
      if (isSaved) {
        badgeStatus.className = 'badge badge-success';
        badgeStatus.textContent = '✓ Data Sesi Tersimpan (Bisa Diperbarui)';
      } else {
        badgeStatus.className = 'badge badge-warning';
        badgeStatus.textContent = 'Belum Disimpan';
      }
    }

    if (santriList.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px;" class="text-muted">Tidak ada santri di ${isHalaqoh ? 'halaqoh' : 'kelas'} ${kelasVal}.</td></tr>`;
      return;
    }

    tbody.innerHTML = santriList.map((santri, index) => {
      const existing = existingLogs.find(l => l.santriId === santri.id);
      const currentStatus = existing ? existing.status : 'Hadir';
      const currentKeaktifan = existing ? existing.keaktifan : 4;
      const currentCatatan = existing ? existing.catatan : '';

      return `
        <tr data-santri-id="${santri.id}" class="santri-input-row">
          <td>${index + 1}</td>
          <td>
            <div class="santri-name-strong">${santri.nama}</div>
            <div class="santri-nis-span">NIS: ${santri.nis} • Kelas: ${santri.kelas || '-'} ${santri.halaqoh ? '• Halaqoh: ' + santri.halaqoh : ''}</div>
          </td>
          <td>
            <div class="attendance-radio-group">
              <button type="button" class="attendance-radio-btn btn-hadir ${currentStatus === 'Hadir' ? 'active' : ''}" data-val="Hadir" onclick="window.setRowAttendance('${santri.id}', 'Hadir')">Hadir</button>
              <button type="button" class="attendance-radio-btn btn-izin ${currentStatus === 'Izin' ? 'active' : ''}" data-val="Izin" onclick="window.setRowAttendance('${santri.id}', 'Izin')">Izin</button>
              <button type="button" class="attendance-radio-btn btn-sakit ${currentStatus === 'Sakit' ? 'active' : ''}" data-val="Sakit" onclick="window.setRowAttendance('${santri.id}', 'Sakit')">Sakit</button>
              <button type="button" class="attendance-radio-btn btn-alpa ${currentStatus === 'Alpa' ? 'active' : ''}" data-val="Alpa" onclick="window.setRowAttendance('${santri.id}', 'Alpa')">Alpa</button>
            </div>
            <input type="hidden" id="status-${santri.id}" value="${currentStatus}">
          </td>
          <td>
            <div class="keaktifan-picker-wrap">
              <div class="stars-row" id="stars-${santri.id}">
                ${[1, 2, 3, 4, 5].map(star => `
                  <button type="button" class="star-btn ${star <= currentKeaktifan ? 'active' : ''}" onclick="window.setRowKeaktifan('${santri.id}', ${star})" title="${KEAKTIFAN_LABELS[star]}">★</button>
                `).join('')}
              </div>
              <input type="hidden" id="keaktifan-${santri.id}" value="${currentKeaktifan}">
              <div class="keaktifan-label-text" id="label-keaktifan-${santri.id}">
                ${KEAKTIFAN_LABELS[currentKeaktifan]}
              </div>
            </div>
          </td>
          <td>
            <div class="note-input-container">
              <input type="text" id="note-${santri.id}" class="form-control" placeholder="Tulis catatan keaktifan / materi..." value="${currentCatatan}">
              <div class="quick-chips-row">
                <span class="quick-chip" onclick="window.fillRowNote('${santri.id}', 'Hafalan sangat mutqin & lancar')">📖 Hafalan lancar</span>
                <span class="quick-chip" onclick="window.fillRowNote('${santri.id}', 'Fokus & aktif bertanya')">💡 Aktif bertanya</span>
                <span class="quick-chip" onclick="window.fillRowNote('${santri.id}', 'Adab dan kesantunan baik')">🌱 Santun & tertib</span>
                <span class="quick-chip" onclick="window.fillRowNote('${santri.id}', 'Kurang fokus di sesi ini')">⚠️ Kurang fokus</span>
              </div>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderUstadzTodayHistory() {
    const container = document.getElementById('ustadz-history-list');
    const todaySessionsEl = document.getElementById('ustadz-today-sessions');
    const evaluatedCountEl = document.getElementById('ustadz-evaluated-count');
    if (!container) return;

    const today = getTodayDateStr();
    const curU = appState.currentUser.details || (appState.ustadz && appState.ustadz[0]) || { nama: 'Ustadz' };
    const curUNama = String(curU.nama || 'Ustadz').split(',')[0].trim();
    const todayLogs = appState.logs.filter(l => l.date === today && l.ustadzName && String(l.ustadzName).includes(curUNama));

    const slotsMap = {};
    todayLogs.forEach(log => {
      if (!slotsMap[log.slotId]) {
        slotsMap[log.slotId] = {
          slotName: log.slotName,
          slotTime: log.slotTime,
          records: []
        };
      }
      slotsMap[log.slotId].records.push(log);
    });

    const slotKeys = Object.keys(slotsMap);
    if (todaySessionsEl) todaySessionsEl.textContent = `${slotKeys.length} Sesi`;
    if (evaluatedCountEl) evaluatedCountEl.textContent = `${todayLogs.length} Santri`;

    if (slotKeys.length === 0) {
      container.innerHTML = `
        <div class="text-muted" style="font-size: 0.85rem; padding: 15px 0;">
          Belum ada sesi absensi yang disimpan oleh Anda hari ini. Gunakan form di atas untuk mulai mencatat absensi.
        </div>
      `;
      return;
    }

    container.innerHTML = slotKeys.map(key => {
      const s = slotsMap[key];
      const hadir = s.records.filter(r => r.status === 'Hadir').length;
      const total = s.records.length;
      const avg = (s.records.reduce((acc, r) => acc + (r.keaktifan || 0), 0) / total).toFixed(1);

      return `
        <div class="history-card">
          <div class="history-time">${s.slotTime}</div>
          <div class="history-slot">📖 ${s.slotName}</div>
          <div class="history-stats">
            <span>✅ Hadir: <strong>${hadir}/${total}</strong></span> • 
            <span>⭐ Keaktifan: <strong>${avg}</strong>/5.0</span>
          </div>
        </div>
      `;
    }).join('');
  }

  window.setRowAttendance = function (santriId, status) {
    const input = document.getElementById(`status-${santriId}`);
    if (input) input.value = status;

    const row = document.querySelector(`tr[data-santri-id="${santriId}"]`);
    if (row) {
      row.querySelectorAll('.attendance-radio-btn').forEach(btn => {
        if (btn.getAttribute('data-val') === status) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    if (status === 'Alpa' || status === 'Sakit') {
      window.setRowKeaktifan(santriId, 1);
    } else if (status === 'Hadir') {
      const curScore = parseInt(document.getElementById(`keaktifan-${santriId}`).value, 10);
      if (curScore <= 1) window.setRowKeaktifan(santriId, 4);
    }
  };

  window.setRowKeaktifan = function (santriId, score) {
    const input = document.getElementById(`keaktifan-${santriId}`);
    const label = document.getElementById(`label-keaktifan-${santriId}`);
    const starsRow = document.getElementById(`stars-${santriId}`);

    if (input) input.value = score;
    if (label) label.textContent = KEAKTIFAN_LABELS[score];

    if (starsRow) {
      starsRow.querySelectorAll('.star-btn').forEach((btn, idx) => {
        if (idx < score) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  };

  window.fillRowNote = function (santriId, text) {
    const noteInput = document.getElementById(`note-${santriId}`);
    if (noteInput) {
      noteInput.value = text;
      noteInput.focus();
    }
  };

  function saveCurrentUstadzSession() {
    const dateInput = document.getElementById('ustadz-input-date');
    const slotSelect = document.getElementById('ustadz-input-slot');
    const kelasSelect = document.getElementById('ustadz-input-kelas');

    const dateVal = dateInput.value;
    const slotId = slotSelect.value;
    const kelasVal = kelasSelect.value;

    const slot = MASTER_SLOTS.find(s => s.id === slotId);
    const curU = appState.currentUser.details || appState.ustadz[0];
    const santriRows = document.querySelectorAll('.santri-input-row');

    if (santriRows.length === 0) {
      showToast('Tidak ada santri untuk disimpan pada kelas ini.', 'error');
      return;
    }

    const santriIdsInClass = new Set(appState.santri.filter(s => s.kelas === kelasVal).map(s => s.id));
    appState.logs = appState.logs.filter(l => !(l.date === dateVal && l.slotId === slotId && santriIdsInClass.has(l.santriId)));

    const sessionLogs = [];
    santriRows.forEach(row => {
      const santriId = row.getAttribute('data-santri-id');
      const santri = appState.santri.find(s => s.id === santriId);
      const status = document.getElementById(`status-${santriId}`).value;
      const keaktifan = parseInt(document.getElementById(`keaktifan-${santriId}`).value, 10);
      const catatan = document.getElementById(`note-${santriId}`).value.trim();

      const logItem = {
        id: `log-${dateVal}-${slot.id}-${santri.id}`,
        date: dateVal,
        slotId: slot.id,
        slotName: slot.name,
        slotTime: slot.time,
        santriId: santri.id,
        santriName: santri.nama,
        santriKelas: santri.kelas,
        status: status,
        keaktifan: keaktifan,
        catatan: catatan || (status === 'Hadir' ? 'Hadir dan mengikuti kegiatan dengan tertib' : `Status: ${status}`),
        ustadzName: curU.nama,
        timestamp: `${dateVal} ${slot.time.split(' - ')[0]}`
      };
      appState.logs.push(logItem);
      sessionLogs.push(logItem);
    });

    saveData();
    syncSingleAction('save_session', {
      date: dateVal,
      slotId: slot.id,
      kelas: kelasVal,
      logs: sessionLogs
    });
    updateSheetsUI();
    renderUstadzTodayHistory();

    const badgeStatus = document.getElementById('badge-session-status');
    if (badgeStatus) {
      badgeStatus.className = 'badge badge-success';
      badgeStatus.textContent = '✓ Data Sesi Tersimpan (Bisa Diperbarui)';
    }

    const lastTimeEl = document.getElementById('save-last-timestamp');
    const now = new Date();
    if (lastTimeEl) {
      lastTimeEl.textContent = `Tersimpan pada ${now.toLocaleTimeString('id-ID')} WIB untuk ${slot.name} (${kelasVal}).`;
    }

    showToast(`Berhasil menyimpan absensi ${slot.name} (${kelasVal})!`, 'success');
  }

  // ==========================================================================
  // 12. PORTAL 3: ORANG TUA / WALI SANTRI CONTROLLERS & CHARTS
  // ==========================================================================
  function renderWaliView() {
    const curWali = appState.currentUser;
    const santri = curWali.santri || appState.santri.find(s => s.id === curWali.santriId) || appState.santri[0];
    appState.selectedWaliSantriId = santri.id;

    document.getElementById('wali-parent-name').textContent = santri.wali;
    document.getElementById('wali-santri-name').textContent = santri.nama;
    document.getElementById('wali-santri-nis').textContent = santri.nis;
    document.getElementById('wali-santri-kelas').textContent = santri.kelas;
    const halaqohEl = document.getElementById('wali-santri-halaqoh');
    if (halaqohEl) halaqohEl.textContent = santri.halaqoh || 'Halaqoh Al-Qur\'an';
    document.getElementById('wali-santri-asrama').textContent = santri.asrama;
    document.getElementById('wali-santri-musyrif').textContent = santri.musyrif;

    const avatarImg = document.getElementById('wali-santri-avatar');
    if (avatarImg) {
      avatarImg.src = santri.gender === 'P'
        ? 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90"><rect width="90" height="90" fill="%23be185d"/><text x="45" y="55" font-size="32" font-family="sans-serif" font-weight="bold" fill="white" text-anchor="middle">FZ</text></svg>'
        : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90"><rect width="90" height="90" fill="%230f172a"/><text x="45" y="55" font-size="32" font-family="sans-serif" font-weight="bold" fill="%23fbbf24" text-anchor="middle">RY</text></svg>';
    }

    const keaktifanScoreEl = document.getElementById('wali-keaktifan-score');
    const keaktifanStatusEl = document.getElementById('wali-keaktifan-status');
    const keaktifanBarEl = document.getElementById('wali-keaktifan-bar') || document.getElementById('wali-tahfidz-bar');
    const keaktifanNotesEl = document.getElementById('wali-keaktifan-notes') || document.getElementById('wali-tahfidz-notes');

    if (keaktifanScoreEl) keaktifanScoreEl.textContent = '4.8 / 5.0';
    if (keaktifanStatusEl) keaktifanStatusEl.textContent = 'Mumtaz (96%)';
    if (keaktifanBarEl) keaktifanBarEl.style.width = '96%';
    if (keaktifanNotesEl) keaktifanNotesEl.textContent = 'Konsisten hadir tepat waktu & sangat aktif di seluruh 11 sesi kegiatan harian.';

    if (document.getElementById('wali-tahfidz-capaian')) {
      document.getElementById('wali-tahfidz-capaian').textContent = `${santri.tahfidzCurrent} Juz`;
    }

    const today = getTodayDateStr();
    const todayLogs = appState.logs.filter(l => l.date === today && l.santriId === santri.id);

    const attendBadge = document.getElementById('wali-today-attendance-badge');
    const scoreBadge = document.getElementById('wali-today-score-badge');
    const lastNote = document.getElementById('wali-today-last-note');

    if (todayLogs.length > 0) {
      const hadirCount = todayLogs.filter(l => l.status === 'Hadir').length;
      const totalSesi = todayLogs.length;
      const rate = Math.round((hadirCount / totalSesi) * 100);
      const avgScore = (todayLogs.reduce((acc, c) => acc + (c.keaktifan || 0), 0) / totalSesi).toFixed(1);

      if (attendBadge) {
        attendBadge.innerHTML = `<span class="badge badge-success-lg">✅ ${hadirCount} / ${totalSesi} Sesi Hadir (${rate}%)</span>`;
      }
      if (scoreBadge) {
        scoreBadge.innerHTML = `<span class="badge badge-amber-lg">⭐ ${avgScore} / 5.0 (${avgScore >= 4.5 ? 'Mumtaz / Sangat Aktif' : 'Aktif'})</span>`;
      }

      const latestWithNote = [...todayLogs].reverse().find(l => l.catatan && l.catatan.trim() !== '');
      if (lastNote) {
        lastNote.textContent = latestWithNote
          ? `"${latestWithNote.catatan}" (${latestWithNote.slotName} • ${latestWithNote.ustadzName})`
          : `"Ananda hadir tepat waktu dan aktif dalam semua kegiatan pondok hari ini."`;
      }
    } else {
      if (attendBadge) attendBadge.innerHTML = `<span class="badge badge-info">Sesi hari ini segera dimulai</span>`;
      if (scoreBadge) scoreBadge.innerHTML = `<span class="badge badge-info">-</span>`;
      if (lastNote) lastNote.textContent = `"Menunggu input sesi pertama dari ustadz pembimbing."`;
    }

    renderWaliPieChart(santri.id);
    renderWaliLineChart(santri.id);
    renderWaliTimelineFeed(santri.id, appState.waliTimelineFilter || 'all');
  }

  // ==========================================================================
  // 13. CANVAS CHARTS (PIE & LINE)
  // ==========================================================================
  function renderWaliPieChart(santriId) {
    const canvas = document.getElementById('chart-wali-pie');
    const legendsWrap = document.getElementById('wali-pie-legends');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = 340;
    const h = 260;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const santriLogs = appState.logs.filter(l => l.santriId === santriId);
    let hadir = santriLogs.filter(l => l.status === 'Hadir').length;
    let izin = santriLogs.filter(l => l.status === 'Izin').length;
    let sakit = santriLogs.filter(l => l.status === 'Sakit').length;
    let alpa = santriLogs.filter(l => l.status === 'Alpa').length;

    const total = hadir + izin + sakit + alpa || 1;
    const hadirPct = Math.round((hadir / total) * 100);
    const izinPct = Math.round((izin / total) * 100);
    const sakitPct = Math.round((sakit / total) * 100);
    const alpaPct = Math.max(0, 100 - hadirPct - izinPct - sakitPct);

    const segments = [
      { label: 'Hadir', count: hadir, pct: hadirPct, color: '#10b981' },
      { label: 'Izin', count: izin, pct: izinPct, color: '#f59e0b' },
      { label: 'Sakit', count: sakit, pct: sakitPct, color: '#0284c7' },
      { label: 'Alpa', count: alpa, pct: alpaPct, color: '#e11d48' }
    ];

    ctx.clearRect(0, 0, w, h);

    const centerX = w / 2;
    const centerY = h / 2 - 10;
    const outerRadius = 85;
    const innerRadius = 55;

    let currentAngle = -0.5 * Math.PI;

    segments.forEach(seg => {
      const sliceAngle = (seg.count / total) * 2 * Math.PI;
      if (sliceAngle > 0) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = seg.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        currentAngle += sliceAngle;
      }
    });

    ctx.fillStyle = appSettings.accentColor || '#fbbf24';
    ctx.font = 'bold 24px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${hadirPct}%`, centerX, centerY - 6);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px -apple-system, sans-serif';
    ctx.fillText('KEHADIRAN', centerX, centerY + 14);

    if (legendsWrap) {
      legendsWrap.innerHTML = segments.map(seg => `
        <div class="chart-legend-badge">
          <span class="legend-swatch" style="background-color: ${seg.color};"></span>
          <span><strong>${seg.label}:</strong> ${seg.count} sesi (${seg.pct}%)</span>
        </div>
      `).join('');
    }
  }

  function getCurrentWaliSantriId() {
    if (appState.selectedWaliSantriId) return appState.selectedWaliSantriId;
    if (appState.currentUser) {
      if (appState.currentUser.santriId) return appState.currentUser.santriId;
      if (appState.currentUser.santri && appState.currentUser.santri.id) return appState.currentUser.santri.id;
    }
    return appState.santri[0]?.id || 's-1';
  }

  function renderWaliLineChart(santriId) {
    const canvas = document.getElementById('chart-wali-line');
    const weekAvgEl = document.getElementById('wali-week-avg');
    const scoreLabelEl = document.getElementById('wali-score-label');
    const descEl = document.getElementById('chart-wali-desc');
    const tooltip = document.getElementById('chart-tooltip');
    if (!canvas) return;

    if (!santriId) santriId = getCurrentWaliSantriId();

    const ACADEMIC_WEEKS = {
      'pekan-1': { name: 'Pekan 1', label: 'Pekan 1 (16 - 22 Okt 2026)', start: new Date(2026, 9, 16), days: 7 },
      'pekan-2': { name: 'Pekan 2', label: 'Pekan 2 (23 - 29 Okt 2026) • Pekan Ini', start: new Date(2026, 9, 23), days: 7 },
      'pekan-3': { name: 'Pekan 3', label: 'Pekan 3 (30 Okt - 05 Nov 2026)', start: new Date(2026, 9, 30), days: 7 },
      'pekan-4': { name: 'Pekan 4', label: 'Pekan 4 (06 - 12 Nov 2026)', start: new Date(2026, 10, 6), days: 7 }
    };

    const ACADEMIC_MONTHS = {
      '2026-10': { name: 'Oktober 2026', label: 'Bulan Oktober 2026', year: 2026, month: 9, days: 31 },
      '2026-09': { name: 'September 2026', label: 'Bulan September 2026', year: 2026, month: 8, days: 30 },
      '2026-11': { name: 'November 2026', label: 'Bulan November 2026', year: 2026, month: 10, days: 30 },
      'last-30': { name: '30 Hari Terakhir', label: '30 Hari Terakhir', rolling: true, days: 30 }
    };

    const daysShortIndo = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const daysFullIndo = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const monthsShortIndo = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const monthsFullIndo = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const mode = appState.chartWaliMode || 'pekan';
    const dailyPoints = [];
    const pad = n => String(n).padStart(2, '0');

    if (mode === 'pekan') {
      const wKey = appState.chartWaliWeek || 'pekan-2';
      const conf = ACADEMIC_WEEKS[wKey] || ACADEMIC_WEEKS['pekan-2'];
      for (let i = 0; i < conf.days; i++) {
        const d = new Date(conf.start);
        d.setDate(conf.start.getDate() + i);
        const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
        const dayLogs = appState.logs.filter(l => l.date === dateStr && l.santriId === santriId);

        let score = 4.5;
        if (dayLogs.length > 0) {
          const sum = dayLogs.reduce((acc, c) => acc + (c.keaktifan || 0), 0);
          score = parseFloat((sum / dayLogs.length).toFixed(1));
        } else {
          const santri = appState.santri.find(s => s.id === santriId);
          const base = santri ? (santri.tahfidzCurrent >= 4.5 ? 4.7 : 4.2) : 4.5;
          let seed = 0;
          for (let c = 0; c < dateStr.length; c++) seed = (seed * 31 + dateStr.charCodeAt(c)) % 100;
          const offset = ((seed % 7) - 3) * 0.12;
          score = parseFloat(Math.min(5.0, Math.max(3.6, base + offset)).toFixed(1));
        }

        dailyPoints.push({
          dateStr,
          dayShort: daysShortIndo[d.getDay()],
          dayFull: daysFullIndo[d.getDay()],
          dateShort: `${d.getDate()} ${monthsShortIndo[d.getMonth()]}`,
          fullDate: `${daysFullIndo[d.getDay()]}, ${d.getDate()} ${monthsFullIndo[d.getMonth()]} ${d.getFullYear()}`,
          score
        });
      }

      if (scoreLabelEl) scoreLabelEl.textContent = `Rata-rata ${conf.name}:`;
      if (descEl) descEl.textContent = `Grafik skor keaktifan harian santri (Skala 1.0 - 5.0) • ${conf.label}`;
    } else {
      const mKey = appState.chartWaliMonth || '2026-10';
      const conf = ACADEMIC_MONTHS[mKey] || ACADEMIC_MONTHS['2026-10'];

      if (conf.rolling) {
        const today = new Date(2026, 9, 24);
        for (let i = conf.days - 1; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
          const dayLogs = appState.logs.filter(l => l.date === dateStr && l.santriId === santriId);

          let score = 4.5;
          if (dayLogs.length > 0) {
            const sum = dayLogs.reduce((acc, c) => acc + (c.keaktifan || 0), 0);
            score = parseFloat((sum / dayLogs.length).toFixed(1));
          } else {
            const santri = appState.santri.find(s => s.id === santriId);
            const base = santri ? (santri.tahfidzCurrent >= 4.5 ? 4.6 : 4.1) : 4.4;
            let seed = 0;
            for (let c = 0; c < dateStr.length; c++) seed = (seed * 31 + dateStr.charCodeAt(c)) % 100;
            const offset = ((seed % 7) - 3) * 0.14;
            score = parseFloat(Math.min(5.0, Math.max(3.5, base + offset)).toFixed(1));
          }

          dailyPoints.push({
            dateStr,
            dayShort: daysShortIndo[d.getDay()],
            dayFull: daysFullIndo[d.getDay()],
            dateShort: `${d.getDate()} ${monthsShortIndo[d.getMonth()]}`,
            fullDate: `${daysFullIndo[d.getDay()]}, ${d.getDate()} ${monthsFullIndo[d.getMonth()]} ${d.getFullYear()}`,
            score
          });
        }
      } else {
        for (let day = 1; day <= conf.days; day++) {
          const d = new Date(conf.year, conf.month, day);
          const dateStr = `${conf.year}-${pad(conf.month + 1)}-${pad(day)}`;
          const dayLogs = appState.logs.filter(l => l.date === dateStr && l.santriId === santriId);

          let score = 4.5;
          if (dayLogs.length > 0) {
            const sum = dayLogs.reduce((acc, c) => acc + (c.keaktifan || 0), 0);
            score = parseFloat((sum / dayLogs.length).toFixed(1));
          } else {
            const santri = appState.santri.find(s => s.id === santriId);
            const base = santri ? (santri.tahfidzCurrent >= 4.5 ? 4.6 : 4.1) : 4.4;
            let seed = 0;
            for (let c = 0; c < dateStr.length; c++) seed = (seed * 31 + dateStr.charCodeAt(c)) % 100;
            const offset = ((seed % 7) - 3) * 0.14;
            score = parseFloat(Math.min(5.0, Math.max(3.5, base + offset)).toFixed(1));
          }

          dailyPoints.push({
            dateStr,
            dayShort: daysShortIndo[d.getDay()],
            dayFull: daysFullIndo[d.getDay()],
            dateShort: `${day} ${monthsShortIndo[conf.month]}`,
            fullDate: `${daysFullIndo[d.getDay()]}, ${day} ${monthsFullIndo[conf.month]} ${conf.year}`,
            score
          });
        }
      }

      if (scoreLabelEl) scoreLabelEl.textContent = `Rata-rata ${conf.name}:`;
      if (descEl) descEl.textContent = `Grafik pemantauan tren skor keaktifan santri (Skala 1.0 - 5.0) • ${conf.label}`;
    }

    const totalScore = dailyPoints.reduce((acc, p) => acc + p.score, 0);
    const overallAvg = (totalScore / (dailyPoints.length || 1)).toFixed(1);
    if (weekAvgEl) weekAvgEl.textContent = `${overallAvg} / 5.0`;

    // Render Canvas
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const container = canvas.parentElement;
    const containerW = container ? container.clientWidth : 600;
    const w = Math.min(containerW > 50 ? containerW : 600, 720);
    const h = 280;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);
    const isDark = document.body.classList.contains('theme-dark');

    const padLeft = 45;
    const padRight = 28;
    const padTop = 26;
    const padBottom = 64; // Ruang lega untuk label tanggal & hari

    const plotW = w - padLeft - padRight;
    const plotH = h - padTop - padBottom;
    const yAxis = padTop + plotH;

    const minY = 1.0;
    const maxY = 5.0;

    function getYCoord(val) {
      const ratio = (val - minY) / (maxY - minY);
      return padTop + plotH - (ratio * plotH);
    }

    function getXCoord(idx) {
      if (dailyPoints.length <= 1) return padLeft + plotW / 2;
      return padLeft + (idx / (dailyPoints.length - 1)) * plotW;
    }

    // Gridlines Y (1.0 - 5.0)
    ctx.lineWidth = 1;
    for (let s = 1; s <= 5; s++) {
      const y = getYCoord(s);
      ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(226, 232, 240, 0.9)';
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(w - padRight, y);
      ctx.stroke();

      ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.font = '10px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${s}.0`, padLeft - 8, y + 3.5);
    }

    // Garis Batas Minimal Aktif (4.0)
    const benchmarkY = getYCoord(4.0);
    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padLeft, benchmarkY);
    ctx.lineTo(w - padRight, benchmarkY);
    ctx.stroke();
    ctx.restore();

    const points = dailyPoints.map((p, idx) => ({
      x: getXCoord(idx),
      y: getYCoord(p.score),
      data: p
    }));

    // Area Fill Gradient di Bawah Kurva
    if (points.length > 0) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, yAxis);
      ctx.lineTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.lineTo(points[points.length - 1].x, yAxis);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, padTop, 0, yAxis);
      grad.addColorStop(0, 'rgba(14, 165, 233, 0.35)');
      grad.addColorStop(0.7, 'rgba(14, 165, 233, 0.08)');
      grad.addColorStop(1, 'rgba(14, 165, 233, 0.01)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Garis Kurva Utama
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(14, 165, 233, 0.45)';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();
    }

    // Garis Dasar Sumbu X
    ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.35)' : 'rgba(203, 213, 225, 1)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(padLeft, yAxis);
    ctx.lineTo(w - padRight, yAxis);
    ctx.stroke();

    const isDense = points.length > 16;

    // Keterangan Tanggal dan Hari di Bawah Garis Grafik (TIDAK BERTUMPUKAN)
    if (mode === 'pekan') {
      // MODE PEKAN (7 Hari): Format 2 Baris Bertingkat (Baris 1: Hari, Baris 2: Tanggal)
      // Jarak antar titik ~85px, sangat lega dan rapi tanpa tumpang tindih
      points.forEach((pt) => {
        // Tanda Tick Vertikal
        ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.5)' : 'rgba(148, 163, 184, 0.8)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pt.x, yAxis);
        ctx.lineTo(pt.x, yAxis + 5);
        ctx.stroke();

        // Baris 1: Nama Hari
        ctx.font = 'bold 11px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = isDark ? '#f1f5f9' : '#1e293b';
        ctx.textAlign = 'center';
        ctx.fillText(pt.data.dayShort, pt.x, yAxis + 20);

        // Baris 2: Tanggal
        ctx.font = '600 10.5px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
        ctx.fillText(pt.data.dateShort, pt.x, yAxis + 35);
      });
    } else {
      // MODE BULAN (14 - 31 Hari): Label Miring -45 Derajat dengan Smart Interval
      points.forEach((pt, idx) => {
        // Tanda Tick Vertikal pada setiap titik
        ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.4)' : 'rgba(148, 163, 184, 0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pt.x, yAxis);
        ctx.lineTo(pt.x, yAxis + (isDense ? 3 : 5));
        ctx.stroke();

        const shouldShowLabel = !isDense ? true : (idx % 3 === 0 || idx === points.length - 1);

        if (shouldShowLabel) {
          ctx.save();
          ctx.translate(pt.x, yAxis + 10);
          ctx.rotate(-Math.PI / 4); // Miring -45 derajat
          ctx.textAlign = 'right';
          ctx.font = '500 10px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
          ctx.fillText(pt.data.dateShort, 0, 0);
          ctx.restore();
        }
      });
    }

    // Node Titik Lingkaran & Angka Skor di Atas Titik
    points.forEach((pt, idx) => {
      const radius = mode === 'pekan' ? 5.5 : 3.5;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = mode === 'pekan' ? 2.5 : 2;
      ctx.stroke();

      if (mode === 'pekan') {
        ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
        ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pt.data.score.toFixed(1), pt.x, pt.y - 10);
      } else if (!isDense || idx % 4 === 0 || idx === points.length - 1) {
        ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
        ctx.font = '600 9.5px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pt.data.score.toFixed(1), pt.x, pt.y - 8);
      }
    });

    // Tooltip Interaktif Saat Hover di Canvas
    canvas.onpointermove = (e) => {
      const cRect = canvas.getBoundingClientRect();
      const scaleX = w / cRect.width;
      const mouseX = (e.clientX - cRect.left) * scaleX;

      let closest = null;
      let minDiff = Infinity;
      points.forEach((pt) => {
        const diff = Math.abs(pt.x - mouseX);
        if (diff < minDiff) {
          minDiff = diff;
          closest = pt;
        }
      });

      if (closest && minDiff < (mode === 'pekan' ? 45 : 25)) {
        if (tooltip) {
          tooltip.style.display = 'block';
          const canvasPxX = (closest.x / w) * cRect.width;
          const canvasPxY = (closest.y / h) * cRect.height;
          tooltip.style.left = `${canvasPxX}px`;
          tooltip.style.top = `${canvasPxY}px`;
          tooltip.innerHTML = `
            <div style="font-weight: 700; color: #38bdf8; margin-bottom: 3px;">📅 ${closest.data.fullDate}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>Keaktifan:</span>
              <strong style="color: #fbbf24; font-size: 0.95rem;">⭐ ${closest.data.score.toFixed(1)} / 5.0</strong>
              <span style="color: #10b981; font-weight: 600;">(${closest.data.score >= 4.5 ? 'Mumtaz' : 'Aktif'})</span>
            </div>
          `;
        }
      } else {
        if (tooltip) tooltip.style.display = 'none';
      }
    };

    canvas.onpointerleave = () => {
      if (tooltip) tooltip.style.display = 'none';
    };
  }

  function renderWaliTimelineFeed(santriId, filterType = 'all') {
    const container = document.getElementById('wali-timeline-feed');
    if (!container) return;

    appState.waliTimelineFilter = filterType;

    // Update active filter pill button
    document.querySelectorAll('#wali-timeline-filter-group .btn-timeline-filter').forEach(btn => {
      if (btn.getAttribute('data-filter') === filterType) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const today = getTodayDateStr();
    const todayLogs = appState.logs.filter(l => l.date === today && l.santriId === santriId);

    const filteredSlots = MASTER_SLOTS.filter(slot => {
      if (filterType === 'halaqoh') {
        const n = slot.name.toLowerCase();
        return n.includes('halaqoh') || n.includes('tahfidz');
      } else if (filterType === 'pelajaran') {
        const n = slot.name.toLowerCase();
        return n.includes('pelajaran');
      }
      return true;
    });

    if (filteredSlots.length === 0) {
      container.innerHTML = '<div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.85rem;">Tidak ada sesi pada kategori filter ini.</div>';
      return;
    }

    container.innerHTML = filteredSlots.map(slot => {
      const log = todayLogs.find(l => l.slotId === slot.id);

      if (slot.isBreak) {
        return `
          <div class="timeline-slot-card" style="opacity: 0.85; border-left: 4px solid var(--gold-500);">
            <div class="timeline-slot-time">${slot.time}</div>
            <div class="timeline-slot-main">
              <div class="timeline-slot-name">☕ ${slot.name}</div>
              <div class="timeline-slot-note">Sholat Dhuha berjamaah di Masjid Pondok & istirahat santri</div>
            </div>
            <span class="badge badge-warning">Waktu Rehat</span>
          </div>
        `;
      }

      if (!log) {
        return `
          <div class="timeline-slot-card" style="opacity: 0.7; border-left: 4px solid #cbd5e1;">
            <div class="timeline-slot-time">${slot.time}</div>
            <div class="timeline-slot-main">
              <div class="timeline-slot-name">${slot.icon} ${slot.name}</div>
              <div class="timeline-slot-note">${slot.desc}</div>
            </div>
            <span class="badge badge-warning">Menunggu Input Ustadz</span>
          </div>
        `;
      }

      return `
        <div class="timeline-slot-card" style="border-left: 4px solid ${log.status === 'Hadir' ? 'var(--gold-500)' : 'var(--accent-red)'};">
          <div class="timeline-slot-time">${slot.time}</div>
          <div class="timeline-slot-main">
            <div class="timeline-slot-name">
              <span>${slot.icon} ${slot.name}</span>
              <span class="status-pill status-${log.status.toLowerCase()}">${log.status}</span>
            </div>
            <div class="timeline-slot-note">
              <strong>Catatan Ustadz:</strong> "${log.catatan}"
              <span style="display: block; font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">
                Pengampu: ${log.ustadzName} • Terverifikasi Real-Time
              </span>
            </div>
          </div>
          <div class="timeline-slot-score">
            <div style="color: #f59e0b; font-size: 1.1rem; line-height: 1;">
              ${'★'.repeat(log.keaktifan)}${'☆'.repeat(5 - log.keaktifan)}
            </div>
            <span class="keaktifan-label-text" style="display: block; margin-top: 3px;">
              ${KEAKTIFAN_LABELS[log.keaktifan]}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // 14. EXPORT & PRINT
  // ==========================================================================
  function exportRekapitulasiCSV() {
    const filterFrom = document.getElementById('rekap-date-from')?.value;
    const filterTo = document.getElementById('rekap-date-to')?.value;
    const filterSlot = document.getElementById('rekap-filter-slot')?.value;
    const filterKelas = document.getElementById('rekap-filter-kelas')?.value;
    const filterStatus = document.getElementById('rekap-filter-status')?.value;

    const filtered = appState.logs.filter(log => {
      if (filterFrom && log.date < filterFrom) return false;
      if (filterTo && log.date > filterTo) return false;
      if (filterSlot && log.slotId !== filterSlot) return false;
      if (filterKelas && log.santriKelas !== filterKelas) return false;
      if (filterStatus && log.status !== filterStatus) return false;
      return true;
    });

    if (filtered.length === 0) {
      showToast('Tidak ada data yang sesuai filter untuk diekspor.', 'error');
      return;
    }

    const headers = ['No', 'Tanggal', 'Slot Waktu', 'Kegiatan', 'Nama Santri', 'Kelas', 'Status Kehadiran', 'Skor Keaktifan', 'Catatan Khusus Ustadz', 'Pengampu/Ustadz'];

    const rows = filtered.map((r, idx) => [
      idx + 1,
      r.date,
      `"${r.slotTime}"`,
      `"${r.slotName}"`,
      `"${r.santriName}"`,
      `"${r.santriKelas}"`,
      r.status,
      r.keaktifan,
      `"${(r.catatan || '').replace(/"/g, '""')}"`,
      `"${r.ustadzName}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Rekap_Absensi_Pesantren_Bilal_Bin_Robah_${getTodayDateStr()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Berhasil mengunduh ${filtered.length} baris rekapitulasi ke Excel/CSV!`, 'success');
  }

  function openPrintModal() {
    const tbody = document.getElementById('tbody-print-content');
    const metricsRow = document.getElementById('print-summary-metrics');
    if (!tbody) return;

    const filtered = appState.logs.slice(-40);

    const total = filtered.length;
    const hadir = filtered.filter(l => l.status === 'Hadir').length;
    const izin = filtered.filter(l => l.status === 'Izin').length;
    const sakit = filtered.filter(l => l.status === 'Sakit').length;
    const alpa = filtered.filter(l => l.status === 'Alpa').length;
    const pct = total > 0 ? Math.round((hadir / total) * 100) : 100;
    const avgScore = total > 0 ? (filtered.reduce((a, b) => a + (b.keaktifan || 0), 0) / total).toFixed(1) : 5.0;

    if (metricsRow) {
      metricsRow.innerHTML = `
        <div>Total Sesi Tercatat: <strong>${total}</strong></div>
        <div>Tingkat Kehadiran: <strong>${pct}%</strong> (${hadir} Hadir)</div>
        <div>Izin/Sakit/Alpa: <strong>${izin} / ${sakit} / ${alpa}</strong></div>
        <div>Rata-rata Keaktifan: <strong>${avgScore} / 5.0</strong></div>
      `;
    }

    tbody.innerHTML = filtered.map((r, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${r.date}</td>
        <td>${r.slotTime}<br><strong>${r.slotName}</strong></td>
        <td><strong>${r.santriName}</strong><br><small>${r.santriKelas}</small></td>
        <td><strong>${r.status}</strong></td>
        <td>⭐ ${r.keaktifan}.0</td>
        <td>${r.catatan || '-'}</td>
        <td><small>${r.ustadzName}</small></td>
      </tr>
    `).join('');

    openModal('modal-print');
  }

  // ==========================================================================
  // 15. CRUD ACTIONS (SANTRI & USTADZ)
  // ==========================================================================
  window.editSantri = function (id) {
    const s = appState.santri.find(item => item.id === id);
    if (!s) return;

    document.getElementById('modal-santri-title').textContent = 'Edit Data Santri';
    const tabContainer = document.getElementById('santri-modal-tabs-container');
    if (tabContainer) tabContainer.style.display = 'none';
    switchSantriModalTab('manual');

    document.getElementById('santri-edit-id').value = s.id;
    document.getElementById('santri-nis').value = s.nis;
    document.getElementById('santri-nama').value = s.nama;
    document.getElementById('santri-kelas').value = s.kelas || '';
    const halaqohInput = document.getElementById('santri-halaqoh');
    if (halaqohInput) halaqohInput.value = s.halaqoh || '';
    document.getElementById('santri-asrama').value = s.asrama;
    document.getElementById('santri-wali').value = s.wali;
    document.getElementById('santri-wa').value = s.wa;
    document.getElementById('santri-musyrif').value = s.musyrif;
    document.getElementById('santri-tahfidz').value = `${s.tahfidzCurrent} Juz / Target: ${s.tahfidzTarget} Juz`;

    openModal('modal-santri');
  };

  window.deleteSantri = function (id) {
    const s = appState.santri.find(item => item.id === id);
    if (!s) return;
    if (confirm(`Apakah Anda yakin ingin menghapus data santri "${s.nama}"?`)) {
      appState.santri = appState.santri.filter(item => item.id !== id);
      appState.logs = appState.logs.filter(l => l.santriId !== id);
      saveData();
      syncSingleAction('delete_santri', { id });
      updateSheetsUI();
      updateKelasDropdowns();
      renderAdminView();
      renderWaliSantriSelectOptions();
      showToast(`Data santri "${s.nama}" berhasil dihapus.`, 'info');
    }
  };

  window.editUstadz = function (id) {
    const u = appState.ustadz.find(item => item.id === id);
    if (!u) return;

    document.getElementById('modal-ustadz-title').textContent = 'Edit Data Ustadz';
    document.getElementById('ustadz-edit-id').value = u.id;
    document.getElementById('ustadz-nip').value = u.nip;
    document.getElementById('ustadz-nama').value = u.nama;
    document.getElementById('ustadz-bidang').value = u.bidang;
    document.getElementById('ustadz-username').value = u.username;
    document.getElementById('ustadz-wa').value = u.wa;

    openModal('modal-ustadz');
  };

  window.deleteUstadz = function (id) {
    const u = appState.ustadz.find(item => item.id === id);
    if (!u) return;
    if (confirm(`Hapus data ustadz "${u.nama}"?`)) {
      appState.ustadz = appState.ustadz.filter(item => item.id !== id);
      saveData();
      syncSingleAction('delete_ustadz', { id, nama: u.nama });
      updateSheetsUI();
      renderAdminView();
      renderLoginMuhaffizOptions();
      showToast(`Data ustadz "${u.nama}" berhasil dihapus.`, 'info');
    }
  };

  // Helper to distinguish halaqoh from formal classes
  function isHalaqohGroup(k) {
    if (!k) return false;
    const name = String(typeof k === 'string' ? k : (k.nama || '')).toLowerCase();
    const kat = String(typeof k === 'object' && k ? (k.kategori || '') : '').toLowerCase();
    const ting = String(typeof k === 'object' && k ? (k.tingkat || '') : '').toLowerCase();
    return name.includes('halaqoh') || 
           name.includes('tahfidz') || 
           kat.includes('halaqoh') || 
           kat.includes('tahfidz') || 
           kat.includes('takhassus') || 
           ting.includes('takhassus') ||
           ting.includes('tahfidz');
  }

  function formatTahfidzNotesWithHalaqoh(notes, halaqoh) {
    let clean = String(notes || '').replace(/\[HLQ:\s*[^\]]+\]/g, '').trim();
    const hlq = (halaqoh || '').trim();
    if (hlq) {
      return clean ? `${clean} [HLQ: ${hlq}]` : `[HLQ: ${hlq}]`;
    }
    return clean;
  }

  function extractHalaqohFromNotes(notes) {
    if (!notes) return '';
    const m = String(notes).match(/\[HLQ:\s*([^\]]+)\]/);
    return m && m[1] ? m[1].trim() : '';
  }

  function ensureAllSantriClassesExist() {
    if (!Array.isArray(appState.kelasHalaqoh)) {
      appState.kelasHalaqoh = JSON.parse(JSON.stringify(INITIAL_KELAS_HALAQOH));
    }
    const existingNames = new Set(appState.kelasHalaqoh.map(k => (k.nama || '').trim().toLowerCase()));
    appState.santri.forEach(s => {
      const kName = (s.kelas || '').trim();
      if (kName && !existingNames.has(kName.toLowerCase())) {
        existingNames.add(kName.toLowerCase());
        const isPutri = kName.toLowerCase().includes('putri') || kName.includes('7B');
        appState.kelasHalaqoh.push({
          id: `k-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          nama: kName,
          kategori: isPutri ? 'Kelas Reguler (Putri)' : 'Kelas Reguler (Putra)',
          tingkat: kName.includes('8') ? 'Kelas 8' : kName.includes('9') ? 'Kelas 9' : 'Kelas 7',
          pengampu: s.musyrif || (appState.ustadz[0]?.nama || 'Ustadz Ahmad Fauzi, S.Pd.I'),
          ruang: 'Ruang Pembelajaran Pondok',
          deskripsi: `Rombongan belajar ${kName}`
        });
      }
      const hlqName = (s.halaqoh || '').trim();
      if (hlqName && !existingNames.has(hlqName.toLowerCase())) {
        existingNames.add(hlqName.toLowerCase());
        appState.kelasHalaqoh.push({
          id: `k-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          nama: hlqName,
          kategori: 'Halaqoh Tahfidz (Putra)',
          tingkat: 'Takhassus',
          pengampu: s.musyrif || (appState.ustadz[0]?.nama || 'Ustadz Andi Fathurahman'),
          ruang: 'Mesjid Bilal Bin Robah',
          deskripsi: `Halaqoh Al-Qur'an ${hlqName}`
        });
      }
    });
  }

  function updateKelasDropdowns() {
    ensureAllSantriClassesExist();
    const classesList = appState.kelasHalaqoh && appState.kelasHalaqoh.length > 0 
      ? appState.kelasHalaqoh 
      : INITIAL_KELAS_HALAQOH;
    const classNames = [...new Set(classesList.map(k => k.nama.trim()))].sort();
    const formalClasses = classesList.filter(k => !isHalaqohGroup(k));
    const halaqohClasses = classesList.filter(k => isHalaqohGroup(k));

    // 0. Update nav tab count badge
    const adminKelasCount = document.getElementById('admin-kelas-count');
    if (adminKelasCount) adminKelasCount.textContent = classesList.length;

    // 1. Datalist for manual typing in modal santri (Formal Classes)
    const datalist = document.getElementById('datalist-kelas');
    if (datalist) {
      datalist.innerHTML = [...new Set(formalClasses.map(k => k.nama))].map(k => `<option value="${k}">`).join('');
    }

    // 1b. Datalist for Halaqoh Tahfidz in modal santri
    const datalistHalaqoh = document.getElementById('datalist-halaqoh');
    if (datalistHalaqoh) {
      datalistHalaqoh.innerHTML = [...new Set(halaqohClasses.map(k => k.nama))].map(k => `<option value="${k}">`).join('');
    }

    // 2. Admin santri filter
    const filterSantri = document.getElementById('filter-santri-kelas');
    if (filterSantri) {
      const curVal = filterSantri.value;
      filterSantri.innerHTML = '<option value="">Semua Kelas & Halaqoh</option>' +
        classNames.map(k => `<option value="${k}" ${curVal === k ? 'selected' : ''}>${k}</option>`).join('');
    }

    // 3. Rekap filter
    const rekapFilter = document.getElementById('rekap-filter-kelas');
    if (rekapFilter) {
      const curVal = rekapFilter.value;
      rekapFilter.innerHTML = '<option value="">Semua Kelas</option>' +
        classNames.map(k => `<option value="${k}" ${curVal === k ? 'selected' : ''}>${k}</option>`).join('');
    }

    // 4. Ustadz input attendance kelas
    const ustadzKelas = document.getElementById('ustadz-input-kelas');
    if (ustadzKelas) {
      const curVal = ustadzKelas.value || classNames[0];
      ustadzKelas.innerHTML = classNames.map(k => `<option value="${k}" ${curVal === k ? 'selected' : ''}>${k}</option>`).join('');
      ustadzKelas.value = curVal;
      syncSearchableCombobox('ustadz-input-kelas');
    }

    // 5. Pengampu select in modal-kelas
    const pengampuSelect = document.getElementById('kelas-pengampu');
    if (pengampuSelect) {
      const curVal = pengampuSelect.value;
      pengampuSelect.innerHTML = appState.ustadz.map(u => `
        <option value="${u.nama}" ${curVal === u.nama ? 'selected' : ''}>${u.nama} (${u.bidang})</option>
      `).join('');
    }

    // 6. Mutasi modal select boxes
    const mutasiAsal = document.getElementById('mutasi-kelas-asal');
    const mutasiTujuan = document.getElementById('mutasi-kelas-tujuan');
    if (mutasiAsal) {
      const curAsal = mutasiAsal.value || classNames[0];
      mutasiAsal.innerHTML = classesList.map(k => {
        const count = appState.santri.filter(s => (s.kelas || '').trim() === k.nama.trim()).length;
        return `<option value="${k.nama}" ${curAsal === k.nama ? 'selected' : ''}>${k.nama} (${count} santri) • ${k.kategori}</option>`;
      }).join('');
    }
    if (mutasiTujuan) {
      const curTujuan = mutasiTujuan.value || (classNames[1] || classNames[0]);
      mutasiTujuan.innerHTML = classesList.map(k => {
        return `<option value="${k.nama}" ${curTujuan === k.nama ? 'selected' : ''}>${k.nama} • ${k.kategori} (${k.pengampu || 'Tanpa Pengampu'})</option>`;
      }).join('');
    }

    // 7. Quick pindah modal target select box
    const quickTarget = document.getElementById('quick-pindah-kelas-target');
    if (quickTarget) {
      const curQuick = quickTarget.value;
      quickTarget.innerHTML = classesList.map(k => {
        return `<option value="${k.nama}" ${curQuick === k.nama ? 'selected' : ''}>${k.nama} (${k.kategori}) • Pengampu: ${k.pengampu || '-'}</option>`;
      }).join('');
    }

    // 8. Quick halaqoh modal target select box (Halaqoh only)
    const quickHalaqohTarget = document.getElementById('quick-halaqoh-target-select');
    if (quickHalaqohTarget) {
      const curHlq = quickHalaqohTarget.value;
      quickHalaqohTarget.innerHTML = `
        <option value="">— Tidak Masuk Halaqoh (Kosongkan) —</option>
        ${halaqohClasses.map(k => `
          <option value="${k.nama}" ${curHlq === k.nama ? 'selected' : ''}>📖 ${k.nama} (${k.pengampu || 'Tanpa Pengampu'})</option>
        `).join('')}
      `;
    }
  }

  // ==========================================================================
  // MASTER KELAS & HALAQOH: RENDERING & CONTROLLERS
  // ==========================================================================
  function renderMasterKelasHalaqohView() {
    const container = document.getElementById('kelas-cards-grid');
    if (!container) return;

    ensureAllSantriClassesExist();
    updateKelasDropdowns();

    // Stats calculations
    const totalKelasEl = document.getElementById('stat-total-kelas');
    const totalSantriEl = document.getElementById('stat-kelas-total-santri');
    const avgSantriEl = document.getElementById('stat-avg-santri-per-kelas');
    const genderMetaEl = document.getElementById('stat-kelas-gender-meta');

    const totalK = appState.kelasHalaqoh.length;
    const totalS = appState.santri.length;
    const avg = totalK > 0 ? (totalS / totalK).toFixed(1) : 0;
    const ikhwanCount = appState.santri.filter(s => s.gender === 'L').length;
    const akhwatCount = appState.santri.filter(s => s.gender === 'P').length;

    if (totalKelasEl) totalKelasEl.textContent = totalK;
    if (totalSantriEl) totalSantriEl.textContent = totalS;
    if (avgSantriEl) avgSantriEl.textContent = `${avg} Santri`;
    if (genderMetaEl) genderMetaEl.textContent = `${ikhwanCount} Ikhwan • ${akhwatCount} Akhwat`;

    // Filter and search
    const searchInput = document.getElementById('filter-kelas-search');
    const kategoriSelect = document.getElementById('filter-kelas-kategori');

    const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const kat = kategoriSelect ? kategoriSelect.value.toLowerCase().trim() : '';

    const filtered = appState.kelasHalaqoh.filter(k => {
      const matchSearch = !q || 
        k.nama.toLowerCase().includes(q) || 
        (k.pengampu && k.pengampu.toLowerCase().includes(q)) || 
        (k.ruang && k.ruang.toLowerCase().includes(q)) ||
        (k.deskripsi && k.deskripsi.toLowerCase().includes(q));
      
      const matchKat = !kat || (k.kategori && k.kategori.toLowerCase().includes(kat));
      return matchSearch && matchKat;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: rgba(15, 23, 42, 0.4); border-radius: 12px; border: 1px dashed rgba(255, 255, 255, 0.1);">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">🏫</div>
          <h4 style="margin: 0 0 6px 0; color: #f8fafc;">Tidak ada kelas / halaqoh yang cocok</h4>
          <p class="text-muted" style="margin: 0; font-size: 0.85rem;">Coba sesuaikan kata kunci pencarian atau kategori filter.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(k => {
      const isHalaqoh = isHalaqohGroup(k);
      const enrolled = isHalaqoh
        ? appState.santri.filter(s => (s.halaqoh || '').trim().toLowerCase() === k.nama.trim().toLowerCase())
        : appState.santri.filter(s => (s.kelas || '').trim().toLowerCase() === k.nama.trim().toLowerCase());

      const isPutri = k.kategori.toLowerCase().includes('putri') || k.nama.includes('7B');
      const categoryIcon = isHalaqoh ? '📖' : k.kategori.includes('Bahasa') ? '🗣️' : k.kategori.includes('Kitab') ? '📜' : '🏫';

      const chipsHtml = enrolled.slice(0, 5).map(s => {
        if (isHalaqoh) {
          return `
            <span class="santri-mini-chip" title="Anggota Halaqoh (Kelas Formal: ${s.kelas || '-'}) - Klik untuk atur halaqoh" onclick="window.quickAturHalaqohSantri('${s.id}')">
              ${s.nama.split(' ')[0]} <small style="opacity: 0.75; font-size: 0.68rem;">(${s.kelas || 'Umum'})</small>
            </span>
          `;
        }
        return `
          <span class="santri-mini-chip" title="Klik untuk pindahkan ${s.nama} (${s.nis})" onclick="window.quickPindahSantri('${s.id}')">
            ${s.nama.split(' ')[0]} 🔄
          </span>
        `;
      }).join('');

      const moreChips = enrolled.length > 5 
        ? (isHalaqoh
            ? `<span class="santri-mini-chip more" onclick="window.openKelolaHalaqohModal('${k.nama}')" title="Klik untuk kelola anggota halaqoh">+${enrolled.length - 5} lainnya</span>`
            : `<span class="santri-mini-chip more" onclick="window.openMutasiModal('${k.nama}')" title="Klik untuk lihat & mutasi semua santri">+${enrolled.length - 5} lainnya</span>`)
        : '';

      return `
        <div class="kelas-detail-card ${isPutri ? 'is-putri' : ''} ${isHalaqoh ? 'is-halaqoh' : ''}">
          <div class="kelas-card-header">
            <div>
              <div class="kelas-card-category">${categoryIcon} ${k.kategori}</div>
              <h4 class="kelas-card-title">${k.nama}</h4>
            </div>
            <div class="kelas-count-pill" title="Total santri terdaftar di ${isHalaqoh ? 'halaqoh' : 'kelas'} ini">
              👥 <strong>${enrolled.length}</strong> Santri ${isHalaqoh ? 'Halaqoh' : ''}
            </div>
          </div>

          <div class="kelas-card-meta-list">
            <div class="kelas-meta-row">
              <span class="meta-label">👳‍♂️ Pengampu:</span>
              <span class="meta-value">${k.pengampu || '<em class="text-muted">Belum ditentukan</em>'}</span>
            </div>
            <div class="kelas-meta-row">
              <span class="meta-label">📊 Tingkatan:</span>
              <span class="meta-value">${k.tingkat || 'Semua Jenjang'}</span>
            </div>
            <div class="kelas-meta-row">
              <span class="meta-label">📍 Ruang / Lokasi:</span>
              <span class="meta-value">${k.ruang || '<em class="text-muted">Pondok Utama</em>'}</span>
            </div>
            ${k.deskripsi ? `
              <div class="kelas-meta-row" style="margin-top: 4px;">
                <span class="meta-label">📝 Keterangan:</span>
                <span class="meta-value text-muted" style="font-size: 0.8rem;">${k.deskripsi}</span>
              </div>
            ` : ''}
          </div>

          <div class="kelas-card-santri-section">
            <div class="santri-section-header">
              <span>Santri Terdaftar (${enrolled.length})</span>
              ${isHalaqoh 
                ? `<button type="button" class="btn-link-action" onclick="window.openKelolaHalaqohModal('${k.nama}')" style="color: #10b981;">+ Kelola Anggota ↗</button>`
                : (enrolled.length > 0 ? `<button type="button" class="btn-link-action" onclick="window.openMutasiModal('${k.nama}')">Mutasi Santri ↗</button>` : '')
              }
            </div>
            <div class="kelas-santri-chips">
              ${enrolled.length > 0 ? chipsHtml + moreChips : `<span class="text-muted" style="font-size: 0.8rem; font-style: italic;">Belum ada santri di ${isHalaqoh ? 'halaqoh' : 'kelas'} ini.</span>`}
            </div>
          </div>

          <div class="kelas-card-actions">
            ${isHalaqoh ? `
              <button type="button" class="btn-card-action kelola-halaqoh" onclick="window.openKelolaHalaqohModal('${k.nama}')" title="Tambah / Atur santri di halaqoh ini tanpa memindahkannya dari kelas formal">
                <span>➕</span> Tambah / Atur Santri
              </button>
            ` : `
              <button type="button" class="btn-card-action mutasi" onclick="window.openMutasiModal('${k.nama}')" title="Pindahkan santri dari kelas ini">
                <span>🔄</span> Pindah Santri
              </button>
            `}
            <div style="display: flex; gap: 6px;">
              <button type="button" class="btn-card-action edit" onclick="window.editKelas('${k.id}')" title="Edit Rombel">
                <span>✏️</span> Edit
              </button>
              <button type="button" class="btn-card-action delete" onclick="window.deleteKelas('${k.id}')" title="Hapus Rombel">
                <span>🗑️</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Kelas CRUD Handlers
  window.openAddKelasModal = function () {
    const form = document.getElementById('form-kelas');
    if (form) form.reset();
    const editId = document.getElementById('kelas-edit-id');
    if (editId) editId.value = '';
    const title = document.getElementById('modal-kelas-title');
    if (title) title.textContent = 'Tambah Kelas / Halaqoh Baru';
    
    // Set default pengampu if available
    const pengampuSelect = document.getElementById('kelas-pengampu');
    if (pengampuSelect && appState.ustadz[0]) {
      pengampuSelect.value = appState.ustadz[0].nama;
    }
    openModal('modal-kelas');
  };

  window.editKelas = function (id) {
    const k = appState.kelasHalaqoh.find(item => item.id === id);
    if (!k) return;

    document.getElementById('modal-kelas-title').textContent = `Edit Kelas / Halaqoh: ${k.nama}`;
    document.getElementById('kelas-edit-id').value = k.id;
    document.getElementById('kelas-nama').value = k.nama || '';
    document.getElementById('kelas-kategori').value = k.kategori || 'Kelas Reguler (Putra)';
    document.getElementById('kelas-tingkat').value = k.tingkat || 'Kelas 7';
    document.getElementById('kelas-ruang').value = k.ruang || '';
    document.getElementById('kelas-deskripsi').value = k.deskripsi || '';

    const pengampuSelect = document.getElementById('kelas-pengampu');
    if (pengampuSelect) {
      pengampuSelect.value = k.pengampu || (appState.ustadz[0]?.nama || '');
    }

    openModal('modal-kelas');
  };

  window.deleteKelas = function (id) {
    const k = appState.kelasHalaqoh.find(item => item.id === id);
    if (!k) return;

    const isHalaqoh = isHalaqohGroup(k);
    const enrolled = isHalaqoh
      ? appState.santri.filter(s => (s.halaqoh || '').trim().toLowerCase() === k.nama.trim().toLowerCase())
      : appState.santri.filter(s => (s.kelas || '').trim().toLowerCase() === k.nama.trim().toLowerCase());

    if (!isHalaqoh && enrolled.length > 0) {
      alert(`⚠️ Tidak dapat menghapus kelas "${k.nama}"!\n\nSaat ini masih ada ${enrolled.length} santri yang terdaftar di kelas formal ini. Silakan pindahkan santri tersebut ke kelas lain terlebih dahulu melalui tombol "Pindah Santri".`);
      return;
    }

    if (confirm(`Apakah Anda yakin ingin menghapus ${isHalaqoh ? 'halaqoh' : 'kelas'} "${k.nama}"?${isHalaqoh && enrolled.length > 0 ? `\n\n${enrolled.length} santri yang tergabung akan dilepaskan dari halaqoh ini, namun kelas formal santri TETAP AMAN.` : ''}`)) {
      if (isHalaqoh && enrolled.length > 0) {
        appState.santri.forEach(s => {
          if ((s.halaqoh || '').trim().toLowerCase() === k.nama.trim().toLowerCase()) {
            s.halaqoh = '';
            s.tahfidzNotes = formatTahfidzNotesWithHalaqoh(s.tahfidzNotes, '');
          }
        });
        syncSingleAction('sync_all', { santri: appState.santri });
      }
      appState.kelasHalaqoh = appState.kelasHalaqoh.filter(item => item.id !== id);
      saveData();
      syncSingleAction('delete_kelas', { id, nama: k.nama });
      updateSheetsUI();
      updateKelasDropdowns();
      renderMasterKelasHalaqohView();
      renderSantriTable();
      renderAdminView();
      showToast(`${isHalaqoh ? 'Halaqoh' : 'Kelas'} "${k.nama}" berhasil dihapus.`, 'info');
    }
  };

  function handleSaveKelasForm() {
    const editId = document.getElementById('kelas-edit-id')?.value;
    const nama = (document.getElementById('kelas-nama')?.value || '').trim();
    const kategori = document.getElementById('kelas-kategori')?.value || 'Kelas Reguler (Putra)';
    const tingkat = document.getElementById('kelas-tingkat')?.value || 'Kelas 7';
    const pengampu = document.getElementById('kelas-pengampu')?.value || (appState.ustadz[0]?.nama || '');
    const ruang = (document.getElementById('kelas-ruang')?.value || '').trim();
    const deskripsi = (document.getElementById('kelas-deskripsi')?.value || '').trim();

    if (!nama) {
      showToast('⚠️ Nama Kelas / Halaqoh wajib diisi!', 'error');
      return;
    }

    let savedKelas = null;
    if (editId) {
      const idx = appState.kelasHalaqoh.findIndex(item => item.id === editId);
      if (idx !== -1) {
        const oldNama = appState.kelasHalaqoh[idx].nama;
        appState.kelasHalaqoh[idx] = {
          ...appState.kelasHalaqoh[idx],
          nama,
          kategori,
          tingkat,
          pengampu,
          ruang,
          deskripsi
        };
        savedKelas = appState.kelasHalaqoh[idx];

        // If the name changed, automatically update santri & attendance logs with the old name
        if (oldNama && oldNama !== nama) {
          let updatedSantri = 0;
          appState.santri.forEach(s => {
            if ((s.kelas || '').trim() === oldNama.trim()) {
              s.kelas = nama;
              updatedSantri++;
            }
            if ((s.halaqoh || '').trim() === oldNama.trim()) {
              s.halaqoh = nama;
              s.tahfidzNotes = formatTahfidzNotesWithHalaqoh(s.tahfidzNotes, nama);
              updatedSantri++;
            }
          });
          appState.logs.forEach(l => {
            if ((l.santriKelas || '').trim() === oldNama.trim()) {
              l.santriKelas = nama;
            }
          });
          if (updatedSantri > 0) {
            syncSingleAction('sync_all', { santri: appState.santri });
            showToast(`Data ${updatedSantri} santri otomatis disinkronkan ke nama baru "${nama}".`, 'info');
          }
        }

        showToast(`Kelas / Halaqoh "${nama}" berhasil diperbarui!`, 'success');
      }
    } else {
      // Check duplicate name
      const duplicate = appState.kelasHalaqoh.some(item => item.nama.trim().toLowerCase() === nama.toLowerCase());
      if (duplicate) {
        showToast(`⚠️ Kelas / Halaqoh dengan nama "${nama}" sudah ada. Gunakan nama lain.`, 'error');
        return;
      }

      const newId = `k-${Date.now()}`;
      savedKelas = {
        id: newId,
        nama,
        kategori,
        tingkat,
        pengampu,
        ruang: ruang || 'Ruang Pondok Utama',
        deskripsi
      };
      appState.kelasHalaqoh.push(savedKelas);
      showToast(`Kelas / Halaqoh "${nama}" berhasil ditambahkan!`, 'success');
    }

    saveData();
    if (savedKelas) {
      syncSingleAction('save_kelas', { kelas: savedKelas });
    }
    updateSheetsUI();
    closeModal('modal-kelas');
    updateKelasDropdowns();
    renderMasterKelasHalaqohView();
    renderSantriTable();
  }

  // ==========================================================================
  // MUTASI SANTRI MASSAL (BATCH TRANSFER)
  // ==========================================================================
  window.openMutasiModal = function (defaultAsalNama) {
    updateKelasDropdowns();

    const selectAsal = document.getElementById('mutasi-kelas-asal');
    const selectTujuan = document.getElementById('mutasi-kelas-tujuan');

    if (selectAsal) {
      if (defaultAsalNama && Array.from(selectAsal.options).some(o => o.value === defaultAsalNama)) {
        selectAsal.value = defaultAsalNama;
      } else if (appState.kelasHalaqoh[0]) {
        selectAsal.value = appState.kelasHalaqoh[0].nama;
      }
    }

    // Set tujuan to a different class if possible
    if (selectTujuan && selectAsal) {
      const curAsal = selectAsal.value;
      const otherOpt = Array.from(selectTujuan.options).find(o => o.value !== curAsal);
      if (otherOpt) {
        selectTujuan.value = otherOpt.value;
      }
    }

    renderMutasiSantriList();
    openModal('modal-mutasi');
  };

  function renderMutasiSantriList() {
    const listWrap = document.getElementById('mutasi-santri-list');
    const selectAsal = document.getElementById('mutasi-kelas-asal');
    if (!listWrap || !selectAsal) return;

    const asalNama = selectAsal.value;
    const santriList = appState.santri.filter(s => (s.kelas || '').trim() === asalNama.trim());

    if (santriList.length === 0) {
      listWrap.innerHTML = `
        <div style="text-align: center; padding: 25px 15px; color: #94a3b8; font-size: 0.85rem;">
          Tidak ada santri yang terdaftar di <strong>${asalNama}</strong> saat ini.
        </div>
      `;
      updateMutasiSummary();
      return;
    }

    listWrap.innerHTML = santriList.map(s => {
      const initials = s.nama.split(' ').map(n => n[0]).slice(0, 2).join('');
      return `
        <label class="mutasi-santri-item">
          <input type="checkbox" class="mutasi-check-santri" value="${s.id}">
          <div class="avatar-circle-sm ${s.gender === 'P' ? 'avatar-female' : ''}">${initials}</div>
          <div class="mutasi-item-info">
            <span class="mutasi-item-name">${s.nama}</span>
            <span class="mutasi-item-meta">NIS: ${s.nis} • Pembimbing: ${s.musyrif || '-'}</span>
          </div>
        </label>
      `;
    }).join('');

    // Attach listener to checkboxes
    listWrap.querySelectorAll('.mutasi-check-santri').forEach(cb => {
      cb.addEventListener('change', updateMutasiSummary);
    });

    updateMutasiSummary();
  }

  function updateMutasiSummary() {
    const checkedBoxes = Array.from(document.querySelectorAll('.mutasi-check-santri:checked'));
    const badgeCount = document.getElementById('mutasi-selected-count-badge');
    const btnExecute = document.getElementById('btn-execute-mutasi');
    const summaryCard = document.getElementById('mutasi-summary-card');
    const summaryText = document.getElementById('mutasi-summary-text');

    const selectAsal = document.getElementById('mutasi-kelas-asal');
    const selectTujuan = document.getElementById('mutasi-kelas-tujuan');
    const asal = selectAsal ? selectAsal.value : '';
    const tujuan = selectTujuan ? selectTujuan.value : '';
    const syncMusyrif = document.getElementById('mutasi-sync-musyrif')?.checked;

    const count = checkedBoxes.length;

    if (badgeCount) {
      badgeCount.textContent = `${count} Santri Dipilih`;
      badgeCount.className = count > 0 ? 'badge badge-success' : 'badge badge-info';
    }

    if (!asal || !tujuan) {
      if (btnExecute) btnExecute.disabled = true;
      if (summaryText) summaryText.textContent = 'Silakan pilih kelas asal dan tujuan.';
      return;
    }

    if (asal === tujuan) {
      if (btnExecute) btnExecute.disabled = true;
      if (summaryCard) summaryCard.className = 'mutasi-summary-card is-error';
      if (summaryText) {
        summaryText.innerHTML = `⚠️ <strong>Peringatan:</strong> Kelas asal dan tujuan tidak boleh sama (${asal}). Silakan pilih kelas tujuan yang berbeda!`;
      }
      return;
    }

    if (count === 0) {
      if (btnExecute) btnExecute.disabled = true;
      if (summaryCard) summaryCard.className = 'mutasi-summary-card';
      if (summaryText) {
        summaryText.innerHTML = `Pilih satu atau beberapa santri di sebelah kiri untuk dipindahkan dari <strong>${asal}</strong> ke <strong>${tujuan}</strong>.`;
      }
      return;
    }

    // Valid state
    if (btnExecute) btnExecute.disabled = false;
    if (summaryCard) summaryCard.className = 'mutasi-summary-card is-ready';

    const targetK = appState.kelasHalaqoh.find(k => k.nama === tujuan);
    const pengampuInfo = (syncMusyrif && targetK && targetK.pengampu) 
      ? `dengan Musyrif pembimbing baru: <strong>${targetK.pengampu}</strong>` 
      : 'tanpa mengubah data Musyrif pembimbing';

    if (summaryText) {
      summaryText.innerHTML = `
        ✅ Siap memindahkan <strong>${count} santri</strong> dari <strong>${asal}</strong> ke <strong>${tujuan}</strong> ${pengampuInfo}.
      `;
    }
  }

  function handleExecuteMutasi() {
    const checkedBoxes = Array.from(document.querySelectorAll('.mutasi-check-santri:checked'));
    const selectAsal = document.getElementById('mutasi-kelas-asal');
    const selectTujuan = document.getElementById('mutasi-kelas-tujuan');
    const syncMusyrif = document.getElementById('mutasi-sync-musyrif')?.checked;

    if (!selectAsal || !selectTujuan) return;
    const asal = selectAsal.value;
    const tujuan = selectTujuan.value;

    if (asal === tujuan) {
      showToast('⚠️ Kelas asal dan tujuan tidak boleh sama!', 'error');
      return;
    }

    const idsToMove = checkedBoxes.map(cb => cb.value);
    if (idsToMove.length === 0) {
      showToast('⚠️ Pilih minimal 1 santri untuk dipindahkan!', 'warning');
      return;
    }

    const targetKelas = appState.kelasHalaqoh.find(k => k.nama === tujuan);
    let movedCount = 0;

    idsToMove.forEach(id => {
      const s = appState.santri.find(item => item.id === id);
      if (s) {
        s.kelas = tujuan;
        if (syncMusyrif && targetKelas && targetKelas.pengampu) {
          s.musyrif = targetKelas.pengampu;
        }
        // Update today's attendance logs for this student to reflect new class
        const today = getTodayDateStr();
        appState.logs.forEach(l => {
          if (l.santriId === s.id && l.date === today) {
            l.santriKelas = tujuan;
          }
        });
        movedCount++;
      }
    });

    saveData();
    syncSingleAction('sync_all', { santri: appState.santri });
    updateSheetsUI();
    closeModal('modal-mutasi');
    updateKelasDropdowns();
    renderMasterKelasHalaqohView();
    renderSantriTable();
    renderAdminView();

    showToast(`🎉 Alhamdulillah, berhasil memindahkan ${movedCount} santri ke ${tujuan}!`, 'success');
  }

  // ==========================================================================
  // QUICK PINDAH HALAQOH PER-SANTRI
  // ==========================================================================
  window.quickPindahSantri = function (santriId) {
    const s = appState.santri.find(item => item.id === santriId);
    if (!s) return;

    updateKelasDropdowns();

    const idInput = document.getElementById('quick-pindah-santri-id');
    const profileWrap = document.getElementById('quick-pindah-profile');
    const targetSelect = document.getElementById('quick-pindah-kelas-target');

    if (idInput) idInput.value = s.id;

    if (profileWrap) {
      const initials = s.nama.split(' ').map(n => n[0]).slice(0, 2).join('');
      profileWrap.innerHTML = `
        <div class="quick-pindah-avatar ${s.gender === 'P' ? 'avatar-female' : ''}">${initials}</div>
        <div class="quick-pindah-info">
          <h4 style="margin: 0 0 4px 0; color: #f8fafc; font-size: 1rem;">${s.nama}</h4>
          <div style="font-size: 0.8rem; color: #94a3b8; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <span>NIS: <strong>${s.nis}</strong></span>
            <span>•</span>
            <span>Saat ini: <span class="badge badge-info" style="font-size: 0.75rem;">${s.kelas}</span></span>
            <span>•</span>
            <span>Musyrif: <em>${s.musyrif || '-'}</em></span>
          </div>
        </div>
      `;
    }

    if (targetSelect) {
      // Preselect target different from current class if available
      const options = Array.from(targetSelect.options);
      const otherOpt = options.find(o => o.value !== s.kelas);
      if (otherOpt) {
        targetSelect.value = otherOpt.value;
      }
    }

    openModal('modal-quick-pindah');
  };

  function handleSaveQuickPindah() {
    const santriId = document.getElementById('quick-pindah-santri-id')?.value;
    const targetKelasNama = document.getElementById('quick-pindah-kelas-target')?.value;
    const syncMusyrif = document.getElementById('quick-pindah-sync-musyrif')?.checked;

    if (!santriId || !targetKelasNama) return;

    const s = appState.santri.find(item => item.id === santriId);
    if (!s) return;

    if (s.kelas === targetKelasNama) {
      showToast(`Santri "${s.nama}" memang sudah terdaftar di ${targetKelasNama}.`, 'info');
      closeModal('modal-quick-pindah');
      return;
    }

    const targetK = appState.kelasHalaqoh.find(k => k.nama === targetKelasNama);
    const oldKelas = s.kelas;
    s.kelas = targetKelasNama;

    if (syncMusyrif && targetK && targetK.pengampu) {
      s.musyrif = targetK.pengampu;
    }

    // Update today's logs
    const today = getTodayDateStr();
    appState.logs.forEach(l => {
      if (l.santriId === s.id && l.date === today) {
        l.santriKelas = targetKelasNama;
      }
    });

    saveData();
    syncSingleAction('save_santri', { santri: s });
    updateSheetsUI();
    closeModal('modal-quick-pindah');
    updateKelasDropdowns();
    renderSantriTable();
    renderMasterKelasHalaqohView();
    renderAdminView();

    showToast(`✅ Santri "${s.nama}" berhasil dipindahkan dari ${oldKelas} ke ${targetKelasNama}!`, 'success');
  }

  // ==========================================================================
  // KELOLA ANGGOTA HALAQOH (TAMBAH SANTRI TANPA PINDAHKAN DARI KELAS FORMAL)
  // ==========================================================================
  let currentKelolaHalaqohName = '';
  let selectedHalaqohSantriIds = new Set();

  window.openKelolaHalaqohModal = function (halaqohNama) {
    if (!halaqohNama) return;
    currentKelolaHalaqohName = halaqohNama;

    const k = appState.kelasHalaqoh.find(item => item.nama.toLowerCase() === halaqohNama.toLowerCase());
    const pengampu = k?.pengampu || 'Ustadz Pengampu';
    const ruang = k?.ruang || 'Pondok Utama';

    const titleEl = document.getElementById('kelola-halaqoh-title');
    const subtitleEl = document.getElementById('kelola-halaqoh-subtitle');
    const bannerTitleEl = document.getElementById('kelola-halaqoh-banner-title');
    const targetInput = document.getElementById('kelola-halaqoh-target-nama');

    if (titleEl) titleEl.textContent = `Kelola Anggota: ${halaqohNama}`;
    if (subtitleEl) subtitleEl.textContent = `Pengampu: ${pengampu} • Ruang: ${ruang}`;
    if (bannerTitleEl) bannerTitleEl.textContent = `${halaqohNama} (${k?.kategori || 'Halaqoh Tahfidz'})`;
    if (targetInput) targetInput.value = halaqohNama;

    // Santri currently enrolled in this halaqoh
    selectedHalaqohSantriIds = new Set(
      appState.santri
        .filter(s => (s.halaqoh || '').trim().toLowerCase() === halaqohNama.trim().toLowerCase())
        .map(s => s.id)
    );

    // Populate filter kelas dropdown
    const filterKelasSelect = document.getElementById('kelola-halaqoh-filter-kelas');
    if (filterKelasSelect) {
      const formalClassNames = [...new Set(
        appState.santri.map(s => (s.kelas || '').trim()).filter(Boolean)
      )].sort();
      filterKelasSelect.innerHTML = '<option value="">Semua Kelas Formal</option>' + 
        formalClassNames.map(cn => `<option value="${cn}">Kelas ${cn.replace(/^kelas\s*/i, '')}</option>`).join('');
      filterKelasSelect.value = '';
    }

    const searchInput = document.getElementById('kelola-halaqoh-search');
    if (searchInput) searchInput.value = '';

    renderKelolaHalaqohSantriList();
    openModal('modal-kelola-halaqoh');
  };

  function renderKelolaHalaqohSantriList() {
    const listWrap = document.getElementById('kelola-halaqoh-santri-list');
    const searchInput = document.getElementById('kelola-halaqoh-search');
    const filterKelasSelect = document.getElementById('kelola-halaqoh-filter-kelas');
    const counterBadge = document.getElementById('kelola-halaqoh-counter');
    const totalShownEl = document.getElementById('kelola-halaqoh-total-shown');

    if (!listWrap) return;

    const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const fKelas = filterKelasSelect ? filterKelasSelect.value : '';

    const filtered = appState.santri.filter(s => {
      const matchSearch = !q || 
        (s.nama && s.nama.toLowerCase().includes(q)) || 
        (s.nis && String(s.nis).includes(q));
      const matchKelas = !fKelas || (s.kelas || '').trim() === fKelas.trim();
      return matchSearch && matchKelas;
    });

    if (counterBadge) {
      counterBadge.textContent = `${selectedHalaqohSantriIds.size} Santri Terpilih`;
    }
    if (totalShownEl) {
      totalShownEl.textContent = `(Menampilkan ${filtered.length} dari ${appState.santri.length} santri)`;
    }

    if (filtered.length === 0) {
      listWrap.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 30px 15px; color: var(--text-muted);">
          <span>🔍</span> Tidak ada santri yang sesuai kata kunci atau filter kelas.
        </div>
      `;
      return;
    }

    listWrap.innerHTML = filtered.map(s => {
      const isSelected = selectedHalaqohSantriIds.has(s.id);
      const isFemale = s.gender === 'P';
      const initials = (s.nama || '').split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'ST';
      const otherHalaqoh = (s.halaqoh && s.halaqoh.trim().toLowerCase() !== currentKelolaHalaqohName.trim().toLowerCase()) ? s.halaqoh : '';

      return `
        <label class="halaqoh-santri-card ${isSelected ? 'is-selected' : ''}" data-santri-id="${s.id}">
          <input type="checkbox" class="kelola-halaqoh-check" value="${s.id}" ${isSelected ? 'checked' : ''}>
          <div class="avatar-circle-sm ${isFemale ? 'avatar-female' : ''}">${initials}</div>
          <div class="halaqoh-santri-info">
            <span class="halaqoh-santri-name" title="${s.nama}">${s.nama}</span>
            <div class="halaqoh-santri-meta">
              <span class="halaqoh-santri-class-badge">🏫 ${s.kelas || 'Umum'}</span>
              <span>NIS: ${s.nis || '-'}</span>
              ${otherHalaqoh ? `<span style="color: #f59e0b; font-size: 0.68rem;" title="Saat ini di halaqoh: ${otherHalaqoh}">(${otherHalaqoh})</span>` : ''}
            </div>
          </div>
        </label>
      `;
    }).join('');

    // Attach click listener to checkboxes & cards
    listWrap.querySelectorAll('.kelola-halaqoh-check').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const sId = e.target.value;
        const card = e.target.closest('.halaqoh-santri-card');
        if (e.target.checked) {
          selectedHalaqohSantriIds.add(sId);
          if (card) card.classList.add('is-selected');
        } else {
          selectedHalaqohSantriIds.delete(sId);
          if (card) card.classList.remove('is-selected');
        }
        if (counterBadge) counterBadge.textContent = `${selectedHalaqohSantriIds.size} Santri Terpilih`;
      });
    });
  }

  function handleSaveKelolaHalaqoh() {
    if (!currentKelolaHalaqohName) return;

    const targetHalaqoh = currentKelolaHalaqohName;
    let addedCount = 0;
    let removedCount = 0;

    appState.santri.forEach(s => {
      const isSelected = selectedHalaqohSantriIds.has(s.id);
      const isCurrentlyIn = (s.halaqoh || '').trim().toLowerCase() === targetHalaqoh.trim().toLowerCase();

      if (isSelected && !isCurrentlyIn) {
        // Santri ditambahkan ke halaqoh ini TANPA MENGUBAH KELAS FORMAL MEREKA
        s.halaqoh = targetHalaqoh;
        s.tahfidzNotes = formatTahfidzNotesWithHalaqoh(s.tahfidzNotes, targetHalaqoh);
        addedCount++;
      } else if (!isSelected && isCurrentlyIn) {
        // Santri dicopot dari halaqoh ini
        s.halaqoh = '';
        s.tahfidzNotes = formatTahfidzNotesWithHalaqoh(s.tahfidzNotes, '');
        removedCount++;
      }
    });

    saveData();
    syncSingleAction('sync_all', { santri: appState.santri });
    updateSheetsUI();
    closeModal('modal-kelola-halaqoh');
    updateKelasDropdowns();
    renderMasterKelasHalaqohView();
    renderSantriTable();
    renderAdminView();

    showToast(`🎉 Alhamdulillah, anggota "${targetHalaqoh}" berhasil diperbarui! (${selectedHalaqohSantriIds.size} santri). Nama santri di kelas formal tetap utuh.`, 'success');
  }

  // ==========================================================================
  // QUICK ATUR HALAQOH PER-SANTRI (SATUAN)
  // ==========================================================================
  window.quickAturHalaqohSantri = function (santriId) {
    const s = appState.santri.find(item => item.id === santriId);
    if (!s) return;

    updateKelasDropdowns();

    const idInput = document.getElementById('quick-halaqoh-santri-id');
    const profileWrap = document.getElementById('quick-halaqoh-profile');
    const targetSelect = document.getElementById('quick-halaqoh-target-select');

    if (idInput) idInput.value = s.id;

    if (profileWrap) {
      const initials = (s.nama || '').split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'ST';
      profileWrap.innerHTML = `
        <div class="quick-pindah-avatar ${s.gender === 'P' ? 'avatar-female' : ''}">${initials}</div>
        <div class="quick-pindah-info">
          <h4 style="margin: 0 0 4px 0; color: #f8fafc; font-size: 1rem;">${s.nama}</h4>
          <div style="font-size: 0.8rem; color: #94a3b8; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <span>NIS: <strong>${s.nis}</strong></span>
            <span>•</span>
            <span>Kelas Formal: <span class="badge badge-info" style="font-size: 0.75rem;">🏫 ${s.kelas || '-'}</span></span>
            <span>•</span>
            <span>Halaqoh Saat Ini: <strong style="color: #10b981;">${s.halaqoh || 'Belum Masuk Halaqoh'}</strong></span>
          </div>
        </div>
      `;
    }

    if (targetSelect) {
      targetSelect.value = s.halaqoh || '';
    }

    openModal('modal-quick-halaqoh');
  };

  function handleSaveQuickHalaqoh() {
    const santriId = document.getElementById('quick-halaqoh-santri-id')?.value;
    const targetHalaqohNama = document.getElementById('quick-halaqoh-target-select')?.value;

    if (!santriId) return;
    const s = appState.santri.find(item => item.id === santriId);
    if (!s) return;

    s.halaqoh = (targetHalaqohNama || '').trim();
    s.tahfidzNotes = formatTahfidzNotesWithHalaqoh(s.tahfidzNotes, s.halaqoh);

    saveData();
    syncSingleAction('save_santri', { santri: s });
    updateSheetsUI();
    closeModal('modal-quick-halaqoh');
    updateKelasDropdowns();
    renderSantriTable();
    renderMasterKelasHalaqohView();
    renderAdminView();

    if (s.halaqoh) {
      showToast(`✅ Santri "${s.nama}" berhasil dimasukkan ke ${s.halaqoh} (Kelas ${s.kelas} tetap aman)!`, 'success');
    } else {
      showToast(`✅ Santri "${s.nama}" dikeluarkan dari halaqoh (Kelas ${s.kelas} tetap aman).`, 'info');
    }
  }

  // ==========================================================================
  // CUSTOM SEARCHABLE SCROLLABLE COMBOBOX COMPONENT (Max 7 Baris, Scroll & Ketik)
  // ==========================================================================
  const registeredComboboxes = new Map();

  function escapeRegex(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function setupSearchableCombobox(selectId, options = {}) {
    const selectEl = document.getElementById(selectId);
    if (!selectEl) return null;

    // Hapus wrapper lama jika sudah pernah diinisialisasi
    if (registeredComboboxes.has(selectId)) {
      const old = registeredComboboxes.get(selectId);
      if (old.destroy) old.destroy();
      registeredComboboxes.delete(selectId);
    }

    const config = {
      placeholder: options.placeholder || 'Ketik untuk mencari atau pilih...',
      prefixIcon: options.prefixIcon || '🔍',
      maxVisibleRows: options.maxVisibleRows || 7,
      itemHeight: 40,
      ...options
    };

    // Sembunyikan elemen select asli tapi pertahankan fungsi dan form compatibility
    selectEl.classList.add('combobox-native-select');

    // Buat struktur custom combobox
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-combobox';
    wrapper.id = `combobox-wrap-${selectId}`;

    const control = document.createElement('div');
    control.className = 'combobox-control';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'combobox-prefix-icon';
    iconSpan.textContent = config.prefixIcon;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = `form-control combobox-input ${selectEl.classList.contains('select-highlight') ? 'select-highlight' : ''}`;
    input.placeholder = config.placeholder;
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.setAttribute('aria-autocomplete', 'list');

    const actions = document.createElement('div');
    actions.className = 'combobox-actions';

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'combobox-clear-btn';
    clearBtn.title = 'Bersihkan pencarian';
    clearBtn.tabIndex = -1;
    clearBtn.innerHTML = '✕';

    const arrowBtn = document.createElement('button');
    arrowBtn.type = 'button';
    arrowBtn.className = 'combobox-arrow-btn';
    arrowBtn.title = 'Buka pilihan';
    arrowBtn.tabIndex = -1;
    arrowBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    `;

    actions.appendChild(clearBtn);
    actions.appendChild(arrowBtn);

    control.appendChild(iconSpan);
    control.appendChild(input);
    control.appendChild(actions);

    const dropdown = document.createElement('div');
    dropdown.className = 'combobox-dropdown';
    dropdown.style.display = 'none';

    const list = document.createElement('div');
    list.className = 'combobox-list';
    list.style.maxHeight = `${config.maxVisibleRows * config.itemHeight}px`;

    dropdown.appendChild(list);

    wrapper.appendChild(control);
    wrapper.appendChild(dropdown);

    // Sisipkan wrapper tepat setelah select element
    if (selectEl.nextSibling) {
      selectEl.parentNode.insertBefore(wrapper, selectEl.nextSibling);
    } else {
      selectEl.parentNode.appendChild(wrapper);
    }

    let items = [];
    let filteredItems = [];
    let highlightedIndex = -1;
    let isOpen = false;
    let isOpening = false;

    function getItemsFromSelect() {
      return Array.from(selectEl.options).map(opt => ({
        value: opt.value,
        text: opt.textContent.trim(),
        selected: opt.selected
      }));
    }

    function getSelectedText() {
      const selected = items.find(i => i.value === selectEl.value);
      return selected ? selected.text : (items[0] ? items[0].text : '');
    }

    function syncFromSelect() {
      items = getItemsFromSelect();
      const currentSelected = items.find(i => i.value === selectEl.value) || items[0];
      if (currentSelected && (!isOpen || input.value === '')) {
        input.value = currentSelected.text;
      }
      if (input.value.trim().length > 0 && input.value !== (currentSelected ? currentSelected.text : '')) {
        clearBtn.style.display = 'flex';
      } else {
        clearBtn.style.display = 'none';
      }
    }

    function renderList(query = '') {
      const q = query.trim().toLowerCase();
      if (!q) {
        filteredItems = [...items];
      } else {
        filteredItems = items.filter(item => item.text.toLowerCase().includes(q));
      }

      list.innerHTML = '';
      highlightedIndex = -1;

      if (filteredItems.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'combobox-empty';
        emptyDiv.innerHTML = `<span>🔍</span> Tidak ada hasil untuk "<strong>${escapeHtml(query)}</strong>"`;
        list.appendChild(emptyDiv);
        return;
      }

      const curVal = selectEl.value;

      filteredItems.forEach((item, idx) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'combobox-item';
        itemEl.setAttribute('data-value', item.value);

        if (item.value === curVal) {
          itemEl.classList.add('is-selected');
          highlightedIndex = idx;
        }

        let highlightedText = escapeHtml(item.text);
        if (q) {
          const re = new RegExp(`(${escapeRegex(q)})`, 'gi');
          highlightedText = highlightedText.replace(re, '<mark class="combobox-match">$1</mark>');
        }

        itemEl.innerHTML = `
          <span class="combobox-item-text">${highlightedText}</span>
          ${item.value === curVal ? '<span class="combobox-check">✓</span>' : ''}
        `;

        itemEl.addEventListener('mousedown', (e) => {
          e.preventDefault(); // Jangan hilangkan fokus input sebelum click selesai
          selectItem(item);
        });

        list.appendChild(itemEl);
      });

      if (highlightedIndex >= 0) {
        updateHighlight(false);
      }
    }

    function updateHighlight(autoScroll = true) {
      const domItems = list.querySelectorAll('.combobox-item');
      domItems.forEach((el, idx) => {
        if (idx === highlightedIndex) {
          el.classList.add('is-highlighted');
          if (autoScroll) {
            el.scrollIntoView({ block: 'nearest' });
          }
        } else {
          el.classList.remove('is-highlighted');
        }
      });
    }

    function openDropdown() {
      if (isOpen) return;
      isOpen = true;
      wrapper.classList.add('is-open');
      dropdown.style.display = 'block';

      // Jika input sedang menampilkan label terpilih, kosongkan filter pencarian saat buka dropdown
      const selText = getSelectedText();
      const query = input.value.trim() === selText ? '' : input.value.trim();
      renderList(query);

      // Auto-select text agar pengguna bisa langsung mengetik untuk mencari
      isOpening = true;
      input.select();
      setTimeout(() => { isOpening = false; }, 200);

      // Auto-scroll ke item yang aktif/terpilih
      const selectedItemEl = list.querySelector('.combobox-item.is-selected');
      if (selectedItemEl) {
        selectedItemEl.scrollIntoView({ block: 'nearest' });
      }
    }

    function closeDropdown(revertIfIncomplete = true) {
      if (!isOpen) return;
      isOpen = false;
      wrapper.classList.remove('is-open');
      dropdown.style.display = 'none';

      if (revertIfIncomplete) {
        input.value = getSelectedText();
        clearBtn.style.display = 'none';
      }
    }

    function selectItem(item) {
      if (!item) return;
      selectEl.value = item.value;
      input.value = item.text;
      clearBtn.style.display = 'none';
      closeDropdown(false);

      // Picu event change pada select native sehingga tabel otomatis ter-update
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Input interaction events
    input.addEventListener('focus', () => {
      openDropdown();
    });

    input.addEventListener('click', () => {
      if (!isOpen) {
        openDropdown();
      } else if (isOpening) {
        input.select();
      }
    });

    input.addEventListener('input', () => {
      if (!isOpen) {
        isOpen = true;
        wrapper.classList.add('is-open');
        dropdown.style.display = 'block';
      }
      const val = input.value;
      if (val.trim().length > 0) {
        clearBtn.style.display = 'flex';
      } else {
        clearBtn.style.display = 'none';
      }
      renderList(val);
      highlightedIndex = filteredItems.length > 0 ? 0 : -1;
      updateHighlight(true);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
          return;
        }
        if (filteredItems.length > 0) {
          highlightedIndex = (highlightedIndex + 1) % filteredItems.length;
          updateHighlight(true);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
          return;
        }
        if (filteredItems.length > 0) {
          highlightedIndex = (highlightedIndex - 1 + filteredItems.length) % filteredItems.length;
          updateHighlight(true);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && filteredItems[highlightedIndex]) {
          selectItem(filteredItems[highlightedIndex]);
        } else if (isOpen && filteredItems.length > 0) {
          selectItem(filteredItems[0]);
        }
      } else if (e.key === 'Escape') {
        closeDropdown(true);
      } else if (e.key === 'Tab') {
        closeDropdown(true);
      }
    });

    // Clear button event
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      input.value = '';
      clearBtn.style.display = 'none';
      input.focus();
      renderList('');
    });

    // Arrow toggle button
    arrowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isOpen) {
        closeDropdown(true);
      } else {
        input.focus();
        openDropdown();
      }
    });

    // Handle label clicks
    const labelEl = document.querySelector(`label[for="${selectId}"]`);
    if (labelEl) {
      labelEl.addEventListener('click', (e) => {
        e.preventDefault();
        input.focus();
        openDropdown();
      });
    }

    // Outside click detection
    const onDocClick = (e) => {
      if (!wrapper.contains(e.target) && e.target !== selectEl) {
        closeDropdown(true);
      }
    };
    document.addEventListener('pointerdown', onDocClick);

    // MutationObserver to keep in sync with options changed in native select
    const observer = new MutationObserver(() => {
      syncFromSelect();
      if (isOpen) {
        const selText = getSelectedText();
        renderList(input.value.trim() === selText ? '' : input.value.trim());
      }
    });
    observer.observe(selectEl, { childList: true, attributes: true });

    // Native change listener
    selectEl.addEventListener('change', () => {
      syncFromSelect();
    });

    // Initial sync
    syncFromSelect();

    const instance = {
      wrapper,
      sync: syncFromSelect,
      destroy: () => {
        document.removeEventListener('pointerdown', onDocClick);
        observer.disconnect();
        wrapper.remove();
      }
    };

    registeredComboboxes.set(selectId, instance);
    return instance;
  }

  function syncSearchableCombobox(selectId) {
    if (registeredComboboxes.has(selectId)) {
      registeredComboboxes.get(selectId).sync();
    }
  }

  function initSearchableComboboxes() {
    setupSearchableCombobox('ustadz-input-slot', {
      placeholder: 'Ketik atau pilih slot kegiatan...',
      prefixIcon: '⏰',
      maxVisibleRows: 7
    });

    setupSearchableCombobox('ustadz-input-kelas', {
      placeholder: 'Ketik atau pilih kelas / halaqoh...',
      prefixIcon: '🏫',
      maxVisibleRows: 7
    });
  }

  function updateSlotDropdowns() {
    const slots = (appState.slots && appState.slots.length > 0) ? appState.slots : MASTER_SLOTS;
    const rekapSlotSelect = document.getElementById('rekap-filter-slot');
    const ustadzSlotSelect = document.getElementById('ustadz-input-slot');

    const optionsHtml = slots.map(s => `
      <option value="${s.id}">${s.time} - ${s.name} ${s.isBreak ? '(Istirahat)' : ''}</option>
    `).join('');

    if (rekapSlotSelect) {
      const curVal = rekapSlotSelect.value;
      rekapSlotSelect.innerHTML = `<option value="">Semua Slot Waktu (${slots.length} Sesi)</option>` + optionsHtml;
      if (curVal && slots.some(s => s.id === curVal)) {
        rekapSlotSelect.value = curVal;
      }
    }

    if (ustadzSlotSelect) {
      const curVal = ustadzSlotSelect.value;
      ustadzSlotSelect.innerHTML = optionsHtml;
      if (curVal && slots.some(s => s.id === curVal)) {
        ustadzSlotSelect.value = curVal;
      } else {
        const now = new Date();
        const curM = now.getHours() * 60 + now.getMinutes();
        const found = slots.find(s => curM >= (s.startHour * 60 + s.startMin) && curM <= (s.endHour * 60 + s.endMin));
        ustadzSlotSelect.value = found ? found.id : (slots[0]?.id || 'slot-1');
      }
      syncSearchableCombobox('ustadz-input-slot');
    }
  }

  // ==========================================================================
  // GOOGLE SPREADSHEET REAL-TIME SYNCHRONIZATION ENGINE
  // ==========================================================================
  function updateSheetsUI() {
    const dot = document.getElementById('sheets-status-dot');
    const connTitle = document.getElementById('sheets-conn-title');
    const connMeta = document.getElementById('sheets-conn-meta');
    const connBadge = document.getElementById('sheets-conn-badge');
    const connPulse = document.getElementById('sheets-pulse-dot');
    const statsGrid = document.getElementById('sheets-conn-stats');
    const syncBarTitle = document.getElementById('sync-bar-title');
    const syncBarSubtitle = document.getElementById('sync-bar-subtitle');
    const urlInput = document.getElementById('input-sheets-webapp-url');
    const checkAuto = document.getElementById('check-sheets-autosync');

    if (urlInput && document.activeElement !== urlInput) {
      urlInput.value = appState.sheetsUrl || '';
    }
    if (checkAuto) {
      checkAuto.checked = !!appState.sheetsAutoSync;
    }

    // Update count stats
    const statSantri = document.getElementById('stat-sheets-santri');
    const statUstadz = document.getElementById('stat-sheets-ustadz');
    const statKelas = document.getElementById('stat-sheets-kelas');
    const statPresensi = document.getElementById('stat-sheets-presensi');
    if (statSantri) statSantri.textContent = appState.santri.length;
    if (statUstadz) statUstadz.textContent = appState.ustadz.length;
    if (statKelas) statKelas.textContent = appState.kelasHalaqoh.length;
    if (statPresensi) statPresensi.textContent = appState.logs.length;

    const hasUrl = !!(appState.sheetsUrl && appState.sheetsUrl.trim());

    if (!hasUrl) {
      if (dot) {
        dot.className = 'sheets-status-dot disconnected';
        dot.title = 'Spreadsheet: Belum Terhubung (Lokal)';
      }
      if (connTitle) connTitle.textContent = 'Belum Terhubung ke Google Spreadsheet';
      if (connMeta) connMeta.textContent = 'Data saat ini tersimpan di browser lokal. Masukkan URL Web App untuk menghubungkan.';
      if (connBadge) {
        connBadge.className = 'badge badge-warning';
        connBadge.textContent = 'Offline (Lokal)';
      }
      if (connPulse) connPulse.style.background = '#64748b';
      if (statsGrid) statsGrid.style.display = 'grid';
      if (syncBarTitle) syncBarTitle.textContent = 'Database Spreadsheet: Belum Terhubung';
      if (syncBarSubtitle) syncBarSubtitle.textContent = 'Hubungkan URL Web App Google Spreadsheet agar data ustadz & santri otomatis tersimpan ke Google Sheets.';
      return;
    }

    if (appState.sheetsSyncStatus === 'syncing') {
      if (dot) {
        dot.className = 'sheets-status-dot syncing';
        dot.title = 'Sedang Menyinkronkan ke Spreadsheet...';
      }
      if (connTitle) connTitle.textContent = 'Sedang Menyinkronkan Data...';
      if (connMeta) connMeta.textContent = 'Mengirim/memperbarui data ke Google Spreadsheet ID 1W97SdHX...';
      if (connBadge) {
        connBadge.className = 'badge badge-warning';
        connBadge.textContent = '🔄 Menyinkronkan...';
      }
      if (connPulse) connPulse.style.background = '#f59e0b';
    } else if (appState.sheetsSyncStatus === 'error') {
      if (dot) {
        dot.className = 'sheets-status-dot disconnected';
        dot.title = 'Koneksi Spreadsheet Bermasalah';
      }
      if (connTitle) connTitle.textContent = 'Koneksi Spreadsheet Perlu Diperiksa';
      if (connMeta) connMeta.textContent = 'Pastikan URL Web App benar dan izin akses "Anyone / Siapa saja" sudah diaktifkan di Google Apps Script.';
      if (connBadge) {
        connBadge.className = 'badge badge-danger';
        connBadge.textContent = 'Gagal Konek';
      }
      if (connPulse) connPulse.style.background = '#ef4444';
      if (syncBarTitle) syncBarTitle.textContent = 'Database Spreadsheet: Koneksi Bermasalah';
      if (syncBarSubtitle) syncBarSubtitle.textContent = 'Gagal menghubungi Spreadsheet. Klik tombol Spreadsheet untuk mengecek URL Web App.';
    } else {
      // Connected
      if (dot) {
        dot.className = 'sheets-status-dot connected';
        dot.title = 'Spreadsheet: Terhubung & Aktif';
      }
      if (connTitle) connTitle.textContent = 'Google Spreadsheet Terhubung Aktif';
      const lastStr = appState.sheetsLastSync ? ` (Sinkron terakhir: ${appState.sheetsLastSync})` : '';
      if (connMeta) connMeta.textContent = `Tersinkronisasi dengan Spreadsheet ID 1W97SdHX...${lastStr}`;
      if (connBadge) {
        connBadge.className = 'badge badge-success';
        connBadge.textContent = '✓ Cloud Aktif';
      }
      if (connPulse) connPulse.style.background = '#10b981';
      if (syncBarTitle) syncBarTitle.textContent = 'Database Spreadsheet: Terhubung & Aktif ✓';
      if (syncBarSubtitle) syncBarSubtitle.textContent = `Sinkronisasi otomatis aktif dengan ID 1W97SdHXUTkTbUHadh7vIhZWsLMhV0NvmSQgZYDKieUE.${lastStr}`;
    }

    if (statsGrid) statsGrid.style.display = 'grid';
  }

  function fetchJsonp(url, timeoutMs = 12000) {
    return new Promise((resolve, reject) => {
      const cbName = 'jsonp_cb_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
      const delim = url.includes('?') ? '&' : '?';
      const scriptUrl = url + delim + 'callback=' + cbName;

      let timer = null;
      const cleanup = () => {
        if (timer) clearTimeout(timer);
        delete window[cbName];
        if (script.parentNode) script.parentNode.removeChild(script);
      };

      window[cbName] = (data) => {
        cleanup();
        resolve(data);
      };

      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.onerror = (err) => {
        cleanup();
        reject(new Error('JSONP load error'));
      };

      timer = setTimeout(() => {
        cleanup();
        reject(new Error('JSONP request timed out'));
      }, timeoutMs);

      document.body.appendChild(script);
    });
  }

  async function testSheetsConnection(customUrl) {
    const targetUrl = (customUrl || appState.sheetsUrl || DEFAULT_SHEETS_URL).trim();
    if (!targetUrl) {
      showToast('Masukkan URL Web App Google Apps Script terlebih dahulu.', 'error');
      return false;
    }

    const testBtn = document.getElementById('btn-test-sheets-url');
    const oldText = testBtn ? testBtn.innerHTML : '';
    if (testBtn) {
      testBtn.innerHTML = '<span>⏳</span> Menguji...';
      testBtn.disabled = true;
    }

    try {
      // 1. Try JSONP first as it is 100% immune to browser CORS redirect issues
      const data = await fetchJsonp(targetUrl + (targetUrl.includes('?') ? '&' : '?') + 'ping=true');
      if (data && data.status === 'success') {
        appState.sheetsSyncStatus = 'connected';
        appState.sheetsLastSync = new Date().toLocaleTimeString('id-ID');
        showToast('✓ Berhasil terhubung ke database Google Spreadsheet!', 'success');
        updateSheetsUI();
        if (testBtn) { testBtn.innerHTML = oldText; testBtn.disabled = false; }
        return true;
      }
    } catch (e) {
      console.warn('JSONP ping failed, trying standard fetch:', e);
    }

    try {
      const res = await fetch(targetUrl + (targetUrl.includes('?') ? '&' : '?') + 'ping=true&_=' + Date.now(), {
        method: 'GET',
        redirect: 'follow'
      });
      const data = await res.json();
      if (data && data.status === 'success') {
        appState.sheetsSyncStatus = 'connected';
        appState.sheetsLastSync = new Date().toLocaleTimeString('id-ID');
        showToast('✓ Berhasil terhubung ke database Google Spreadsheet!', 'success');
        updateSheetsUI();
        if (testBtn) { testBtn.innerHTML = oldText; testBtn.disabled = false; }
        return true;
      }
    } catch (err) {
      console.warn('Direct fetch error:', err);
    }

    if (targetUrl.includes('script.google.com/macros/s/')) {
      appState.sheetsSyncStatus = 'connected';
      appState.sheetsLastSync = new Date().toLocaleTimeString('id-ID');
      showToast('✓ URL Google Apps Script tersimpan & siap digunakan!', 'success');
      updateSheetsUI();
      if (testBtn) { testBtn.innerHTML = oldText; testBtn.disabled = false; }
      return true;
    }

    appState.sheetsSyncStatus = 'error';
    showToast('Gagal menghubungkan. Pastikan URL diawali https://script.google.com/.../exec dan akses diatur Anyone.', 'error');
    updateSheetsUI();
    if (testBtn) { testBtn.innerHTML = oldText; testBtn.disabled = false; }
    return false;
  }

  async function fetchFromSpreadsheet(isSilent = false) {
    const targetUrl = (appState.sheetsUrl || DEFAULT_SHEETS_URL).trim();
    if (!targetUrl) {
      if (!isSilent) showToast('URL Web App Spreadsheet belum dikonfigurasi.', 'error');
      return;
    }

    appState.sheetsSyncStatus = 'syncing';
    updateSheetsUI();

    let data = null;
    // 1. Try JSONP first
    try {
      data = await fetchJsonp(targetUrl);
    } catch (e) {
      console.warn('JSONP fetch failed, trying standard fetch:', e);
    }

    // 2. Fallback to standard fetch
    if (!data) {
      try {
        const fetchUrl = targetUrl + (targetUrl.includes('?') ? '&' : '?') + '_=' + Date.now();
        const res = await fetch(fetchUrl, { method: 'GET', redirect: 'follow' });
        data = await res.json();
      } catch (err) {
        console.warn('fetchFromSpreadsheet fetch error:', err);
      }
    }

    if (data && data.status === 'success') {
      // Santri: Sanitasi data agar bebas dari angka yang merusak string method
      if (Array.isArray(data.santri)) {
        appState.santri = data.santri.map(s => {
          let hlq = String(s.halaqoh || '').trim();
          const notes = String(s.tahfidzNotes || '').trim();
          if (!hlq && notes.includes('[HLQ:')) {
            const m = notes.match(/\[HLQ:\s*([^\]]+)\]/);
            if (m && m[1]) hlq = m[1].trim();
          }
          return {
            ...s,
            id: String(s.id || `s-${Date.now()}`),
            nis: String(s.nis || ''),
            nama: String(s.nama || ''),
            gender: s.gender || 'L',
            kelas: String(s.kelas || ''),
            halaqoh: hlq,
            asrama: String(s.asrama || ''),
            wali: String(s.wali || ''),
            wa: String(s.wa !== undefined && s.wa !== null ? s.wa : ''),
            musyrif: String(s.musyrif || '')
          };
        });
      }
      // Ustadz: Spreadsheet adalah database master terpusat, sanitasi field teks
      if (Array.isArray(data.ustadz)) {
        appState.ustadz = data.ustadz.map(u => ({
          ...u,
          id: String(u.id || `u-${Date.now()}`),
          nip: String(u.nip || ''),
          nama: String(u.nama || ''),
          bidang: String(u.bidang || ''),
          username: String(u.username || ''),
          wa: String(u.wa !== undefined && u.wa !== null ? u.wa : ''),
          avatar: u.avatar || '👳‍♂️',
          pass: String(u.pass || 'guru123')
        }));
      }
      // Kelas
      if (Array.isArray(data.kelasHalaqoh) && data.kelasHalaqoh.length > 0) {
        appState.kelasHalaqoh = data.kelasHalaqoh;
      }
      // Slots: sanitasi agar tipe data jam dan status break konsisten
      if (Array.isArray(data.slots) && data.slots.length > 0) {
        appState.slots = sortSlots(data.slots.map(s => ({
          ...s,
          id: String(s.id || `slot-${Date.now()}`),
          time: String(s.time || ''),
          startHour: parseInt(s.startHour, 10) || 0,
          startMin: parseInt(s.startMin, 10) || 0,
          endHour: parseInt(s.endHour, 10) || 0,
          endMin: parseInt(s.endMin, 10) || 0,
          name: String(s.name || ''),
          desc: String(s.desc || ''),
          isBreak: s.isBreak === true || s.isBreak === 'true' || s.isBreak === 'TRUE',
          icon: s.icon || '⏰'
        })));
        MASTER_SLOTS.length = 0;
        MASTER_SLOTS.push(...appState.slots);
      }
      // Logs
      if (Array.isArray(data.logs)) {
        appState.logs = data.logs;
      }

      saveData();
      ensureAllSantriClassesExist();
      updateSlotDropdowns();
      updateKelasDropdowns();
      renderAdminView();
      renderLoginMuhaffizOptions();
      renderWaliSantriSelectOptions();

      appState.sheetsSyncStatus = 'connected';
      appState.sheetsLastSync = new Date().toLocaleTimeString('id-ID');
      updateSheetsUI();

      if (!isSilent) {
        showToast('✓ Data berhasil disinkronkan dari Google Spreadsheet!', 'success');
      }
    } else {
      appState.sheetsSyncStatus = 'error';
      updateSheetsUI();
      if (!isSilent) {
        showToast('Gagal mengambil data dari Google Spreadsheet.', 'error');
      }
    }
  }

  async function syncAllToSpreadsheet(isSilent = false) {
    const targetUrl = (appState.sheetsUrl || DEFAULT_SHEETS_URL).trim();
    if (!targetUrl) {
      if (!isSilent) {
        showToast('URL Web App Spreadsheet belum diatur. Klik tombol Spreadsheet di pojok atas.', 'error');
        openModal('modal-sheets-config');
      }
      return;
    }

    appState.sheetsSyncStatus = 'syncing';
    updateSheetsUI();

    const payload = {
      action: 'sync_all',
      santri: appState.santri,
      ustadz: appState.ustadz,
      kelasHalaqoh: appState.kelasHalaqoh,
      slots: appState.slots,
      logs: appState.logs
    };

    try {
      await fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      appState.sheetsSyncStatus = 'connected';
      appState.sheetsLastSync = new Date().toLocaleTimeString('id-ID');
      updateSheetsUI();
      if (!isSilent) {
        showToast('✓ Semua data aplikasi berhasil dikirim & disimpan ke Google Spreadsheet!', 'success');
      }
    } catch (err) {
      console.warn('syncAllToSpreadsheet error:', err);
      appState.sheetsSyncStatus = 'error';
      updateSheetsUI();
      if (!isSilent) {
        showToast('Gagal mengirim data ke Google Spreadsheet: ' + (err.message || err), 'error');
      }
    }
  }

  function syncSingleAction(action, payload) {
    const targetUrl = (appState.sheetsUrl || DEFAULT_SHEETS_URL).trim();
    if (!targetUrl || !appState.sheetsAutoSync) return;

    appState.sheetsSyncStatus = 'syncing';
    updateSheetsUI();

    const bodyData = {
      action,
      ...payload
    };

    fetch(targetUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(bodyData)
    })
      .then(() => {
        appState.sheetsSyncStatus = 'connected';
        appState.sheetsLastSync = new Date().toLocaleTimeString('id-ID');
        updateSheetsUI();
      })
      .catch(err => {
        console.warn('Background syncSingleAction failed:', err);
        appState.sheetsSyncStatus = 'error';
        updateSheetsUI();
      });
  }

  function purgeDummyData(showConfirm = true) {
    if (showConfirm) {
      const ok = confirm(
        'Apakah Anda yakin ingin menghapus data contoh/dummy bawaan (4 ustadz & 12 santri dummy)?\n\n' +
        'Data asli yang telah Anda buat (seperti dr. Bagus Oktavianus) TIDAK AKAN DIHAPUS dan tetap aman.'
      );
      if (!ok) return;
    }

    const dummyUstadzIds = new Set(['u-1', 'u-2', 'u-3', 'u-4']);
    const dummyUstadzNames = new Set([
      'Ustadz Ahmad Fauzi, S.Pd.I',
      'Ustadz Faiz Ramadhan, Lc.',
      'Ustadz Ridwan Al-Bantani, M.Pd.',
      'Ustadz Hasan Basri, S.Th.I'
    ]);
    const dummySantriIds = new Set(['s-1', 's-2', 's-3', 's-4', 's-5', 's-6', 's-7', 's-8', 's-9', 's-10', 's-11', 's-12']);

    const countUstadzBefore = appState.ustadz.length;
    const countSantriBefore = appState.santri.length;

    appState.ustadz = appState.ustadz.filter(u => !dummyUstadzIds.has(u.id) && !dummyUstadzNames.has(u.nama));
    appState.santri = appState.santri.filter(s => !dummySantriIds.has(s.id));
    appState.logs = appState.logs.filter(l => !dummySantriIds.has(l.santriId) && !String(l.id).startsWith('log-sample'));

    saveData();
    updateKelasDropdowns();
    renderAdminView();
    renderLoginMuhaffizOptions();
    renderWaliSantriSelectOptions();
    updateSheetsUI();

    if (appState.sheetsUrl && appState.sheetsAutoSync) {
      syncSingleAction('clear_dummy', {});
      syncAllToSpreadsheet(true);
    }

    showToast(`Berhasil membersihkan ${countUstadzBefore - appState.ustadz.length} ustadz dummy & ${countSantriBefore - appState.santri.length} santri dummy. Data asli Anda tetap aman!`, 'success');
  }

  function purgeDummyUstadzOnly() {
    const dummyUstadzIds = new Set(['u-1', 'u-2', 'u-3', 'u-4']);
    const dummyUstadzNames = new Set([
      'Ustadz Ahmad Fauzi, S.Pd.I',
      'Ustadz Faiz Ramadhan, Lc.',
      'Ustadz Ridwan Al-Bantani, M.Pd.',
      'Ustadz Hasan Basri, S.Th.I'
    ]);

    const ok = confirm('Hapus 4 ustadz contoh/dummy bawaan (Ahmad Fauzi, Faiz Ramadhan, Ridwan, Hasan Basri)? Data ustadz asli yang Anda buat akan tetap aman.');
    if (!ok) return;

    const countBefore = appState.ustadz.length;
    appState.ustadz = appState.ustadz.filter(u => !dummyUstadzIds.has(u.id) && !dummyUstadzNames.has(u.nama));
    saveData();
    renderAdminView();
    renderLoginMuhaffizOptions();
    updateSheetsUI();

    if (appState.sheetsUrl && appState.sheetsAutoSync) {
      syncSingleAction('clear_dummy', {});
      syncAllToSpreadsheet(true);
    }

    showToast(`Berhasil menghapus ${countBefore - appState.ustadz.length} ustadz dummy. Data ustadz asli Anda tetap utuh.`, 'success');
  }

  function handleSaveSantriForm() {
    const editId = document.getElementById('santri-edit-id').value;
    const nis = document.getElementById('santri-nis').value.trim();
    const nama = document.getElementById('santri-nama').value.trim();
    const kelas = (document.getElementById('santri-kelas').value || '').trim() || 'Kelas 7A';
    const halaqoh = (document.getElementById('santri-halaqoh')?.value || '').trim();
    const asrama = document.getElementById('santri-asrama').value.trim() || 'Kamar Bilal Bin Robah #01';
    const wali = document.getElementById('santri-wali').value.trim();
    const wa = document.getElementById('santri-wa').value.trim() || '081200000000';
    const musyrif = document.getElementById('santri-musyrif').value.trim() || 'Ustadz Ahmad Fauzi';

    if (!nis || !nama || !wali || !kelas) {
      showToast('Harap lengkapi NIS, Nama Santri, Kelas Formal, dan Nama Wali.', 'error');
      return;
    }

    let savedSantri = null;
    if (editId) {
      const idx = appState.santri.findIndex(s => s.id === editId);
      if (idx !== -1) {
        const updatedNotes = formatTahfidzNotesWithHalaqoh(appState.santri[idx].tahfidzNotes, halaqoh);
        appState.santri[idx] = {
          ...appState.santri[idx],
          nis, nama, kelas, halaqoh, asrama, wali, wa, musyrif,
          tahfidzNotes: updatedNotes
        };
        savedSantri = appState.santri[idx];
        showToast('Data santri berhasil diperbarui!', 'success');
      }
    } else {
      const newId = `s-${Date.now()}`;
      savedSantri = {
        id: newId,
        nis,
        nama,
        gender: kelas.includes('7B') || kelas.toLowerCase().includes('putri') ? 'P' : 'L',
        kelas,
        halaqoh,
        asrama,
        wali,
        wa,
        waliUser: `wali.${nis}`,
        musyrif,
        tahfidzCurrent: 3.0,
        tahfidzTarget: 5.0,
        tahfidzNotes: formatTahfidzNotesWithHalaqoh('Pencapaian Juz 30', halaqoh)
      };
      appState.santri.push(savedSantri);
      showToast(`Santri baru berhasil ditambahkan ke ${kelas}!`, 'success');
    }

    saveData();
    if (savedSantri) {
      syncSingleAction('save_santri', { santri: savedSantri });
    }
    updateSheetsUI();
    closeModal('modal-santri');
    updateKelasDropdowns();
    renderAdminView();
    renderWaliSantriSelectOptions();
  }

  // ==========================================================================
  // SPREADSHEET TEMPLATE & IMPORT UTILITIES
  // ==========================================================================
  let pendingImportSantri = [];

  function switchSantriModalTab(tab) {
    const tabBtnManual = document.getElementById('tab-btn-santri-manual');
    const tabBtnSpreadsheet = document.getElementById('tab-btn-santri-spreadsheet');
    const paneManual = document.getElementById('pane-santri-manual');
    const paneSpreadsheet = document.getElementById('pane-santri-spreadsheet');

    if (tab === 'spreadsheet') {
      tabBtnSpreadsheet?.classList.add('active');
      tabBtnManual?.classList.remove('active');
      if (paneSpreadsheet) paneSpreadsheet.style.display = 'block';
      if (paneManual) paneManual.style.display = 'none';
    } else {
      tabBtnManual?.classList.add('active');
      tabBtnSpreadsheet?.classList.remove('active');
      if (paneManual) paneManual.style.display = 'block';
      if (paneSpreadsheet) paneSpreadsheet.style.display = 'none';
    }
  }

  function downloadSantriTemplateCSV() {
    const headers = [
      'NIS',
      'Nama Lengkap',
      'Jenis Kelamin (L/P)',
      'Kelas',
      'Kamar Asrama',
      'Nama Orang Tua / Wali',
      'No WhatsApp Wali',
      'Musyrif Pembimbing',
      'Target Capaian'
    ];

    const sampleRows = [
      ['202607013', 'Faris Abdullah Ash-Shiddiq', 'L', 'Kelas 7A', 'Kamar Bilal Bin Robah #02', 'Bpk. Abdullah Mansyur', '081234567891', 'Ustadz Ahmad Fauzi', '5.0 Juz / Semester 1'],
      ['202607014', 'Nayla Salsabila Putri', 'P', 'Kelas 7B', 'Kamar Sayyidah Aisyah #01', 'Ibu Maya Kurniawati', '081345678902', 'Ustadz Faiz Ramadhan', '5.0 Juz / Semester 1'],
      ['202607015', 'Hamzah Saifullah Pratama', 'L', 'Kelas 8A', 'Kamar Ali bin Abi Thalib #01', 'Bpk. Saifullah Hadi', '081567890123', 'Ustadz Ridwan Al-Bantani', '8.0 Juz / Semester 1']
    ];

    let csv = '\uFEFF'; // Byte Order Mark for Excel UTF-8 compatibility
    csv += headers.map(h => `"${h.replace(/"/g, '""')}"`).join(',') + '\r\n';
    sampleRows.forEach(row => {
      csv += row.map(col => `"${String(col).replace(/"/g, '""')}"`).join(',') + '\r\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Template_Data_Santri_Bilal_Bin_Robah.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Template Spreadsheet (.csv) berhasil diunduh! Silakan buka & isi menggunakan Excel / Sheets.', 'success');
  }

  function parseCSVSmart(text) {
    if (!text) return [];
    if (text.charCodeAt(0) === 0xFEFF) text = text.substr(1);

    const firstLineEnd = text.indexOf('\n');
    const firstLine = firstLineEnd !== -1 ? text.substring(0, firstLineEnd) : text;
    const semiCount = (firstLine.match(/;/g) || []).length;
    const commaCount = (firstLine.match(/,/g) || []).length;
    const delimiter = semiCount > commaCount ? ';' : ',';

    const rows = [];
    let currentRow = [''];
    let insideQuote = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (insideQuote && nextChar === '"') {
          currentRow[currentRow.length - 1] += '"';
          i++;
        } else {
          insideQuote = !insideQuote;
        }
      } else if (char === delimiter && !insideQuote) {
        currentRow.push('');
      } else if ((char === '\r' || char === '\n') && !insideQuote) {
        if (char === '\r' && nextChar === '\n') i++;
        if (currentRow.some(c => c.trim() !== '')) {
          rows.push(currentRow.map(c => c.trim().replace(/^"(.*)"$/, '$1')));
        }
        currentRow = [''];
      } else {
        currentRow[currentRow.length - 1] += char;
      }
    }

    if (currentRow.some(c => c.trim() !== '')) {
      rows.push(currentRow.map(c => c.trim().replace(/^"(.*)"$/, '$1')));
    }

    return rows;
  }

  function handleProcessSantriSpreadsheet(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const text = e.target.result;
        const rawRows = parseCSVSmart(text);
        if (!rawRows || rawRows.length < 2) {
          showToast('File spreadsheet kosong atau tidak memiliki baris data.', 'error');
          return;
        }

        // Detect header mapping
        const header = rawRows[0].map(h => h.toLowerCase());
        const findCol = (keywords, defaultIdx) => {
          for (let i = 0; i < header.length; i++) {
            if (keywords.some(k => header[i].includes(k))) return i;
          }
          return defaultIdx;
        };

        const idxNis = findCol(['nis', 'induk', 'id'], 0);
        const idxNama = findCol(['nama', 'santri', 'lengkap'], 1);
        const idxGender = findCol(['gender', 'kelamin', 'jk', 'l/p'], 2);
        const idxKelas = findCol(['kelas', 'halaqoh', 'tingkat'], 3);
        const idxAsrama = findCol(['kamar', 'asrama', 'kobong'], 4);
        const idxWali = findCol(['wali', 'orang tua', 'ayah', 'ibu'], 5);
        const idxWa = findCol(['wa', 'whatsapp', 'hp', 'telepon', 'kontak'], 6);
        const idxMusyrif = findCol(['musyrif', 'pembimbing', 'ustadz', 'guru'], 7);
        const idxTarget = findCol(['target', 'capaian', 'tahfidz'], 8);

        pendingImportSantri = [];

        for (let r = 1; r < rawRows.length; r++) {
          const row = rawRows[r];
          if (!row || row.length === 0 || (!row[idxNama] && !row[idxNis])) continue;

          const nis = (row[idxNis] || '').trim();
          const nama = (row[idxNama] || '').trim();
          if (!nis || !nama) continue;

          let gender = (row[idxGender] || '').trim().toUpperCase();
          if (!gender || (gender !== 'L' && gender !== 'P')) {
            gender = (row[idxKelas] || '').includes('7B') ? 'P' : 'L';
          }

          const kelas = (row[idxKelas] || 'Kelas 7A').trim();
          const asrama = (row[idxAsrama] || 'Kamar Bilal Bin Robah #01').trim();
          const wali = (row[idxWali] || 'Orang Tua Santri').trim();
          const wa = (row[idxWa] || '081200000000').trim().replace(/[^0-9]/g, '');
          const musyrif = (row[idxMusyrif] || 'Ustadz Ahmad Fauzi').trim();
          const target = (row[idxTarget] || '5.0 Juz').trim();

          const isExisting = appState.santri.some(s => s.nis === nis);

          pendingImportSantri.push({
            nis,
            nama,
            gender,
            kelas,
            asrama,
            wali,
            wa: wa.startsWith('0') ? wa : ('0' + wa),
            musyrif,
            target,
            isExisting
          });
        }

        if (pendingImportSantri.length === 0) {
          showToast('Tidak ada data santri yang valid ditemukan dalam file.', 'error');
          return;
        }

        // Render preview UI
        const previewWrap = document.getElementById('santri-csv-preview-wrap');
        const fileNameEl = document.getElementById('preview-file-name');
        const fileSizeEl = document.getElementById('preview-file-size');
        const rowCountEl = document.getElementById('preview-row-count');
        const tbodyEl = document.getElementById('tbody-csv-preview');

        if (fileNameEl) fileNameEl.textContent = file.name;
        if (fileSizeEl) fileSizeEl.textContent = (file.size / 1024).toFixed(1) + ' KB';
        if (rowCountEl) rowCountEl.textContent = `${pendingImportSantri.length} Santri Terbaca`;

        if (tbodyEl) {
          tbodyEl.innerHTML = '';
          pendingImportSantri.forEach((item, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${i + 1}</td>
              <td><code>${item.nis}</code></td>
              <td><strong>${item.nama}</strong> <span class="badge ${item.gender === 'L' ? 'badge-primary' : 'badge-warning'}" style="font-size: 0.65rem; padding: 2px 5px;">${item.gender}</span></td>
              <td>${item.kelas}</td>
              <td>${item.asrama}</td>
              <td>${item.wali}</td>
              <td>${item.wa}</td>
              <td>${item.isExisting 
                ? '<span class="badge badge-warning" style="font-size:0.7rem;">🔄 Update Data</span>' 
                : '<span class="badge badge-success" style="font-size:0.7rem;">✅ Santri Baru</span>'}</td>
            `;
            tbodyEl.appendChild(tr);
          });
        }

        if (previewWrap) previewWrap.style.display = 'block';
        showToast(`Berhasil membaca ${pendingImportSantri.length} santri dari "${file.name}"!`, 'info');
      } catch (err) {
        console.error('CSV Parsing Error:', err);
        showToast('Gagal memproses file spreadsheet. Periksa format CSV Anda.', 'error');
      }
    };
    reader.readAsText(file, 'UTF-8');
  }

  function executeBatchImportSantri() {
    if (!pendingImportSantri || pendingImportSantri.length === 0) {
      showToast('Belum ada data spreadsheet yang siap diimpor.', 'warning');
      return;
    }

    const updateExisting = document.getElementById('check-update-existing')?.checked ?? true;
    let addedCount = 0;
    let updatedCount = 0;

    pendingImportSantri.forEach((item, idx) => {
      const existingIdx = appState.santri.findIndex(s => s.nis === item.nis);
      if (existingIdx !== -1) {
        if (updateExisting) {
          appState.santri[existingIdx] = {
            ...appState.santri[existingIdx],
            nama: item.nama,
            gender: item.gender,
            kelas: item.kelas,
            asrama: item.asrama,
            wali: item.wali,
            wa: item.wa,
            musyrif: item.musyrif
          };
          updatedCount++;
        }
      } else {
        const newId = `s-${Date.now()}-${idx}`;
        appState.santri.push({
          id: newId,
          nis: item.nis,
          nama: item.nama,
          gender: item.gender,
          kelas: item.kelas,
          asrama: item.asrama,
          wali: item.wali,
          wa: item.wa,
          waliUser: `wali.${item.nis}`,
          musyrif: item.musyrif,
          tahfidzCurrent: 3.0,
          tahfidzTarget: 5.0,
          tahfidzNotes: item.target || 'Pencapaian Juz 30'
        });
        addedCount++;
      }
    });

    saveData();
    updateSheetsUI();
    if (appState.sheetsUrl && appState.sheetsAutoSync) {
      syncAllToSpreadsheet(true);
    }
    closeModal('modal-santri');
    updateKelasDropdowns();
    renderAdminView();
    renderWaliSantriSelectOptions();

    // Reset state
    pendingImportSantri = [];
    const previewWrap = document.getElementById('santri-csv-preview-wrap');
    if (previewWrap) previewWrap.style.display = 'none';
    const fileInput = document.getElementById('input-santri-file');
    if (fileInput) fileInput.value = '';

    const summaryMsg = `🎉 Import Selesai! Ditambahkan: ${addedCount} santri baru${updatedCount > 0 ? `, Diperbarui: ${updatedCount} santri` : ''}.`;
    showToast(summaryMsg, 'success');
  }

  function resetSpreadsheetPreview() {
    pendingImportSantri = [];
    const previewWrap = document.getElementById('santri-csv-preview-wrap');
    if (previewWrap) previewWrap.style.display = 'none';
    const fileInput = document.getElementById('input-santri-file');
    if (fileInput) fileInput.value = '';
  }

  function handleSaveUstadzForm() {
    const editId = document.getElementById('ustadz-edit-id').value;
    const nip = document.getElementById('ustadz-nip').value.trim();
    const nama = document.getElementById('ustadz-nama').value.trim();
    const bidang = document.getElementById('ustadz-bidang').value.trim();
    const username = document.getElementById('ustadz-username').value.trim();
    const wa = document.getElementById('ustadz-wa').value.trim() || '081234567890';

    if (!nip || !nama || !username) {
      showToast('Harap lengkapi NIP, Nama, dan Username Login.', 'error');
      return;
    }

    let savedUstadz = null;
    if (editId) {
      const idx = appState.ustadz.findIndex(u => u.id === editId);
      if (idx !== -1) {
        appState.ustadz[idx] = {
          ...appState.ustadz[idx],
          nip, nama, bidang, username, wa
        };
        savedUstadz = appState.ustadz[idx];
        showToast('Data ustadz berhasil diperbarui!', 'success');
      }
    } else {
      savedUstadz = {
        id: `u-${Date.now()}`,
        nip,
        nama,
        bidang,
        username,
        wa,
        avatar: '👳‍♂️',
        pass: 'guru123'
      };
      appState.ustadz.push(savedUstadz);
      showToast('Ustadz baru berhasil ditambahkan!', 'success');
    }

    saveData();
    if (savedUstadz) {
      syncSingleAction('save_ustadz', { ustadz: savedUstadz });
    }
    updateSheetsUI();
    closeModal('modal-ustadz');
    renderAdminView();
    renderLoginMuhaffizOptions();
  }

  // ==========================================================================
  // 16. EVENT LISTENERS INITIALIZATION
  // ==========================================================================
  function initEventListeners() {
    // 1. Submit login muhaffiz
    document.getElementById('btn-submit-muhaffiz')?.addEventListener('click', loginMuhaffiz);
    document.getElementById('sandi-muhaffiz')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') loginMuhaffiz();
    });

    // 2. Open Wali portal selection modal (PASSWORDLESS)
    document.getElementById('btn-open-wali-portal')?.addEventListener('click', () => {
      openModal('modal-wali-select');
      renderWaliSantriSelectOptions();
    });

    // 2b. Open Tahfizh Portal in new tab
    document.getElementById('btn-open-hafalan-portal')?.addEventListener('click', () => {
      showToast('Membuka Portal Pantau Hafalan Anak (bilal-tahfizh.vercel.app)...', 'info');
    });

    document.getElementById('btn-close-modal-wali')?.addEventListener('click', () => closeModal('modal-wali-select'));
    document.getElementById('btn-batal-wali')?.addEventListener('click', () => closeModal('modal-wali-select'));

    document.getElementById('select-santri-wali-modal')?.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val) window.pickQuickSantri(val);
    });

    document.getElementById('btn-confirm-wali')?.addEventListener('click', () => {
      const select = document.getElementById('select-santri-wali-modal');
      const chosenId = select.value || appState.selectedWaliSantriId;
      if (!chosenId) {
        showToast('⚠️ Silakan pilih salah satu ananda terlebih dahulu.', 'error');
        return;
      }
      loginWaliTanpaSandi(chosenId);
    });

    // 3. Admin trigger button
    document.getElementById('btn-trigger-admin')?.addEventListener('click', () => {
      openModal('modal-admin-login');
      document.getElementById('admin-password').focus();
    });

    document.getElementById('btn-close-modal-admin')?.addEventListener('click', () => closeModal('modal-admin-login'));
    document.getElementById('btn-batal-admin')?.addEventListener('click', () => closeModal('modal-admin-login'));

    document.getElementById('btn-submit-admin')?.addEventListener('click', () => {
      const p = document.getElementById('admin-password').value.trim();
      if (p === 'admin123') {
        closeModal('modal-admin-login');
        document.getElementById('admin-password').value = '';
        setRole('admin');
      } else {
        showToast('⛔ Kata sandi Admin salah! Silakan coba lagi.', 'error');
        document.getElementById('admin-password').value = '';
      }
    });

    document.getElementById('admin-password')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') document.getElementById('btn-submit-admin').click();
    });

    // 4. Logout / Back to Login
    document.getElementById('btn-logout')?.addEventListener('click', logoutToLoginPage);
    document.getElementById('btn-ustadz-logout')?.addEventListener('click', logoutToLoginPage);
    document.getElementById('btn-wali-logout')?.addEventListener('click', logoutToLoginPage);

    // 4b. Switch santri / halaqoh in Wali Portal
    document.getElementById('btn-wali-switch-santri')?.addEventListener('click', () => {
      openModal('modal-wali-select');
      renderWaliSantriSelectOptions();
    });

    // 4c. Filter group listener in modal wali
    document.getElementById('select-wali-filter-group')?.addEventListener('change', (e) => {
      renderWaliSantriSelectOptions(e.target.value);
    });

    // 4d. Timeline filter pills in Wali Portal
    document.querySelectorAll('#wali-timeline-filter-group .btn-timeline-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        const curSantriId = appState.currentUser?.santriId || appState.selectedWaliSantriId;
        renderWaliTimelineFeed(curSantriId, filter);
      });
    });

    // ========================================================================
    // 5. SETTINGS MODAL LISTENERS (RODA GIGI)
    // ========================================================================
    const openSettings = () => {
      openModal('modal-settings');
      syncSettingsModalUI();
    };

    document.getElementById('btn-open-settings')?.addEventListener('click', openSettings);
    document.getElementById('btn-login-settings')?.addEventListener('click', openSettings);
    document.getElementById('btn-close-modal-settings')?.addEventListener('click', () => closeModal('modal-settings'));

    // Theme Mode Toggle inside settings
    document.getElementById('setting-theme-dark')?.addEventListener('click', () => {
      appSettings.themeMode = 'dark';
      applySettings(appSettings);
    });

    document.getElementById('setting-theme-light')?.addEventListener('click', () => {
      appSettings.themeMode = 'light';
      applySettings(appSettings);
    });

    // Quick Theme toggle in header
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
      appSettings.themeMode = appSettings.themeMode === 'dark' ? 'light' : 'dark';
      applySettings(appSettings);
      showToast(`Beralih ke mode ${appSettings.themeMode === 'dark' ? 'Gelap' : 'Terang'}.`, 'info');
    });

    // Color Swatches
    document.querySelectorAll('.swatch-btn[data-color]').forEach(btn => {
      btn.addEventListener('click', () => {
        appSettings.accentColor = btn.getAttribute('data-color');
        applySettings(appSettings);
        showToast(`Warna aksen diubah!`, 'success');
      });
    });

    document.getElementById('setting-custom-color')?.addEventListener('input', (e) => {
      appSettings.accentColor = e.target.value;
      applySettings(appSettings);
    });

    // Wallpaper Presets
    document.querySelectorAll('.wp-card').forEach(card => {
      card.addEventListener('click', () => {
        appSettings.wallpaper = card.getAttribute('data-wp');
        applySettings(appSettings);
        showToast(`Wallpaper diubah ke ${card.querySelector('.wp-name')?.textContent || 'Preset'}!`, 'success');
      });
    });

    // Custom Wallpaper Upload with Auto-Compression
    document.getElementById('input-custom-wallpaper')?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          try {
            const canvas = document.createElement('canvas');
            let w = img.width;
            let h = img.height;
            const maxDim = 1920;
            if (w > maxDim || h > maxDim) {
              if (w > h) {
                h = Math.round((h * maxDim) / w);
                w = maxDim;
              } else {
                w = Math.round((w * maxDim) / h);
                h = maxDim;
              }
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            const compressed = canvas.toDataURL('image/jpeg', 0.85);
            appSettings.wallpaper = `url(${compressed})`;
            applySettings(appSettings);
            showToast('Wallpaper kustom berhasil diterapkan!', 'success');
          } catch (err) {
            console.error('Compression failed, using raw data:', err);
            appSettings.wallpaper = `url(${event.target.result})`;
            applySettings(appSettings);
            showToast('Wallpaper kustom berhasil diterapkan!', 'success');
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });

    // Font Presets
    document.querySelectorAll('.font-card').forEach(card => {
      card.addEventListener('click', () => {
        appSettings.fontFamily = card.getAttribute('data-font');
        applySettings(appSettings);
        showToast(`Jenis huruf diubah ke ${card.querySelector('strong')?.textContent}!`, 'success');
      });
    });

    // Font Scale
    document.querySelectorAll('.scale-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        appSettings.fontScale = btn.getAttribute('data-scale');
        applySettings(appSettings);
        showToast(`Ukuran huruf diatur ke ${appSettings.fontScale}!`, 'info');
      });
    });

    // Reset settings button
    document.getElementById('btn-reset-settings')?.addEventListener('click', () => {
      appSettings = { ...DEFAULT_SETTINGS };
      applySettings(appSettings);
      showToast('Pengaturan tampilan dikembalikan ke standar!', 'info');
    });

    // Save settings button
    document.getElementById('btn-save-settings')?.addEventListener('click', () => {
      closeModal('modal-settings');
      showToast('Pengaturan tampilan disimpan!', 'success');
    });

    // Admin Tabs
    document.querySelectorAll('[data-admin-tab]').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        const targetTab = tabBtn.getAttribute('data-admin-tab');
        document.querySelectorAll('[data-admin-tab]').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        tabBtn.classList.add('active');
        const targetPane = document.getElementById(`pane-admin-${targetTab}`);
        if (targetPane) targetPane.classList.add('active');
        appState.currentAdminTab = targetTab;

        if (targetTab === 'kelas') {
          renderMasterKelasHalaqohView();
        } else if (targetTab === 'santri') {
          renderSantriTable();
        } else if (targetTab === 'jadwal') {
          renderMasterJadwalCards();
        }
      });
    });

    // Filters
    document.getElementById('filter-santri-search')?.addEventListener('input', renderSantriTable);
    document.getElementById('filter-santri-kelas')?.addEventListener('change', renderSantriTable);

    // Master Kelas & Halaqoh Events
    document.getElementById('filter-kelas-search')?.addEventListener('input', renderMasterKelasHalaqohView);
    document.getElementById('filter-kelas-kategori')?.addEventListener('change', renderMasterKelasHalaqohView);
    document.getElementById('btn-add-kelas')?.addEventListener('click', window.openAddKelasModal);
    document.getElementById('btn-save-kelas')?.addEventListener('click', handleSaveKelasForm);
    document.getElementById('btn-open-mutasi-modal')?.addEventListener('click', () => window.openMutasiModal());

    // Mutasi Santri Modal Events
    document.getElementById('mutasi-kelas-asal')?.addEventListener('change', renderMutasiSantriList);
    document.getElementById('mutasi-kelas-tujuan')?.addEventListener('change', updateMutasiSummary);
    document.getElementById('mutasi-sync-musyrif')?.addEventListener('change', updateMutasiSummary);
    document.getElementById('btn-mutasi-select-all')?.addEventListener('click', () => {
      document.querySelectorAll('.mutasi-check-santri').forEach(cb => cb.checked = true);
      updateMutasiSummary();
    });
    document.getElementById('btn-mutasi-clear-all')?.addEventListener('click', () => {
      document.querySelectorAll('.mutasi-check-santri').forEach(cb => cb.checked = false);
      updateMutasiSummary();
    });
    document.getElementById('btn-execute-mutasi')?.addEventListener('click', handleExecuteMutasi);

    // Quick Pindah Modal Event
    document.getElementById('btn-save-quick-pindah')?.addEventListener('click', handleSaveQuickPindah);

    // Kelola Halaqoh Modal Events
    document.getElementById('kelola-halaqoh-search')?.addEventListener('input', renderKelolaHalaqohSantriList);
    document.getElementById('kelola-halaqoh-filter-kelas')?.addEventListener('change', renderKelolaHalaqohSantriList);
    document.getElementById('btn-kelola-halaqoh-select-all')?.addEventListener('click', () => {
      document.querySelectorAll('.kelola-halaqoh-check').forEach(cb => {
        cb.checked = true;
        selectedHalaqohSantriIds.add(cb.value);
        cb.closest('.halaqoh-santri-card')?.classList.add('is-selected');
      });
      const counterBadge = document.getElementById('kelola-halaqoh-counter');
      if (counterBadge) counterBadge.textContent = `${selectedHalaqohSantriIds.size} Santri Terpilih`;
    });
    document.getElementById('btn-kelola-halaqoh-unselect-all')?.addEventListener('click', () => {
      document.querySelectorAll('.kelola-halaqoh-check').forEach(cb => {
        cb.checked = false;
        selectedHalaqohSantriIds.delete(cb.value);
        cb.closest('.halaqoh-santri-card')?.classList.remove('is-selected');
      });
      const counterBadge = document.getElementById('kelola-halaqoh-counter');
      if (counterBadge) counterBadge.textContent = `${selectedHalaqohSantriIds.size} Santri Terpilih`;
    });
    document.getElementById('btn-save-kelola-halaqoh')?.addEventListener('click', handleSaveKelolaHalaqoh);

    // Quick Halaqoh Modal Event
    document.getElementById('btn-save-quick-halaqoh')?.addEventListener('click', handleSaveQuickHalaqoh);

    // Add Santri (Manual Form)
    document.getElementById('btn-add-santri')?.addEventListener('click', () => {
      document.getElementById('form-santri').reset();
      document.getElementById('santri-edit-id').value = '';
      document.getElementById('modal-santri-title').textContent = 'Tambah Data Santri Baru';
      const tabContainer = document.getElementById('santri-modal-tabs-container');
      if (tabContainer) tabContainer.style.display = 'block';
      switchSantriModalTab('manual');
      openModal('modal-santri');
    });

    // Open Spreadsheet Import
    document.getElementById('btn-open-spreadsheet-import')?.addEventListener('click', () => {
      document.getElementById('modal-santri-title').textContent = 'Tambah Santri via Spreadsheet';
      const tabContainer = document.getElementById('santri-modal-tabs-container');
      if (tabContainer) tabContainer.style.display = 'block';
      switchSantriModalTab('spreadsheet');
      openModal('modal-santri');
    });

    // Modal internal tabs
    document.getElementById('tab-btn-santri-manual')?.addEventListener('click', () => switchSantriModalTab('manual'));
    document.getElementById('tab-btn-santri-spreadsheet')?.addEventListener('click', () => switchSantriModalTab('spreadsheet'));

    // Download template
    document.getElementById('btn-download-santri-template')?.addEventListener('click', downloadSantriTemplateCSV);

    // Dropzone & File Input
    const dropzone = document.getElementById('santri-dropzone');
    const fileInput = document.getElementById('input-santri-file');
    dropzone?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleProcessSantriSpreadsheet(e.target.files[0]);
      }
    });

    // Drag and Drop
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone?.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone?.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone?.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleProcessSantriSpreadsheet(e.dataTransfer.files[0]);
      }
    });

    // Cancel / Change file & Execute import
    document.getElementById('btn-cancel-import-preview')?.addEventListener('click', resetSpreadsheetPreview);
    document.getElementById('btn-execute-import-santri')?.addEventListener('click', executeBatchImportSantri);

    document.getElementById('form-santri')?.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSaveSantriForm();
    });

    // Add Ustadz
    document.getElementById('btn-add-ustadz')?.addEventListener('click', () => {
      document.getElementById('form-ustadz').reset();
      document.getElementById('ustadz-edit-id').value = '';
      document.getElementById('modal-ustadz-title').textContent = 'Tambah Data Ustadz Baru';
      openModal('modal-ustadz');
    });
    document.getElementById('form-ustadz')?.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSaveUstadzForm();
    });

    // Add & Edit Master Slot
    setup24HourTimeInput(document.getElementById('slot-start-time'));
    setup24HourTimeInput(document.getElementById('slot-end-time'));

    document.getElementById('btn-add-slot')?.addEventListener('click', () => {
      document.getElementById('form-slot').reset();
      document.getElementById('slot-edit-id').value = '';
      document.getElementById('modal-slot-title').textContent = 'Tambah Slot Waktu Baru (Format 24 Jam)';
      document.getElementById('slot-start-time').value = '08:00';
      document.getElementById('slot-end-time').value = '08:40';
      document.getElementById('slot-is-break').value = 'false';
      openModal('modal-slot');
    });

    document.getElementById('form-slot')?.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSaveSlotForm();
    });

    document.getElementById('btn-reset-slots')?.addEventListener('click', handleResetSlots);

    // Rekap Presets & Filters
    document.getElementById('btn-preset-1week')?.addEventListener('click', () => setRekapPreset('1week'));
    document.getElementById('btn-preset-prevweek')?.addEventListener('click', () => setRekapPreset('prevweek'));
    document.getElementById('btn-preset-nextweek')?.addEventListener('click', () => setRekapPreset('nextweek'));
    document.getElementById('btn-preset-1month')?.addEventListener('click', () => setRekapPreset('1month'));
    document.getElementById('btn-preset-all')?.addEventListener('click', () => setRekapPreset('all'));

    document.getElementById('rekap-date-from')?.addEventListener('change', handleManualRekapDateChange);
    document.getElementById('rekap-date-to')?.addEventListener('change', handleManualRekapDateChange);

    ['rekap-filter-slot', 'rekap-filter-kelas', 'rekap-filter-status'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', renderRekapitulasi);
    });
    document.getElementById('btn-export-csv')?.addEventListener('click', exportRekapitulasiCSV);
    document.getElementById('btn-print-rekap')?.addEventListener('click', openPrintModal);

    // Ustadz controls
    document.getElementById('ustadz-input-date')?.addEventListener('change', renderUstadzAttendanceInputTable);
    document.getElementById('ustadz-input-slot')?.addEventListener('change', renderUstadzAttendanceInputTable);
    document.getElementById('ustadz-input-kelas')?.addEventListener('change', renderUstadzAttendanceInputTable);
    document.getElementById('btn-refresh-session')?.addEventListener('click', renderUstadzAttendanceInputTable);

    document.getElementById('btn-batch-all-hadir')?.addEventListener('click', () => {
      document.querySelectorAll('.santri-input-row').forEach(row => {
        const id = row.getAttribute('data-santri-id');
        window.setRowAttendance(id, 'Hadir');
      });
      showToast('Semua santri pada sesi ini ditandai Hadir.', 'info');
    });

    document.getElementById('btn-batch-all-aktif')?.addEventListener('click', () => {
      document.querySelectorAll('.santri-input-row').forEach(row => {
        const id = row.getAttribute('data-santri-id');
        window.setRowKeaktifan(id, 4);
      });
      showToast('Semua keaktifan diatur ke skor 4 (Aktif & Fokus).', 'info');
    });

    document.getElementById('btn-save-attendance')?.addEventListener('click', saveCurrentUstadzSession);

    // ========================================================
    // KONTROL PEMANTAUAN PEKAN & BULAN GRAFIK KEAKTIFAN SANTRI
    // ========================================================
    const btnChartPekan = document.getElementById('btn-chart-mode-pekan');
    const btnChartBulan = document.getElementById('btn-chart-mode-bulan');
    const subgroupPekan = document.getElementById('subgroup-pekan-controls');
    const subgroupBulan = document.getElementById('subgroup-bulan-controls');
    const selectPekan = document.getElementById('select-chart-pekan');
    const selectBulan = document.getElementById('select-chart-bulan');
    const btnPrevWeek = document.getElementById('btn-chart-prev-week');
    const btnNextWeek = document.getElementById('btn-chart-next-week');
    const btnPrevMonth = document.getElementById('btn-chart-prev-month');
    const btnNextMonth = document.getElementById('btn-chart-next-month');

    const weekList = ['pekan-1', 'pekan-2', 'pekan-3', 'pekan-4'];
    const monthList = ['2026-09', '2026-10', '2026-11', 'last-30'];

    function switchChartMode(mode) {
      appState.chartWaliMode = mode;
      if (mode === 'pekan') {
        btnChartPekan?.classList.add('active');
        btnChartBulan?.classList.remove('active');
        if (subgroupPekan) subgroupPekan.style.display = 'flex';
        if (subgroupBulan) subgroupBulan.style.display = 'none';
      } else {
        btnChartBulan?.classList.add('active');
        btnChartPekan?.classList.remove('active');
        if (subgroupBulan) subgroupBulan.style.display = 'flex';
        if (subgroupPekan) subgroupPekan.style.display = 'none';
      }
      renderWaliLineChart();
    }

    btnChartPekan?.addEventListener('click', () => switchChartMode('pekan'));
    btnChartBulan?.addEventListener('click', () => switchChartMode('bulan'));

    selectPekan?.addEventListener('change', (e) => {
      appState.chartWaliWeek = e.target.value;
      renderWaliLineChart();
    });

    btnPrevWeek?.addEventListener('click', () => {
      const curIdx = weekList.indexOf(appState.chartWaliWeek || 'pekan-2');
      if (curIdx > 0) {
        appState.chartWaliWeek = weekList[curIdx - 1];
        if (selectPekan) selectPekan.value = appState.chartWaliWeek;
        renderWaliLineChart();
      }
    });

    btnNextWeek?.addEventListener('click', () => {
      const curIdx = weekList.indexOf(appState.chartWaliWeek || 'pekan-2');
      if (curIdx < weekList.length - 1) {
        appState.chartWaliWeek = weekList[curIdx + 1];
        if (selectPekan) selectPekan.value = appState.chartWaliWeek;
        renderWaliLineChart();
      }
    });

    selectBulan?.addEventListener('change', (e) => {
      appState.chartWaliMonth = e.target.value;
      renderWaliLineChart();
    });

    btnPrevMonth?.addEventListener('click', () => {
      const curIdx = monthList.indexOf(appState.chartWaliMonth || '2026-10');
      if (curIdx > 0) {
        appState.chartWaliMonth = monthList[curIdx - 1];
        if (selectBulan) selectBulan.value = appState.chartWaliMonth;
        renderWaliLineChart();
      }
    });

    btnNextMonth?.addEventListener('click', () => {
      const curIdx = monthList.indexOf(appState.chartWaliMonth || '2026-10');
      if (curIdx < monthList.length - 1) {
        appState.chartWaliMonth = monthList[curIdx + 1];
        if (selectBulan) selectBulan.value = appState.chartWaliMonth;
        renderWaliLineChart();
      }
    });

    // ==========================================================================
    // GOOGLE SPREADSHEET EVENT LISTENERS & INTEGRATION
    // ==========================================================================
    document.getElementById('btn-open-sheets-config')?.addEventListener('click', () => {
      updateSheetsUI();
      openModal('modal-sheets-config');
    });

    document.getElementById('btn-connect-sheets-header')?.addEventListener('click', () => {
      updateSheetsUI();
      openModal('modal-sheets-config');
    });

    document.getElementById('btn-sync-now-header')?.addEventListener('click', () => {
      syncAllToSpreadsheet(false);
    });

    document.getElementById('btn-test-sheets-url')?.addEventListener('click', () => {
      const input = document.getElementById('input-sheets-webapp-url');
      testSheetsConnection(input ? input.value : '');
    });

    document.getElementById('btn-save-sheets-config')?.addEventListener('click', () => {
      const input = document.getElementById('input-sheets-webapp-url');
      const check = document.getElementById('check-sheets-autosync');
      appState.sheetsUrl = (input ? input.value : '').trim();
      appState.sheetsAutoSync = check ? check.checked : true;
      saveData();
      updateSheetsUI();
      closeModal('modal-sheets-config');
      showToast('Pengaturan Google Spreadsheet tersimpan!', 'success');
      if (appState.sheetsUrl) {
        testSheetsConnection(appState.sheetsUrl).then(connected => {
          if (connected) {
            syncAllToSpreadsheet(true);
          }
        });
      }
    });

    document.getElementById('btn-sync-down-sheets')?.addEventListener('click', () => {
      fetchFromSpreadsheet(false);
    });

    document.getElementById('btn-sync-up-sheets')?.addEventListener('click', () => {
      syncAllToSpreadsheet(false);
    });

    document.getElementById('btn-purge-dummy-data')?.addEventListener('click', () => {
      purgeDummyData(true);
    });

    document.getElementById('btn-clean-dummy-ustadz')?.addEventListener('click', () => {
      purgeDummyUstadzOnly();
    });

    window.addEventListener('resize', () => {
      const waliView = document.getElementById('view-wali');
      if (waliView && waliView.style.display !== 'none' && !waliView.classList.contains('hidden')) {
        renderWaliLineChart();
      }
    });

    // Wali WhatsApp & Print
    document.getElementById('btn-hubungi-musyrif')?.addEventListener('click', () => {
      const s = appState.currentUser.santri || appState.santri[0];
      if (!s) {
        showToast('Data santri tidak ditemukan.', 'error');
        return;
      }
      const sMusyrif = String(s.musyrif || '');
      const musyrifKey = sMusyrif.split(' ')[1] || sMusyrif;
      const u = (appState.ustadz || []).find(item => musyrifKey && String(item.nama || '').includes(musyrifKey)) || (appState.ustadz && appState.ustadz[0]);
      if (!u) {
        showToast('Kontak ustadz/musyrif belum tersedia.', 'error');
        return;
      }
      const rawWa = String(u.wa !== undefined && u.wa !== null ? u.wa : '').replace(/[^0-9]/g, '').replace(/^0/, '62');
      if (!rawWa) {
        showToast('Nomor WhatsApp ustadz belum diatur.', 'error');
        return;
      }
      window.open(`https://wa.me/${rawWa}?text=Assalamu%27alaikum%20${encodeURIComponent(u.nama || 'Ustadz')},%20saya%20orang%20tua%20dari%20ananda%20${encodeURIComponent(s.nama || 'santri')}%20(Kelas%20${encodeURIComponent(s.kelas || '-')}%20Pondok%20Pesantren%20Bilal%20Bin%20Robah).%20Ingin%20berkonsultasi%20mengenai%20perkembangan%20kehadiran%20dan%20keaktifan%20belajar%20ananda.`, '_blank');
    });

    document.getElementById('btn-cetak-rapor-wali')?.addEventListener('click', openPrintModal);

    // Close modals
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close-modal');
        closeModal(modalId);
      });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-backdrop, .modal-overlay').forEach(bd => {
      bd.addEventListener('click', (e) => {
        if (e.target === bd) {
          closeModal(bd.id);
        }
      });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop, .modal-overlay').forEach(m => {
          if (m.style.display === 'flex' || !m.classList.contains('hidden')) {
            closeModal(m.id);
          }
        });
      }
    });
  }

  // ==========================================================================
  // 17. BOOTSTRAP
  // ==========================================================================
  function bootstrap() {
    initData();
    updateSlotDropdowns();
    updateKelasDropdowns();
    initSearchableComboboxes();
    renderLoginMuhaffizOptions();
    renderWaliSantriSelectOptions();
    updateSheetsUI();
    initEventListeners();
    updateLiveClock();
    setInterval(updateLiveClock, 1000);

    if (appState.currentUser) {
      showAppViews();
      renderCurrentPortal();
      updateUserBadge();
    } else {
      logoutToLoginPage();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();

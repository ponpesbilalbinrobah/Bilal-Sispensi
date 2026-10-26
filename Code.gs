/**
 * ============================================================================
 * SISPENSI SANTRI - PONDOK PESANTREN BILAL BIN ROBAH
 * BACKEND DATABASE GOOGLE APPS SCRIPT (Code.gs)
 * ============================================================================
 * Spreadsheet ID: 1W97SdHXUTkTbUHadh7vIhZWsLMhV0NvmSQgZYDKieUE
 * 
 * PETUNJUK PENGGUNAAN:
 * 1. Buka spreadsheet Anda: https://docs.google.com/spreadsheets/d/1W97SdHXUTkTbUHadh7vIhZWsLMhV0NvmSQgZYDKieUE/edit
 * 2. Klik menu "Ekstensi" (Extensions) > "Apps Script"
 * 3. Hapus semua kode yang ada di Code.gs, lalu salin dan tempel SELURUH isi file ini.
 * 4. Pada toolbar atas Apps Script, pilih fungsi "setupDatabase" lalu klik tombol "Run" (Jalankan).
 *    (Berikan izin/otorisasi jika diminta Google).
 * 5. Tunggu hingga selesai -> Semua sheet (Santri, Ustadz, AbsensiLogs, Kelas, Slots)
 *    akan OTOMATIS terbuat rapi lengkap dengan header, warna, format, dan data awal!
 * 6. Klik tombol "Deploy" (Penerapan) di pojok kanan atas > "New deployment" (Penerapan baru)
 *    - Type: Web app
 *    - Description: API SisPensi Database
 *    - Execute as: Me (email Anda)
 *    - Who has access: Anyone (Siapa saja)
 * 7. Salin URL Web App yang dihasilkan (format: https://script.google.com/macros/s/.../exec)
 *    dan masukkan ke aplikasi SISPENSI SANTRI.
 * ============================================================================
 */

const SPREADSHEET_ID = '1W97SdHXUTkTbUHadh7vIhZWsLMhV0NvmSQgZYDKieUE';

function getSpreadsheet() {
  try {
    return SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (e) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
}

// ============================================================================
// 1. MENU CUSTOM DI GOOGLE SPREADSHEET
// ============================================================================
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🕌 SisPensi Database')
    .addItem('🛠️ Inisialisasi / Buat Ulang Sheet Database', 'setupDatabase')
    .addItem('📊 Cek Status & Jumlah Data', 'checkDatabaseStatus')
    .addSeparator()
    .addItem('ℹ️ Petunjuk Deploy Web App', 'showHelpDialog')
    .addToUi();
}

// ============================================================================
// 2. FUNGSI OTOMATIS: SETUP SHEET & DATA AWAL (1-CLICK SETUP)
// ============================================================================
function setupDatabase() {
  const ss = getSpreadsheet();
  
  // 1. Setup Sheet Santri
  setupSheet(ss, 'Santri', [
    'id', 'nis', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'tahfidzCurrent', 'tahfidzTarget', 'tahfidzNotes'
  ], [
    ['s-1', '202607001', 'Muhammad Rayhan Al-Fatih', 'L', 'Kelas 7A', 'Kamar Bilal Bin Robah #01', 'Bpk. Hendra Gunawan', '081234567890', 'wali.rayhan', 'Ustadz Ahmad Fauzi', 4.5, 5.0, 'Juz 30, 29, 28, 27 (Mumtaz)'],
    ['s-2', '202607002', 'Fatimah Az-Zahra', 'P', 'Kelas 7B', 'Kamar Sayyidah Khadijah #02', 'Ibu Siti Rahmah', '081298765432', 'wali.fatimah', 'Ustadz Faiz Ramadhan', 5.0, 5.0, 'Tuntas Target Semester 1 (Juz 30-26)'],
    ['s-3', '202607003', 'Ahmad Ziyad Al-Farabi', 'L', 'Kelas 7A', 'Kamar Bilal Bin Robah #02', 'Bpk. Zulkifli Farabi', '081345678901', 'wali.ziyad', 'Ustadz Ahmad Fauzi', 3.5, 5.0, 'Murojaah Juz 29 berjalan'],
    ['s-4', '202607004', 'Muhammad Bilal Al-Habsyi', 'L', 'Kelas 7A', 'Kamar Bilal Bin Robah #03', 'Bpk. Munir Habsyi', '081356789012', 'wali.bilal', 'Ustadz Ahmad Fauzi', 4.0, 5.0, 'Juz 30, 29 lancar'],
    ['s-5', '202607005', 'Aisha Humaira Syarif', 'P', 'Kelas 7B', 'Kamar Sayyidah Khadijah #01', 'Bpk. Syarif Hidayat', '081234123412', 'wali.aisha', 'Ustadz Faiz Ramadhan', 4.8, 5.0, 'Tajwid sangat mumpuni'],
    ['s-6', '202607006', 'Ibrahim Rasyid', 'L', 'Kelas 7A', 'Kamar Abu Bakar #02', 'Bpk. Rasyid Ridha', '081987654321', 'wali.ibrahim', 'Ustadz Ahmad Fauzi', 3.0, 5.0, 'Butuh penguatan tajwid nun mati'],
    ['s-7', '202607007', 'Zahra Khairunnisa', 'P', 'Kelas 7B', 'Kamar Sayyidah Aisyah #03', 'Ibu Nurhayati', '081567890123', 'wali.zahra', 'Ustadz Faiz Ramadhan', 4.2, 5.0, 'Hafalan stabil'],
    ['s-8', '202607008', 'Salman Al-Farisi Pratama', 'L', 'Kelas 8A', 'Kamar Utsman bin Affan #01', 'Bpk. Dodi Pratama', '081789012345', 'wali.salman', 'Ustadz Ridwan Al-Bantani', 7.5, 8.0, 'Juz 1-7 tuntas mutqin'],
    ['s-9', '202607009', 'Maryam Shofiyyah', 'P', 'Kelas 7B', 'Kamar Sayyidah Aisyah #02', 'Bpk. Luqman Hakim', '081890123456', 'wali.maryam', 'Ustadz Faiz Ramadhan', 4.0, 5.0, 'Murojaah berkala lancar'],
    ['s-10', '202607010', 'Umar Abdurrahman', 'L', 'Kelas 8A', 'Kamar Ali bin Abi Thalib #02', 'Bpk. Wahid Rahman', '081234599887', 'wali.umar', 'Ustadz Ridwan Al-Bantani', 8.0, 8.0, 'Mumtaz - Siap wisuda juz 8'],
    ['s-11', '202607011', 'Nuha As-Syifa', 'P', 'Kelas 7B', 'Kamar Sayyidah Maryam #01', 'Ibu Dewi Sartika', '081321987654', 'wali.nuha', 'Ustadz Faiz Ramadhan', 3.8, 5.0, 'Kemajuan ziyadah konsisten'],
    ['s-12', '202607012', 'Khalid bin Walid Al-Ghazi', 'L', 'Kelas 7A', 'Kamar Bilal Bin Robah #04', 'Bpk. Ghazi Ramli', '081678901234', 'wali.khalid', 'Ustadz Ahmad Fauzi', 4.6, 5.0, 'Fokus & artikulatif']
  ], '#0284c7');

  // 2. Setup Sheet Ustadz
  setupSheet(ss, 'Ustadz', [
    'id', 'nip', 'nama', 'bidang', 'username', 'wa', 'avatar', 'pass'
  ], [
    ['u-1', '198804122015011002', 'Ustadz Ahmad Fauzi, S.Pd.I', 'Halaqoh Al-Quran & Ulumul Quran', 'ustadz.ahmad', '081211223344', '👨‍🏫', 'guru123'],
    ['u-2', '199108152018021003', 'Ustadz Faiz Ramadhan, Lc.', 'Tahfidz Murojaah & Bahasa Arab (Lughoh)', 'ustadz.faiz', '081322334455', '📖', 'guru123'],
    ['u-3', '198502202010011001', 'Ustadz Ridwan Al-Bantani, M.Pd.', 'Nahwu, Shorof & Tarbiyah Santri', 'ustadz.ridwan', '081533445566', '👳‍♂️', 'guru123'],
    ['u-4', '198209042008121004', 'Ustadz Hasan Basri, S.Th.I', 'Taklim Umum, Fiqih & Hadits', 'ustadz.hasan', '081744556677', '🎙️', 'guru123']
  ], '#059669');

  // 3. Setup Sheet Kelas
  setupSheet(ss, 'Kelas', [
    'id', 'nama', 'kategori', 'tingkat', 'pengampu', 'ruang', 'deskripsi'
  ], [
    ['k-7a', 'Kelas 7A', 'Kelas Reguler (Putra)', 'Kelas 7', 'Ustadz Ahmad Fauzi, S.Pd.I', 'Gedung Umar bin Khattab R. 101', 'Kelas 7 Reguler Ikhwan - Fokus Tahsin, Tajwid & Dasar Bahasa Arab'],
    ['k-7b', 'Kelas 7B', 'Kelas Reguler (Putri)', 'Kelas 7', 'Ustadz Faiz Ramadhan, Lc.', 'Gedung Khadijah R. 201', 'Kelas 7 Reguler Akhwat - Fokus Tahsin, Fiqih Nisa & Ziyadah Quran'],
    ['k-8a', 'Kelas 8A', 'Kelas Reguler (Putra)', 'Kelas 8', 'Ustadz Ridwan Al-Bantani, M.Pd.', 'Gedung Ali bin Abi Thalib R. 102', 'Kelas 8 Reguler Ikhwan - Nahwu, Shorof & Penguatan Murojaah 5 Juz'],
    ['k-tahfidz-1', 'Halaqoh Tahfidz Al-Fatih', 'Halaqoh Tahfidz', 'Menengah', 'Ustadz Ahmad Fauzi, S.Pd.I', 'Masjid Utama Bilal - Sayap Kanan', 'Halaqoh intensif Ziyadah & Mutasyabihat Al-Quran target 10 Juz'],
    ['k-lughoh-1', 'Halaqoh Lughoh Al-Arabiyyah', 'Halaqoh Bahasa', 'Lanjutan', 'Ustadz Faiz Ramadhan, Lc.', 'Gazebo Bahasa Bilal', 'Pengembangan muhadatsah yaumiyyah & qawaid lughawiyyah santri']
  ], '#7c3aed');

  // 4. Setup Sheet Slots (11 Master Slot Waktu Kegiatan)
  setupSheet(ss, 'Slots', [
    'id', 'time', 'startHour', 'startMin', 'endHour', 'endMin', 'name', 'desc', 'isBreak', 'icon'
  ], [
    ['slot-1', '05.20 - 06.00', 5, 20, 6, 0, 'Halaqoh Al Quran', 'Setoran hafalan baru (Ziyadah) & tahsin ba\'da Shubuh', false, '📖'],
    ['slot-2', '07.30 - 08.00', 7, 30, 8, 0, 'Apel Pagi', 'Pengarahan kedisiplinan, doa, dan cek kerapian santri', false, '☀️'],
    ['slot-3', '08.00 - 08.40', 8, 0, 8, 40, 'Pelajaran 1', 'Nahwu & Shorof / Bahasa Arab Dasar', false, '📚'],
    ['slot-4', '08.40 - 09.20', 8, 40, 9, 20, 'Pelajaran 2', 'Fiqih Ibadah / Kitab Safinatun Najah', false, '🕌'],
    ['slot-5', '09.20 - 10.00', 9, 20, 10, 0, 'Pelajaran 3', 'Aqidah Akhlaq & Adabul Alim Wal Muta\'allim', false, '🌱'],
    ['slot-6', '10.00 - 10.30', 10, 0, 10, 30, 'Istirahat', 'Snack pagi, Sholat Dhuha berjamaah & istirahat santri', true, '☕'],
    ['slot-7', '10.30 - 11.10', 10, 30, 11, 10, 'Pelajaran 4', 'Ulumul Quran / Tajwid Praktis', false, '📜'],
    ['slot-8', '11.10 - 11.50', 11, 10, 11, 50, 'Pelajaran 5', 'Bahasa Inggris / Matematika & Sains Terpadu', false, '🔬'],
    ['slot-9', '16.00 - 16.40', 16, 0, 16, 40, 'Halaqoh Tahfidz Murojaah atau Lughoh', 'Penguatan hafalan lama (Murojaah) atau Muhadatsah Lughoh', false, '🗣️'],
    ['slot-10', '18.30 - 19.10', 18, 30, 19, 10, 'Taklim Umum', 'Kajian Kitab Riyadhis Shalihin ba\'da Maghrib', false, '🎙️'],
    ['slot-11', '19.30 - 20.10', 19, 30, 20, 10, 'Halaqoh Al Quran', 'Pendalaman makhraj, mutasyabihat & persiapan setoran esok', false, '✨']
  ], '#d97706');

  // 5. Setup Sheet AbsensiLogs (Data Log Presensi)
  setupSheet(ss, 'AbsensiLogs', [
    'id', 'date', 'slotId', 'slotName', 'slotTime', 'santriId', 'santriName', 'santriKelas', 'status', 'keaktifan', 'catatan', 'ustadzName', 'timestamp'
  ], [
    ['log-demo-1', '2026-10-25', 'slot-1', 'Halaqoh Al Quran', '05.20 - 06.00', 's-1', 'Muhammad Rayhan Al-Fatih', 'Kelas 7A', 'Hadir', 5, 'Setoran hafalan lancar tanpa kesalahan', 'Ustadz Ahmad Fauzi, S.Pd.I', '2026-10-25 05:20'],
    ['log-demo-2', '2026-10-25', 'slot-1', 'Halaqoh Al Quran', '05.20 - 06.00', 's-3', 'Ahmad Ziyad Al-Farabi', 'Kelas 7A', 'Hadir', 4, 'Setoran lancar, fokus menyimak ustadz', 'Ustadz Ahmad Fauzi, S.Pd.I', '2026-10-25 05:20'],
    ['log-demo-3', '2026-10-25', 'slot-1', 'Halaqoh Al Quran', '05.20 - 06.00', 's-4', 'Muhammad Bilal Al-Habsyi', 'Kelas 7A', 'Hadir', 4, 'Murojaah tertib dan mutqin', 'Ustadz Ahmad Fauzi, S.Pd.I', '2026-10-25 05:20'],
    ['log-demo-4', '2026-10-25', 'slot-1', 'Halaqoh Al Quran', '05.20 - 06.00', 's-6', 'Ibrahim Rasyid', 'Kelas 7A', 'Sakit', 1, 'Izin di UKS istirahat karena demam ringan', 'Ustadz Ahmad Fauzi, S.Pd.I', '2026-10-25 05:20']
  ], '#0f172a');

  // Hapus sheet default "Sheet1" jika ada dan kosong
  const defaultSheet = ss.getSheetByName('Sheet1') || ss.getSheetByName('Sheet 1');
  if (defaultSheet && ss.getSheets().length > 1) {
    try {
      ss.deleteSheet(defaultSheet);
    } catch (e) {}
  }

  Logger.log('========================================================');
  Logger.log('✅ DATABASE SISPENSI SANTRI BERHASIL DIBUAT LENGKAP!');
  Logger.log('• Sheet Santri: Siap');
  Logger.log('• Sheet Ustadz: Siap');
  Logger.log('• Sheet Kelas: Siap');
  Logger.log('• Sheet Slots: Siap');
  Logger.log('• Sheet AbsensiLogs: Siap');
  Logger.log('Langkah berikutnya: Klik Deploy > New deployment > Web app');
  Logger.log('========================================================');
  SpreadsheetApp.flush();
}

/**
 * Helper: Membuat & Memformat Sheet Rapi (Super Cepat & Batch)
 */
function setupSheet(ss, sheetName, headers, initialRows, headerColor) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  } else {
    sheet.clear();
  }

  // 1. Tulis Header
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground(headerColor || '#0369a1');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment('center');
  headerRange.setVerticalAlignment('middle');
  sheet.setRowHeight(1, 32);
  sheet.setFrozenRows(1);

  // 2. Tulis Data Awal jika ada (1 kali pemanggilan batch cepat)
  if (initialRows && initialRows.length > 0) {
    const dataRange = sheet.getRange(2, 1, initialRows.length, headers.length);
    dataRange.setValues(initialRows);
    dataRange.setFontSize(9.5);
    dataRange.setVerticalAlignment('middle');
    sheet.setRowHeights(2, initialRows.length, 26);
  }

  // 3. Auto resize kolom agar teks terbaca jelas
  for (let c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
    const w = sheet.getColumnWidth(c);
    if (w < 90) sheet.setColumnWidth(c, 90);
    if (w > 280) sheet.setColumnWidth(c, 280);
  }
}

// ============================================================================
// 3. API ENDPOINT: GET (BACA DATA OLEH APLIKASI WEB)
// ============================================================================
function doGet(e) {
  try {
    const ss = getSpreadsheet();

    const data = {
      status: 'success',
      timestamp: new Date().toISOString(),
      santri: getSheetRecords(ss.getSheetByName('Santri')),
      ustadz: getSheetRecords(ss.getSheetByName('Ustadz')),
      kelasHalaqoh: getSheetRecords(ss.getSheetByName('Kelas')),
      slots: getSheetRecords(ss.getSheetByName('Slots')),
      logs: getSheetRecords(ss.getSheetByName('AbsensiLogs'))
    };

    return createJsonResponse(data);
  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: err.toString()
    });
  }
}

// ============================================================================
// 4. API ENDPOINT: POST (SIMPAN & PERBARUI DATA DARI WEB)
// ============================================================================
function doPost(e) {
  try {
    const ss = getSpreadsheet();
    let body = {};
    
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }

    const action = body.action || 'save_session';

    // AKSI 1: Simpan Sesi Absensi Ustadz (Menimpa sesi tanggal + slot + kelas yang sama, mempertahankan lainnya)
    if (action === 'save_session') {
      const dateVal = body.date;
      const slotId = body.slotId;
      const kelasVal = body.kelas;
      const newSessionLogs = body.logs || []; // Log baru untuk sesi ini

      const logsSheet = ss.getSheetByName('AbsensiLogs');
      const allLogs = getSheetRecords(logsSheet);

      // Filter log lama: buang log yang tanggal, slot, dan kelasnya sama
      const keptLogs = allLogs.filter(l => !(l.date === dateVal && l.slotId === slotId && l.santriKelas === kelasVal));
      const mergedLogs = keptLogs.concat(newSessionLogs);

      overwriteSheetRecords(logsSheet, mergedLogs, [
        'id', 'date', 'slotId', 'slotName', 'slotTime', 'santriId', 'santriName', 'santriKelas', 'status', 'keaktifan', 'catatan', 'ustadzName', 'timestamp'
      ]);

      return createJsonResponse({
        status: 'success',
        message: `Presensi tanggal ${dateVal} slot ${slotId} kelas ${kelasVal} berhasil disimpan (${newSessionLogs.length} santri).`
      });
    }

    // AKSI 2: Simpan Seluruh State Sekaligus (Sinkronisasi Penuh)
    if (action === 'sync_all') {
      if (body.santri) {
        overwriteSheetRecords(ss.getSheetByName('Santri'), body.santri, [
          'id', 'nis', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'tahfidzCurrent', 'tahfidzTarget', 'tahfidzNotes'
        ]);
      }
      if (body.ustadz) {
        overwriteSheetRecords(ss.getSheetByName('Ustadz'), body.ustadz, [
          'id', 'nip', 'nama', 'bidang', 'username', 'wa', 'avatar', 'pass'
        ]);
      }
      if (body.kelasHalaqoh) {
        overwriteSheetRecords(ss.getSheetByName('Kelas'), body.kelasHalaqoh, [
          'id', 'nama', 'kategori', 'tingkat', 'pengampu', 'ruang', 'deskripsi'
        ]);
      }
      if (body.slots) {
        overwriteSheetRecords(ss.getSheetByName('Slots'), body.slots, [
          'id', 'time', 'startHour', 'startMin', 'endHour', 'endMin', 'name', 'desc', 'isBreak', 'icon'
        ]);
      }
      if (body.logs) {
        overwriteSheetRecords(ss.getSheetByName('AbsensiLogs'), body.logs, [
          'id', 'date', 'slotId', 'slotName', 'slotTime', 'santriId', 'santriName', 'santriKelas', 'status', 'keaktifan', 'catatan', 'ustadzName', 'timestamp'
        ]);
      }

      return createJsonResponse({
        status: 'success',
        message: 'Seluruh database berhasil disinkronisasi ke Google Spreadsheet.'
      });
    }

    // AKSI 3: Simpan / Edit Santri Tunggal
    if (action === 'save_santri') {
      const santriSheet = ss.getSheetByName('Santri');
      const santriList = getSheetRecords(santriSheet);
      const targetSantri = body.santri;
      const idx = santriList.findIndex(s => s.id === targetSantri.id);
      if (idx >= 0) {
        santriList[idx] = targetSantri;
      } else {
        santriList.push(targetSantri);
      }
      overwriteSheetRecords(santriSheet, santriList, [
        'id', 'nis', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'tahfidzCurrent', 'tahfidzTarget', 'tahfidzNotes'
      ]);
      return createJsonResponse({ status: 'success', message: 'Data santri berhasil disimpan.' });
    }

    // AKSI 4: Hapus Santri
    if (action === 'delete_santri') {
      const santriSheet = ss.getSheetByName('Santri');
      const santriList = getSheetRecords(santriSheet).filter(s => s.id !== body.id);
      overwriteSheetRecords(santriSheet, santriList, [
        'id', 'nis', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'tahfidzCurrent', 'tahfidzTarget', 'tahfidzNotes'
      ]);
      return createJsonResponse({ status: 'success', message: 'Data santri berhasil dihapus.' });
    }

    return createJsonResponse({ status: 'error', message: 'Aksi tidak dikenali: ' + action });
  } catch (err) {
    return createJsonResponse({ status: 'error', message: err.toString() });
  }
}

// ============================================================================
// 5. HELPER DATABASE RECORD & JSON RESPONSE
// ============================================================================
function getSheetRecords(sheet) {
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  
  const headers = data[0];
  const records = [];

  for (let r = 1; r < data.length; r++) {
    const row = data[r];
    // Abaikan baris kosong
    if (row.every(cell => cell === '' || cell === null)) continue;
    
    const obj = {};
    headers.forEach((h, colIdx) => {
      let val = row[colIdx];
      // Format boolean string
      if (val === 'TRUE' || val === true) val = true;
      else if (val === 'FALSE' || val === false) val = false;
      obj[h] = val;
    });
    records.push(obj);
  }
  return records;
}

function overwriteSheetRecords(sheet, records, headers) {
  if (!sheet) return;
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn() || headers.length;

  // Bersihkan data lama di bawah header
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, lastCol).clearContent();
  }

  if (!records || records.length === 0) return;

  const rows = records.map(item => {
    return headers.map(h => {
      const v = item[h];
      return v !== undefined && v !== null ? v : '';
    });
  });

  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// 6. FUNGSI CEK STATUS & BANTUAN DI GOOGLE SPREADSHEET
// ============================================================================
function checkDatabaseStatus() {
  const ss = getSpreadsheet();
  const santriCount = getSheetRecords(ss.getSheetByName('Santri')).length;
  const ustadzCount = getSheetRecords(ss.getSheetByName('Ustadz')).length;
  const kelasCount = getSheetRecords(ss.getSheetByName('Kelas')).length;
  const slotsCount = getSheetRecords(ss.getSheetByName('Slots')).length;
  const logsCount = getSheetRecords(ss.getSheetByName('AbsensiLogs')).length;

  const msg = '📊 STATUS DATABASE SISPENSI:\n\n' +
    '• Santri Terdaftar: ' + santriCount + ' orang\n' +
    '• Ustadz / Pengajar: ' + ustadzCount + ' orang\n' +
    '• Kelas & Halaqoh: ' + kelasCount + ' rombel\n' +
    '• Slot Waktu Kegiatan: ' + slotsCount + ' sesi\n' +
    '• Riwayat Log Presensi: ' + logsCount + ' rekaman log\n\n' +
    'Database siap digunakan oleh aplikasi web!';

  SpreadsheetApp.getUi().alert('Status Database SisPensi', msg, SpreadsheetApp.getUi().ButtonSet.OK);
}

function showHelpDialog() {
  const html = HtmlService.createHtmlOutput(
    '<div style="font-family: Arial, sans-serif; padding: 12px; line-height: 1.5; color: #1e293b;">' +
      '<h3 style="color: #0284c7; margin-top: 0;">Cara Deploy Web App API</h3>' +
      '<ol style="padding-left: 20px;">' +
        '<li>Klik tombol biru <strong>Deploy</strong> (Penerapan) di kanan atas editor Apps Script.</li>' +
        '<li>Pilih <strong>New deployment</strong> (Penerapan baru).</li>' +
        '<li>Klik ikon gerigi ⚙️ di samping <em>Select type</em> &gt; pilih <strong>Web app</strong>.</li>' +
        '<li>Isi:' +
          '<ul>' +
            '<li><strong>Description</strong>: <code>API SisPensi Santri</code></li>' +
            '<li><strong>Execute as</strong>: <code>Me (Akun Saya)</code></li>' +
            '<li><strong>Who has access</strong>: <strong style="color: #dc2626;">Anyone (Siapa saja)</strong></li>' +
          '</ul>' +
        '</li>' +
        '<li>Klik <strong>Deploy</strong>, lalu berikan izin akun Google jika diminta.</li>' +
        '<li>Salin <strong>Web App URL</strong> yang dihasilkan ke aplikasi web.</li>' +
      '</ol>' +
    '</div>'
  ).setWidth(460).setHeight(320);

  SpreadsheetApp.getUi().showModalDialog(html, 'Petunjuk Penerapan Web App');
}

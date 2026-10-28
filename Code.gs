/**
 * ============================================================================
 * SISPENSI SANTRI - PONDOK PESANTREN BILAL BIN ROBAH
 * BACKEND DATABASE GOOGLE APPS SCRIPT (Code.gs) - VERSI 2.0 (ANTI-DUMMY & REALTIME SYNC)
 * ============================================================================
 * Spreadsheet ID: 1W97SdHXUTkTbUHadh7vIhZWsLMhV0NvmSQgZYDKieUE
 * Spreadsheet URL: https://docs.google.com/spreadsheets/d/1W97SdHXUTkTbUHadh7vIhZWsLMhV0NvmSQgZYDKieUE/edit
 * 
 * PETUNJUK PENERAPAN / DEPLOY:
 * 1. Buka spreadsheet Anda: https://docs.google.com/spreadsheets/d/1W97SdHXUTkTbUHadh7vIhZWsLMhV0NvmSQgZYDKieUE/edit
 * 2. Klik menu "Ekstensi" (Extensions) > "Apps Script"
 * 3. Hapus seluruh isi file Code.gs lama, lalu tempel SELURUH kode di bawah ini.
 * 4. Simpan (Ctrl+S / Command+S).
 * 5. Klik menu "Deploy" (Penerapan) di kanan atas > "New deployment" (Penerapan baru):
 *    - Type (Jenis): Web app
 *    - Description: SisPensi API v2
 *    - Execute as: Me (email Google Anda)
 *    - Who has access: Anyone (Siapa saja)  <-- PENTING agar web app bisa konek!
 * 6. Klik "Deploy", beri izin akses Google jika diminta.
 * 7. Salin URL Web App yang berakhiran "/exec", lalu masukkan ke aplikasi web SISPENSI SANTRI
 *    pada tombol "Spreadsheet" di pojok kanan atas.
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
    .addItem('📊 Cek Status & Jumlah Data', 'checkDatabaseStatus')
    .addItem('🧹 Bersihkan Data Dummy (Pertahankan Data Asli)', 'cleanDummyDataMenu')
    .addSeparator()
    .addItem('🛠️ Setup Sheet Bersih (Tanpa Data Dummy)', 'initCleanDatabase')
    .addItem('📦 Setup Sheet Lengkap (Dengan Contoh Data Awal)', 'setupDatabaseWithSample')
    .addSeparator()
    .addItem('ℹ️ Petunjuk Deploy Web App', 'showHelpDialog')
    .addToUi();
}

// ============================================================================
// 2. SETUP SHEET BERSIH (TIDAK AKAN MENIMPA DATA ASLI)
// ============================================================================

/**
 * Membuat sheet bersih jika belum ada, TANPA menghapus data ustadz/santri yang sudah ada.
 */
function initCleanDatabase() {
  const ss = getSpreadsheet();
  
  createSheetIfNotExist(ss, 'Santri', [
    'id', 'nis', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'tahfidzCurrent', 'tahfidzTarget', 'tahfidzNotes'
  ], '#0284c7');

  createSheetIfNotExist(ss, 'Ustadz', [
    'id', 'nip', 'nama', 'bidang', 'username', 'wa', 'avatar', 'pass'
  ], '#059669');

  createSheetIfNotExist(ss, 'Kelas', [
    'id', 'nama', 'kategori', 'tingkat', 'pengampu', 'ruang', 'deskripsi'
  ], '#7c3aed');

  createSheetIfNotExist(ss, 'Slots', [
    'id', 'time', 'startHour', 'startMin', 'endHour', 'endMin', 'name', 'desc', 'isBreak', 'icon'
  ], '#d97706');

  createSheetIfNotExist(ss, 'AbsensiLogs', [
    'id', 'date', 'slotId', 'slotName', 'slotTime', 'santriId', 'santriName', 'santriKelas', 'status', 'keaktifan', 'catatan', 'ustadzName', 'timestamp'
  ], '#0f172a');

  // Hapus sheet default "Sheet1" jika ada dan kosong
  const defaultSheet = ss.getSheetByName('Sheet1') || ss.getSheetByName('Sheet 1');
  if (defaultSheet && ss.getSheets().length > 1 && defaultSheet.getLastRow() <= 1) {
    try { ss.deleteSheet(defaultSheet); } catch (e) {}
  }

  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert(
    'Setup Selesai',
    'Sheet Santri, Ustadz, Kelas, Slots, dan AbsensiLogs siap digunakan! Data asli Anda aman.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Setup sheet dengan data contoh hanya jika diminta
 */
function setupDatabaseWithSample() {
  const ss = getSpreadsheet();
  const resp = SpreadsheetApp.getUi().alert(
    'Konfirmasi Contoh Data',
    'Apakah Anda yakin ingin mengisi data contoh/dummy awal ke dalam sheet? (Gunakan hanya untuk testing baru)',
    SpreadsheetApp.getUi().ButtonSet.YES_NO
  );
  if (resp !== SpreadsheetApp.getUi().Button.YES) return;

  setupDatabase();
}

function setupDatabase() {
  const ss = getSpreadsheet();
  
  // 1. Setup Sheet Santri
  setupSheetForce(ss, 'Santri', [
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
  setupSheetForce(ss, 'Ustadz', [
    'id', 'nip', 'nama', 'bidang', 'username', 'wa', 'avatar', 'pass'
  ], [
    ['u-1', '198804122015011002', 'Ustadz Ahmad Fauzi, S.Pd.I', 'Halaqoh Al-Quran & Ulumul Quran', 'ustadz.ahmad', '081211223344', '👨‍🏫', 'guru123'],
    ['u-2', '199108152018021003', 'Ustadz Faiz Ramadhan, Lc.', 'Tahfidz Murojaah & Bahasa Arab (Lughoh)', 'ustadz.faiz', '081322334455', '📖', 'guru123'],
    ['u-3', '198502202010011001', 'Ustadz Ridwan Al-Bantani, M.Pd.', 'Nahwu, Shorof & Tarbiyah Santri', 'ustadz.ridwan', '081533445566', '👳‍♂️', 'guru123'],
    ['u-4', '198209042008121004', 'Ustadz Hasan Basri, S.Th.I', 'Taklim Umum, Fiqih & Hadits', 'ustadz.hasan', '081744556677', '🎙️', 'guru123']
  ], '#059669');

  // 3. Setup Sheet Kelas
  setupSheetForce(ss, 'Kelas', [
    'id', 'nama', 'kategori', 'tingkat', 'pengampu', 'ruang', 'deskripsi'
  ], [
    ['k-7a', 'Kelas 7A', 'Kelas Reguler (Putra)', 'Kelas 7', 'Ustadz Ahmad Fauzi, S.Pd.I', 'Gedung Umar bin Khattab R. 101', 'Kelas 7 Reguler Ikhwan - Fokus Tahsin, Tajwid & Dasar Bahasa Arab'],
    ['k-7b', 'Kelas 7B', 'Kelas Reguler (Putri)', 'Kelas 7', 'Ustadz Faiz Ramadhan, Lc.', 'Gedung Khadijah R. 201', 'Kelas 7 Reguler Akhwat - Fokus Tahsin, Fiqih Nisa & Ziyadah Quran'],
    ['k-8a', 'Kelas 8A', 'Kelas Reguler (Putra)', 'Kelas 8', 'Ustadz Ridwan Al-Bantani, M.Pd.', 'Gedung Ali bin Abi Thalib R. 102', 'Kelas 8 Reguler Ikhwan - Nahwu, Shorof & Penguatan Murojaah 5 Juz'],
    ['k-tahfidz-1', 'Halaqoh Tahfidz Al-Fatih', 'Halaqoh Tahfidz', 'Menengah', 'Ustadz Ahmad Fauzi, S.Pd.I', 'Masjid Utama Bilal - Sayap Kanan', 'Halaqoh intensif Ziyadah & Mutasyabihat Al-Quran target 10 Juz'],
    ['k-lughoh-1', 'Halaqoh Lughoh Al-Arabiyyah', 'Halaqoh Bahasa', 'Lanjutan', 'Ustadz Faiz Ramadhan, Lc.', 'Gazebo Bahasa Bilal', 'Pengembangan muhadatsah yaumiyyah & qawaid lughawiyyah santri']
  ], '#7c3aed');

  // 4. Setup Sheet Slots (11 Master Slot Waktu Kegiatan)
  setupSheetForce(ss, 'Slots', [
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

  // 5. Setup Sheet AbsensiLogs
  setupSheetForce(ss, 'AbsensiLogs', [
    'id', 'date', 'slotId', 'slotName', 'slotTime', 'santriId', 'santriName', 'santriKelas', 'status', 'keaktifan', 'catatan', 'ustadzName', 'timestamp'
  ], [], '#0f172a');

  SpreadsheetApp.flush();
}

/**
 * Membuat sheet jika belum ada, mempertahankan isi jika sudah ada.
 */
function createSheetIfNotExist(ss, sheetName, headers, headerColor) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    formatHeaders(sheet, headers, headerColor);
  } else if (sheet.getLastRow() === 0) {
    formatHeaders(sheet, headers, headerColor);
  }
  return sheet;
}

function formatHeaders(sheet, headers, headerColor) {
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

  for (let c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
    const w = sheet.getColumnWidth(c);
    if (w < 90) sheet.setColumnWidth(c, 90);
    if (w > 280) sheet.setColumnWidth(c, 280);
  }
}

function setupSheetForce(ss, sheetName, headers, initialRows, headerColor) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  } else {
    sheet.clear();
  }
  formatHeaders(sheet, headers, headerColor);

  if (initialRows && initialRows.length > 0) {
    const dataRange = sheet.getRange(2, 1, initialRows.length, headers.length);
    dataRange.setValues(initialRows);
    dataRange.setFontSize(9.5);
    dataRange.setVerticalAlignment('middle');
    sheet.setRowHeights(2, initialRows.length, 26);
  }
}

// ============================================================================
// 3. PEMBERSIH DATA DUMMY (HANYA MENGHAPUS DATA BAWAAN CONTOH)
// ============================================================================
function cleanDummyDataMenu() {
  const count = purgeSampleDummyRecords();
  SpreadsheetApp.getUi().alert(
    'Pembersihan Selesai',
    `Berhasil menghapus ${count} baris data contoh bawaan.\nSeluruh data asli yang Anda buat (seperti ustadz/santri baru) tetap aman tersimpan!`,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function purgeSampleDummyRecords() {
  const ss = getSpreadsheet();
  let deletedTotal = 0;

  // 1. Bersihkan Ustadz dummy (u-1 s.d u-4)
  const ustadzSheet = ss.getSheetByName('Ustadz');
  if (ustadzSheet) {
    const uList = getSheetRecords(ustadzSheet);
    const dummyNames = ['Ustadz Ahmad Fauzi', 'Ustadz Faiz Ramadhan', 'Ustadz Ridwan Al-Bantani', 'Ustadz Hasan Basri'];
    const kept = uList.filter(u => {
      const isDummyId = ['u-1', 'u-2', 'u-3', 'u-4'].includes(String(u.id));
      const isDummyName = dummyNames.some(d => (u.nama || '').includes(d));
      return !(isDummyId && isDummyName);
    });
    deletedTotal += (uList.length - kept.length);
    overwriteSheetRecords(ustadzSheet, kept, [
      'id', 'nip', 'nama', 'bidang', 'username', 'wa', 'avatar', 'pass'
    ]);
  }

  // 2. Bersihkan Santri dummy (s-1 s.d s-12)
  const santriSheet = ss.getSheetByName('Santri');
  if (santriSheet) {
    const sList = getSheetRecords(santriSheet);
    const kept = sList.filter(s => {
      const num = parseInt(String(s.id).replace('s-', ''), 10);
      return isNaN(num) || num > 12;
    });
    deletedTotal += (sList.length - kept.length);
    overwriteSheetRecords(santriSheet, kept, [
      'id', 'nis', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'tahfidzCurrent', 'tahfidzTarget', 'tahfidzNotes'
    ]);
  }

  // 3. Bersihkan AbsensiLogs demo
  const logsSheet = ss.getSheetByName('AbsensiLogs');
  if (logsSheet) {
    const lList = getSheetRecords(logsSheet);
    const kept = lList.filter(l => !String(l.id).startsWith('log-demo-'));
    deletedTotal += (lList.length - kept.length);
    overwriteSheetRecords(logsSheet, kept, [
      'id', 'date', 'slotId', 'slotName', 'slotTime', 'santriId', 'santriName', 'santriKelas', 'status', 'keaktifan', 'catatan', 'ustadzName', 'timestamp'
    ]);
  }

  return deletedTotal;
}

// ============================================================================
// 4. API ENDPOINT: GET (BACA DATA OLEH APLIKASI WEB)
// ============================================================================
function doGet(e) {
  try {
    const ss = getSpreadsheet();
    const action = (e && e.parameter && e.parameter.action) || 'read_all';
    const callback = e && e.parameter && e.parameter.callback;

    // Ping check
    if (action === 'ping') {
      return createJsonResponse({
        status: 'success',
        message: 'Koneksi ke Google Apps Script berhasil!',
        timestamp: new Date().toISOString()
      }, callback);
    }

    // Read full database
    const data = {
      status: 'success',
      timestamp: new Date().toISOString(),
      santri: getSheetRecords(ss.getSheetByName('Santri')),
      ustadz: getSheetRecords(ss.getSheetByName('Ustadz')),
      kelasHalaqoh: getSheetRecords(ss.getSheetByName('Kelas')),
      slots: getSheetRecords(ss.getSheetByName('Slots')),
      logs: getSheetRecords(ss.getSheetByName('AbsensiLogs'))
    };

    return createJsonResponse(data, callback);
  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: err.toString()
    }, e && e.parameter && e.parameter.callback);
  }
}

// ============================================================================
// 5. API ENDPOINT: POST (SIMPAN & PERBARUI DATA DARI WEB)
// ============================================================================
function doPost(e) {
  try {
    const ss = getSpreadsheet();
    let body = {};
    
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      body = e.parameter;
    }

    const action = body.action || 'sync_all';

    // 1. Simpan Sesi Presensi Ustadz
    if (action === 'save_session') {
      const dateVal = body.date;
      const slotId = body.slotId;
      const kelasVal = body.kelas;
      const newSessionLogs = body.logs || [];

      const logsSheet = createSheetIfNotExist(ss, 'AbsensiLogs', [
        'id', 'date', 'slotId', 'slotName', 'slotTime', 'santriId', 'santriName', 'santriKelas', 'status', 'keaktifan', 'catatan', 'ustadzName', 'timestamp'
      ], '#0f172a');
      const allLogs = getSheetRecords(logsSheet);

      const keptLogs = allLogs.filter(l => !(l.date === dateVal && l.slotId === slotId && l.santriKelas === kelasVal));
      const mergedLogs = keptLogs.concat(newSessionLogs);

      overwriteSheetRecords(logsSheet, mergedLogs, [
        'id', 'date', 'slotId', 'slotName', 'slotTime', 'santriId', 'santriName', 'santriKelas', 'status', 'keaktifan', 'catatan', 'ustadzName', 'timestamp'
      ]);

      return createJsonResponse({
        status: 'success',
        message: `Presensi tanggal ${dateVal} slot ${slotId} kelas ${kelasVal} berhasil disimpan ke Spreadsheet.`
      });
    }

    // 2. Simpan / Edit Ustadz
    if (action === 'save_ustadz') {
      const sheet = createSheetIfNotExist(ss, 'Ustadz', [
        'id', 'nip', 'nama', 'bidang', 'username', 'wa', 'avatar', 'pass'
      ], '#059669');
      const list = getSheetRecords(sheet);
      const target = body.ustadz;
      const idx = list.findIndex(u => u.id === target.id || (target.nip && target.nip !== '-' && u.nip === target.nip));
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...target };
      } else {
        list.push(target);
      }
      overwriteSheetRecords(sheet, list, [
        'id', 'nip', 'nama', 'bidang', 'username', 'wa', 'avatar', 'pass'
      ]);
      return createJsonResponse({ status: 'success', message: `Data ustadz "${target.nama}" berhasil disimpan ke spreadsheet.` });
    }

    // 3. Hapus Ustadz
    if (action === 'delete_ustadz') {
      const sheet = createSheetIfNotExist(ss, 'Ustadz', [
        'id', 'nip', 'nama', 'bidang', 'username', 'wa', 'avatar', 'pass'
      ], '#059669');
      const list = getSheetRecords(sheet).filter(u => u.id !== body.id && u.nama !== body.nama);
      overwriteSheetRecords(sheet, list, [
        'id', 'nip', 'nama', 'bidang', 'username', 'wa', 'avatar', 'pass'
      ]);
      return createJsonResponse({ status: 'success', message: 'Data ustadz berhasil dihapus dari spreadsheet.' });
    }

    // 4. Simpan / Edit Santri
    if (action === 'save_santri') {
      const sheet = createSheetIfNotExist(ss, 'Santri', [
        'id', 'nis', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'tahfidzCurrent', 'tahfidzTarget', 'tahfidzNotes'
      ], '#0284c7');
      const list = getSheetRecords(sheet);
      const target = body.santri;
      const idx = list.findIndex(s => s.id === target.id || (target.nis && s.nis === target.nis));
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...target };
      } else {
        list.push(target);
      }
      overwriteSheetRecords(sheet, list, [
        'id', 'nis', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'tahfidzCurrent', 'tahfidzTarget', 'tahfidzNotes'
      ]);
      return createJsonResponse({ status: 'success', message: `Data santri "${target.nama}" berhasil disimpan ke spreadsheet.` });
    }

    // 5. Hapus Santri
    if (action === 'delete_santri') {
      const sheet = createSheetIfNotExist(ss, 'Santri', [
        'id', 'nis', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'tahfidzCurrent', 'tahfidzTarget', 'tahfidzNotes'
      ], '#0284c7');
      const list = getSheetRecords(sheet).filter(s => s.id !== body.id);
      overwriteSheetRecords(sheet, list, [
        'id', 'nis', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'tahfidzCurrent', 'tahfidzTarget', 'tahfidzNotes'
      ]);
      return createJsonResponse({ status: 'success', message: 'Data santri berhasil dihapus dari spreadsheet.' });
    }

    // 6. Simpan / Edit Kelas
    if (action === 'save_kelas') {
      const sheet = createSheetIfNotExist(ss, 'Kelas', [
        'id', 'nama', 'kategori', 'tingkat', 'pengampu', 'ruang', 'deskripsi'
      ], '#7c3aed');
      const list = getSheetRecords(sheet);
      const target = body.kelas;
      const idx = list.findIndex(k => k.id === target.id || k.nama === target.nama);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...target };
      } else {
        list.push(target);
      }
      overwriteSheetRecords(sheet, list, [
        'id', 'nama', 'kategori', 'tingkat', 'pengampu', 'ruang', 'deskripsi'
      ]);
      return createJsonResponse({ status: 'success', message: `Data kelas/halaqoh "${target.nama}" berhasil disimpan ke spreadsheet.` });
    }

    // 7. Hapus Kelas
    if (action === 'delete_kelas') {
      const sheet = createSheetIfNotExist(ss, 'Kelas', [
        'id', 'nama', 'kategori', 'tingkat', 'pengampu', 'ruang', 'deskripsi'
      ], '#7c3aed');
      const list = getSheetRecords(sheet).filter(k => k.id !== body.id && k.nama !== body.nama);
      overwriteSheetRecords(sheet, list, [
        'id', 'nama', 'kategori', 'tingkat', 'pengampu', 'ruang', 'deskripsi'
      ]);
      return createJsonResponse({ status: 'success', message: 'Data kelas/halaqoh berhasil dihapus dari spreadsheet.' });
    }

    // 8. Simpan / Edit Slot Waktu
    if (action === 'save_slot') {
      const sheet = createSheetIfNotExist(ss, 'Slots', [
        'id', 'time', 'startHour', 'startMin', 'endHour', 'endMin', 'name', 'desc', 'isBreak', 'icon'
      ], '#d97706');
      const list = getSheetRecords(sheet);
      const target = body.slot;
      const idx = list.findIndex(s => s.id === target.id);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...target };
      } else {
        list.push(target);
      }
      overwriteSheetRecords(sheet, list, [
        'id', 'time', 'startHour', 'startMin', 'endHour', 'endMin', 'name', 'desc', 'isBreak', 'icon'
      ]);
      return createJsonResponse({ status: 'success', message: `Slot "${target.name}" berhasil disimpan ke spreadsheet.` });
    }

    // 9. Hapus Slot Waktu
    if (action === 'delete_slot') {
      const sheet = createSheetIfNotExist(ss, 'Slots', [
        'id', 'time', 'startHour', 'startMin', 'endHour', 'endMin', 'name', 'desc', 'isBreak', 'icon'
      ], '#d97706');
      const list = getSheetRecords(sheet).filter(s => s.id !== body.id);
      overwriteSheetRecords(sheet, list, [
        'id', 'time', 'startHour', 'startMin', 'endHour', 'endMin', 'name', 'desc', 'isBreak', 'icon'
      ]);
      return createJsonResponse({ status: 'success', message: 'Slot berhasil dihapus dari spreadsheet.' });
    }

    // 10. Sinkronisasi Seluruh Slot Waktu
    if (action === 'sync_slots') {
      const sheet = createSheetIfNotExist(ss, 'Slots', [
        'id', 'time', 'startHour', 'startMin', 'endHour', 'endMin', 'name', 'desc', 'isBreak', 'icon'
      ], '#d97706');
      const slots = Array.isArray(body.slots) ? body.slots : [];
      overwriteSheetRecords(sheet, slots, [
        'id', 'time', 'startHour', 'startMin', 'endHour', 'endMin', 'name', 'desc', 'isBreak', 'icon'
      ]);
      return createJsonResponse({ status: 'success', message: 'Daftar slot berhasil disinkronkan ke spreadsheet.' });
    }

    // 11. Bersihkan Data Dummy
    if (action === 'clear_dummy') {
      const count = purgeSampleDummyRecords();
      return createJsonResponse({ status: 'success', message: `Berhasil membersihkan ${count} baris data dummy di Google Spreadsheet.` });
    }

    // 12. Sinkronisasi Penuh (Sync All State)
    if (action === 'sync_all') {
      if (Array.isArray(body.santri)) {
        overwriteSheetRecords(createSheetIfNotExist(ss, 'Santri', [
          'id', 'nis', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'tahfidzCurrent', 'tahfidzTarget', 'tahfidzNotes'
        ], '#0284c7'), body.santri, [
          'id', 'nis', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'tahfidzCurrent', 'tahfidzTarget', 'tahfidzNotes'
        ]);
      }
      if (Array.isArray(body.ustadz)) {
        overwriteSheetRecords(createSheetIfNotExist(ss, 'Ustadz', [
          'id', 'nip', 'nama', 'bidang', 'username', 'wa', 'avatar', 'pass'
        ], '#059669'), body.ustadz, [
          'id', 'nip', 'nama', 'bidang', 'username', 'wa', 'avatar', 'pass'
        ]);
      }
      if (Array.isArray(body.kelasHalaqoh)) {
        overwriteSheetRecords(createSheetIfNotExist(ss, 'Kelas', [
          'id', 'nama', 'kategori', 'tingkat', 'pengampu', 'ruang', 'deskripsi'
        ], '#7c3aed'), body.kelasHalaqoh, [
          'id', 'nama', 'kategori', 'tingkat', 'pengampu', 'ruang', 'deskripsi'
        ]);
      }
      if (Array.isArray(body.slots)) {
        overwriteSheetRecords(createSheetIfNotExist(ss, 'Slots', [
          'id', 'time', 'startHour', 'startMin', 'endHour', 'endMin', 'name', 'desc', 'isBreak', 'icon'
        ], '#d97706'), body.slots, [
          'id', 'time', 'startHour', 'startMin', 'endHour', 'endMin', 'name', 'desc', 'isBreak', 'icon'
        ]);
      }
      if (Array.isArray(body.logs)) {
        overwriteSheetRecords(createSheetIfNotExist(ss, 'AbsensiLogs', [
          'id', 'date', 'slotId', 'slotName', 'slotTime', 'santriId', 'santriName', 'santriKelas', 'status', 'keaktifan', 'catatan', 'ustadzName', 'timestamp'
        ], '#0f172a'), body.logs, [
          'id', 'date', 'slotId', 'slotName', 'slotTime', 'santriId', 'santriName', 'santriKelas', 'status', 'keaktifan', 'catatan', 'ustadzName', 'timestamp'
        ]);
      }

      return createJsonResponse({
        status: 'success',
        message: 'Seluruh database berhasil disinkronisasi ke Google Spreadsheet.'
      });
    }

    return createJsonResponse({ status: 'error', message: 'Aksi tidak dikenali: ' + action });
  } catch (err) {
    return createJsonResponse({ status: 'error', message: err.toString() });
  }
}

// ============================================================================
// 6. HELPER DATABASE RECORD & JSON RESPONSE
// ============================================================================
function getSheetRecords(sheet) {
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  
  const headers = data[0];
  const records = [];

  for (let r = 1; r < data.length; r++) {
    const row = data[r];
    if (row.every(cell => cell === '' || cell === null)) continue;
    
    const obj = {};
    headers.forEach((h, colIdx) => {
      let val = row[colIdx];
      if (val === 'TRUE' || val === true) {
        val = true;
      } else if (val === 'FALSE' || val === false) {
        val = false;
      } else if (val !== null && val !== undefined) {
        // Coerce text/code fields to string so they don't return as numbers (e.g. nip, nis, wa)
        if (['id', 'nis', 'nip', 'nama', 'gender', 'kelas', 'asrama', 'wali', 'wa', 'waliUser', 'musyrif', 'bidang', 'username', 'avatar', 'pass', 'kategori', 'tingkat', 'pengampu', 'ruang', 'deskripsi', 'slotId', 'slotName', 'slotTime', 'santriId', 'santriName', 'santriKelas', 'status', 'catatan', 'ustadzName', 'date'].includes(h)) {
          val = String(val);
        }
      }
      obj[h] = val;
    });
    records.push(obj);
  }
  return records;
}

function overwriteSheetRecords(sheet, records, headers) {
  if (!sheet) return;
  const lastRow = sheet.getLastRow();
  const lastCol = Math.max(sheet.getLastColumn(), headers.length);

  // Bersihkan baris di bawah header
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

function createJsonResponse(data, callback) {
  const jsonString = JSON.stringify(data);
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + jsonString + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(jsonString)
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// 7. FUNGSI CEK STATUS & BANTUAN DI GOOGLE SPREADSHEET
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
    'Database siap terhubung dengan aplikasi web!';

  SpreadsheetApp.getUi().alert('Status Database SisPensi', msg, SpreadsheetApp.getUi().ButtonSet.OK);
}

function showHelpDialog() {
  const html = HtmlService.createHtmlOutput(
    '<div style="font-family: Arial, sans-serif; padding: 12px; line-height: 1.5; color: #1e293b;">' +
      '<h3 style="color: #0284c7; margin-top: 0;">Cara Deploy Web App API</h3>' +
      '<ol style="padding-left: 20px;">' +
        '<li>Klik tombol biru <strong>Deploy</strong> (Penerapan) di kanan atas editor Apps Script.</li>' +
        '<li>Pilih <strong>Manage deployments</strong> (Kelola penerapan) jika sudah pernah deploy, lalu klik ikon pensil Edit > Version: New Version > Deploy.<br>Atau <strong>New deployment</strong> (Penerapan baru).</li>' +
        '<li>Pilih jenis <strong>Web app</strong>.</li>' +
        '<li>Pengaturan:' +
          '<ul>' +
            '<li><strong>Execute as</strong>: <code>Me (Akun Saya)</code></li>' +
            '<li><strong>Who has access</strong>: <strong style="color: #dc2626;">Anyone (Siapa saja)</strong></li>' +
          '</ul>' +
        '</li>' +
        '<li>Klik <strong>Deploy</strong>, lalu berikan izin akun Google.</li>' +
        '<li>Salin <strong>Web App URL</strong> yang dihasilkan dan masukkan ke tombol <strong>Spreadsheet</strong> di aplikasi web.</li>' +
      '</ol>' +
    '</div>'
  ).setWidth(480).setHeight(360);

  SpreadsheetApp.getUi().showModalDialog(html, 'Petunjuk Penerapan Web App');
}

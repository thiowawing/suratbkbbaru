# 📦 Sistem Bukti Keluar Barang (BKB) Web App

Aplikasi web sederhana untuk manajemen, pencetakan, dan pencatatan **Surat Bukti Keluar Barang (BKB)** secara otomatis. Dirancang ringan tanpa butuh backend (*Client-side Only*), sehingga dapat langsung di-deploy melalui **GitHub Pages**.

---

## ✨ Fitur Utama

- **Pembuatan & Editi BKB:** Menambahkan dokumen BKB baru atau memperbarui data lama.
- **Sistem Tabel Dinamis:** Menambah dan menghapus baris barang (lengkap dengan *Kode Barang*, *Serial Number (SN)*, *Nama Barang*, *Qty*, *Satuan*, dan *Keterangan*).
- **Struktur Tanda Tangan Lengkap:** Menyediakan 4 kolom tanda tangan resmi pada cetakan BKB:
  1. **Penerima Barang**
  2. **Staff Logistik** (Pengirim)
  3. **Supervisor (SPV)** (Pemeriksa)
  4. **Manager Logistik** (Penyetuju)
- **Cetak / Export PDF:** Format cetak responsif yang langsung disesuaikan untuk printer/PDF bawaan browser (CSS Media Print).
- **Penyimpanan Lokal (LocalStorage):** Data yang diinput tersimpan secara otomatis di browser pengguna tanpa risiko hilang saat *refresh*.
- **Pencarian Data (Live Search):** Filter cepat berdasarkan No. BKB, Penerima, Departemen, SPV, maupun Nama/SN Barang.
- **Export Data JSON:** Mendukung pencadangan (*backup*) data dalam format `.json`.

---

## 📁 Struktur Berkas Proyek

```text
.
├── index.html     # Tampilan antarmuka utama (UI & Modal Form)
├── style.css      # Styling tampilan web & CSS layout cetak (Print)
├── app.js         # Logika CRUD, pencarian, dan cetak dokumen
├── data.json      # Sampel data awal BKB
└── README.md      # Dokumentasi proyek
// Data Default Awal
const defaultDataBKB = [
    {
        no_surat: "001/BKB/TRX/VII/2026",
        tanggal: "2026-07-21",
        nama_penerima: "Budi Santoso",
        departemen: "Maintenance & Operasional",
        alamat_penerima: "Site Project Cikarang, Jl. Industri Selatan No. 12, Kab. Bekasi",
        items: [
            {
                kode: "BRG-001",
                sn: "SN-9823112",
                nama: "Filter Hydraulic Unit",
                qty: 2,
                satuan: "Pcs",
                ket: "Kirim Rutin"
            },
            {
                kode: "BRG-002",
                sn: "SN-1029384",
                nama: "O-Ring Seal Heavy Duty",
                qty: 5,
                satuan: "Set",
                ket: "Cadangan"
            }
        ]
    }
];

// Load LocalStorage
let dataBKB = JSON.parse(localStorage.getItem('dataBKB')) || defaultDataBKB;

document.addEventListener('DOMContentLoaded', () => {
    tampilkanData();
});

// Render Data Utama (Tepat 6 Kolom)
function tampilkanData(dataTampil = dataBKB) {
    const tbody = document.getElementById('tabelBKB');
    tbody.innerHTML = '';

    if (dataTampil.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #888;">Tidak ada data ditemukan.</td></tr>`;
        return;
    }

    dataTampil.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="text-align: center;">${index + 1}</td>
            <td><strong>${item.no_surat}</strong></td>
            <td>${formatDateToID(item.tanggal)}</td>
            <td>${item.nama_penerima}</td>
            <td>${item.departemen}</td>
            <td style="text-align: center;">
                <button class="btn btn-secondary" style="padding: 4px 7px;" onclick="cetakBKB(${index})" title="Cetak / PDF">
                    <i class="fa-solid fa-print"></i>
                </button>
                <button class="btn btn-secondary" style="padding: 4px 7px; background-color: #f39c12; color: #fff;" onclick="editBKB(${index})" title="Edit">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn btn-secondary" style="padding: 4px 7px; background-color: #e74c3c; color: #fff;" onclick="hapusBKB(${index})" title="Hapus">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Modal Functions
function bukaModalTambah() {
    document.getElementById('modalTitle').innerHTML = '<i class="fa-solid fa-file-circle-plus"></i> Form Buat Bukti Keluar Barang';
    document.getElementById('formBKB').reset();
    document.getElementById('editIndex').value = '-1';

    document.getElementById('no_surat').value = "001/BKB/TRX/VII/2026";
    document.getElementById('tanggal').valueAsDate = new Date();

    document.getElementById('containerBarang').innerHTML = '';
    tambahBarisBarang();

    document.getElementById('modalBKB').style.display = 'block';
}

function tutupModal() {
    document.getElementById('modalBKB').style.display = 'none';
}

function tambahBarisBarang(data = {}) {
    const container = document.getElementById('containerBarang');
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td><input type="text" class="item-kode" value="${data.kode || ''}" placeholder="Kode" required></td>
        <td><input type="text" class="item-sn" value="${data.sn || ''}" placeholder="Serial Number (SN)" required></td>
        <td><input type="text" class="item-nama" value="${data.nama || ''}" placeholder="Nama Barang" required></td>
        <td><input type="number" class="item-qty" value="${data.qty || 1}" min="1" required style="width:100%;"></td>
        <td><input type="text" class="item-satuan" value="${data.satuan || 'Pcs'}" placeholder="Satuan" required></td>
        <td><input type="text" class="item-ket" value="${data.ket || ''}" placeholder="Ket"></td>
        <td style="text-align: center;">
            <button type="button" class="btn" style="background: #e74c3c; color: #fff; padding: 4px 8px;" onclick="hapusBarisBarang(this)">
                <i class="fa-solid fa-times"></i>
            </button>
        </td>
    `;
    container.appendChild(tr);
}

function hapusBarisBarang(btn) {
    const container = document.getElementById('containerBarang');
    if (container.children.length > 1) {
        btn.closest('tr').remove();
    } else {
        tampilkanAlert("Minimal harus ada 1 barang!", "warning");
    }
}

// Simpan Data BKB
function simpanBKB(e) {
    e.preventDefault();

    const editIndex = parseInt(document.getElementById('editIndex').value);
    const itemRows = document.querySelectorAll('#containerBarang tr');
    const listBarang = [];

    itemRows.forEach(row => {
        listBarang.push({
            kode: row.querySelector('.item-kode').value.trim(),
            sn: row.querySelector('.item-sn').value.trim(),
            nama: row.querySelector('.item-nama').value.trim(),
            qty: parseInt(row.querySelector('.item-qty').value) || 1,
            satuan: row.querySelector('.item-satuan').value.trim(),
            ket: row.querySelector('.item-ket').value.trim()
        });
    });

    const payload = {
        no_surat: document.getElementById('no_surat').value.trim(),
        tanggal: document.getElementById('tanggal').value,
        nama_penerima: document.getElementById('nama_penerima').value.trim(),
        departemen: document.getElementById('departemen').value.trim(),
        alamat_penerima: document.getElementById('alamat_penerima').value.trim(),
        items: listBarang
    };

    if (editIndex === -1) {
        dataBKB.unshift(payload);
        tampilkanAlert("Bukti Keluar Barang berhasil dibuat!", "success");
    } else {
        dataBKB[editIndex] = payload;
        tampilkanAlert("Bukti Keluar Barang berhasil diperbarui!", "success");
    }

    simpanKeLocalStorage();
    tampilkanData();
    tutupModal();
}

// Edit Data BKB
function editBKB(index) {
    const data = dataBKB[index];

    document.getElementById('modalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Edit Bukti Keluar Barang';
    document.getElementById('editIndex').value = index;

    document.getElementById('no_surat').value = data.no_surat;
    document.getElementById('tanggal').value = data.tanggal;
    document.getElementById('nama_penerima').value = data.nama_penerima;
    document.getElementById('departemen').value = data.departemen;
    document.getElementById('alamat_penerima').value = data.alamat_penerima || '';

    const container = document.getElementById('containerBarang');
    container.innerHTML = '';

    if (data.items && data.items.length > 0) {
        data.items.forEach(item => tambahBarisBarang(item));
    } else {
        tambahBarisBarang();
    }

    document.getElementById('modalBKB').style.display = 'block';
}

function hapusBKB(index) {
    if (confirm(`Apakah Anda yakin ingin menghapus data BKB: ${dataBKB[index].no_surat}?`)) {
        dataBKB.splice(index, 1);
        simpanKeLocalStorage();
        tampilkanData();
        tampilkanAlert("Data BKB berhasil dihapus.", "success");
    }
}

// Cetak BKB (Print / PDF)
function cetakBKB(index) {
    const data = dataBKB[index];

    document.getElementById('printNoSurat').innerText = data.no_surat;
    document.getElementById('printTanggal').innerText = `Tanggal Kirim: ${formatDateToID(data.tanggal)}`;
    document.getElementById('printPenerima').innerText = data.nama_penerima;
    document.getElementById('printDepartemen').innerText = data.departemen;
    document.getElementById('printAlamat').innerText = data.alamat_penerima || '-';

    document.getElementById('printSignPenerima').innerText = data.nama_penerima;

    const containerItemCetak = document.getElementById('printContainerBarang');
    containerItemCetak.innerHTML = '';

    data.items.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="text-align: center;">${idx + 1}</td>
            <td>${item.kode || '-'}</td>
            <td><strong>${item.sn || '-'}</strong></td>
            <td>${item.nama}</td>
            <td style="text-align: center;">${item.qty}</td>
            <td style="text-align: center;">${item.satuan}</td>
            <td>${item.ket || '-'}</td>
        `;
        containerItemCetak.appendChild(tr);
    });

    window.print();
}

function cariData() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const filtered = dataBKB.filter(item => {
        const matchMain = (
            item.no_surat.toLowerCase().includes(keyword) ||
            item.nama_penerima.toLowerCase().includes(keyword) ||
            item.departemen.toLowerCase().includes(keyword)
        );
        const matchItems = item.items.some(i => 
            i.nama.toLowerCase().includes(keyword) || 
            i.sn.toLowerCase().includes(keyword) ||
            i.kode.toLowerCase().includes(keyword)
        );
        return matchMain || matchItems;
    });
    tampilkanData(filtered);
}

function exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataBKB, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Data_BKB_PT_Terex_${new Date().toISOString().slice(0,10)}.json`);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function resetKeDefault() {
    if (confirm("Reset data akan mengembalikan data sampel bawaan. Lanjutkan?")) {
        dataBKB = [...defaultDataBKB];
        simpanKeLocalStorage();
        tampilkanData();
        tampilkanAlert("Data direset ke awal.", "success");
    }
}

function formatDateToID(dateString) {
    if (!dateString) return '-';
    const parts = dateString.split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dateString;
}

function simpanKeLocalStorage() {
    localStorage.setItem('dataBKB', JSON.stringify(dataBKB));
}

function tampilkanAlert(pesan, jenis = "success") {
    const alertBox = document.getElementById('alertBox');
    const alertIcon = document.getElementById('alertIcon');
    const alertText = document.getElementById('alertText');

    alertText.innerText = pesan;
    alertBox.style.backgroundColor = jenis === "success" ? "#2ecc71" : "#e67e22";
    alertIcon.className = jenis === "success" ? "fa-solid fa-circle-check" : "fa-solid fa-triangle-exclamation";
    alertBox.style.display = 'block';

    setTimeout(() => { alertBox.style.display = 'none'; }, 3000);
}
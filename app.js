// Render Data Utama
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
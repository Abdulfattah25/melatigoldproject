// Fungsi untuk menambah baris baru
export function tambahBaris(tbody) {
    const nomorUrut = tbody.children.length + 1;
    const tr = document.createElement("tr");
  
    tr.innerHTML = `
      <td style="width: 5%"><input type="text" class="form-control border-0" value="${nomorUrut}" readonly></td>
      <td style="width: 20%"><input type="text" class="form-control" placeholder="Nama Barang"></td>
      <td style="width: 10%"><input type="text" class="form-control" placeholder="Jumlah"></td>
      <td style="width: 10%"><input type="text" class="form-control" placeholder="Kadar"></td>
      <td style="width: 10%"><input type="text" class="form-control" placeholder="Berat"></td>
      <td style="width: 15%"><input type="text" class="form-control" placeholder="Ongkos"></td>
      <td style="width: 25%"><input type="text" class="form-control" placeholder="Keterangan"></td>
      <td style="width: 5%">
          <button class="btn btn-danger btn-sm btnHapus">
              <i class="bi bi-x"></i>
          </button>
      </td>
    `;
  
    tbody.appendChild(tr);
  
    // Event listener untuk tombol hapus
    tr.querySelector(".btnHapus").addEventListener("click", function () {
      tr.remove();
      updateNomorUrut(tbody);
    });
  }
  
  // Fungsi untuk update nomor urut
  export function updateNomorUrut(tbody) {
    const rows = tbody.querySelectorAll("tr");
    rows.forEach((row, index) => {
      row.querySelector("input:first-child").value = index + 1;
    });
  }
      
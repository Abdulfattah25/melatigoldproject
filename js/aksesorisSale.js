// Box sale functionality
export function initializeBoxSale() {
    const btnTambah = document.getElementById("btnTambah");
    if (!btnTambah) return;

    btnTambah.addEventListener("click", function () {
        const tbody = document.querySelector("#tableKotak tbody");
        if (!tbody) return;

        const newRow = createBoxRow();
        tbody.appendChild(newRow);
    });
}

function createBoxRow() {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="text" class="form-control" placeholder="ID"></td>
                  <td><input type="text" class="form-control" placeholder="Nama Barang"></td>
                  <td><input type="number" class="form-control" placeholder="Jumlah"></td>
                  <td><input type="number" class="form-control" placeholder="Berat"></td>
                  <td><input type="number" class="form-control" placeholder="Harga Per Gram"></td>
                  <td><input type="number" class="form-control" placeholder="Total Harga"></td>
                  <td>
                    <button class="btn btn-danger btn-sm btnHapus">
                        <i class="bi bi-x"></i>
                    </button>
    `;
    return newRow;
}

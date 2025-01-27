// Form handling module
const penerimaanHandler = {
  initializeForm() {
    document.getElementById("penerimaanForm").addEventListener("submit", this.handleSubmit);
    document.getElementById("btnTambahPenerimaan").addEventListener("click", this.handleTambahPenerimaan);
    document.querySelector("#tablePenerimaan tbody").addEventListener("click", this.handleDeleteRow);
    this.updateTanggal();
  },

  handleSubmit(e) {
    e.preventDefault();
    const rows = document.querySelectorAll("#tablePenerimaan tbody tr");
    let resultsHTML = "";

    rows.forEach((row, index) => {
      const kadar = row.querySelector('select[name="kadar"]').value;
      const asalToko = row.querySelector('select[name="asalToko"]').value;
      const kondisiBarang = row.querySelector('select[name="kondisiBarang"]').value;
      const hargaBeli = parseFloat(row.querySelector('input[name="hargaBeli"]').value);
      const hargaHariIni = parseFloat(row.querySelector('input[name="hargaHariIni"]').value);

      const { persentasePenerimaan, hargaPenerimaan } = penerimaanHandler.calculatePenerimaan(
        asalToko,
        kondisiBarang,
        hargaBeli,
        hargaHariIni
      );

      resultsHTML += penerimaanHandler.generateResultHTML(
        index,
        rows.length,
        kadar,
        row,
        persentasePenerimaan,
        hargaPenerimaan
      );
    });

    penerimaanHandler.displayResults(resultsHTML);
  },

  calculatePenerimaan(asalToko, kondisiBarang, hargaBeli, hargaHariIni) {
    const persentaseBeli = (hargaBeli / hargaHariIni) * 100;
    let persentasePenerimaan;
    let hargaPenerimaan;

    if (asalToko === "Toko Melati") {
      persentasePenerimaan = this.calculateMelatiPersentase(kondisiBarang, persentaseBeli);
      hargaPenerimaan = (hargaHariIni * persentasePenerimaan) / 100;
      hargaPenerimaan = Math.max(hargaBeli, hargaPenerimaan);
    } else {
      persentasePenerimaan = this.calculateLuarTokoPersentase(kondisiBarang);
      hargaPenerimaan = (hargaHariIni * persentasePenerimaan) / 100;
    }

    return { persentasePenerimaan, hargaPenerimaan };
  },

  calculateMelatiPersentase(kondisiBarang, persentaseBeli) {
    if (persentaseBeli >= 90) {
      return this.getHighPersentase(kondisiBarang);
    }
    return this.getLowPersentase(kondisiBarang);
  },

  getHighPersentase(kondisiBarang) {
    const persentaseMap = {
      1: 99,
      2: 97,
      3: 95,
      4: 93,
      5: 90,
      6: 90,
      7: 90,
      8: 90,
    };
    return persentaseMap[kondisiBarang] || 90;
  },

  getLowPersentase(kondisiBarang) {
    const persentaseMap = {
      1: 95,
      2: 90,
      3: 88,
      4: 86,
      5: 84,
      6: 75,
      7: 72,
      8: 70,
    };
    return persentaseMap[kondisiBarang] || 70;
  },

  calculateLuarTokoPersentase(kondisiBarang) {
    const persentaseMap = {
      1: 72,
      2: 70,
      3: 65,
      4: 60,
      5: 60,
      6: 60,
      7: 60,
      8: 60,
    };
    return persentaseMap[kondisiBarang] || 60;
  },

  handleTambahPenerimaan() {
    const tbody = document.querySelector("#tablePenerimaan tbody");
    const rowCount = tbody.getElementsByTagName("tr").length + 1;
    const newRow = document.createElement("tr");
    newRow.innerHTML = penerimaanHandler.getNewRowTemplate(rowCount);
    tbody.appendChild(newRow);
  },

  handleDeleteRow(e) {
    if (e.target.classList.contains("hapus-baris")) {
      e.target.closest("tr").remove();
      penerimaanHandler.updateRowNumbers();
    }
  },

  updateRowNumbers() {
    const rows = document.querySelectorAll("#tablePenerimaan tbody tr");
    rows.forEach((row, index) => {
      row.cells[0].textContent = index + 1;
    });
  },
  // Templates and other helper methods would go here
  getNewRowTemplate(rowCount) {
    return `<td>${rowCount}</td>
        <td>
            <select name="kadar" class="form-select form-select-sm" required>
                <option value="" disabled selected>Pilih</option>
                <option value="8K">8K</option>
                <option value="9K">9K</option>
                <option value="16K">16K</option>
                <option value="17K">17K</option>
                <option value="18K">18K</option>
                <option value="22K">22K</option>
            </select>
        </td>
        <td>
            <select name="asalToko" class="form-select form-select-sm" required>
                <option value="" disabled selected>Pilih Asal Toko</option>
                <option value="Toko Melati">Toko Melati</option>
                <option value="Luar Toko">Luar Toko</option>
            </select>
        </td>
        <td>
            <select id="kondisiBarang" name="kondisiBarang" class="form-select form-select-sm" required>
                <option value="" disabled selected>Pilih Kondisi Barang</option>
                <option value="1">1. Mengkilap, Mulus, Banyak Peminat</option>
                <option value="2">2. Mengkilap, Sedikit Baret, Banyak Peminat</option>
                <option value="3">3. Sedikit Kusam, Sedikit Baret, Banyak Peminat</option>
                <option value="4">4. Sedikit Kusam,Banyak Baret, Banyak Peminat</option>
                <option value="5">5. Kusam, Sedikit Baret, Banyak Peminat</option>
                <option value="6">6. Kusam, Banyak Baret, Banyak Peminat</option>
                <option value="7">7. Sedikit Kusam, Sedikit Baret, Sedikit Peminat</option>
                <option value="8">8. Kusam, Banyak Baret, Sedikit Peminat</option>
            </select>
        </td>
        <td>
            <input
                type="number"
                name="hargaBeli"
                class="form-control form-control-sm"
                placeholder="Harga beli"
                required
                min="0"
            />
        </td>
        <td>
            <input
                type="number"
                name="hargaHariIni"
                class="form-control form-control-sm"
                placeholder="Harga hari ini"
                required
                min="0"
            />
        </td>
        <td>
            <button type="button" class="btn btn-danger btn-sm hapus-baris">Hapus</button>
        </td>`;
  },

  generateResultHTML(index, totalRows, kadar, row, persentasePenerimaan, hargaPenerimaan) {
    // Format harga penerimaan
    const formattedHargaPenerimaan = formatCurrency(hargaPenerimaan);

    return `
        <div class="result-item ${index !== totalRows - 1 ? 'border-bottom mb-3 pb-3' : ''}">
            <h6 class="fw-bold">${index + 1}</h6>
            <div class="row">
                <div class="col-12">
                    <p class="mb-2"><strong>Kadar:</strong> ${kadar}</p>
                    <p class="mb-2"><strong>Kondisi:</strong> ${row.querySelector('select[name="kondisiBarang"]').options[row.querySelector('select[name="kondisiBarang"]').selectedIndex].text}</p>
                    <p class="mb-2"><strong>Persentase Penerimaan:</strong> ${persentasePenerimaan}%</p>
                    <p class="mb-0"><strong>Harga Penerimaan Per Gram:</strong> Rp ${formattedHargaPenerimaan}</p>
                </div>
            </div>
        </div>
    `;
},

displayResults(resultsHTML) {
    const resultsContainer = document.getElementById("results");
    if (resultsContainer) {
        resultsContainer.innerHTML = resultsHTML;
    }

    const modalMessage = document.getElementById("modalMessage");
    modalMessage.innerHTML = resultsHTML;

    const resultModal = new bootstrap.Modal(document.getElementById("resultModal"));
    resultModal.show();
}
};

export function formatNumber(input) {
let value = input.value.replace(/\D/g, "");
input.value = formatCurrency(value);
}

export function getNumericValue(formattedValue) {
return formattedValue.replace(/\./g, "");
}

function formatCurrency(value) {
return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true
}).format(value);
}
export { penerimaanHandler };

// Data constants
export const OPSI_KOTAK = [
    { value: "0", text: "Pilih Kategori Kotak" },
    { value: "1", text: "K30", nama: "Kotak 30" },
    { value: "2", text: "K40", nama: "Kotak 40" },
    { value: "3", text: "KC50", nama: "Kotak 50 Cincin" },
    { value: "4", text: "KK50", nama: "Kotak 50 Kalung" },
    { value: "5", text: "K60", nama: "Kotak 60" },
    { value: "6", text: "KG70", nama: "Kotak 70 Gelang" },
    { value: "7", text: "KGB70", nama: "Kotak 70 Giftbox" },
    { value: "8", text: "K80", nama: "Kotak 80" },
    { value: "9", text: "K150", nama: "Kotak 150" },
    { value: "10", text: "K200", nama: "Kotak 200" }
];

export const OPSI_AKSESORIS = [
    { value: "0", text: "Pilih Kategori Aksesoris" },
    { value: "1", text: "LS", nama: "Lock S" },
    { value: "2", text: "LB", nama: "Lock Bulat" },
    { value: "3", text: "LL", nama: "Lock Lobster" },
    { value: "4", text: "LLM", nama: "Lock Lobster Medium" },
    { value: "5", text: "BT", nama: "Butterfly Giwang" },
    { value: "6", text: "SL", nama: "Silikon Cincin" },
    { value: "7", text: "LAP", nama: "Lap Perhiasan" },
    { value: "8", text: "CR", nama: "Gift Card" },
    { value: "9", text: "TG", nama: "Tali Gelang" }
];

// Utility functions
export const aksesorisSaleHandler = {
    formatRupiah(angka) {
        const number = typeof angka === 'string' ? parseInt(angka) : angka;
        return new Intl.NumberFormat('id-ID').format(number);
    },

    unformatRupiah(rupiah) {
        return rupiah ? parseInt(rupiah.replace(/[^\d]/g, '')) : 0;
    },

    init() {
        const selectKategori = document.querySelector(".form-select");
        const btnTambahAksesoris = document.getElementById("btnTambahAksesoris");
        const tbody = document.querySelector("#tableTambahAksesoris tbody");

        if (!selectKategori || !btnTambahAksesoris || !tbody) {
            console.error("Elemen DOM yang dibutuhkan tidak ditemukan.");
            return;
        }

        // Event listener for category change
        selectKategori.addEventListener("change", () => {
            this.handleCategoryChange(selectKategori.value, tbody);
        });

        // Event listener for adding a new row
        btnTambahAksesoris.addEventListener("click", () => {
            this.tambahBaris(selectKategori.value, tbody);
        });

        // Initialize table
        this.handleCategoryChange(selectKategori.value, tbody);
    },

    handleCategoryChange(kategori, tbody) {
        tbody.innerHTML = ""; // Clear table
        const options = kategori === "1" ? OPSI_KOTAK : kategori === "2" ? OPSI_AKSESORIS : [];
        this.updateAllKodeBarangOptions(options);
        if (options.length) {
            this.tambahBaris(kategori, tbody);
        }
    },

    updateAllKodeBarangOptions(options) {
        const kodeBarangSelects = document.querySelectorAll(".kode-barang");
        kodeBarangSelects.forEach(select => {
            select.innerHTML = options.map(option =>
                `<option value="${option.value}" data-nama="${option.nama}">${option.text}</option>`
            ).join("");
        });
    },

    tambahBaris(kategori, tbody) {
        const newRow = document.createElement("tr");
        const rowCount = tbody.children.length + 1;

        const options = kategori === "1" ? OPSI_KOTAK : OPSI_AKSESORIS;

        newRow.innerHTML = `
            <td>${rowCount}</td>
            <td>
                <select class="form-select form-select-sm kode-barang">
                    ${options.map(option =>
                        `<option value="${option.value}" data-nama="${option.nama}">${option.text}</option>`
                    ).join("")}
                </select>
            </td>
            <td><input type="text" class="form-control nama-barang" placeholder="Nama Barang" readonly></td>
            <td><input type="text" class="form-control jumlah-barang" placeholder="Jumlah"></td>
            <td><input type="text" class="form-control harga-satuan" placeholder="Harga Per Pcs"></td>
            <td><input type="text" class="form-control total-harga" placeholder="Total Harga"></td>
            <td><button type="button" class="btn btn-danger btn-sm btn-hapus">Hapus</button></td>
        `;

        tbody.appendChild(newRow);
        this.attachRowEventListeners(newRow, tbody);
    },

    attachRowEventListeners(row, tbody) {
        this.attachCalculationListeners(row);
        this.attachDeleteListener(row, tbody);
        this.attachKodeBarangListener(row);
    },

    attachCalculationListeners(row) {
        const jumlahInput = row.querySelector(".jumlah-barang");
        const hargaInput = row.querySelector(".harga-satuan");
        const totalHargaInput = row.querySelector(".total-harga");

        hargaInput.addEventListener("input", (e) => {
            const value = this.unformatRupiah(e.target.value);
            e.target.value = this.formatRupiah(value);
            this.hitungTotalHarga(jumlahInput, hargaInput, totalHargaInput);
        });

        jumlahInput.addEventListener("input", () => {
            this.hitungTotalHarga(jumlahInput, hargaInput, totalHargaInput);
        });
    },

    hitungTotalHarga(jumlahInput, hargaInput, totalHargaInput) {
        const jumlah = parseInt(jumlahInput.value) || 0;
        const harga = this.unformatRupiah(hargaInput.value);
        totalHargaInput.value = jumlah * harga > 0 ? this.formatRupiah(jumlah * harga) : "";
    },

    attachDeleteListener(row, tbody) {
        const deleteButton = row.querySelector(".btn-hapus");
        deleteButton.addEventListener("click", () => {
            row.remove();
            this.updateNomorUrut(tbody);
        });
    },

    attachKodeBarangListener(row) {
        const kodeBarangSelect = row.querySelector(".kode-barang");
        const namaBarangInput = row.querySelector(".nama-barang");

        kodeBarangSelect.addEventListener("change", () => {
            const selectedOption = kodeBarangSelect.options[kodeBarangSelect.selectedIndex];
            namaBarangInput.value = selectedOption.dataset.nama || "";
        });
    },

    updateNomorUrut(tbody) {
        const rows = tbody.querySelectorAll("tr");
        rows.forEach((row, index) => {
            row.querySelector("td:first-child").textContent = index + 1;
        });
    }
};


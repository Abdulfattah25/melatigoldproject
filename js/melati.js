// Import statements
import { tambahBaris, updateNomorUrut } from './inputService.js';
import { addRowManualSale, enableRowDeletion } from './analogsale.js';
import { sidebarToggle } from './sidebar.js';
import { initializeBoxSale } from './aksesorisSale.js';
import { penerimaanHandler } from './buyback.js';
import { dateHandler } from './date.js';
import { aksesorisSaleHandler } from './inputAksesoris.js';
import { initTableToggles, initPengeluaranInput } from './summary.js';
dateHandler.initializeDatepicker();
document.addEventListener('DOMContentLoaded', () => {
    aksesorisSaleHandler.init();
    initTableToggles();
    initPengeluaranInput();
});
document.addEventListener("DOMContentLoaded", function () {
     // Re-initialize date handling after DOM is loaded
     dateHandler.initializeDatepicker();
    // InputService functionality
    const tbody = document.querySelector("#tableBarang tbody");
    const btnTambah = document.getElementById("btnTambah");
    
    if (btnTambah && tbody) {
        btnTambah.addEventListener("click", function () {
            tambahBaris(tbody);
        });
        updateNomorUrut(tbody);
    }
    // Sidebar functionality
    try {
        sidebarToggle();
    } catch (error) {
        console.log('Sidebar toggle:', error);
    }
    // AnalogSale functionality
    try {
        const manualTable = document.getElementById("tableManual");
        const addButton = document.getElementById("btnTambah");
        
        if (manualTable && addButton) {
            addRowManualSale("btnTambah", "tableManual");
        }
        enableRowDeletion([
            "tableBarang",
            "tableKotak", 
            "tableManual", 
            "tableTambahAksesoris"
        ]);
    } catch (error) {
        console.log('AnalogSale:', error);
    }
    // BoxSale functionality
    initializeBoxSale();
    // Tambah baris dan Fungsi Penerimaan Buyback
    document.getElementById('btnTambahPenerimaan').addEventListener('click', () => {
    tambahBaris('#tablePenerimaan tbody');
});
    penerimaanHandler.initializeForm();
});
    // Add jQuery ready check for datepicker
    $(document).ready(function() {
    dateHandler.initializeDatepicker();
});


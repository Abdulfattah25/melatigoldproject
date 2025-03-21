// Import statements
import { tambahBaris, updateNomorUrut } from "./inputService.js";
import { addRowManualSale, enableRowDeletion } from "./analogsale.js";
import { sidebarToggle } from "./sidebar.js";
import { initializeBoxSale } from "./aksesorisSale.js";
import { penerimaanHandler, formatNumber, getNumericValue } from "./buyback.js";
import { dateHandler } from "./date.js";
import { aksesorisSaleHandler } from "./inputAksesoris.js";
import { initTableToggles, initPengeluaranInput } from "./summary.js";
import { QueueManager } from "./antrian.js";
import {
  playWaitMessageSequence,
  playTakeQueueMessage,
  playQueueAnnouncement,
  announceQueueNumber,
  announceVehicleMessage,
} from "./audioHandlers.js";

document.addEventListener('DOMContentLoaded', function() {
  const printButton = document.querySelector('.modal-footer .btn-primary');
  printButton.addEventListener('click', printModal);
});

function printModal() {
  const modalContent = document.getElementById("modalMessage").innerHTML;
  
  const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Print</title>
          <style>
              @page {
                  size: 80mm auto;
                  margin: 0mm;
              }
              body { 
                  font-family: Arial, sans-serif;
                  width: 80mm;
                  margin-left: 5px;
                  padding: 5mm;
              }
              .container { 
                  width: 70mm;
              }
              .text-center { 
                  text-align: center; 
              }
              .header {
                  font-size: 16px;
                  font-weight: bold;
                  margin-bottom: 2px;  /* Reduced from 8px */
              }
              .result-item { 
                  margin-top: 2px;     /* Added to control top spacing */
                  margin-bottom: 4px;   /* Reduced from 6px */
                  padding-bottom: 4px;  /* Reduced from 6px */
                  border-bottom: 1px dashed #000;
              }
              .fw-bold { 
                  font-size: 14px;
                  font-weight: bold;
                  margin: 2px 0;       /* Reduced from 4px */
              }
              h6 {
                  margin: 2px 0;       /* Added to control number spacing */
                  font-size: 14px;
              }
              p { 
                  margin: 2px 0;
                  font-size: 14px;
                  line-height: 1.2;    /* Reduced from 1.3 */
              }
              strong {
                  font-size: 14px;
              }
              @media print {
                  * {
                      font-size: 14px;
                  }
                  .header {
                      font-size: 16px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header text-center">Hasil Perhitungan Buyback Perhiasan</div>
              ${modalContent}
          </div>
      </body>
      </html>
  `;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(printContent);
  printWindow.document.close();

  printWindow.onload = function() {
      printWindow.print();
      printWindow.onafterprint = function() {
          printWindow.close();
      };
  };
}


document.querySelector(".hamburger-menu").addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("active");
});
dateHandler.initializeDatepicker();
document.addEventListener("DOMContentLoaded", () => {
  aksesorisSaleHandler.init();
  initTableToggles();
  initPengeluaranInput();
});
// Add jQuery ready check for datepicker
$(document).ready(function () {
  dateHandler.initializeDatepicker();
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
    console.log("Sidebar toggle:", error);
  }
  // AnalogSale functionality
  try {
    const manualTable = document.getElementById("tableManual");
    const addButton = document.getElementById("btnTambah");

    if (manualTable && addButton) {
      addRowManualSale("btnTambah", "tableManual");
    }
    enableRowDeletion(["tableBarang", "tableKotak", "tableManual", "tableTambahAksesoris"]);
  } catch (error) {
    console.log("AnalogSale:", error);
  }
  // BoxSale functionality
  initializeBoxSale();
  // Tambah baris dan Fungsi Penerimaan Buyback
  document.getElementById("btnTambahPenerimaan").addEventListener("click", () => {
    tambahBaris("#tablePenerimaan tbody");
  });
  penerimaanHandler.initializeForm();
});

// Add this to ensure voices are loaded
window.speechSynthesis.onvoiceschanged = () => {
  const voices = window.speechSynthesis.getVoices();
  console.log("Available voices:", voices);
};
document.addEventListener("DOMContentLoaded", () => {
  const queueManager = new QueueManager();
const queueDisplay = document.getElementById("queueNumber");
const nextQueueDisplay = document.getElementById("nextQueueNumber");
const delayQueueDisplay = document.getElementById("delayQueueNumber");

function updateDisplays() {
  const currentQueue = queueManager.getCurrentQueue();
  queueDisplay.textContent = currentQueue;
  nextQueueDisplay.textContent = queueManager.getNextQueue();
  delayQueueDisplay.textContent = queueManager.getDelayedQueue().join(", ") || "-";
}
updateDisplays();

  document.getElementById("delayQueueButton").addEventListener("click", () => {
    const currentQueue = queueDisplay.textContent;
    queueManager.addToDelayedQueue(currentQueue);
    queueDisplay.textContent = queueManager.next();
    updateDisplays();
  });
  // Call Queue Number (Indonesia)
  document.getElementById("callButton").addEventListener("click", async () => {
    const currentQueue = queueDisplay.textContent;
    await playQueueAnnouncement(currentQueue, "id");
  });
  // Call Queue Number (English)
  document.getElementById("callQueue").addEventListener("click", async () => {
    const currentQueue = queueDisplay.textContent;
    await playQueueAnnouncement(currentQueue, "en");
  });

  // Tombol Validasi Terlayani
  document.getElementById("handleButton").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("confirmModal"));
    modal.show();
  });
  document.getElementById("confirmYes").addEventListener("click", () => {
    queueDisplay.textContent = queueManager.next();
    bootstrap.Modal.getInstance(document.getElementById("confirmModal")).hide();
    updateDisplays();
  });
  
  // Tombol Handle Delay Queue Number
  delayHandleButton.addEventListener("click", () => {
    const delayedNumbers = queueManager.getDelayedQueue();
    if (delayedNumbers.length > 0) {
      // Get the select element
      const selectElement = document.getElementById("delayedQueueSelect");
      
      // Clear existing options
      selectElement.innerHTML = "";
      
      // Add options for each delayed number
      delayedNumbers.forEach((number) => {
        const option = document.createElement("option");
        option.value = number;
        option.textContent = number;
        selectElement.appendChild(option);
      });
  
      const confirmDelayedModal = new bootstrap.Modal("#confirmDelayedModal");
      confirmDelayedModal.show();
    }
  });
  
  document.getElementById("confirmDelayedYes").addEventListener("click", () => {
    const selectElement = document.getElementById("delayedQueueSelect");
    const selectedQueue = selectElement.value;
    
    if (selectedQueue) {
      queueManager.removeFromDelayedQueue(selectedQueue);
      updateDisplays();
      
      const modal = bootstrap.Modal.getInstance(document.getElementById("confirmDelayedModal"));
      modal.hide();
    }
  });


// Tambahkan variabel untuk tracking index pemanggilan
let currentCallIndex = 0;

// Fungsi untuk pemanggilan berurutan
async function callSequentially(language) {
  const delayedNumbers = queueManager.getDelayedQueue();
  
  if (delayedNumbers.length === 0) {
    return;
  }

  // Panggil nomor antrian sesuai index
  await playQueueAnnouncement(delayedNumbers[currentCallIndex], language);
  
  // Update index untuk pemanggilan berikutnya
  currentCallIndex = (currentCallIndex + 1) % delayedNumbers.length;
}

// Event listener untuk tombol panggilan berurutan Indonesia
document.getElementById("sequentialCallButton").addEventListener("click", async () => {
  await callSequentially("id");
});

// Event listener untuk tombol panggilan berurutan English
document.getElementById("sequentialCallQueueButton").addEventListener("click", async () => {
  await callSequentially("en");
});

// Reset index saat ada perubahan pada delayed queue
const originalRemoveFromDelayedQueue = queueManager.removeFromDelayedQueue;
queueManager.removeFromDelayedQueue = function(queueNumber) {
  originalRemoveFromDelayedQueue.call(this, queueNumber);
  currentCallIndex = 0; // Reset index when queue changes
};

const originalAddToDelayedQueue = queueManager.addToDelayedQueue;
queueManager.addToDelayedQueue = function(queueNumber) {
  originalAddToDelayedQueue.call(this, queueNumber);
  if (this.delayedQueue.length === 1) {
    currentCallIndex = 0; // Reset index when first item added
  }
};


  // Pengingat Nomor Antrian
  document.getElementById("takeMessage").addEventListener("click", () => {
    playTakeQueueMessage("id");
  });

  document.getElementById("takeQueue").addEventListener("click", () => {
    playTakeQueueMessage("en");
  });

  // Update wait message button event listener
  document.getElementById("waitMessage").addEventListener("click", () => {
    playWaitMessageSequence("id");
  });
  document.getElementById("waitInformation").addEventListener("click", () => {
    playWaitMessageSequence("en");
  });

  // Add event listeners for custom queue
  document.getElementById("customQueueButton").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("customQueueModal"));
    modal.show();
  });
  document.getElementById("setCustomQueue").addEventListener("click", () => {
    const letter = document.getElementById("queueLetter").value;
    const number = parseInt(document.getElementById("queueNumberInput").value);

    if (number >= 1 && number <= 50) {
      queueDisplay.textContent = queueManager.setCustomQueue(letter, number);
      bootstrap.Modal.getInstance(document.getElementById("customQueueModal")).hide();
    } else {
      alert("Please enter a valid number between 1 and 50");
    }
    updateDisplays();
  });

  // Update event listener for reset button
  document.getElementById("resetButton").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("resetModal"));
    modal.show();
  });
  document.getElementById("resetYes").addEventListener("click", () => {
    queueDisplay.textContent = queueManager.reset();
    bootstrap.Modal.getInstance(document.getElementById("resetModal")).hide();
  });

  // Informasi Kendaraan
  const carTypeInput = document.getElementById("carType");
  const plateNumberInput = document.getElementById("plateNumber");
  // Fungsi untuk mengubah karakter menjadi ejaan
function getCharacterSpelling(char, language) {
  // Mapping untuk pengejaan khusus
  const spellingMap = {
    id: {
      '0': 'nol',
      '1': 'satu',
      '2': 'dua',
      '3': 'tiga',
      '4': 'empat',
      '5': 'lima',
      '6': 'enam',
      '7': 'tujuh',
      '8': 'delapan',
      '9': 'sembilan',
      'A': 'a',
      'B': 'be',
      'C': 'ce',
      'D': 'de',
      'E': 'e',
      'F': 'ef',
      'G': 'ge',
      'H': 'ha',
      'I': 'i',
      'J': 'je',
      'K': 'ka',
      'L': 'el',
      'M': 'em',
      'N': 'en',
      'O': 'o',
      'P': 'pe',
      'Q': 'qi',
      'R': 'er',
      'S': 'es',
      'T': 'te',
      'U': 'u',
      'V': 've',
      'W': 'we',
      'X': 'ex',
      'Y': 'ye',
      'Z': 'zet'
    },
    en: {
      '0': 'zero',
      '1': 'one',
      '2': 'two',
      '3': 'three',
      '4': 'four',
      '5': 'five',
      '6': 'six',
      '7': 'seven',
      '8': 'eight',
      '9': 'nine',
      'A': 'a',
      'B': 'b',
      'C': 'c',
      'D': 'd',
      'E': 'e',
      'F': 'f',
      'G': 'g',
      'H': 'h',
      'I': 'i',
      'J': 'j',
      'K': 'k',
      'L': 'l',
      'M': 'm',
      'N': 'n',
      'O': 'o',
      'P': 'p',
      'Q': 'q',
      'R': 'r',
      'S': 's',
      'T': 't',
      'U': 'u',
      'V': 'v',
      'W': 'w',
      'X': 'x',
      'Y': 'y',
      'Z': 'z'
    }
  };

  const upperChar = char.toUpperCase();
  return spellingMap[language][upperChar] || char;
}

// Fungsi untuk mengeja nomor polisi
function spellPlateNumber(plateNumber, language) {
  const chars = plateNumber.split('');
  return chars.map(char => getCharacterSpelling(char, language)).join(' ');
}

 // Modifikasi event listener untuk tombol Bahasa Indonesia
document.getElementById("panggilInformasi").addEventListener("click", () => {
  const carType = carTypeInput.value;
  const plateNumber = plateNumberInput.value;

  if (!carType || !plateNumber) {
    alert("Mohon isi jenis mobil dan nomor polisi");
    return;
  }

  const spelledPlateNumber = spellPlateNumber(plateNumber, "id");
  announceVehicleMessage(carType, spelledPlateNumber, "id");
});

// Modifikasi event listener untuk tombol Bahasa Inggris
document.getElementById("callInformation").addEventListener("click", () => {
  const carType = carTypeInput.value;
  const plateNumber = plateNumberInput.value;

  if (!carType || !plateNumber) {
    alert("Please fill in car type and plate number");
    return;
  }

  const spelledPlateNumber = spellPlateNumber(plateNumber, "en");
  announceVehicleMessage(carType, spelledPlateNumber, "en");
});
// Documentation modal handler
document.getElementById('documentationLink').addEventListener('click', (e) => {
  e.preventDefault();
  const documentationModal = new bootstrap.Modal(document.getElementById('documentationModal'));
  documentationModal.show();
});
});

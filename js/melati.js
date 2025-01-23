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

document.querySelector(".hamburger-menu").addEventListener("click", function () {
  document.querySelector(".sidebar").classList.toggle("active");
});
dateHandler.initializeDatepicker();
document.addEventListener("DOMContentLoaded", () => {
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
// Add jQuery ready check for datepicker
$(document).ready(function () {
  dateHandler.initializeDatepicker();
});
// Add this to ensure voices are loaded
window.speechSynthesis.onvoiceschanged = () => {
  const voices = window.speechSynthesis.getVoices();
  console.log("Available voices:", voices);
};
document.addEventListener("DOMContentLoaded", () => {
  const queueManager = new QueueManager();
  const queueDisplay = document.getElementById("queueNumber");
  const delayQueueDisplay = document.getElementById("delayQueueNumber");

  function updateDisplays() {
    queueDisplay.textContent = queueManager.getCurrentQueue();
    delayQueueDisplay.textContent = queueManager.getDelayedQueue().join(", ") || "-";
  }

  updateDisplays();

  document.getElementById("delayQueueButton").addEventListener("click", () => {
    const currentQueue = queueDisplay.textContent;
    queueManager.addToDelayedQueue(currentQueue);
    queueDisplay.textContent = queueManager.next();
    updateDisplays();
  });

  // Tombol Panggil Nomor Antrian (Indonesia)
  document.getElementById("delayCallButton").addEventListener("click", async () => {
    const delayedNumbers = queueManager.getDelayedQueue();
    if (delayedNumbers.length > 0) {
      await playQueueAnnouncement(delayedNumbers[0], "id");
    }
  });

  // Tombol Call Queue Number (English)
  document.getElementById("delayCallQueue").addEventListener("click", async () => {
    const delayedNumbers = queueManager.getDelayedQueue();
    if (delayedNumbers.length > 0) {
      await playQueueAnnouncement(delayedNumbers[0], "en");
    }
  });

  const delayHandleButton = document.getElementById("delayHandleButton");
  delayHandleButton.removeEventListener("click", () => {});

  delayHandleButton.addEventListener("click", () => {
    const delayedNumbers = queueManager.getDelayedQueue();
    if (delayedNumbers.length > 0) {
      const confirmDelayedModal = new bootstrap.Modal("#confirmDelayedModal");
      confirmDelayedModal.show();
    }
  });

  document.getElementById("confirmDelayedYes").addEventListener("click", () => {
    const delayedNumbers = queueManager.getDelayedQueue();
    if (delayedNumbers.length > 0) {
      queueManager.removeFromDelayedQueue(delayedNumbers[0]);
      updateDisplays();
      const modal = bootstrap.Modal.getInstance(document.getElementById("confirmDelayedModal"));
      modal.hide();
    }
  });

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
  document.getElementById("callButton").addEventListener("click", async () => {
    const currentQueue = queueDisplay.textContent;
    await playQueueAnnouncement(currentQueue, "id");
  });

  document.getElementById("callQueue").addEventListener("click", async () => {
    const currentQueue = queueDisplay.textContent;
    await playQueueAnnouncement(currentQueue, "en");
  });
  // Add Bootstrap JS to your page
  document.getElementById("handleButton").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("confirmModal"));
    modal.show();
  });

  document.getElementById("confirmYes").addEventListener("click", () => {
    queueDisplay.textContent = queueManager.next();
    bootstrap.Modal.getInstance(document.getElementById("confirmModal")).hide();
  }); // Add event listeners for custom queue

  document.getElementById("customQueueButton").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("customQueueModal"));
    modal.show();
  });

  document.getElementById("setCustomQueue").addEventListener("click", () => {
    const letter = document.getElementById("queueLetter").value;
    const number = parseInt(document.getElementById("queueNumberInput").value);

    if (number >= 1 && number <= 100) {
      queueDisplay.textContent = queueManager.setCustomQueue(letter, number);
      bootstrap.Modal.getInstance(document.getElementById("customQueueModal")).hide();
    } else {
      alert("Please enter a valid number between 1 and 100");
    }
  }); // Update event listener for reset button
  document.getElementById("resetButton").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("resetModal"));
    modal.show();
  });

  document.getElementById("resetYes").addEventListener("click", () => {
    queueDisplay.textContent = queueManager.reset();
    bootstrap.Modal.getInstance(document.getElementById("resetModal")).hide();
  });

  const carTypeInput = document.getElementById("carType");
  const plateNumberInput = document.getElementById("plateNumber");

  document.getElementById("panggilInformasi").addEventListener("click", () => {
    const carType = carTypeInput.value;
    const plateNumber = plateNumberInput.value;

    if (!carType || !plateNumber) {
      alert("Mohon isi jenis mobil dan nomor polisi");
      return;
    }

    announceVehicleMessage(carType, plateNumber, "id");
  });

  document.getElementById("callInformation").addEventListener("click", () => {
    const carType = carTypeInput.value;
    const plateNumber = plateNumberInput.value;

    if (!carType || !plateNumber) {
      alert("Please fill in car type and plate number");
      return;
    }
    announceVehicleMessage(carType, plateNumber, "en");
  });
 
});

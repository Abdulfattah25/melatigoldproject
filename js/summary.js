// document.addEventListener("DOMContentLoaded", () => {
//     const toggleButtons = [
//       { button: "#toggleButtonPenjualan", table: "#salesTablePenjualan" },
//       { button: "#toggleButtonPembelian", table: "#salesTablePembelian" },
//       { button: "#toggleButtonValuta", table: "#salesTableValuta" },
//     ];

//     toggleButtons.forEach(({ button, table }) => {
//       const toggleButton = document.querySelector(button);
//       const salesTable = document.querySelector(table);

//       toggleButton.addEventListener("click", () => {
//         if (salesTable.style.display === "none") {
//           salesTable.style.display = "";
//           toggleButton.textContent = "Sembunyikan";
//         } else {
//           salesTable.style.display = "none";
//           toggleButton.textContent = "Tampilkan";
//         }
//       });
//     });
//   });
//   const btnPengeluaran = document.getElementById("btnPengeluaran");
//   const inputContainer = document.getElementById("inputContainer");

//   btnPengeluaran.addEventListener("click", () => {
//     for (let i = 0; i < 3; i++) {
//       const newDiv = document.createElement("div");
//       newDiv.className = "d-flex align-items-center mt-1 gap-2";

//       const newInput = document.createElement("input");
//       newInput.type = "text";
//       newInput.className = "form-control nominal";
//       newInput.placeholder = "Masukkan pengeluaran";

//       const deleteButton = document.createElement("button");
//       deleteButton.type = "button";
//       deleteButton.className = "btn btn-danger btn-sm";
//       deleteButton.textContent = "Hapus";

//       deleteButton.addEventListener("click", () => {
//         inputContainer.removeChild(newDiv);
//       });

//       newDiv.appendChild(newInput);
//       newDiv.appendChild(deleteButton);

//       inputContainer.appendChild(newDiv);
//     }
//   });

// summary.js
export const initTableToggles = () => {
  const toggleButtons = [
    { button: "#toggleButtonPenjualan", table: "#salesTablePenjualan" },
    { button: "#toggleButtonPembelian", table: "#salesTablePembelian" },
    { button: "#toggleButtonValuta", table: "#salesTableValuta" },
  ];

  toggleButtons.forEach(({ button, table }) => {
    const toggleButton = document.querySelector(button);
    const salesTable = document.querySelector(table);

    toggleButton.addEventListener("click", () => {
      salesTable.classList.toggle("hidden");
      toggleButton.textContent = salesTable.classList.contains("hidden")
        ? "Tampilkan"
        : "Sembunyikan";
    });
  });
};

export const initPengeluaranInput = () => {
  const btnPengeluaran = document.getElementById("btnPengeluaran");
  const inputContainer = document.getElementById("inputContainer");

  const createInputField = () => {
    const newDiv = document.createElement("div");
    newDiv.className = "d-flex align-items-center mt-1 gap-2";

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.className = "form-control nominal";
    newInput.placeholder = "Masukkan pengeluaran";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.textContent = "Hapus";

    deleteButton.addEventListener("click", () => {
      inputContainer.removeChild(newDiv);
    });

    newDiv.appendChild(newInput);
    newDiv.appendChild(deleteButton);

    return newDiv;
  };

  btnPengeluaran.addEventListener("click", () => {
    for (let i = 0; i < 3; i++) {
      const inputField = createInputField();
      inputContainer.appendChild(inputField);
    }
  });
};

// Function to add new row to table
export function addRowManualSale(buttonId, tableId) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener("click", function () {
        const tbody = document.querySelector(`#${tableId} tbody`);
        if (!tbody) return;

        const newRow = createTableRow();
        tbody.appendChild(newRow);
    });
}

// Helper function to create table row with inputs
function createTableRow() {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="text" class="form-control" placeholder="ID"></td>
        <td><input type="text" class="form-control" placeholder="Nama Barang"></td>
        <td><input type="text" class="form-control" placeholder="Kadar"></td>
        <td><input type="text" class="form-control" placeholder="Berat"></td>
        <td><input type="text" class="form-control" placeholder="Keterangan"></td>
        <td>
            <button class="btn btn-danger btn-sm btnHapus">
                <i class="bi bi-x"></i>
            </button>
        </td>
    `;
    return newRow;
}

// Function to enable row deletion for multiple tables
export function enableRowDeletion(tableIds) {
    tableIds.forEach(tableId => {
        const table = document.querySelector(`#${tableId}`);
        if (!table) return;

        table.addEventListener("click", function (e) {
            const deleteButton = e.target.closest(".btnHapus");
            if (deleteButton) {
                const row = deleteButton.closest("tr");
                if (row) {
                    row.remove();
                }
            }
        });
    });
}

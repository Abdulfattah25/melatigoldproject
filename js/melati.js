  
  $(document).ready(function () {
    // Saat dokumen dimuat, sembunyikan semua sub bagian
    $("aside ul ul").hide();
  
    // Ambil path URL saat ini (misalnya, "/Saldo Awal.html")
    var currentPath = window.location.pathname;
  
    // Loop melalui setiap tombol toggle
    $(".inpt-btn, .utlt-btn, .lprn-btn, .sell-btn").each(function () {
      var target = $(this).data("target");
  
      // Bandingkan path URL saat ini dengan data-target
      if (currentPath === "/" + target + ".html") {
        $("#" + target).show(); // Tampilkan sub bagian yang sesuai
        $(this).addClass("active"); // Tandai tombol toggle sebagai aktif
      }
  
      // Tangkap klik tombol toggle
      $(this).click(function () {
        // Sembunyikan semua sub bagian yang bukan milik tombol yang diklik
        $("aside ul ul").not("#" + target).hide();
  
        // Tampilkan atau sembunyikan sub bagian yang sesuai
        $("#" + target).toggle();
      
        // Hapus kelas "active" dari semua tombol toggle
        $(".inpt-btn, .utlt-btn, .lprn-btn, .sell-btn").removeClass("active");
      
        // Tambahkan kelas "active" ke tombol yang diklik
        $(this).addClass("active");
      });
    });
  });

  function formatTanggal(date) {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    let year = date.getFullYear();

    return day + '-' + month + '-' + year;
  }
  // Mendapatkan tanggal saat ini
 let tanggalSekarang = new Date();
 let tanggalFormat = formatTanggal(tanggalSekarang);
  // Menampilkan tanggal di elemen dengan id 'tanggal'
  document.getElementById('tgl').textContent = tanggalFormat;


// Penjualan kotak
document.getElementById("btnTambah").addEventListener("click", function () {
  // Ambil tbody dari tabel
  const tbody = document.querySelector("#tableKotak tbody");
  // Buat elemen <tr> baru
  const newRow = document.createElement("tr");
  // Tambahkan kolom ke dalam baris baru
  newRow.innerHTML = `
      <td><input type="text" class="form-control" placeholder="ID"></td>
      <td><input type="text" class="form-control" placeholder="Nama Barang"></td>
      <td><input type="text" class="form-control" placeholder="Jumlah"></td>
      <td><input type="text" class="form-control" placeholder="Harga"></td>
      <td>
                  <button class="btn btn-danger btn-sm btnHapus">
                      <i class="bi bi-x"></i>
                  </button>
        </td>
  `;
  // Tambahkan baris baru ke dalam tbody
  tbody.appendChild(newRow);
});

// Penjualan Manual
document.getElementById("btnTambah").addEventListener("click", function () {
  // Ambil tbody dari tabel
  const tbody = document.querySelector("#tableManual tbody");
  // Buat elemen <tr> baru
  const newRow = document.createElement("tr");
  // Tambahkan kolom ke dalam baris baru
  newRow.innerHTML = `
      <td><input type="text" class="form-control" placeholder="ID"></td>
                  <td><input type="text" class="form-control" placeholder="Nama Barang"></td>
                  <td><input type="text" class="form-control" placeholder="Kadar"></td>
                  <td><input type="text" class="form-control" placeholder="Berat"></td>
                  <td><input type="text" class="form-control" placeholder="Ongkos"></td>
                  <td><input type="text" class="form-control" placeholder="Keterangan"></td>
                  <td>
                    <button class="btn btn-danger btn-sm btnHapus">
                        <i class="bi bi-x"></i>
                    </button>
                  </td>
  `;
  // Tambahkan baris baru ke dalam tbody
  tbody.appendChild(newRow);
});


// Event delegation untuk menghapus baris
document.querySelector("#tableBarang, #tableKotak, #tableManual, #tableTambahAksesoris").addEventListener("click", function (e) {
  if (e.target.closest(".btnHapus")) {
      const row = e.target.closest("tr");
      row.remove(); // Hapus baris tabel
  }
});

$(document).ready(function () {
  // Inisialisasi Datepicker
  $('#tanggal').datepicker({
      format: 'yyyy-mm-dd', // Format tanggal
      autoclose: true, // Tutup otomatis setelah pilih tanggal
      todayHighlight: true // Sorot tanggal hari ini
  });

  // Tambahkan event listener pada ikon kalender
  $('#calendarIcon').on('click', function () {
      $('#tanggal').datepicker('show'); // Tampilkan Datepicker saat ikon diklik
  });
  // Mengisi input dengan tanggal hari ini
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd; // Format tanggal: yyyy-mm-dd

  $('#tanggal').val(today); // Mengisi nilai input dengan tanggal hari ini
});

// Add click event to logout button
document.querySelector('button:contains("Logout")').addEventListener('click', function() {
  sessionStorage.removeItem('isLoggedIn');
  window.location.href = 'Login.html';
});

 
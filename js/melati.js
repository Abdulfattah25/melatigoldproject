// $(document).ready(function () {
//     $(".inpt-btn").click(function () {
//         $("aside ul .inpt-show").toggle();
//     });
// });
// $(document).ready(function () {
//     $(".utlt-btn").click(function () {
//         $("aside ul .utlt-show").toggle();
//     });
// });
// $(document).ready(function () {
//     $(".lprn-btn").click(function () {
//         $("aside ul .lprn-show").toggle();
//     });
// });

// $(document).ready(function () {
//     $(".inpt-btn").click(function () {
//       // Sembunyikan semua daftar selain yang diklik
//       $("aside ul ul").not(".inpt-show").hide();
//       // Tampilkan atau sembunyikan daftar yang diklik
//       $("aside ul .inpt-show").toggle();
//     });
  
//     $(".utlt-btn").click(function () {
//       // Sembunyikan semua daftar selain yang diklik
//       $("aside ul ul").not(".utlt-show").hide();
//       // Tampilkan atau sembunyikan daftar yang diklik
//       $("aside ul .utlt-show").toggle();
//     });
  
//     $(".lprn-btn").click(function () {
//       // Sembunyikan semua daftar selain yang diklik
//       $("aside ul ul").not(".lprn-show").hide();
//       // Tampilkan atau sembunyikan daftar yang diklik
//       $("aside ul .lprn-show").toggle();
//     });
//   });

//   $(document).ready(function () {
//     $(".inpt-btn").click(function () {
//       // Sembunyikan semua daftar yang bukan milik tombol yang diklik
//       $(".inpt-show").toggle();
//       $(".utlt-show, .lprn-show").hide(); // Sembunyikan daftar lain jika ada
//     });
  
//     $(".utlt-btn").click(function () {
//       // Sembunyikan semua daftar yang bukan milik tombol yang diklik
//       $(".utlt-show").toggle();
//       $(".inpt-show, .lprn-show").hide(); // Sembunyikan daftar lain jika ada
//     });
  
//     $(".lprn-btn").click(function () {
//       // Sembunyikan semua daftar yang bukan milik tombol yang diklik
//       $(".lprn-show").toggle();
//       $(".inpt-show, .utlt-show").hide(); // Sembunyikan daftar lain jika ada
//     });
//   });

//   $(document).ready(function () {
//     // Saat dokumen dimuat, sembunyikan semua sub bagian
//     $("aside ul ul").hide();
  
//     $(".inpt-btn").click(function () {
//       // Sembunyikan semua sub bagian yang bukan milik tombol yang diklik
//       $(".inpt-show").toggle();
//       $(".utlt-show, .lprn-show").hide(); // Sembunyikan sub bagian lain jika ada
  
//       // Tambahkan kelas "active" ke tombol yang diklik, dan hapus dari yang lain
//       $(this).addClass("active");
//       $(".utlt-btn, .lprn-btn").removeClass("active");
//     });
  
//     $(".utlt-btn").click(function () {
//       // Sembunyikan semua sub bagian yang bukan milik tombol yang diklik
//       $(".utlt-show").toggle();
//       $(".inpt-show, .lprn-show").hide(); // Sembunyikan sub bagian lain jika ada
  
//       // Tambahkan kelas "active" ke tombol yang diklik, dan hapus dari yang lain
//       $(this).addClass("active");
//       $(".inpt-btn, .lprn-btn").removeClass("active");
//     });
  
//     $(".lprn-btn").click(function () {
//       // Sembunyikan semua sub bagian yang bukan milik tombol yang diklik
//       $(".lprn-show").toggle();
//       $(".inpt-show, .utlt-show").hide(); // Sembunyikan sub bagian lain jika ada
  
//       // Tambahkan kelas "active" ke tombol yang diklik, dan hapus dari yang lain
//       $(this).addClass("active");
//       $(".inpt-btn, .utlt-btn").removeClass("active");
//     });
//   });
  
  // // $(document).ready(function () {
  // //   // Saat dokumen dimuat, sembunyikan semua sub bagian
  // //   $("aside ul ul").hide();
  
  // //   // Tangkap klik tombol toggle
  // //   $(".inpt-btn, .utlt-btn, .lprn-btn").click(function () {
  // //     // Dapatkan nilai dari atribut data-target pada tombol yang diklik
  // //     var target = $(this).data("target");
      
  // //     // Sembunyikan semua sub bagian yang bukan milik tombol yang diklik
  // //     $("aside ul ul").not("#" + target).hide();
  
  // //     // Tampilkan atau sembunyikan sub bagian yang sesuai
  // //     $("#" + target).toggle();
      
  // //     // Hapus kelas "active" dari semua tombol toggle
  // //     $(".inpt-btn, .utlt-btn, .lprn-btn").removeClass("active");
      
  // //     // Tambahkan kelas "active" ke tombol yang diklik
  // //     $(this).addClass("active");
  // //   });
  // // });
  
  // $(document).ready(function () {
  //   // Saat dokumen dimuat, sembunyikan semua sub bagian
  //   $("aside ul ul").hide();
  
  //   // Ambil URL saat ini
  //   var currentURL = window.location.href;
  
  //   // Loop melalui setiap tombol toggle
  //   $(".inpt-btn, .utlt-btn, .lprn-btn").each(function () {
  //     var target = $(this).data("target");
      
  //     // Jika URL saat ini berisi bagian yang sesuai, tampilkan sub bagian
  //     if (currentURL.indexOf(target) !== -1) {
  //       $("#" + target).show();
  //       $(this).addClass("active");
  //     }
  
  //     // Tangkap klik tombol toggle
  //     $(this).click(function () {
  //       // Sembunyikan semua sub bagian yang bukan milik tombol yang diklik
  //       $("aside ul ul").not("#" + target).hide();
  
  //       // Tampilkan atau sembunyikan sub bagian yang sesuai
  //       $("#" + target).toggle();
      
  //       // Hapus kelas "active" dari semua tombol toggle
  //       $(".inpt-btn, .utlt-btn, .lprn-btn").removeClass("active");
      
  //       // Tambahkan kelas "active" ke tombol yang diklik
  //       $(this).addClass("active");
  //     });
  //   });
  // });
  
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

  //Data Servis
  document.getElementById("btnTambah").addEventListener("click", function () {
    // Ambil tbody dari tabel
    const tbody = document.querySelector("#tableBarang tbody");
    // Buat elemen <tr> baru
    const newRow = document.createElement("tr");
    // Tambahkan kolom ke dalam baris baru
    newRow.innerHTML = `
        <td><input type="text" class="form-control" placeholder="ID"></td>
        <td><input type="text" class="form-control" placeholder="Nama Barang"></td>
        <td><input type="text" class="form-control" placeholder="Jumlah"></td>
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

//Script harga rata-rata penjualan

 
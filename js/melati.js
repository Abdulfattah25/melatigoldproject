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
    $(".inpt-btn, .utlt-btn, .lprn-btn").each(function () {
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
        $(".inpt-btn, .utlt-btn, .lprn-btn").removeClass("active");
      
        // Tambahkan kelas "active" ke tombol yang diklik
        $(this).addClass("active");
      });
    });
  });
  


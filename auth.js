// Pengaman sesi sederhana untuk aplikasi SIP.
// Semua halaman selain index.html wajib memiliki sesi login aktif pada tab ini.
(function () {
  if (sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.replace("index.html");
  }
})();

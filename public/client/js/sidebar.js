document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".sidebar-item");
  const currentPath = window.location.pathname;
  const sidebar = document.querySelector(".sidebar");
  const menuBtn = document.querySelector(".menu-btn"); // Nut nay o partial header

  tabs.forEach((tab) => {
    const link = tab.querySelector("a");
    if (!link) return;

    const hrefPath = new URL(link.href).pathname;

    //Hieu ung khi active
    if (hrefPath === currentPath) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }

    //Chuyen trang
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = link.href;
    });
  });

  //An sidebar tren mobile
  if (window.innerWidth <= 768) {
    sidebar.style.display = "none";
  }

  document.addEventListener("click", (e) => {
    if (!sidebar) return;

    //Click vung trong ben ngoai de an sidebar
    if (!sidebar.contains(e.target)) {
      if (window.innerWidth >= 768) return;
      sidebar.style.display = "none";
    }
  });

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (sidebar.style.display === "none") {
      sidebar.style.display = "flex";
    } else {
      sidebar.style.display = "none";
    }
  });
});

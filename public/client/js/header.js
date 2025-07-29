// if (window.innerWidth <= 768) {
//   document.body.innerHTML =
//     "<h2 style='text-align:center;padding:50px;'>Trang này không hỗ trợ truy cập trên điện thoại. Vui lòng dùng máy tính.</h2>";
// }

const user = document.querySelector("#user");

user.addEventListener("click", () => {
  const popup = user.querySelector(".popup");
  popup.classList.toggle("hidden");
});

document.addEventListener("click", function (event) {
  const popup = user.querySelector(".popup");
  if (!user.contains(event.target)) {
    popup.classList.add("hidden");
  }
});

function createRecords(listData, container) {
  function translateMoTa(moTa) {
    const key = moTa?.toLowerCase().replace(/_/g, " ");

    const map = {
      investing: {
        label: "Đầu tư",
        icon: `<i class="fas fa-arrow-trend-up"></i>`,
      },
      shopping: {
        label: "Mua sắm",
        icon: `<i class="fas fa-cart-shopping"></i>`,
      },
      salary: {
        label: "Lương tháng",
        icon: `<i class="fa-solid fa-briefcase"></i>`,
      },
      food: {
        label: "Ăn uống",
        icon: `<i class="fa-solid fa-utensils"></i>`,
      },
      fuel: {
        label: "Nhiên liệu",
        icon: `<i class="fa-solid fa-gas-pump"></i>`,
      },
      "hang out": {
        label: "Đi chơi",
        icon: `<i class="fa-solid fa-champagne-glasses"></i>`,
      },
      others: {
        label: "Khác",
        icon: `<i class="fa-solid fa-ellipsis"></i>`,
      },
    };

    const item = map[key];
    return item ? ` ${item.label} ${item.icon}` : moTa;
  }

  listData.forEach((record) => {
    const div = document.createElement("div");
    div.className = `record ${record.loai}`;

    div.innerHTML = `
          <div class="info">
            <span class="amount">${
              record.loai === "thu" ? "+" : "-"
            } ${record.so_tien.toLocaleString()} VND</span>
            <span class="description">${
              translateMoTa(record.mo_ta) || "Không có mô tả"
            }</span>
          </div>
          <div class="timestamp">${new Date(
            record.createdAt
          ).toLocaleString()}</div>
          <div class="option" >
            <i class="fa-solid fa-pen-to-square edit-btn" 
            data-id="${record._id}"></i>

            <i class="fa-solid fa-trash remove-btn" data-id="${record._id}"></i>
          </div>
        `;

    container.appendChild(div);
  });
}

async function loadData() {
  const historyContainer = document.getElementById("transaction-history");
  historyContainer.innerHTML = "";
  try {
    const res = await fetch("/transaction-data", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();

    if (data.success) {
      createRecords(data.records, historyContainer);
    } else {
      historyContainer.innerText = "Không thể tải lịch sử.";
    }
  } catch (err) {
    console.error("Fetch history error:", err);
    historyContainer.innerText = "Lỗi khi tải lịch sử.";
  }
}

//Hien thi giao dien sau khi loc
document.querySelector("#filterForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  if (startDate && endDate) {
    const historyContainer = document.getElementById("transaction-history");
    historyContainer.innerHTML = "";
    try {
      const url = `/transaction-filter?startDate=${encodeURIComponent(
        startDate
      )}&endDate=${encodeURIComponent(endDate)}`;
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        createRecords(data.records, historyContainer);
      } else {
        historyContainer.innerText = "Không tìm thấy dữ liệu.";
        console.log(data);
      }
    } catch (err) {
      console.error("Fetch filtered history error:", err);
      historyContainer.innerText = "Lỗi khi lọc dữ liệu.";
    }
  } else {
    loadData();
  }
});

document
  .getElementById("transaction-history")
  .addEventListener("click", async (e) => {
    //Nut xoa
    if (e.target.classList.contains("remove-btn")) {
      const id = e.target.dataset.id;
      const resDelete = await fetch(`/transaction-data/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (resDelete.ok) {
        alert("Xóa ok");
        loadData();
      } else {
        alert("Xóa thất bại");
      }
      //Nut sua
    } else if (e.target.classList.contains("edit-btn")) {
      const id = e.target.dataset.id;
      const form = document.querySelector("#edit-form");
      const row = e.target.closest(".record");
      if (row.nextElementSibling === form) {
        form.classList.toggle("hidden");
      } else {
        form.reset();
        form.classList.remove("hidden");
        row.insertAdjacentElement("afterend", form);
      }

      form.onsubmit = async (e) => {
        e.preventDefault();
        const amount = parseFloat(document.querySelector("#edit-amount").value);
        if (!amount || isNaN(amount) || amount < 0) {
          alert("Số tiền không hợp lệ");
          return;
        }

        const resUpdate = await fetch(`/transaction-data/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            so_tien: amount,
          }),
        });

        if (resUpdate.ok) {
          alert("Update ok!");
          await loadData();

          form.reset();
          document.body.appendChild(form);
          form.classList.add("hidden");
        }
      };
    }
  });

function clearFilter() {
  window.location.href = "/transaction";
}

document.addEventListener("DOMContentLoaded", loadData);

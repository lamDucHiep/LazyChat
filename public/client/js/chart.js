async function loadExpenseData() {
  const res = await fetch("/statistic/expense-data");
  const json = await res.json();
  const ctx = document.getElementById("expenseChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: json.labels,
      datasets: [
        {
          data: json.amounts,
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffcd56",
            "#4bc0c0",
            "#9966ff",
            "#ff9f40",
          ],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: `${window.innerWidth <= 768 ? "bottom" : "right"}`,
          labels: {
            padding: 50,
            boxwidth: 18,
            font: {
              size: `${window.innerWidth <= 768 ? 12 : 24}`,
            },
          },
        },
        title: {
          display: true,
          text: "Phân bổ chi tiêu",
        },
      },
    },
  });
}
window.addEventListener("DOMContentLoaded", loadExpenseData);

const API_URL = "http://localhost:3000";

const dayStatsTable = document
  .getElementById("day-stats")
  .getElementsByTagName("tbody")[0];
const template = document.querySelector("template");
const chartCtx = document.getElementById("myChart");

let myChart;

function addDayToTable(day) {
  const clon = template.content.cloneNode(true);
  const tds = clon.querySelectorAll("td");

  const values = [
    day.dayNum,
    day.customers,
    day.transactions,
    day.items,
    `$${day.earnings}`,
    day.ipt,
    `$${day.atv}`,
    `${day.conversion}%`,
  ];

  tds.forEach((td, i) => {
    td.textContent = values[i];
    td.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(`${API_URL}/days/${day.dayNum}`, { method: "DELETE" })
        .then(() => td.parentNode.remove())
        .catch((err) => console.error("Error deleting day:", err));
    });
  });

  dayStatsTable.appendChild(clon);

  const container = document.getElementById("scrollable");
  container.scrollTop = container.scrollHeight;
}

function updateChart(labels, data) {
  if (myChart) {
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = data;
    myChart.update();
  } else {
    myChart = new Chart(chartCtx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Earnings Over Last 7 Days",
            data: data,
            borderColor: "hsl(240, 39%, 58%)",
            backgroundColor: "hsl(240, 30%, 50%)",
            tension: 0,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: "white" },
          },
          tooltip: {
            bodyColor: "white",
            titleColor: "white",
          },
        },
        scales: {
          x: {
            ticks: { color: "white" },
          },
          y: {
            min: 1000,
            max: 14000,
            ticks: { color: "white" },
          },
        },
      },
    });
  }
}

function refreshWeekChart() {
  fetch(`${API_URL}/week`)
    .then((res) => res.json())
    .then((weekData) => {
      const labels = Object.keys(weekData);
      const values = Object.values(weekData);
      updateChart(labels, values);
    });
}

function fetchAllDays() {
  fetch(`${API_URL}/days`)
    .then((res) => res.json())
    .then((allDays) => {
      allDays.forEach(addDayToTable);
      refreshWeekChart();
    });
}

document.getElementById("myButton").addEventListener("click", (e) => {
  e.preventDefault();
  fetch(`${API_URL}/simulate`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((newDay) => {
      addDayToTable(newDay);
      refreshWeekChart();
    })
    .catch((err) => console.error("Error simulating day:", err));
});

fetchAllDays();

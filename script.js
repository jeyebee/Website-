let lastIrrigationTime = null;
let autoRefreshInterval = null;

// Chart instances
let pieChart, barChart, lineChart;

// For line chart data history
const soilMoistureHistory = [];
const maxHistoryPoints = 10;

function createCharts() {
  const pieCtx = document.getElementById("pieChart").getContext("2d");
  const barCtx = document.getElementById("barChart").getContext("2d");
  const lineCtx = document.getElementById("lineChart").getContext("2d");

  pieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["Dry Soil", "Optimal Moisture", "Wet Soil"],
      datasets: [{
        label: "Soil Moisture Distribution",
        data: [0, 0, 0],
        backgroundColor: ["#f87171", "#34d399", "#60a5fa"],
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });

  barChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["Temperature (Â°C)", "Humidity (%)", "Soil pH"],
      datasets: [{
        label: "Current Values",
        data: [0, 0, 0],
        backgroundColor: ["#fbbf24", "#3b82f6", "#a78bfa"],
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });
lineChart = new Chart(lineCtx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Soil Moisture Over Time (%)",
        data: [],
        fill: false,
        borderColor: "#34d399",
        backgroundColor: "#34d399",
        tension: 0.3,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { min: 0, max: 100 },
      },
      plugins: {
        legend: { position: "top" },
      },
    },
  });
}

function updateCharts(soil, temp, humidity, ph) {
  // Update pie chart data based on soil moisture ranges
  // dry (<40), optimal (40-70), wet (>70)
  let dry = soil < 40 ? soil : 0;
  let optimal = soil >= 40 && soil <= 70 ? soil : 0;
  let wet = soil > 70 ? soil : 0;

  let total = dry + optimal + wet;
  if (total === 0) {
    dry = 33;
    optimal = 34;
    wet = 33;
  } else {
    dry = (dry / total) * 100;
    optimal = (optimal / total) * 100;
    wet = (wet / total) * 100;
  }

  pieChart.data.datasets[0].data = [dry, optimal, wet];
  pieChart.update();

  // Update bar chart with current temp, humidity, ph
  barChart.data.datasets[0].data = [temp, humidity, ph];
  barChart.update();

  // Update line chart with soil moisture history
  if (soilMoistureHistory.length >= maxHistoryPoints) {
    soilMoistureHistory.shift();
  }
  soilMoistureHistory.push(soil);
  lineChart.data.labels = soilMoistureHistory.map((_, i) => `T-${soilMoistureHistory.length - i}`);
  lineChart.data.datasets[0].data = soilMoistureHistory;
  lineChart.update();
}

function simulate() {
  // Simulate sensor data
  let soil = Math.floor(Math.random() * 100);
  let rain = Math.random() > 0.6 ? "Yes" : "No";
  let temp = +(20 + Math.random() * 15).toFixed(1); // 20â€“35 Â°C
  let humidity = Math.floor(30 + Math.random() * 50); // 30-80%
  let ph = +(5.5 + Math.random() * 2.5).toFixed(1); // 5.5 - 8.0

  let decision = "";
  let condition = "";
  let status = "";
  let statusClass = "";

  // Decision logic with pH and humidity consideration
  if (soil < 40 && rain === "No") {
    if (ph < 6.0) {
      decision = "Irrigation & Soil Amendment Needed âœ…";
      condition = "Soil is dry, acidic pH, no rain expected.";
      status = "Watering & pH Adjustment Recommended";
      statusClass = "status-watering";
    } else if (ph > 7.5) {
      decision = "Irrigation & Soil Amendment Needed âœ…";
      condition = "Soil is dry, alkaline pH, no rain expected.";
      status = "Watering & pH Adjustment Recommended";
      statusClass = "status-watering";
    } else {
      decision = "Irrigation Needed âœ…";
      condition = "Soil is dry, no rain coming.";
      status = "Watering Recommended";
      statusClass = "status-watering";
    }
    lastIrrigationTime = new Date();
  } else if (soil < 40 && rain === "Yes") {
    decision = "Wait ðŸŒ§ï¸";
    condition = "Soil dry but rain expected.";
    status = "Standby";
    statusClass = "status-standby";
  } else if (soil >= 40 && soil <= 70) {
    if (humidity < 40) {
      decision = "Monitor Closely ðŸ‘€";
      condition = "Good soil moisture but low humidity.";
      status = "No Irrigation Needed";
      statusClass = "status-optimal";
    } else {
      decision = "Optimal ðŸ‘";
      condition = "Good soil and humidity conditions.";
      status = "No Irrigation Needed";
      statusClass = "status-optimal";
    }
  } else {
    decision = "Too Wet ðŸš«";
    condition = "Overwatered soil.";
    status = "No Irrigation Needed";
    statusClass = "status-too-wet";
  }

  // Update DOM elements
  document.getElementById("moisture").innerText = soil;
  document.getElementById("rain").innerText = rain;
  document.getElementById("temp").innerText = temp;
  document.getElementById("humidity").innerText = humidity;
  document.getElementById("ph").innerText = ph;
  document.getElementById("decision").innerText = decision;
  document.getElementById("condition").innerText = condition;
  document.getElementById("status").innerText = status;

  // Update last irrigation time display
  document.getElementById("last-irrigation").innerText = lastIrrigationTime
    ? lastIrrigationTime.toLocaleString()
    : "Never";

  // Update card background colors based on status
  const statusCard = document.getElementById("status-card");
  statusCard.className = "card " + statusClass;

  // Update charts
  updateCharts(soil, temp, humidity, ph);
}

// Auto-refresh toggle handler
document.getElementById("auto-refresh").addEventListener("change", function () {
  if (this.checked) {
    simulate();
    autoRefreshInterval = setInterval(simulate, 10000);
  } else {
    clearInterval(autoRefreshInterval);
  }
});

// Dark mode toggle logic
const darkModeToggle = document.getElementById("dark-mode-toggle");
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
}

// Load saved preference and initialize charts on page load
window.addEventListener("DOMContentLoaded", () => {
  const darkModeSetting = localStorage.getItem("darkMode");
  if (darkModeSetting === "enabled") {
    darkModeToggle.checked = true;
    setDarkMode(true);
  }
  createCharts();
  simulate();
});

// Listen for dark mode toggle changes
darkModeToggle.addEventListener("change", () => {
  setDarkMode(darkModeToggle.checked);
});
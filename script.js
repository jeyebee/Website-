let lastIrrigationTime = null;
let autoRefreshInterval = null;

function simulate() {
  // Simulate sensor data
  let soil = Math.floor(Math.random() * 100);
  let rain = Math.random() > 0.6 ? "Yes" : "No";
  let temp = (20 + Math.random() * 15).toFixed(1); // 20–35 °C
  let humidity = Math.floor(30 + Math.random() * 50); // 30-80%
  let ph = (5.5 + Math.random() * 2.5).toFixed(1); // 5.5 - 8.0

  let decision = "";
  let condition = "";
  let status = "";
  let statusClass = "";

  // Decision logic with pH and humidity consideration
  if (soil < 40 && rain === "No") {
    if (ph < 6.0) {
      decision = "Irrigation & Soil Amendment Needed ✅";
      condition = "Soil is dry, acidic pH, no rain expected.";
      status = "Watering & pH Adjustment Recommended";
      statusClass = "status-watering";
    } else if (ph > 7.5) {
      decision = "Irrigation & Soil Amendment Needed ✅";
      condition = "Soil is dry, alkaline pH, no rain expected.";
      status = "Watering & pH Adjustment Recommended";
      statusClass = "status-watering";
    } else {
      decision = "Irrigation Needed ✅";
      condition = "Soil is dry, no rain coming.";
      status = "Watering Recommended";
      statusClass = "status-watering";
    }
    lastIrrigationTime = new Date();
  } else if (soil < 40 && rain === "Yes") {
    decision = "Wait 🌧️";
    condition = "Soil dry but rain expected.";
    status = "Standby";
    statusClass = "status-standby";
  } else if (soil >= 40 && soil <= 70) {
    if (humidity < 40) {
      decision = "Monitor Closely 👀";
      condition = "Good soil moisture but low humidity.";
      status = "No Irrigation Needed";
      statusClass = "status-optimal";
    } else {
      decision = "Optimal 👍";
      condition = "Good soil and humidity conditions.";
      status = "No Irrigation Needed";
      statusClass = "status-optimal";
    }
  } else {
    decision = "Too Wet 🚫";
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

// Initial load
simulate();

// Existing simulate() function here...

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

// Load saved preference on page load
window.addEventListener("DOMContentLoaded", () => {
  const darkModeSetting = localStorage.getItem("darkMode");
  if (darkModeSetting === "enabled") {
    darkModeToggle.checked = true;
    setDarkMode(true);
  }
});

// Listen for toggle changes
darkModeToggle.addEventListener("change", () => {
  setDarkMode(darkModeToggle.checked);
});

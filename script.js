function simulate() {
  
  let soil = Math.floor(Math.random() * 100);
  let rain = Math.random() > 0.6 ? "Yes" : "No";
  let temp = (20 + Math.random() * 15).toFixed(1); // 20–35 °C

  let decision = "";
  let condition = "";
  let status = "";

  
  if (soil < 40 && rain === "No") {
    decision = "Irrigation Needed ✅";
    condition = "Soil is dry, no rain coming.";
    status = "Watering Recommended";
  } else if (soil < 40 && rain === "Yes") {
    decision = "Wait 🌧️";
    condition = "Soil dry but rain expected.";
    status = "Standby";
  } else if (soil >= 40 && soil <= 70) {
    decision = "Optimal 👍";
    condition = "Good soil condition.";
    status = "No Irrigation Needed";
  } else {
    decision = "Too Wet 🚫";
    condition = "Overwatered soil.";
    status = "No Irrigation Needed";
  }

  
  document.getElementById("moisture").innerText = soil;
  document.getElementById("rain").innerText = rain;
  document.getElementById("temp").innerText = temp;
  document.getElementById("decision").innerText = decision;
  document.getElementById("condition").innerText = condition;
  document.getElementById("status").innerText = status;
}
body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, sans-serif;
  background: #f7fafc;
  color: #2d3748;
}

header {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #2a9d8f, #264653);
  color: white;
}

h1 {
  margin-bottom: 0.5rem;
}

main {
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
}

.card h2 {
  margin-bottom: 0.8rem;
  color: #2a9d8f;
}

.analysis {
  text-align: left;
}

button {
  margin-top: 2rem;
  padding: 12px 24px;
  background: #2a9d8f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: #21867a;
}

.center {
  text-align: center;
  margin-top: 1rem;
}

footer {
  text-align: center;
  padding: 1rem;
  background: #e6fffa;
  margin-top: 2rem;
  font-size: 0.9rem;
}

/* Status colors */
.status-watering {
  background-color: #d1fae5; /* light green */
}

.status-standby {
  background-color: #fef3c7; /* light yellow */
}

.status-optimal {
  background-color: #dbeafe; /* light blue */
}

.status-too-wet {
  background-color: #fee2e2; /* light red */
}
body.dark-mode {
  background: #121212;
  color: #e0e0e0;
}

body.dark-mode header {
  background: linear-gradient(135deg, #0f766e, #1e293b);
  color: #a5f3fc;
}

body.dark-mode .card {
  background: #1e293b;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
  color: #e0e0e0;
}

body.dark-mode .card h2 {
  color: #38bdf8;
}

body.dark-mode .analysis {
  color: #cbd5e1;
}

body.dark-mode button {
  background: #0f766e;
  color: #a5f3fc;
}

body.dark-mode button:hover {
  background: #115e59;
}

body.dark-mode footer {
  background: #0f766e;
  color: #a5f3fc;
}

/* Toggle switch styles */
.switch {
  display: inline-flex;
  align-items: center;
  margin-left: 1rem;
  cursor: pointer;
  user-select: none;
  font-weight: 600;
  font-size: 1rem;
  color: inherit;
}

.switch input {
  display: none;
}

.slider {
  position: relative;
  width: 40px;
  height: 20px;
  background-color: #ccc;
  border-radius: 34px;
  margin-right: 0.5rem;
  transition: background-color 0.3s;
}

.slider::before {
  content: "";
  position: absolute;
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s;
}

input:checked + .slider {
  background-color: #2a9d8f;
}

input:checked + .slider::before {
  transform: translateX(20px);
}
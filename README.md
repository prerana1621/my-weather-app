# 🌦️ My Weather App
<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Lucide-Icons-blueviolet" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/OpenWeather-API-orange?logo=openweathermap&logoColor=white" />
  <img src="https://img.shields.io/badge/AQI-Real--Time-success" />
  <img src="https://img.shields.io/badge/PM2.5-Tracked-blue" />
  <img src="https://img.shields.io/badge/Deployed%20On-Vercel-black?logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Responsive-Yes-brightgreen" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/ESLint-Enabled-4B32C3?logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/HMR-Fast%20Refresh-success" />
  <img src="https://img.shields.io/badge/Environment-Vite--Env-blue" />
  <img src="https://img.shields.io/badge/Build-Passing-success" />
  <img src="https://img.shields.io/badge/Status-Active-success" />
</p>

A modern, responsive **Weather & Air Quality web application** built using **React + Vite** and styled with **Tailwind CSS v4**.  
It provides **real-time weather data**, **air quality index (AQI)**, and **PM2.5 levels** for any city worldwide using the **OpenWeather API**.

---

## 🚀 Live Demo
🔗 View the live application:
👉 https://my-weather-app-one-beta.vercel.app/

Deployed using Vercel for fast global delivery and optimized React performance.

---
## ✨ Features

- 🌍 **Search weather by city name**
- 🌡️ **Real-time temperature (°C)**
- 💧 **Humidity & Wind speed**
- 🌬️ **Air Quality Index (AQI)**
- 🧪 **PM2.5 concentration**
- 🎨 **Dynamic background based on temperature**
- 🧊 **Glassmorphism UI**
- 📱 **Fully responsive design**
- ⚡ **Fast loading with Vite**
- ❌ **Graceful error handling for invalid cities**

---
## 🛠️ Tech Stack

| Technology | Usage |
|---------|------|
| **React 19** | UI library |
| **Vite 7** | Build tool |
| **Tailwind CSS v4** | Styling |
| **Lucide React** | Icons |
| **OpenWeather API** | Weather & AQI data |
| **ESLint** | Code quality |

---

## 📁 Project Structure
```text
my-weather-app/
├── public/
├── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── index.css
│ └── App.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_openweather_api_key
```
🔗 Get your API key from:
https://openweathermap.org/api

---
## 📦 Installation & Setup
```bash
# Clone the repository
git clone https://github.com/your-username/my-weather-app.git

# Navigate into project
cd my-weather-app

# Install dependencies
npm install

# Start development server
npm run dev
```

---
## 🧪 Build for Production
```bash
npm run build
npm run preview
```

---
## 🧠 How It Works
**1.** User searches for a city

**2.** App fetches:
- Weather data (/weather)
- Air pollution data (/air_pollution)

**3.** UI updates dynamically

**4.** AQI is categorized into:
- Good
- Fair
- Moderate
- Poor
- Very Poor

---
## ⚠️ Known Limitations
- Requires internet connection
- API rate limits apply
- AQI data depends on OpenWeather availability

---
## 🌱 Future Improvements
- 📍 Auto-detect user location
- 🌙 Dark mode toggle
- 📆 5-day forecast
- 🗺️ Interactive map view
- 💾 Search history

---
## 🤝 Contributing
Contributions are welcome!
```bash
# Fork the repository
# Create a new branch
git checkout -b feature-name
# Commit changes
git commit -m "Add feature"
# Push branch
git push origin feature-name
```

---
## 👤 Author
Prerana Acharyya

Aspiring Software Engineer

GitHub Link:- https://github.com/prerana1621

---
⭐ If you like this project, give it a star!

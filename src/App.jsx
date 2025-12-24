import React, { useState } from 'react';
import { Search, Wind, Droplets, MapPin } from 'lucide-react';

const API_KEY = import.meta.env.VITE_API_KEY;

const api = {
  key: API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [aqi, setAqi] = useState(null);
  const [pm25, setPm25] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async (evt) => {
    if (evt.key === "Enter" || evt.type === "click") {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(
          `${api.base}weather?q=${query}&units=metric&appid=${api.key}`
        );

        if (!res.ok) {
          if (res.status === 404)
            throw new Error("City not found. Please check spelling.");
          throw new Error("Something went wrong. Try again.");
        }

        const result = await res.json();
        setWeather(result);

        const { lat, lon } = result.coord;
        const aqiRes = await fetch(
          `${api.base}air_pollution?lat=${lat}&lon=${lon}&appid=${api.key}`
        );
        const aqiData = await aqiRes.json();

        setAqi(aqiData.list[0].main.aqi);
        setPm25(aqiData.list[0].components.pm2_5);

        setQuery('');
      } catch (err) {
        setError(err.message);
        setWeather({});
        setAqi(null);
        setPm25(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const getBackground = () => {
    if (typeof weather.main === "undefined") return "from-blue-400 to-blue-600";
    if (weather.main.temp > 25) return "from-orange-400 to-red-600";
    if (weather.main.temp < 15) return "from-cyan-400 to-blue-800";
    return "from-green-400 to-teal-600";
  };

  const dateBuilder = (d) => {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const getAqiLabel = (aqi) => {
    switch (aqi) {
      case 1: return { text: "Good", color: "text-emerald-300", desc: "Air quality is satisfactory" };
      case 2: return { text: "Fair", color: "text-lime-300", desc: "Acceptable air quality" };
      case 3: return { text: "Moderate", color: "text-sky-200", desc: "Sensitive groups may feel effects" };
      case 4: return { text: "Poor", color: "text-pink-400", desc: "Health effects possible" };
      case 5: return { text: "Very Poor", color: "text-rose-500", desc: "Serious health effects" };
      default: return { text: "Unknown", color: "text-gray-200", desc: "" };
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getBackground()} transition-all duration-500 p-4`}>
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/30 p-8 text-white">

        <div className="flex items-center space-x-2 bg-white/30 rounded-xl p-3 mb-8 shadow-inner transition hover:bg-white/40">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none placeholder-white/70 text-lg font-medium"
            placeholder="Search city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <button onClick={search} className="p-2 hover:bg-white/20 rounded-full transition">
            <Search size={24} />
          </button>
        </div>

        {loading && <div className="text-center text-xl animate-pulse font-semibold">Fetching weather...</div>}
        {error && <div className="text-center text-red-100 bg-red-500/30 p-3 rounded-lg border border-red-500/50">{error}</div>}

        {(typeof weather.main !== "undefined") && (
          <div className="text-center animate-in fade-in zoom-in duration-500">
            <div className="flex justify-center items-center space-x-2 mb-2">
              <MapPin size={20} />
              <div className="text-2xl font-bold tracking-wider drop-shadow-md">
                {weather.name}, {weather.sys.country}
              </div>
            </div>

            <div className="text-sm font-light italic mb-8 opacity-90">
              {dateBuilder(new Date())}
            </div>

            <div className="relative inline-block mb-6">
              <div className="text-9xl font-bold drop-shadow-xl">
                {Math.round(weather.main.temp)}°
              </div>
              <div className="text-2xl font-medium mt-[-10px] capitalize tracking-wide">
                {weather.weather[0].description}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-white/20 rounded-xl p-4 flex flex-col items-center hover:bg-white/30 transition shadow-lg">
                <Droplets size={28} className="mb-2" />
                <span className="text-sm opacity-80">Humidity</span>
                <span className="text-xl font-bold">{weather.main.humidity}%</span>
              </div>

              <div className="bg-white/20 rounded-xl p-4 flex flex-col items-center hover:bg-white/30 transition shadow-lg">
                <Wind size={28} className="mb-2" />
                <span className="text-sm opacity-80">Wind Speed</span>
                <span className="text-xl font-bold">{weather.wind.speed} m/s</span>
              </div>

              {aqi && (
                <div className="group bg-white/20 rounded-xl p-4 flex flex-col items-center hover:bg-white/30 transition shadow-lg relative">
                  <span className="text-sm opacity-80">Air Quality</span>

                  {/* FIX: prevent wrapping */}
                  <span className={`text-sm font-bold px-3 py-1 rounded-full mt-1 whitespace-nowrap ${getAqiLabel(aqi).color}`}>
                    {getAqiLabel(aqi).text}
                  </span>

                  {pm25 !== null && (
                    <span className="text-xs opacity-70 mt-1">
                      PM2.5: {pm25.toFixed(1)} µg/m³
                    </span>
                  )}

                  <div className="
                    absolute bottom-full mb-2
                    hidden group-hover:block
                    bg-white/20 backdrop-blur-md
                    border border-white/30
                    text-xs text-white
                    px-3 py-2
                    rounded-xl
                    shadow-lg
                    transition-all duration-200
                  ">
                    {getAqiLabel(aqi).desc}

                    <div className="
                      absolute left-1/2 -translate-x-1/2 top-full
                      w-0 h-0
                      border-l-6 border-r-6 border-t-6
                      border-l-transparent border-r-transparent
                      border-t-white/30
                    " />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {(typeof weather.main === "undefined" && !loading && !error) && (
          <div className="text-center mt-10 opacity-70">
            <p className="text-lg">Enter a location to see the magic.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

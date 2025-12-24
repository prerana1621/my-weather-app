import React, { useState } from 'react';
import { Search, Wind, Droplets, MapPin } from 'lucide-react';

const API_KEY = import.meta.env.VITE_API_KEY; 

const api = {
  key: API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async (evt) => {
    if (evt.key === "Enter" || evt.type === "click") {
      setLoading(true);
      setError('');
      
      try {
        const res = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
        
        if (!res.ok) {
           if(res.status === 404) throw new Error("City not found. Please check spelling.");
           throw new Error("Something went wrong. Try again.");
        }
        
        const result = await res.json();
        setWeather(result);
        setQuery('');
      } catch (err) {
        setError(err.message);
        setWeather({});
      } finally {
        setLoading(false);
      }
    }
  }

  const getBackground = () => {
    if (typeof weather.main === "undefined") return "from-blue-400 to-blue-600";
    if (weather.main.temp > 25) return "from-orange-400 to-red-600";
    if (weather.main.temp < 15) return "from-cyan-400 to-blue-800";
    return "from-green-400 to-teal-600";
  };

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

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

        {(typeof weather.main != "undefined") && (
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

            <div className="grid grid-cols-2 gap-4 mt-4">
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
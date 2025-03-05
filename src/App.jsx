import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './App.css';

const API_key = "7fdce1ac59162e10f5778601ea44c4f8";

function App() {
  const [city, setCity] = useState('Coimbatore');
  const [inputCity, setInputCity] = useState('');

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => getWeather(city, API_key),
    enabled: !!city, // Prevents the query from running if city is empty
  });

  const handleSearch = () => {
    if (inputCity.trim() !== '') {
      setCity(inputCity);
      refetch(); // Manually refetch data
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>Something went wrong. Please try again.</p>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Weather Search</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Enter city name"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button onClick={handleSearch} style={{ padding: "8px" }}>
        Search
      </button>

      {/* Display Weather Data */}
      {isLoading ? (
        <p>Loading weather data...</p>
      ) : data?.cod !== 200 ? (
        <p style={{ color: "red" }}>City not found. Try another city.</p>
      ) : (
        <>
          <pre>Weather: {data.weather[0]?.main}</pre>
          <div>Longitude: {data.coord?.lon}</div>
          <div>Latitude: {data.coord?.lat}</div>

          {/* Weather Icon */}
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`}
              alt="Weather icon"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        </>
      )}
    </div>
  );
}

// Fetch weather data
const getWeather = async (city, API_key) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
    );
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "City not found");
    }

    return result;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return { cod: 404, message: "City not found" }; // Return a safe fallback object
  }
};

export default App;

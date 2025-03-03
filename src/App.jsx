import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from '@tanstack/react-query'

function App() {

  const [city, setCity] = useState('London');


  const { data, error } = useQuery({
    queryKey: ['weather',city],
    queryFn: () => getTodos(city,API_key)
  });

  if (error) {
    alert("Something's wrong")
  };

  const API_key = "7fdce1ac59162e10f5778601ea44c4f8"


  // https://api.openweathermap.org/data/3.0/weather?q={city name}&appid={API key}

  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <pre style={{
        backgroundColor: '#f0f0f0', // Light gray background
        padding: '10px', // Add some padding
        borderRadius: '5px', // Rounded corners
        overflowX: 'auto', // Scrollbar for long lines
        whiteSpace: 'pre-wrap', // Wrap long lines
        wordWrap: 'break-word' // Break words if necessary
      }}>
        {JSON.stringify(data, null, 2)}
      </pre>

      </div>
    </>
  )
}

const getTodos = async(city,API_key) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
  // console.log(response);
  return await response.json();
}

export default App

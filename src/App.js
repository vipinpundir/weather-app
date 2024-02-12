import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import WeatherContext from './WeatherContext';
import { useState } from 'react';

function App() {
  const [daysforecast, setDaysforecast] = useState('');


  return (
    <div className="App">
      <Link to='/'>Home</Link>
      <Link to='/details  '>Details</Link>

      <WeatherContext.Provider value={{ daysforecast, setDaysforecast }}>
        <Routes>
          <Route path="/" exact element={<Home></Home>} />
          <Route path="/details" element={<Details></Details>} />
        </Routes>
      </WeatherContext.Provider>

    </div>
  );
}

export default App;

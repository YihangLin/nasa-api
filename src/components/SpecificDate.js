import { useState, useEffect } from "react";
import { useFetchUrl } from "../hooks/useFetchUrl";

import './form.css';

export default function SpecificDate() {
  const [date, setDate] = useState('');
  const [currentDate, setCurrentDate] = useState(null);
  const { fetchData } = useFetchUrl();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt&date=${date}`);
  }

  useEffect(() => {
    //get today's date in format YYYY-MM-DD
    const today = new Date();
    const current = today.getFullYear() + '-' + (('0' + today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    setCurrentDate(current);
  }, [])

  return (
    <form onSubmit={handleSubmit} className='date-picker'>
      <label>
        <span>Date:</span>
        <input type="date"
          required
          min='1995-06-16'
          max={currentDate}
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </label>
      <button>Submit</button>
    </form>
  )
}

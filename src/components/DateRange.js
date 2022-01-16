import './form.css';

import { useState, useEffect } from 'react';
import { useFetchUrl } from "../hooks/useFetchUrl";


export default function DateRange() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentDate, setCurrentDate] = useState(null);
  const { fetchData } = useFetchUrl();



  const handleSubmit = (e) => {
    e.preventDefault();

    if (endDate) {
      fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt&start_date=${startDate}&end_date=${endDate}`);
    } else {
      fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt&start_date=${startDate}&end_date=${currentDate}`);
    }
   
  }

  useEffect(() => {
    const today = new Date();
    const current = today.getFullYear() + '-' + (('0' + today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

    setCurrentDate(current);
  }, [])

  return (
    <form onSubmit={handleSubmit} className='date-picker'>
      <label>
        <span>Start Date: </span>
        <input type="date"
          required
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
        />
      </label>

      <label>
        <span>End Date: (default value: today)</span>
        <input type="date"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
          min={startDate}
          max={currentDate}
        />
      </label>
      <button>Submit</button>
    </form>
  )
}

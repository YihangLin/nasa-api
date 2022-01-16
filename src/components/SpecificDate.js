import { useState, useEffect } from "react";
// import { useFetch } from "../hooks/useFetchUrl";
import { useFetchUrl } from "../hooks/useFetchUrl";
import './form.css';

export default function SpecificDate() {
  const [date, setDate] = useState('');
  const [currentDate, setCurrentDate] = useState(null);
  // const { retrieveByDate } = useFetch('date');
  const { fetchData } = useFetchUrl();

  // console.log(date);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // console.log(date);
    // console.log('Test date: ', date < currentDate);

    fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt&date=${date}`);
    // setShowPicker(false);

    // retrieveByDate(date);
  }

  useEffect(() => {
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
          max={currentDate}
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </label>
      <button>Submit</button>
    </form>
  )
}

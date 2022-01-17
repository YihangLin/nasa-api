import './form.css';

import { useState } from 'react';
import { useFetchUrl } from "../hooks/useFetchUrl";


export default function Count() {
  const [count, setCount] = useState(0);
  const { fetchData } = useFetchUrl();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}&count=${count}`);
  }

  return (
    <form onSubmit={handleSubmit} className='date-picker'>
      <label>
        <span>Choose # of random images: </span>
        <input type="number"
          required
          min='1'
          max='100'
          onChange={(e) => setCount(e.target.value)}
          value={count}
        />
      </label>
      <button>Submit</button>
    </form>
  )
}

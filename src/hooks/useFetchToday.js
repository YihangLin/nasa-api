import { useEffect, useState } from "react"

export const useFetchToday = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {

      try {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`, { 
          signal: controller.signal 
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = await res.json();

        setData(data);
        setError(null);

      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('The fetch was aborted.');
        } else {
          setError('Could not fetch the data');
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    }

  }, [])

  return { data, error };
}
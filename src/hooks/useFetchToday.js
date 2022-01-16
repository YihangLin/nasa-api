import { useEffect, useState } from "react"
// import { useDataContext } from "./useDataContext";

export const useFetchToday = () => {
  // const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  // const { dispatch } = useDataContext();
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      // setIsPending(true);
      // dispatch({ type: 'IS_PENDING' });

      try {
        const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt', { 
          signal: controller.signal 
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = await res.json();
        // setIsPending(false);
        setData(data);
        setError(null);

      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('The fetch was aborted.');
        } else {
          // setIsPending(false);
          // dispatch({ type: 'ERROR', payload: err.message });
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
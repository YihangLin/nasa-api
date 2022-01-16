import { useState, useEffect, useRef } from 'react';
import { useDataContext } from './useDataContext';
import { useNavigate } from 'react-router';

export function useFetchUrl() {
  // const [data, setData] = useState(null);
  // const [isPending, setIsPending] = useState(false);
  // const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useDataContext();
  let navigate = useNavigate();
  // const [url, setUrl] = useState('https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt');
  // const [specificDate, setSpecificDate] = useState(null);
  // const [dateRange, setDateRange]= useState(null);
  // const [dateRangeEnd, setDateRangeEnd] = useState(null);
  // const [count, setCount] = useState(null);

  const controller = new AbortController();

  const controllerRef = useRef(controller).current;
// console.log(method)
  // https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt

  
 
    // console.log(specificDate);
    // console.log(url);

    const fetchData = async (url) => {
      dispatch({ type: 'IS_PENDING' });
      // setError(null);
      // setIsPending(true);
  
      try {
        // console.log('insider try');
        // console.log(url);
        const res = await fetch(url, {
          signal: controllerRef.signal
        });

        // console.log('got res');

  
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        
        const data = await res.json();
  
        if (!isCancelled) {
          // setIsPending(false);
          // setError(null);
          // setData(data);
          dispatch({ type: 'UPDATE_APODS', payload: data });
          navigate('/');
        }
        // console.log(data);
  
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('The fetch was aborted.');
        } else {
          if (!isCancelled) {
            dispatch({ type: 'ERROR', payload: 'Could not fetch the data' });
            // setError('Could not fetch the data.');
            // setIsPending(false);
          }
        }
      }
    }

    // switch (method) {
    //   case 'date':
    //     console.log('date inside')
    //     if (specificDate) {
    //       fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt&date=${specificDate}`);
    //     };
    //     break;
    //   case 'range':
    //     if (dateRange.end) {
    //       fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt&start_date=${dateRange.start}&end_date=${dateRange.end}`);
    //     } else {
    //       fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt&start_date=${dateRange.start}`);
    //     }
    //     break;
    //   case 'count':
    //     if (count) {
    //       fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt&count=${count}`);
    //     }
    //     break;
    //   case 'today':
    //     // console.log('!!!defaulat')
    //     fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt`);
    //     break;
    //   default:
    //     console.log('Fetch error');
    //     setError('fetch error');
    // }


    // fetchData(url);
    // if (specificDate) {
    //   fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt&date=${specificDate}`);
    // } else if (dateRangeStart) {
    //   if (dateRangeEnd) {
    //     fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt&start_date=${dateRangeStart}&end_date=${dateRangeEnd}`);
    //   } else {
    //     fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt&start_date=${dateRangeStart}`);
    //   }
    // } else if (count) {
    //   fetchData(`https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt&count=${count}`)
    // } else {
    //   fetchData('https://api.nasa.gov/planetary/apod?api_key=zbx76pkENqyu42zyIpuPVRyckxWYdO7LdH9t8rVt');
    // }
    useEffect(() => {


      return () => {
        setIsCancelled(true);
        controllerRef.abort();
    }
  }, [controllerRef])


  return { fetchData }
}

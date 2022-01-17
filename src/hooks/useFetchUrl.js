import { useEffect, useRef } from 'react';
import { useDataContext } from './useDataContext';
import { useNavigate } from 'react-router';

export function useFetchUrl() {
  const { dispatch } = useDataContext();
  let navigate = useNavigate();
  const controller = new AbortController();
  const controllerRef = useRef(controller).current;

  const fetchData = async (url) => {
    dispatch({ type: 'IS_PENDING' });

    // close the date picker area and sidebar
    dispatch({ type: 'UPDATE_SHOW_PICKER', payload: false });
    dispatch({ type: 'UPDATE_SHOW_SIDEBAR', payload: false })

    try {
      const res = await fetch(url, {
        signal: controllerRef.signal
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }
      
      const data = await res.json();

      //update results in context
      dispatch({ type: 'UPDATE_APODS', payload: data });

      //redirect to homepage if in Liked Images page
      navigate('/');

    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('The fetch was aborted.');
      } else {
        dispatch({ type: 'ERROR', payload: 'Could not fetch the data' });
      }
    }
  }


  useEffect(() => {
    return () => {
      controllerRef.abort();
    }
  }, [controllerRef])


  return { fetchData }
}

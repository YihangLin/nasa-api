import { createContext, useReducer, useEffect } from "react";
// import { useFetch } from "../hooks/useFetch";
import { useFetchToday } from "../hooks/useFetchToday";

export const DataContext = createContext();

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { ...state, apod: null, isPending: true, error: null };
    case 'ERROR': 
      return { ...state, apod: null, isPending: false, error: action.payload };
    case 'UPDATE_APODS':
      return { ...state, apod: action.payload, error: null, isPending: false };
    case 'UPDATE_LIKED_APODS':
      return { ...state, likedApods: action.payload }
    default:
      return state;
  }
}

export const DataContextProvider = ({ children }) => {
  // const { data, isPending, error } = useFetch('today');
  const { data, error } = useFetchToday();
  const [state, dispatch] = useReducer(dataReducer, {
    apod: null,
    // initialApodReady: false,
    error: null,
    isPending: false,
    likedApods: []
  })

  useEffect(() => {
    dispatch({ type: 'IS_PENDING' });

    const localLikedApods = JSON.parse(localStorage.getItem('apods'));

    if (localLikedApods) {
      dispatch({ type: 'UPDATE_LIKED_APODS', payload: localLikedApods });
    } else {
      localStorage.setItem('apods', JSON.stringify([]));
    }

    if (data) {
      dispatch({ type: 'UPDATE_APODS', payload: data });
    }

    if (error) {
      dispatch({ type: 'ERROR', payload: error })
    }
  }, [data, error])

  // console.log('Date state: ', data);

  return (
    <DataContext.Provider value={{...state, dispatch}}>
      { children }
    </DataContext.Provider>
  )
}
import { createContext, useReducer, useEffect } from "react";
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
      return { ...state, likedApods: action.payload };
    case 'UPDATE_SHOW_PICKER':
      return { ...state, showPicker: action.payload };
    case 'UPDATE_PICKER':
      return { ...state, picker: action.payload };
    case 'UPDATE_SHOW_SIDEBAR':
      return { ...state, showSidebar: action.payload };
    default:
      return state;
  }
}

export const DataContextProvider = ({ children }) => {
  // useFetchToday hook to get APOD of today as default
  const { data, error } = useFetchToday();
  const [state, dispatch] = useReducer(dataReducer, {
    apod: null,
    error: null,
    isPending: false,
    picker: null,
    showPicker: false,
    showSidebar: false,
    likedApods: []
  })

  useEffect(() => {
    dispatch({ type: 'IS_PENDING' });

    // check if there is any Likded Images in localstorage
    const localLikedApods = JSON.parse(localStorage.getItem('apods'));

    if (localLikedApods) {
      dispatch({ type: 'UPDATE_LIKED_APODS', payload: localLikedApods });
    } else {
      //created empty localstorage for Liked Images
      localStorage.setItem('apods', JSON.stringify([]));
    }

    if (data) {
      dispatch({ type: 'UPDATE_APODS', payload: data });
    }

    if (error) {
      dispatch({ type: 'ERROR', payload: error })
    }
  }, [data, error])

  return (
    <DataContext.Provider value={{...state, dispatch}}>
      { children }
    </DataContext.Provider>
  )
}
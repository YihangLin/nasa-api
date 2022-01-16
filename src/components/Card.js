import './Card.css';

import { useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';

export default function Card({ apod }) {
  const [like, setLike] = useState(false);
  const { dispatch } = useDataContext();

  const handleLiked = (new_apod) => {
    setLike(true);
    let currentLikedApods = JSON.parse(localStorage.getItem('apods'));
    currentLikedApods.push({...new_apod, like: true});
    localStorage.setItem('apods', JSON.stringify(currentLikedApods));
    dispatch({ type: 'UPDATE_LIKED_APODS', payload: currentLikedApods });
  }

  const handleUnliked = (new_apod) => {
    setLike(false);
    const currentLikedApods = JSON.parse(localStorage.getItem('apods'));
    const afterUnliked = currentLikedApods.filter(item => new_apod.url !== item.url);

    localStorage.setItem('apods', JSON.stringify(afterUnliked));
    dispatch({ type: 'UPDATE_LIKED_APODS', payload: afterUnliked });
  }

  return (
      <div className='card'>
        <h2>{apod.title}</h2>
        <h3>{apod.date}</h3>
        {apod.copyright && <h3>Copyright: {apod.copyright}</h3>}
        <span>Brought to you by NASA's Astronomy Picture of the Day (APOD) API</span>
        <div className='card-img-container'>
          <img src={apod.url} alt="apod" />
        </div>
        {apod.like || like ?
          <div className='apod-liked'>
            <svg onClick={()=> handleUnliked(apod)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
          :
          <div>
            <svg onClick={()=> handleLiked(apod)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/></svg>
          </div>
        }
        <p>{apod.explanation}</p>
      </div>
  )
}

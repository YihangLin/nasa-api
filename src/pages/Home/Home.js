import { useDataContext } from "../../hooks/useDataContext";

import './Home.css';
import Card from "../../components/Card";
import Loading from "../../components/Loading";

export default function Home() {
  const { apod, isPending, error, dispatch } = useDataContext();

  return (
    <div className='home-container' onClick={()=> dispatch({ type: 'UPDATE_SHOW_PICKER', payload: false })}>
      <div className='home'>
        {isPending && <Loading />}
        {error && <div className='error'>{error}</div>}
        <div className='home-title'>
          <h1>Spacestagram</h1>
          <span>Brought to you by NASA's Astronomy Picture of the Day (APOD) API</span>
        </div>
        
        {/* check if result is an array */}
        {apod && Array.isArray(apod) &&
          apod.map((pod) => (
            <Card key={pod.url} apod={pod}/>
          ))
        }
        
        {apod && !Array.isArray(apod) && <Card apod={apod}/>}  
      </div>
     </div>
  )
}

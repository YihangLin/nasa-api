import { useDataContext } from "../../hooks/useDataContext";

import Card from "../../components/Card";
import Loading from "../../components/Loading";

export default function Liked() {
  const { likedApods, isPending, error } = useDataContext();

  return (
    <div className='home-container'>
      {isPending && <Loading />}
      {error && <div className='error'>{error}</div>}

      {/* show liked images if they exist (get from context)  */}
      {(likedApods && likedApods.length !== 0) && 
        <div className='home'>
          <div className='home-title'>
            <h1>APOD</h1>
            <span>Brought to you by NASA's Astronomy Picture of the Day (APOD) API</span>
          </div>
          {likedApods.map((pod) => (
            <Card key={pod.url} apod={pod}/>
          ))}
        </div>
      }


      {(!likedApods || likedApods.length === 0) &&
        <div className='home-liked-images'>
          <h2>You haven't liked any pictures yet.</h2>
        </div>
      }
     </div>
  )
}

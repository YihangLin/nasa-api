// import { useFetch } from "../../hooks/useFetchUrl";
// import { useEffect } from "react";
import { useDataContext } from "../../hooks/useDataContext";

import Card from "../../components/Card";
import Loading from "../../components/Loading";

export default function Liked() {
  const { likedApods, isPending, error } = useDataContext();
  // const { data, isPending, error, fetchData } = useFetch();
  // const [date, setDate] = useState('');

// console.log(isPending);
  // useEffect(() => {

  // if (apod) {
  //   console.log(apod);
  // }

  //   if (data) {
  //     console.log(Array.isArray(data));

  //     console.log(data);
  //   }
  // }, [data])

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log(date);
  // }

  return (
    <div className='home-container'>
      {isPending && <Loading />}
      {error && <div className='error'>{error}</div>}
      {(likedApods && likedApods.length !== 0) && likedApods.map((pod) => (
        <Card key={pod.url} apod={pod}/>
      ))
      }
      {(!likedApods || likedApods.length === 0) &&
        <div>
          <h2>You haven't liked any pictures yet.</h2>
        </div>
      }
      
      
     </div>
  )
}

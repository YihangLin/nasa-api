// import { useFetch } from "../../hooks/useFetchUrl";
// import { useEffect } from "react";
import { useDataContext } from "../../hooks/useDataContext";

import './Home.css';
import Card from "../../components/Card";
import Loading from "../../components/Loading";

export default function Home() {
  const { apod, isPending, error } = useDataContext();
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
      {apod && Array.isArray(apod) &&
        apod.map((pod) => (
          <Card key={pod.url} apod={pod}/>
        ))
      }
      
      {apod && !Array.isArray(apod) && <Card apod={apod}/>}  
     </div>
  )
}

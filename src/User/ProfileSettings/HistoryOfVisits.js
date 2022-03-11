import UserMenu from "../UserMenu";
import { useEffect,useState } from "react";
import Axios from "axios";
import Navbar from "../Navbar";
import './HistoryOfVisits.css';

function HistoryOfVisits() {
  const [visits,setVisits] = useState([])
  useEffect(() => {
    const getVisits = async () => {
      try {
        const newPost = {username : localStorage.getItem("User")}
        const resp = await Axios.post("http://localhost:3001/api/visits",newPost);
        setVisits(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    getVisits();
  }, []);

  return (
    <>
    <Navbar />
    <div className="mmm">
      <h1>You have visited :</h1>
      {visits.length<=0 ?
        <div><h1>You haven't made a visit yet</h1></div> : 
        visits.map((item) => {
          return( 
            <>
              <div className="pois">
                <h3>PoiName : {item.poi_name}</h3> 
              </div>  
              <div className="people"> 
                <h3>People in the store : {item.people}</h3>        
              </div>
              <div className="datetime">
                <h3>Date and time : {item.datetime} </h3>
              </div>
            </>
        )})}
      </div>    
  

    <div class="footer">
      <p>Avramopoulos &copy;<br/>Psiris &copy;</p>
    </div>
  </>
  )
}

export default HistoryOfVisits;

import Axios from "axios";
import { useEffect,useState } from "react";
import Navbar from "../Navbar";
import './HistoryOfStateACovidCase.css';

function HistoryOfStateACovidCase() {
  
  const [cases,setCases] = useState([])
  useEffect(() => {
    const getCases = async () => {
      try {
        const newPost = {username : localStorage.getItem("User")}
        const resp = await Axios.post("http://localhost:3001/api/cases",newPost);
        setCases(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    getCases();
  }, []);

  return (
  <>
  <Navbar />
  
      {cases.length<=0 ?
      <div className="bigbox">
      <div className="box">
        <h1>You haven't stated a case yet</h1>
        </div>
        </div>:
         <div className="bigbox">
         <div className="box">
           <h1>You have been stated as a covid case on:</h1>
        {cases.map((item) => {
          return <h5>{String(item.date).substring(0,10)}</h5>
        })}
        </div>
      </div>}
      
  </>
  )
}

export default HistoryOfStateACovidCase

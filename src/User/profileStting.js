import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function profileStting() {
   //function for the logout button
  const handleLogout = () => {
    localStorage.clear();
    window.location.pathname = "/Login";
  }
  
  return (
    <>
    <Navbar/>
    <div>
        <ul>
          <li>
            <Link to="/UserHome">UserHome</Link>
          </li>
          <li>
            <Link to="/StateCovidCase">StateCovidCase</Link>
          </li>
          <li>
            <Link to="/contactWithCovidCase">contactWithCovidCase</Link>
          </li>
          <li>
            <Link to="/profileStting">profileStting </Link>
          </li>
          <li>
          <button className='LogoutButton' onClick={handleLogout}>Logout</button>
          </li>
        </ul>

       
      </div>
      
      
      
      </>
  )
}

export default profileStting

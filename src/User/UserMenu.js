import React from "react";
import { Link } from "react-router-dom";

function UserMenu() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.pathname = "/Login";
  };

  return (
    <div>
      <ul>
        <li>
          <Link to="/UserHome">UserHome</Link>
        </li>
        <li>
          <Link to="/SearchPOIs">SearchPOIs</Link>
        </li>
        <li>
          <Link to="/CheckIn">CheckIn</Link>
        </li>
        <li>
          <Link to="/StateCovidCase">StateCovidCase</Link>
        </li>
        <li>
          <Link to="/contactWithCovidCase">contactWithCovidCase</Link>
        </li>
        <li>
          <Link to="/ProfileSettings">ProfileSettings </Link>
        </li>
        <ul>
          <li>
            <Link to="/ProfileSettings/EditProfile">EditProfile </Link>
          </li>
          <li>
            <Link to="/ProfileSettings/HistoryOfStateACovidCase">
              HistoryOfStateACovidCase{" "}
            </Link>
          </li>
          <li>
            <Link to="/ProfileSettings/HistoryOfVisits">HistoryOfVisits </Link>
          </li>
        </ul>
        <li>
          <button className="LogoutButton" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default UserMenu;

import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import UserMenu from "../UserMenu";

function ProfileSettings() {
  //function for the logout button
  const handleLogout = () => {
    localStorage.clear();
    window.location.pathname = "/Login";
  };

  return (
    <Navbar />
  );
}

export default ProfileSettings;

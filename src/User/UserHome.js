import React from 'react';
import MapWithCurrentLocation from './Maps/MapWithCurrentLocation';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
const UserHome = () => {
  
  //function for the logout button
  const handleLogout = () => {
    localStorage.clear();
    window.location.pathname = "/Login";
  }
  
  return (
    <>
      <Navbar />
      <MapWithCurrentLocation />
      
      </>
  );
};

export default UserHome;
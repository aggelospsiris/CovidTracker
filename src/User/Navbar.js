import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.pathname = "/Login";
  }
  
  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/Userhome' className='navbar-logo' onClick={closeMobileMenu}>
            Covid-19 
            <i class="fas fa-bacterium"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <div className='navlinks'>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/Userhome' 
              className='nav-links' 
              onClick={closeMobileMenu}
              >
                <i class='fas fa-home' />
                 Current location
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/SearchPOIs' 
              className='nav-links' 
              onClick={closeMobileMenu}
              >
                <i class="fas fa-search-location"/>
                Search POIs
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/CheckIn' 
              className='nav-links' 
              onClick={closeMobileMenu}
              >
                <i class="fas fa-map-marker-alt"/>
                Check In
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/StateCovidCase'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <i class="far fa-calendar"/>
                State your case
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/ContactWithCovidCase'
                className='nav-links'
                
                onClick={closeMobileMenu}
              >
                <i class="fa fa-phone"/>
                Contacts with covid cases
              </Link>
            </li>
            
            <li className='nav-item'>
              <Link
                to='/ProfileSettings/EditProfile'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <i class="fas fa-user"/>
                Profile
                <div className='submenu'>
                  <ul>
                    <li className='subli'>
                      <Link 
                        to='/ProfileSettings/EditProfile'
                        className='nav-links'
                        onClick={closeMobileMenu}
                      >
                        Edit Profile
                      </Link>
                    </li>
                    <li className='subli'>
                      <Link 
                        to='/ProfileSettings/HistoryOfStateACovidCase'
                        className='nav-links'
                        onClick={closeMobileMenu}
                      >
                        History of state a covid case
                      </Link>
                    </li>
                    <li className='subli'>
                      <Link 
                        to='/ProfileSettings/HistoryOfVisits'
                        className='nav-links'
                        onClick={closeMobileMenu}
                      >
                        History of visits
                      </Link>
                    </li>
                    
                  </ul>
                    
                </div>
              </Link>
              
            </li>
            <li className='nav-item'>
            <button className='nav-btn' onClick={handleLogout}>Logout</button>
            </li>
          </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminMenu.css';

function AdminMenu() {
    
    const handleLogout = () => {
        localStorage.clear();
        window.location.pathname = "/Login";
    }
    
    
    
    return (
        <nav className='navv'>
            <div className='containerr'>
             
                <Link to='/AdminHome' className='logooo'>
                    Admin's Page
                </Link>
                <ul className='nav-mennu'>
                    <li className='nav-itemmm'>
                    <Link className='nav-links'  to="/AddNewPoi">Pois settings</Link>
                    </li>
                    
                    <li className='nav-itemmm'>
                    <Link className='nav-links' to="/Charts">Charts</Link>

                        <div className='submenu'>
                          <ul>
                            <li>
                                <a href='#chart1'>chart1</a>
                            </li>
                            <li>
                                <a href='#chart2'>chart2</a>
                            </li>
                            <li>
                                <a href='#chart3'>chart3</a>
                            </li>
                            <li>
                                <a href='#chart4'>chart4</a>
                            </li>
                            <li>
                                <a href='#chart5'>chart5</a>
                            </li>
                          </ul>
                        </div>
                    </li>
            
                    <li>
                    <button className='LogButton' onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
            
        </nav>
    )
}

export default AdminMenu
          
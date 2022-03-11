import React from 'react';
import AdminMenu from './AdminMenu';
import './AdminHome.css'
function AdminHome() {
    
    
    
    return (
        <>
            <AdminMenu />
            <div className='makisss'>
            <h1>Hello {localStorage.getItem("Admin")}</h1>
            </div>
            <div class="footer">
                <p>Avramopoulos &copy;<br/>Psiris &copy;</p>
            </div>
        </>
    )
}

export default AdminHome

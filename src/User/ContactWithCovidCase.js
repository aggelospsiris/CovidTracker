import React from 'react';
import Navbar from './Navbar';
import {useState,useEffect} from 'react'
import Axios from 'axios'
import './ContactWithCovidCase.css';
import { constants } from 'fs';

function ContactWithCovidCase() {
  
  const [contacts,setContacts] = useState([])
  useEffect(() => {
    const getContacts = async () => {
      try {
        const newPost = {username : localStorage.getItem("User")}
        const resp = await Axios.post("http://localhost:3001/api/contact",newPost);
        setContacts(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };
    getContacts();
  }, []);
  
  return (
    <>
      <Navbar />
      <div className='back'>
      <h1>You have  been in contact with a covid case in:</h1>
      {contacts.length<=0 ?
        <div className='mm'><h1>You haven't made a contact with a covid case yet!!!</h1></div> : 
        contacts.map((item) => {
          return (
          <div className='mm'>
            <div className='poi'>
              
              <h2>Poi Name :<br/> {item.poi_name}</h2>
            </div>
            <div className='date'>
              <h2>Date and time : {item.datetime}</h2> 
            </div>
          </div>
        )})}
      </div>

      <div class="footer">
      <p>Avramopoulos &copy;<br/>Psiris &copy;</p>
    </div>
      
    </>
    )
}

export default ContactWithCovidCase

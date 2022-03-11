import Axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Powerslap from "./video-2.mp4";
import "./login.css";

function Login() {
  localStorage.clear()
  //Εδω αποθηκευονται τα στοιχεια που βαζει ο χρηστης στο log in
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  
  const [user,setUser]=useState({
    username:"a",
    password:"1"  
  })
  //συναρτηση για ενημερονονται τα στοιχεια στο details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };
  //αρχικοποιω τα error με κενο
  const [error, setError] = useState("");
  //submit to log in
  const handleSubmit = (e) => {
    e.preventDefault();

    //if username or password field is empty, return error message
    if (details.username === "" || details.password === "") {
      setError("Empty field");
    } else {
      //Login Success
      Axios.post("http://localhost:3001/api/login", {
        username: details.username,
        password: details.password,
      }).then((response) => {
        if (response.data.message == "Wrong username") {
          setError(response.data.message);
        }else if(response.data.message == "Wrong password"){
          setError(response.data.message);
        } else if(response.data.message == "admin"){
          //Reg Success
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("Admin",details.username)
          window.location.pathname = "/AdminHome";
        }
        else if(response.data.message == "user"){
          //Reg Success
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("User",details.username)
          window.location.pathname = "/UserHome";
        }
      });
      return;
    }
  };

  return (
    <main className="log">
      <div className="logoo"><h1>COVID-19</h1> </div>
      <div className="text"><h2>Wecome to No.1 site for covid-19 <br/>Log-in now end prevent the spread of the virus! </h2></div>
   
    <div className="fotainer">
      <form onSubmit={handleSubmit} className="formmmm" noValidate>
        <h1>Welcome</h1>
        {error !== "" ? <div className="form-inputs">{error}</div> : ""}
        <div className="form-inputs">
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={details.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={details.password}
            onChange={handleChange}
          />
        </div>
        <button className="form-input-btn" type="submit">
          Login
        </button>
         <br/>
        <span className="form-input-login">
       
            <a href='/registration'>Don't have an account?</a>
        </span>
      </form>
    </div>
    <div class="footer">
      <p>Avramopoulos &copy;<br/>Psiris &copy;</p>
    </div>
    </main>
    );
}

export default Login;

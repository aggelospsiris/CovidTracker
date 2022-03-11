import React, { useState, useLayoutEffect } from "react";
import validate from "./validateInfo";
import { Link } from "react-router-dom";
import Powerslap from "./video-2.mp4";
import Axios from "axios";
import './registration.css';


function Registration() {
  //Εδω αποθηκευονται τα στοιχεια που βαζει ο χρηστης στο register
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  //error για το αν υπαρχει ηδη χρηστης με ιδιο username h email
  const [error, setError] = useState("");
  //ενημερονονται τα στοιχεια στο values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //με το που κανει submit εμφανισε λαθη,και κανε submitting true
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  /*χρησιμοποιω αυτη την συναρτηση καθως αν την αντικαθιστουσα με ενα απλο 
  if  statement δλδ 
      if (Object.keys(errors).length === 0 && isSubmitting) {
        localStorage.setItem("isAuthenticated", "true");
        console.log("isAuthenticeated");
        window.location.pathname = "/UserHome";
      } 
    τοτε ακομα και ο χρηστης εβαζε λαθος inputs με το πρωτο submit το     
    console.log(Object.keys(errors)); 
    εβγαζε οτι τα erros ειναι 0 και ετσι γινοταν authenticates χωρις ελενχο
  */
  //if [] τρεξε μια φορα και μην ξανατρεξεις
  //if [erros] τρεξε καθε φορα που τα λαθη αλλαζουν
  useLayoutEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      //send data into users table in the db
      Axios.post("http://localhost:3001/api/registration", {
        username: values.username,
        email: values.email,
        password: values.password,
      }).then(() => {
        console.log("success");
      });
     
      Axios.post("http://localhost:3001/api/confirmReg", {
        username: values.username,
        email: values.email,
      }).then((response) => {
          if(response.data.message){
            setError(response.data.message)
            }else{
              //Reg Success
              localStorage.setItem("isAuthenticated", "true");
              localStorage.setItem("User",values.username)
              window.location.pathname = "/UserHome";
            }
          
      });
    }
  }, [errors]);

  return (<>
  <main className="reg">
  <div className="logoo"><h1>COVID-19</h1> </div>
  <div className="text"><h2>Wecome to No.1 site for covid-19 <br/>Log-in now end prevent the spread of the virus! </h2></div>
   
    <div className="form-container">
        <form onSubmit={handleSubmit} className="form" noValidate>
          <h1>
            Get started  today! 
          </h1>
          {error !== "" ? <div className="form-inputs">{error}</div> : ""}
          <div className="form-inputs">
            <input
              className="form-input"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div className="form-inputs">
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="form-inputs">
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className="form-inputs">
            <input
              className="form-input"
              type="password"
              name="password2"
              placeholder="Confirm your password"
              value={values.password2}
              onChange={handleChange}
            />
            {errors.password2 && <p>{errors.password2}</p>}
          </div>
          <button className="form-input-btn" type="submit">
            Sign up
          </button>
          <br/>
          <span className="form-input-login">
          <a href='/login'>Already have an account?</a>        
            <br/>
          </span>
        </form>
        
      </div>
      <div class="footer">
          <p>Avramopoulos &copy;<br/>Psiris &copy;</p>
        </div>
      </main>
    </>
  );
}

export default Registration;

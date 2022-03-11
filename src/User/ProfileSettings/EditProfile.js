import React, { useState, useLayoutEffect } from "react";
import handleErrors from "./handleErrors";
import UserMenu from "../UserMenu";
import Axios from "axios";
import Navbar from "../Navbar";
import './EditProfile.css';

function EditProfile() {
  const [values, setValues] = useState({
    oldpassword: "",
    newusername: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setisSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setError("")
    e.preventDefault();
    setErrors(handleErrors(values));
    setisSubmitting(true);
    Axios.post("http://localhost:3001/api/confirmUpdate", {
      oldpassword: values.oldpassword,
      oldusername: localStorage.getItem("User"),
      newusername: values.newusername,
      password: values.password,
    }).then((responce) => {
      console.log(responce);
      if (responce.data.message) {
        setError("The old password is wrong!");
      }
    });
  };

  useLayoutEffect(() => {
    if (Object.keys(errors).length === 0 && error == "" && isSubmitting) {
      Axios.post("http://localhost:3001/api/editProfile", {
        oldpassword: values.oldpassword,
        oldusername: localStorage.getItem("User"),
        newusername: values.newusername,
        password: values.password,
      }).then((responce) => {
        if (responce.data.message ==  "Success" ) {
          console.log(responce.data.message);
          window.location.pathname = "/Login";
        }
      });
    }
  }, [errors, error]);

  return (
    <>
      <Navbar />

      <div className="con">
          <form
            name="form"
            id="form"
            onSubmit={handleSubmit}
            className="formmm"
            noValidate
          >
            <h1>Enter Your New Information</h1>
            <div className="form-inpu">
              <input
                className="form-input"
                type="password"
                name="oldpassword"
                placeholder="Enter your old password"
                value={values.oldpassword}
                onChange={handleChange}
              />
            </div>
            {error && <p>{error}</p>}
            <div className="form-inpu">
              <input
                className="form-input"
                type="text"
                name="newusername"
                placeholder="Enter your new new username"
                value={values.newusername}
                onChange={handleChange}
              />
              {errors.newusername && <p>{errors.newusername}</p>}
            </div>
            <div className="form-inpu">
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="Enter your new password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <div className="form-inpu">
              <input
                className="form-input"
                type="password"
                name="password2"
                placeholder="Confirm your new password"
                value={values.password2}
                onChange={handleChange}
              />
              {errors.password2 && <p>{errors.password2}</p>}
            </div>
            <br/>
            <button className="input-btn" type="submit">
              Change info and login again with your new info?
            </button>
           
          </form>
      </div>
       
    </>
  );
}

export default EditProfile;

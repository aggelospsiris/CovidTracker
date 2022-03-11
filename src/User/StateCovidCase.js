import React, { useState, useLayoutEffect } from "react";
import Axios from "axios";
import moment from "moment";
import Navbar from "./Navbar";
import "./StateCovidCase.css";

const StateCovidCase = () => {
  const [date, setDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate({
      ...date,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var date1 = new Date(moment().format("YYYY-MM-DD"));
    var date2 = new Date(moment(date.date).format("YYYY-MM-DD"));
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (Difference_In_Days > 0) {
      setErrors("Invalid date");
      console.log(Difference_In_Days);
    } else {
      Axios.post("http://localhost:3001/api/CovidCase", {
        username: localStorage.getItem("User"),
      }).then((response) => {
        if (response.data.message) {
          setErrors(response.data.message);
          console.log(Difference_In_Days);
        } else {
          console.log(response.data[0].date)
          date1 = new Date(moment(response.data[0].date).format("YYYY-MM-DD"));
          date2 = new Date(moment(date.date).format("YYYY-MM-DD"));
          Difference_In_Time = date2.getTime() - date1.getTime()
          Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          console.log(Difference_In_Days)
          if (Difference_In_Days < 14) {
            setErrors("14 days havent past since your last state");
          } else {
            Axios.post("http://localhost:3001/api/CovidCase1", {
              username: localStorage.getItem("User"),
              date: date,
            }).then((response) => {
              setErrors(response.data.message);
            });
          }
        }
      });
    }
  };
  return (
    <>
      <div className="ff">
        <Navbar />
        <div className="form-content">
          <form onSubmit={handleSubmit} className="formm" id="form" noValidate>
            <h2>Enter the date that you were diagnosted with covid-19</h2>
            {errors !== "" ? <div className="inputs">{errors}</div> : ""}
            {error !== "" ? <div className="inputs">{error}</div> : ""}
            <div className="inputs">
              <input
                className="form-input"
                type="date"
                name="date"
                onChange={handleChange}
              />
            </div>
            <br />
            <button className="btnn" type="submit">
              OK
            </button>
          </form>
        </div>
      </div>
      <div class="footer">
      <p>Avramopoulos &copy;<br/>Psiris &copy;</p>
    </div>
    </>
  );
};

export default StateCovidCase;

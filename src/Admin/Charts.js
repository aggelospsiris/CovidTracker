import AdminMenu from "./AdminMenu";
import { useEffect, useState } from "react";
import React from "react";
import Axios from "axios";
import { Bar, Doughnut, PolarArea } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "chart.js";
import moment from "moment";
import './Charts.css'
import $ from "jquery";

const Charts = () => {
  //charts 1,2,3
  const [visists, setVisits] = useState([]);
  const [cases, setCases] = useState([]);
  const [visistsFromCases, setVistsFromCases] = useState([]);
  const chart123 = () => {
    Axios.get("http://localhost:3001/api/chart123")
      .then((res) => {
        console.log(res.data);
        setVisits(res.data[0].visits);
        setCases(res.data[0].cases);
        setVistsFromCases(res.data[0].visits_from_cases);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //charts 4,5
  const [types, setTypes] = useState([]);
  const [visits4, setVisits4] = useState([]);
  const [visitsFromCases5, setVisitsFromCases5] = useState([]);
  const chart4 = () => {
    Axios.get("http://localhost:3001/api/chart4")
      .then((res) => {
        res.data.map((item) => {
          setTypes((t) => [...t, item.type]);
          setVisits4((v) => [...v, item.visits]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const chart5 = () => {
    Axios.get("http://localhost:3001/api/chart5")
      .then((res) => {
        res.data.map((item) => {
          setVisitsFromCases5((v) => [...v, item.visitis_from_cases]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //chart 6
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visits6_1, setVisits6_1] = useState([]);
  const [visits6_2, setVisits6_2] = useState([]);
  const [dates6, setDates6] = useState([]);

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFrom({
      ...from,
      [name]: value,
    });
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setUntil({
      ...until,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date(moment().format("YYYY-MM-DD"));
    const f = new Date(moment(from.from).format("YYYY-MM-DD"));
    const u = new Date(moment(until.until).format("YYYY-MM-DD"));
    var Difference_In_Time30 = u.getTime() - f.getTime();
    var Difference_In_Days30 = Difference_In_Time30 / (1000 * 3600 * 24);
    var Difference_In_Time1 = u.getTime() - today.getTime();
    var Difference_In_Days1 = Difference_In_Time1 / (1000 * 3600 * 24);
    var Difference_In_Time2 = f.getTime() - today.getTime();
    var Difference_In_Days2 = Difference_In_Time2 / (1000 * 3600 * 24);
    if (Difference_In_Days30 > 30) {
      setError("The difference between the dates must be smaller than 30 days");
    } else if (Difference_In_Days1 > 0 || Difference_In_Days2 > 0) {
      setError("Invalid inputs");
    } else if (from == "" || until == "") {
      setError("Empty Field");
    } else {
      console.log("hhhhhhhhhhhhhhhhhhhh");
      setError("");
      setIsSubmitting(true);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      console.log("gfdsssssdsd");
      Axios.post("http://localhost:3001/api/chart6", {
        from: from,
        until: until,
      })
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            visits6_1.push(res.data[i].visits);
            visits6_2.push(res.data[i].visits2);
            dates6.push(String(res.data[i].date1).substring(0, 10));
          }
          var ctx = document.getElementById("myChart");
          var myChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: dates6,
              datasets: [
                {
                  label: "Visits",
                  data: visits6_1,
                  backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                  borderColor: ["rgba(255, 99, 132, 1)"],
                  borderWidth: 1,
                },
                {
                  label: "Visits from covid cases",
                  data: visits6_2,
                  backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                  borderColor: ["rgba(54, 162, 235, 1)"],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isSubmitting, error]);

  //chart 7
  const [date, setDate] = useState("");
  const [error2, setError2] = useState("");
  const [isSubmitting2, setIsSubmitting2] = useState(false);
  const [visits7_1, setVisits7_1] = useState([]);
  const [visits7_2, setVisits7_2] = useState([]);
  const [hours, setHours] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate({
      ...date,
      [name]: value,
    });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    const today = new Date(moment().format("YYYY-MM-DD"));
    const d = new Date(moment(date.date).format("YYYY-MM-DD"));
    var Difference_In_Time = d.getTime() - today.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (Difference_In_Days > 0) {
      setError2("Pleaze enter a valid date");
    } else if (date == "") {
      setError2("Empty Field");
    } else {
      console.log("hhhhhhhhhhhhhhhhhhhh");
      setError2("");
      setIsSubmitting2(true);
    }
  };

  useEffect(() => {
    if (isSubmitting2) {
      console.log("gfdsssssdsd");
      Axios.post("http://localhost:3001/api/chart7", {
        date: date,
      })
        .then((res) => {
          console.log(res);
          for (var i = 0; i < res.data.length; i++) {
            visits7_1.push(res.data[i].visits1);
            visits7_2.push(res.data[i].visits2);
            hours.push(res.data[i].hour1);
          }

          var ctx = document.getElementById("chart7");
          var chart7 = new Chart(ctx, {
            type: "bar",
            data: {
              labels: hours,
              datasets: [
                {
                  label: "Visits",
                  data: visits7_1,
                  backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                  borderColor: ["rgba(255, 99, 132, 1)"],
                  borderWidth: 1,
                },
                {
                  label: "Visits from covid cases",
                  data: visits7_2,
                  backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                  borderColor: ["rgba(54, 162, 235, 1)"],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isSubmitting2, error2]);

  useEffect(() => {
    chart123();
    chart4();
    chart5();
  }, []);
  return (
    <>
    <AdminMenu />
      <div className="olo">
      <h1>Charts</h1>
      
      <div className="chart-container">
      <canvas id="chart1"></canvas>
      <a name="chart1"></a> 


        <Doughnut
          datasetIdKey="id1"
          width="50"
          height="50"
          data={{
            labels: ["Visits", "Covid Cases", "Visits By Covid Cases"],
            datasets: [
              {
                id: 1,
                label: "",
                data: [visists, cases, visistsFromCases],
                hoverBackgroundColor: [
                  "rgb(95, 210, 180)",
                  "rgb(255, 230, 109)",
                  "rgb(0, 230, 230)",
                ],
                backgroundColor: [
                  "rgb(75, 192, 192)",
                  "rgb(255, 205, 86)",
                  "rgb(54, 180, 235)",
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "This chart shows the total numbers of visits,covid cases and visits from covid cases",
              },
            },
          }}
        />
        
      </div><a name="chart2"></a> 

      <div class="chart2-container">
      <canvas id="chart2"></canvas>
        <Doughnut
          datasetIdKey="id2"
          width="50"
          height="50"
          data={{
            labels: types,
            datasets: [
              {
                id: 1,
                label: "",
                data: visits4,
                hoverBackgroundColor: [
                  "rgb(95, 210, 180)",
                  "rgb(255, 230, 109)",
                  "rgb(0, 230, 230)",
                ],
                backgroundColor: [
                  "rgb(75, 192, 192)",
                  "rgb(255, 205, 86)",
                  "rgb(54, 180, 235)",
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "This chart shows the classification of the types of the pois based on the number of visits",
              },
            },
          }}
        />
      </div>
      <a name="chart3"></a> 
      <div class="chart3-container">
      <canvas id="chart3"></canvas>
        <Doughnut
          datasetIdKey="id3"
          width="50"
          height="50"
          data={{
            labels: types,
            datasets: [
              {
                id: 1,
                label: "",
                data: visitsFromCases5,
                hoverBackgroundColor: [
                  "rgb(95, 210, 180)",
                  "rgb(255, 230, 109)",
                  "rgb(0, 230, 230)",
                ],
                backgroundColor: [
                  "rgb(75, 192, 192)",
                  "rgb(255, 205, 86)",
                  "rgb(54, 180, 235)",
                ],
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "This chart shows the classification of the types of the pois based on the number of visits from covid cases",
              },
            },
          }}
        />
      </div>
      <div>
        <div>
       

          <form onSubmit={handleSubmit} className="for" id="form" noValidate>
          <a name="chart4"></a> 
            <div className="inputs">
              <h3>See the number of visits between 2 dates</h3>
              <h5>(The chart show only the dates that has at least 1 visit)</h5>
              {error !== "" ? <div className="inputs">{error}</div> : ""}
              <label>From</label>
              <input
                className="form-input"
                type="date"
                name="from"
                onChange={handleChange1}
              />
              <div></div>
              <label>Until</label>
              <input
                className="form-input"
                type="date"
                name="until"
                onChange={handleChange2}
              />
            </div>

            <br />
            <button className="btnn" type="submit">
              OK
            </button>
            <canvas id="myChart" width="400" height="400"></canvas>
          </form>
        </div>
        <div></div>
      </div>
      <div>
        <div>
        

          <form onSubmit={handleSubmit2} className="fo" id="form2" noValidate>
            <a name='chart5'></a><div className="inputs">
              
              <h3>See the number of visits of day</h3>
              <h5>(The chart show only the hours that has at least 1 visit)</h5>
              <label>Enter a Date</label>
              <input
                className="form-input"
                type="date"
                name="date"
                onChange={handleChange}
              />
            </div>
            {error2 !== "" ? <div className="inputs">{error2}</div> : ""}
            <br />
            <button className="btnn" type="submit">
              OK
            </button>
            <canvas id="chart7" width="400" height="400"></canvas>
          </form>
        </div>
        <div></div>
      </div>
      </div>
      <div class="footer">
         <p>Avramopoulos &copy;<br/>Psiris &copy;</p>
      </div>

    </>
  );
};

export default Charts;

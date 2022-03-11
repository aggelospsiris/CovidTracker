const mysql = require("mysql");
const fs = require("fs");

var data = fs.readFileSync("./pois_json/specific_1.json");
data = JSON.parse(data);

//conection info
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "app",
});

db.connect(function (err) {
  // connection.end();
  if (err) {
    console.log("Error connecting database ... \n");
  } else {
    console.log("Database is connected ... \n");
    //μεταβλητες που χωριζουν καθε poi στο json ωστε να γινει insert σε 4 διαφορετικους πινακες

    //for chart 4 and 5 i created a tables which has every distinct type
    //from pois types and 2 more columns visits and visits from cases

    const types = [
      "book_store",
      "clothing_store",
      "furniture_store",
      "school",
      "beauty_salon",
      "accounting",
      "shoe_store",
      "car_rental",
      "night_club",
      "department_store",
      "hospital",
      "jewelry_store",
      "travel_agency",
      "city_hall",
      "local_government_office",
      "moving_company",
      "storage",
      "post_office",
      "store",
      "beauty_salon",
    ];

    types.map((item) => {
      db.query(
        "INSERT INTO chart45 (type) VALUES  (?) ",
        [item],
        (err, result) => {
          if (err) {
            console.log(err);
          } else return;
        }
      );
    });
  }
});

const mysql = require("mysql");
const fs = require("fs");

var data = fs.readFileSync("C:\\Users\\aggel\\OneDrive\\Υπολογιστής\\app\\src\\Admin\\starting_pois.json");
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
        "establishment"         ,
        "pet_store"             ,
        "point_of_interest"     ,
        "store"                 ,
        "atm"                   ,
        "bank"                  ,
        "finance"               ,
        "home_goods_store"      ,
        "doctor"                ,
        "health"                ,
        "car_repair"            ,
        "shopping_mall"         ,
        "gym"                   ,
        "cafe"                  ,
        'food'                  ,
        'furniture_store'       ,
        'lodging'               ,
        'hair_care'             ,
        'bakery'                ,
        'restaurant'            ,
        'park'                  ,
        'grocery_or_supermarket',
        'supermarket'           ,
        'electronics_store'     ,
        'casino'                ,
        'car_wash'              ,
        'drugstore'             ,
        'tourist_attraction'    ,
        'hardware_store'        ,
        'liquor_store'          ,
        'accounting'            ,
        'laundry'               ,
        'convenience_store'     ,
        'car_dealer'            ,
        'town_square'           ,
        'bar'                   ,
        'pharmacy'
       ]

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
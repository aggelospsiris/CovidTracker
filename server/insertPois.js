const mysql = require("mysql");
const fs = require("fs");

var data = fs.readFileSync(
  "./pois_json/specific_1.json"
);
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
    


    //pois
    const pois = data.map((d) => {
      return [d.id, d.name, d.address, d.rating, d.rating_n];
    });
    //types
    var k = 0
    var types = []
    data.map((d) => {
      for (var i = 0; i < d.types.length + 1; i++) {
        types[k] = [d.types[i],d.id];
        k++
      }
    });
    //cords
    const cords = data.map((d) => {
      return [d.id, d.coordinates.lat, d.coordinates.lng];
    });
    //popular times
    var p = 0
    var time = 0
    var pop = []
     data.map((d) => {
      d.populartimes.map((i) => {
        if(time = 24) time = 0
        i.data.map((j) => {
          pop[p] = [d.id,i.name,time,j]
          time++
          p++
        })
      });
    });

    // insert quirie for cords
    db.query(
      "INSERT INTO cords (id, lat, lng) VALUES ?",
      [cords],
      (err, result) => {
        if (err) {
          console.log(err);
        } else return;
      }
    );
       // insert quirie for types
    db.query(
      "INSERT INTO types (types,id) VALUES ?",
      [types],
      (err, result) => {
        if (err) {
          console.log(err);
        } else return;
      }
    );
   // insert quirie for popular_times
     db.query(
      "INSERT INTO popular_times (id,day,time,percent) VALUES ?",
      [pop],
      (err, result) => {
        if (err) {
          console.log(err);
        } else return;
      }
    );
      
   // insert quirie for pois
   db.query(
    "INSERT INTO pois (id, name, address,rating,rating_n) VALUES ?",
    [pois],
    (err, result) => {
      if (err) {
        console.log(err);
      } else return;
    }
  );
    
  
  }
});

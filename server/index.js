const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const util = require("util");

const adminUsername = "aggeol";
//conection info
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "app",
});

db.connect(function (err) {
  // connection.end();
  if (!err) {
    console.log("Database is connected ... \n");
  } else {
    console.log("Error connecting database ... \n");
  }
});

app.get("/", (req, res) => {
  res.send("..................");
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/***************************************************** */
//Registration
/*******************************************************/

//for password encryption
const bcrypt = require("bcrypt");
const saltRounds = 12;

//check if the username and email is valid and insert user
app.post("/api/registration", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
    username = req.body.username;
    email = req.body.email;
    password = hash;
    db.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email],
      (err, results) => {
        if (results.length <= 0) {
          db.query(
            "INSERT INTO users (username, email, password) VALUES (?,?,?)",
            [username, email, password],
            (err, result) => {
              if (!err) {
                console.log(err);
              } else return;
            }
          );
        } else {
          console.log("Taken username or email");
          return;
        }
      }
    );
  });
});
//check if the username and email is valid send confirmation for login
app.post("/api/confirmReg", (req, res) => {
  username = req.body.username;
  email = req.body.email;

  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result <= 0) {
        res.send(result);
      } else {
        res.send({ message: "Username or email already taken" });
      }
    }
  );
});

/***************************************************** */
//Login
/*******************************************************/
app.post("/api/login", (req, res) => {
  username = req.body.username;
  db.query(
    "SELECT password FROM users WHERE username = ?",
    [username],
    (err, result) => {
      console.log(result.length);
      if (result.length <= 0) {
        res.send({ message: "Wrong username" });
      } else {
        bcrypt.compare(req.body.password, result[0].password, (error, re) => {
          if (re && username == adminUsername) {
            res.send({ message: "admin" });
          } else if (re && username !== adminUsername) {
            res.send({ message: "user" });
            return;
          } else if (!re) {
            res.send({ message: "Wrong password" });
          }
        });
      }
    }
  );
});

/***************************************************** */
//Search Pois
/*******************************************************/

//for the select quiries
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const d = new Date();
let day = weekday[d.getDay()];
const after1hour = d.getHours() + 1;
const after2hour = d.getHours() + 2;
const before1hour = d.getHours() - 1;
const before2hour = d.getHours() - 2;

if (after1hour == 24) {
  after1hour == 0;
}
if (after2hour == 24) {
  after2hour == 0;
}
if (before1hour == 24) {
  before1hour == 0;
}
if (before2hour == 24) {
  before2hour == 0;
}

//for async get select
const query = util.promisify(db.query).bind(db);

app.get("/api/searchPois", (req, res) => {
  (async () => {
    try {
      var row1 = await query(
        "select pois.name,cords.lat,cords.lng,popular_times.day,popular_times.time,popular_times.percent " +
          "from pois inner join cords ON pois.id = cords.id inner join popular_times ON popular_times.id = cords.id " +
          "where popular_times.day = '" +
          day +
          "' and popular_times.time = " +
          after1hour +
          ""
      );
      var row2 = await query(
        "select popular_times.time as time2,popular_times.percent as percent2 " +
          "from pois inner join popular_times ON popular_times.id = pois.id " +
          "where popular_times.day = '" +
          day +
          "' and popular_times.time = " +
          after2hour +
          ""
      );
      var row3 = await query(
        "select popular_times.time as time3,popular_times.percent as percent3 " +
          "from pois inner join popular_times ON popular_times.id = pois.id " +
          "where popular_times.day = '" +
          day +
          "' and popular_times.time = " +
          before1hour +
          ""
      );
      var row4 = await query(
        "select popular_times.time as time4,popular_times.percent as percent4 " +
          "from pois inner join popular_times ON popular_times.id = pois.id " +
          "where popular_times.day = '" +
          day +
          "' and popular_times.time = " +
          before2hour +
          ""
      );
      //result has an object with poi:name,cords,percent of people for the next 2 h and  before 2 h ,
      for (var i = 0; i < row1.length; i++) {
        row1[i] = Object.assign(row1[i], row2[i], row3[i], row4[i]);
      }
      res.send(row1);
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  })();
});
/***************************************************** */
//Check in
/*******************************************************/
app.post("/api/check_in", (req, res) => {
  (people = req.body.people),
    (username = req.body.username),
    (poi_name = req.body.poi_name),
    (datetime = req.body.datetime),
    db.query(
      "INSERT INTO check_in(poi_name,username,people,datetime) VALUES (?,?,?,?)",
      [poi_name, username, people, datetime],
      (err, result) => {
        if (err) {
        } else {
          res.send({ message: "You have checked in" });
          //for charts 4
          db.query(
            "update chart45 set visits=visits+1 where type  in (select types from types where id = (select id from pois where name = ?))",
            [poi_name],
            (err, result) => {
              if (err) {
                console.log(err);
              } else if (result) {
                console.log(result);
                return;
              }
            }
          );
          //for chart5
          db.query(
            "select * from covid_case where username = ? and DATEDIFF(DATE(covid_case.date),DATE(?))<14",
            [username, datetime],
            (err, result) => {
              if (err) {
              }
              if (result.length > 0) {
                db.query(
                  "update chart45 set visitis_from_cases= visitis_from_cases+1 where type  in (select types from types where id = (select id from pois where name = ?))",
                  [poi_name],
                  (err, result) => {
                    if (err) {
                    } else if (result) {
                      console.log(result);
                      return;
                    }
                  }
                );
                return;
              }
            }
          );
          return;
        }
      }
    );
});

/***************************************************** */
//State Covid Case
/*******************************************************/
app.post("/api/CovidCase", (req, res) => {
  (username = req.body.username),
    (date = req.body.date),
    db.query(
      "select max(date) as date from covid_case where username = ?",
      [username],
      (err, result) => {
        console.log(result);
        if (result.length > 0) {
          res.send(result);
        } else {
          db.query(
            "INSERT INTO covid_case (username,date) VALUES (?,?)",
            [username, date.date],
            (err, result) => {
              res.send({ message: "You have succesfully state your case" });
            }
          );
          //for chart 5

          db.query(
            "update chart45 set visitis_from_cases= visitis_from_cases+1 where type  in (select types from types where id in (select id from pois where name in (select poi_name from check_in where username = ? and DATEDIFF(DATE(check_in.datetime),DATE(?))<7) ))",
            [username, date.date],
            (err, result) => {
              if (err) {
                console.log(err);
              } else if (result) {
                console.log(poi_name);
                return;
              }
            }
          );
          return;
        }
      }
    );
});

app.post("/api/CovidCase1", (req, res) => {
  (username = req.body.username),
    (date = req.body.date),
    db.query(
      "INSERT INTO covid_case (username,date) VALUES (?,?)",
      [username, date.date],
      (err, result) => {
        res.send({ message: "You have succesfully state your case" });
      }
    );
  db.query(
    "update chart45 set visitis_from_cases= visitis_from_cases+1 where type  in (select types from types where id in (select id from pois where name in (select poi_name from check_in where username = ? and DATEDIFF(DATE(check_in.datetime),DATE(?))<7) ))",
    [username, date.date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(poi_name);
        return;
      }
    }
  );
});
/***************************************************** */
//Edit Profile
/*******************************************************/
app.post("/api/editProfile", (req, res) => {
  (oldpassword = req.body.oldpassword),
    (oldusername = req.body.oldusername),
    (newusername = req.body.newusername),
    (password = req.body.password),
    bcrypt.hash(password, saltRounds, (error, hash) => {
      db.query(
        "SELECT password FROM users WHERE username = ?",
        [oldusername],
        (err, result) => {
          if (result.length <= 0) {
            res.send({ message: "The old password is wrong" });
          } else {
            bcrypt.compare(oldpassword, result[0].password, (error, re) => {
              if (re) {
                db.query(
                  "update users set username = ? , password = ? where username = ? ",
                  [newusername, hash, oldusername],
                  (err, results) => {
                    res.send({ message: "Success" });
                  }
                );
              } else {
                res.send({ message: "The old password is wrong" });
              }
            });
          }
        }
      );
    });
});

app.post("/api/confirmUpdate", (req, res) => {
  (oldpassword = req.body.oldpassword),
    (oldusername = req.body.oldusername),
    (newusername = req.body.newusername),
    (password = req.body.password),
    db.query(
      "SELECT password FROM users WHERE username = ?",
      [oldusername],
      (err, result) => {
        if (result.length <= 0) {
          res.send({ message: "The old password is wrong" });
        } else {
          bcrypt.compare(oldpassword, result[0].password, (error, re) => {
            if (re) {
            } else {
              res.send({ message: "The old password is wrong" });
            }
          });
        }
      }
    );
});
/***************************************************** */
//getVisits
/*******************************************************/
app.post("/api/visits", (req, res) => {
  (username = req.body.username),
    db.query(
      "SELECT * FROM check_in WHERE username = ? order by datetime desc",
      [username],
      (err, result) => {
        if (result <= 0) {
          console.log("0");
        } else {
          res.send(result);
        }
      }
    );
});
/***************************************************** */
//getCases
/*******************************************************/
app.post("/api/cases", (req, res) => {
  (username = req.body.username),
    db.query(
      "SELECT * FROM covid_case WHERE username = ? order by date desc",
      [username],
      (err, result) => {
        if (result <= 0) {
          console.log("0");
        } else {
          res.send(result);
        }
      }
    );
});

/***************************************************** */
//contacts with covid case
/*******************************************************/
app.post("/api/contact", (req, res) => {
  (username = req.body.username),
    db.query(
      "select c2.datetime,c2.poi_name from" +
        " (select poi_name,datetime from check_in " +
        " inner join users on check_in.username=users.username" +
        " inner join covid_case on  covid_case.username=users.username" +
        " and DATEDIFF(DATE(covid_case.date),DATE(check_in.datetime))<7)c1" +
        " inner join" +
        " (select poi_name,datetime from check_in" +
        " where username = ?" +
        " and DATEDIFF(CURRENT_DATE(),DATE(check_in.datetime))<7" +
        " )c2" +
        " on c1.poi_name=c2.poi_name and" +
        " TIMESTAMPDIFF(MINUTE,c1.datetime,c2.datetime)<120",
      [username],
      (err, result) => {
        if (result <= 0) {
          console.log("0");
        } else {
          res.send(result);
        }
      }
    );
});

/***************************************************** */
//Charts 1,2,3
/*******************************************************/
app.get("/api/chart123", (req, res) => {
  db.query(
    "SELECT" +
      //visits
      "(SELECT COUNT(*) FROM check_in) AS visits," +
      //cases
      "(SELECT COUNT(*) FROM covid_case) AS cases," +
      //visits_from_cases
      "(select count(*) from check_in inner join users on check_in.username=users.username inner join covid_case on  covid_case.username=users.username and ((DATEDIFF(DATE(covid_case.date),DATE(check_in.datetime))<7) OR (DATEDIFF(DATE(check_in.datetime),DATE(covid_case.date))<14))) as visits_from_cases " +
      " FROM dual",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/***************************************************** */
//Charts 4,5
/*******************************************************/
app.get("/api/chart4", (req, res) => {
  db.query(
    "select type,visits from chart45 order by visits desc",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/api/chart5", (req, res) => {
  db.query(
    "select type, visitis_from_cases from chart45 order by  visitis_from_cases desc",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
/***************************************************** */
//chart 6
/*******************************************************/
app.post("/api/chart6", (req, res) => {
  (from = req.body.from),
    (until = req.body.until),
    db.query(
      "select A.visits as visits,B.visits2 as visits2,A.date1 as date1,B.date2 as date2 " +
        "from " +
        "(select count(*) as visits,DATE(datetime) as date1 from check_in " +
        "where date(datetime) between ? and ? " +
        "group by Date(datetime) order by datetime desc) A " +
        "left join " +
        "(select count(*) as visits2 ,DATE(datetime) as date2 from check_in " +
        "inner join users on check_in.username=users.username " +
        "inner join covid_case on  covid_case.username=users.username and ((DATEDIFF(DATE(covid_case.date),DATE(datetime))<7) OR (DATEDIFF(DATE(datetime),DATE(covid_case.date))<14)) " +
        "where date(datetime) between ? and ? " +
        "group by Date(datetime) order by datetime desc) B " +
        "on A.date1=B.date2",
      [from.from, until.until, from.from, until.until],
      (err, result) => {
        if (result <= 0) {
          console.log("0");
        } else if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
});
/***************************************************** */
//chart 7
/*******************************************************/
app.post("/api/chart7", (req, res) => {
  (date = req.body.date), console.log(date.date);
  db.query(
    "select A.visits1 as visits1,B.visits2 as visits2,A.hour1 as hour1,B.hour2 as hour2 " +
      "from " +
      "(select count(*) as visits1, hour(time(datetime)) as hour1 from check_in  " +
      "where Date(datetime) = ? " +
      "group by hour(time(datetime)) " +
      "order by hour(time(datetime)) asc) A " +
      "left join " +
      "(select count(*) as visits2, hour(time(datetime)) as hour2 from check_in  " +
      "inner join users on check_in.username=users.username " +
      "inner join covid_case on  covid_case.username=users.username and ((DATEDIFF(DATE(covid_case.date),DATE(datetime))<7) OR (DATEDIFF(DATE(datetime),DATE(covid_case.date))<14)) " +
      "where Date(datetime) = ? " +
      "group by hour(time(datetime)) " +
      "order by hour(time(datetime)) asc) B " +
      "on A.hour1=B.hour2",
    [date.date, date.date],
    (err, result) => {
      if (result <= 0) {
        console.log("0");
      } else if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/***************************************************** */
//add poi
/*******************************************************/
app.post("/api/addPoi", (req, res) => {
  (data = req.body.data), console.log(data);
  //pois
  const pois = data.map((d) => {
    return [d.id, d.name, d.address, d.rating, d.rating_n];
  });
  //types
  var k = 0;
  var types = [];
  data.map((d) => {
    for (var i = 0; i < d.types.length + 1; i++) {
      types[k] = [d.types[i], d.id];
      k++;
    }
  });
  //cords
  const cords = data.map((d) => {
    return [d.id, d.coordinates.lat, d.coordinates.lng];
  });
  //popular times
  var p = 0;
  var time = 0;
  var pop = [];
  data.map((d) => {
    d.populartimes.map((i) => {
      if ((time = 24)) time = 0;
      i.data.map((j) => {
        pop[p] = [d.id, i.name, time, j];
        time++;
        p++;
      });
    });
  });

  db.query(
    "INSERT INTO cords (id, lat, lng) VALUES ?",
    [cords],
    (err, result) => {
      if (result) {
        db.query(
          "INSERT INTO types (types,id) VALUES ?",
          [types],
          (err, result) => {
            if (result) {
              db.query(
                "INSERT INTO popular_times (id,day,time,percent) VALUES ?",
                [pop],
                (err, result) => {
                  if (result) {
                    db.query(
                      "INSERT INTO pois (id, name, address,rating,rating_n) VALUES ?",
                      [pois],
                      (err, result) => {
                        if (result) {
                          res.send({ message: "Success" });
                        } else if (err) {
                          res.send({ message: "Error" });
                        }
                      }
                    );
                  } else if (err) {
                    res.send({ message: "Error" });
                  }
                }
              );
            } else if (err) {
              res.send({ message: "Error" });
            }
          }
        );
      } else if (err) {
        res.send({ message: "Error" });
      }
    }
  );
});
/***************************************************** */
//delete all
/*******************************************************/
app.delete("/api/deleteAll", (req, res) => {
  db.query("delete from check_in", (err, result) => {
    if (err) {
      res.send({ message: "Error deleting data" });
    } else {
      db.query("delete from chart45", (err, result) => {
        if (err) {
          res.send({ message: "Error deleting data" });
        } else {
          db.query("delete from covid_case", (err, result) => {
            if (err) {
              res.send({ message: "Error deleting data" });
            } else {
              db.query("delete from pois", (err, result) => {
                if (err) {
                  res.send({ message: "Error deleting data" });
                } else {
                  db.query("delete from types", (err, result) => {
                    if (err) {
                      res.send({ message: "Error deleting data" });
                    } else {
                      db.query("delete from cords", (err, result) => {
                        if (err) {
                          res.send({ message: "Error deleting data" });
                        } else {
                          db.query(
                            "delete from popular_times",
                            (err, result) => {
                              if (err) {
                                res.send({ message: "Error deleting data" });
                              } else {
                                db.query(
                                  "delete from users where username != 'aggeol'",
                                  (err, result) => {
                                    if (err) {
                                      res.send({
                                        message: "Error deleting data",
                                      });
                                    } else {
                                      res.send({ message: "Success" });
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

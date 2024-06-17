const express = require("express");
const app = express();
const https = require("https");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/whether.html");
});

app.post("/", (req, res) => {
  const cityName = req.body.cityName;
  const appid = "9f5a3960b1c0372f7897173249650d7d";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    appid +
    "&lon=0.12&units=" +
    unit;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const whetherdata = JSON.parse(data);
      let result = whetherdata.main.temp;

      let result2 = whetherdata.weather[0].description;
      console.log(result2);

      console.log(result);
      res.write(
        `<h1>The weather in ${cityName} is ${result2} and temp is ${result}</h1>`
      );

      let speed = whetherdata.wind.speed;
      res.write(` <h2>speed of the area is  ${speed} </h2>`);

      const icon = whetherdata.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src=" + imageurl + ">");

      res.send();
    });
  });
});

app.listen(2000, () => {
  console.log("app is running on 2000");
});

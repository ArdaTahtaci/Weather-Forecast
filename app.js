const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {
    const city = req.body.city;

    const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + city + "&appid=69b94abe1d3ac013652aa48ac1410371"
    https.get(url, function (response) {
        response.on("data", function (data) {
            var data = JSON.parse(data);

            var temperature = data.main.temp;
            var description = data.weather[0].description;
            var icon = data.weather[0].icon;
            var cityName = data.name;

            var iconUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<body style='text-align: center; background-color: rgb(126, 201, 201); color: #fff;'> <h1 style='margin-top: 15%;'>The " + cityName + " city:</h1>");
            res.write("<p>Temperature: " + temperature + "</p>");
            res.write("<p>Weather: " + description + "</p>");

            res.write("<img src=" + iconUrl + ">");
            res.send();

        });

    });

});


app.listen(process.env.PORT || 3000, function () {
    console.log("local host 3000 is active");
});


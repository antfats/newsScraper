var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });


app.get("/scrape", function (req, res) {

    axios.get("https://www.marketwatch.com/").then(function (response) {
        const $ = cheerio.load(response.data);

        $("h3").each(function (i, element) {

            const result = {};
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            db.News.create(result).then(function (dbNews) {
                console.log(dbNews);
            }).catch(function (err) {
                console.log(err);

                res.send("Scrape Complete!");
            });
        });
    });
});
app.get("/news", function (req, res) {
    db.News.find({})
        .then(function (dbNews) {
            res.json(dbNews);
        }).catch(function (err) {
            res.json(err);
        });
});

app.listen(PORT, function () {
    console.log("App is running on port: " + PORT);
})
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlcoded({ extended: true }));
app.use(express.json());

app.use(expres.static("public"));

mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });


app.get("/scrape", function (req, res) {
    axios.get("#").then(function (response) {
        var $ = cheerio.load(response.data);




        db.Article.create(result)
            .then(function (dbArticle) {
                console.log(dbArticle);
            })
            .catch(function (err) {
                console.log(err);
            });
        res.send("Scrape Complete!");
    });
});
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

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";


mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//Router for /scrape. Scraping the site for all the (a) children of h3
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
//Create a json of all the news articles scraped
app.get("/news", function (req, res) {
    db.News.find({})
        .then(function (dbNews) {
            res.json(dbNews);
        }).catch(function (err) {
            res.json(err);
        });
});
//find a specific news article 
app.get("/news/:id", function (req, res) {
    db.News.findOne({ _id: req.params.id })
        .populate("note")
        .then(function (dbNews) {
            res.json(dbNews);
        }).catch(function (err) {
            res.json(err);
        });
});

app.post("/news/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.News.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
                .then(function (dbNews) {
                    res.json(dbNews);
                })
                .catch(function (err) {
                    res.json(err);
                });
        });
});
app.listen(PORT, function () {
    console.log("App is running on port: " + PORT);
});
// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "89988998ar",
    database: "seinfeld_db"
});


// Sets up the Express App
// =============================================================

var PORT = 3000;
var app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));


// Characters/info
// =============================================================
function person(id, name, coolness, attitude) {
    this.id = id;
    this.name = name;
    this.coolness = coolness;
    this.attitude = attitude;
}

var characters = [];
var coolness = [];
var attitudeList = [];
var attitude;

// Routes
// =============================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

//Creating a friendList route
app.get("/cast", function (req, res) {

    res.sendFile(path.join(__dirname, "actors.html"));

});

app.get("/coolness-chart", function (req, res) {

    res.sendFile(path.join(__dirname, "coolness.html"));

});

app.get("/attitude-chart/:attitude", function (req, res) {

    attitudeList = [];

    res.sendFile(path.join(__dirname, "attitude.html"));

    attitude = req.params.attitude;

    connection.query(
        "SELECT * FROM actors WHERE attitude=?", [attitude],
        function (error, respond) {
            for (var i = 0; i < respond.length; i++) {

                var newPerson = new person(respond[i].item_id, respond[i].actors_name,
                    respond[i].coolness_points, respond[i].attitude);

                attitudeList.push(newPerson);
            }
        });

});

// Get all waitlist
app.get("/api/cast", function (req, res) {
    res.json(characters);
});

// Get all waitlist
app.get("/api/coolness-chart", function (req, res) {
    res.json(coolness);
});

// Get all waitlist
app.get("/api/attitude-chart/:attitude", function (req, res) {
    res.json(attitudeList);
});


//Creating Database

connection.query(
    "SELECT * FROM actors",
    function (error, respond) {
        for (var i = 0; i < respond.length; i++) {

            var newPerson = new person(respond[i].item_id, respond[i].actors_name,
                respond[i].coolness_points, respond[i].attitude);

            characters.push(newPerson);
        }
    });

connection.query(
    "SELECT * FROM actors ORDER BY coolness_points",
    function (error, respond) {
        for (var i = 0; i < respond.length; i++) {

            var newPerson = new person(respond[i].item_id, respond[i].actors_name,
                respond[i].coolness_points, respond[i].attitude);

            coolness.push(newPerson);
        }
    });


// Starts the server to begin listening
// =============================================================
app.listen(process.env.PORT || PORT, function () {
    console.log("App listening on PORT " + PORT);
});

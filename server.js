var express = require("express");
var path = require("path");
var fs = require("fs");

var notesArray = [];

var app = express();
var PORT = process.env.PORT || 5500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// renders the two basic html pages
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});


// api routes
app.get("/api/notes", function (req, res) {

    try {
        notesArray = fs.readFileSync("db/db.json", "utf8");
        notesArray = JSON.parse(notesArray);
    } catch(err) {
        console.log("\n error (in app.get.catch:");
        console.log(err);
    }
    res.json(notesArray)
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.listen(PORT, function () {
  console.log("Now Listening on PORT " + PORT);
});

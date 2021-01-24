var express = require("express");
var path = require("path");
var fs = require("fs");

var notesArray = [];
var noteIdCount = 0;

var app = express();
var PORT = process.env.PORT || 5500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// renders the two basic html pages
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});


// api routes
app.get("/api/notes", function (req, res) {
    try {
        notesData = fs.readFileSync("db/db.json", "utf8");
        console.log("hello");
        notesArray = JSON.parse(notesData);
    } catch(err) {
        console.log("\n error (in app.get.catch:");
        console.log(err);
    }
    res.json(notesArray)
});

// app.post("/api/notes", function(req,res) {
//     // var newNote = req.body;
//     // console.log(newNote)
//     try {
//         noteIdCount ++;
//         notesArray = fs.readFileSync("db/db.json", "utf8"); 
//         req.body.id = noteIdCount;
//         notesArray.push(req.body);
//         notes = JSON.stringify(notesArray);
//         fs.writeFile("/db/db.json", notes, "utf8", function(err) {
//             if(err) {
//                 throw err
//             }
//         });

//         res.json(JSON.parse(notesArray))
//     } catch (err) {
//         console.log(err);
//         throw err;
//     }
// });

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.listen(PORT, function () {
  console.log("Now Listening on PORT " + PORT);
});

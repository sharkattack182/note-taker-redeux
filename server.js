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

// get route shows all the notes saved
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

// post route creates new notes when the user saves
app.post("/api/notes", function(req,res) {
    try {
        noteIdCount ++;
        currentNotes = fs.readFileSync("db/db.json", "utf8"); 
        req.body.id = noteIdCount;
        notesArray.push(req.body);
        console.log(notesArray);

        fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(notesArray), (err) => {
            if(err) throw err;
            console.log("file made")
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
});

// delete route that deletes a note by id
app.delete("/api/notes/:id", function(req,res) {
    let id = req.params.id;
    console.log(id);
    var newNotesArr = []
    var savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
    for (let i = 0; i < savedNotes.length; i++) {
        let note = savedNotes[i];
        console.log(note.id, id)
        if(note.id !== parseInt(id)) {
            newNotesArr.push(note);
            console.log("note pushed")
        }
        else {
            console.log("not pushed");
        }
    }

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(newNotesArr), (err) => {
        if(err) throw err;
        console.log("file deleted")
    })
})

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.listen(PORT, function () {
  console.log("Now Listening on PORT " + PORT);
});

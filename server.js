var express = require("express");
var app = express();

const temp_fish = [
  {
    name: "angler",
    number: 0,
    description: "Lorem Ipsum",
    type: "Fish",
    hp: "1",
    atk: "1",
    def: "1",
  },
];

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static("public"));

// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/fish", function (req, res) {
  const user = {
    skills: ["a", "b", "c"],
  };

  res.render("pages/fish", { user });
});

app.listen(8080);
console.log("Server is listening on port 8080");

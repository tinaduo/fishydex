import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

const DB_URL = process.env.SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(DB_URL, ANON_KEY);
app.use(express.urlencoded({ extended: true }));

// fetch fish data from the "fish" table
async function fishCall() {
  const { data: fish, error } = await supabase.from("fish").select("*");
  if (error) {
    console.log("Error fetching fish data:", error);
  } else {
    console.log(fish)
  }

  return fish;
}

app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/add", function (req, res) {
  res.render("pages/add");
});


app.get("/home", async function (req, res) {
  const fishData = await fishCall();
  res.render("pages/home", { data: fishData });
});

app.get("/project-info", function (req, res) {
  res.render("pages/project-info");
});

// fetch fish data and pass it to the fish
app.post("/add", async (req, res) => {
  try {
    const { name, description, type, atk, def, hp } = req.body;

    // debugging log the received data
    console.log("Received data:", req.body);

    const { data, error } = await supabase.from("fish").insert([
      { name, description, type, atk, def, hp }
    ]);

    if (error) {
      console.error("Error inserting data:", error);
      return res.status(500).send("Database insert error: " + error.message);
    }

    console.log("Data inserted:", data);
    res.redirect("/home");
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).send("Unexpected server error");
  }
});

app.get("/fish/:id", async function (req, res) {
  const fishId = req.params.id;
  const { data: fish, error } = await supabase.from("fish").select("*").eq("id", fishId).single();

  if (error) {
      console.error("Error fetching fish data:", error);
      return res.status(500).send("Error fetching fish data");
  }

  res.render("pages/fish", { fish });
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
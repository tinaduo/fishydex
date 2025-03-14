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

// Fetch fish data from the "fish" table
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

// Fetch fish data and pass it to the fish.ejs template
app.get("/fish", async function (req, res) {
  const fishData = await fishCall();
  res.render("pages/fish", { data: fishData });
});

app.get("/testing", async function (req, res) {
  const fishData = await fishCall();
  res.render("pages/testing", { data: fishData });
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

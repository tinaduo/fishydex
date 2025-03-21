import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import multer from 'multer';
const upload = multer();

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


app.post("/add", upload.single("imageURL"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const { name, description, type, atk, def, hp} = req.body;

    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}-${req.file.originalname}`;

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, fileBuffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return res.status(500).send("Image upload error: " + error.message);
    }
    const imageURL = `https://xqtteqvdlgpyindqtpll.supabase.co/storage/v1/object/public/uploads/${fileName}`;


    const { data: fishData, error: dbError } = await supabase
      .from("fish")
      .insert([{ name, description, type, atk, def, hp, imageURL }]);

    if (dbError) {
      console.error("Error inserting data into DB:", dbError);
      return res.status(500).send("Database insert error: " + dbError.message);
    }

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
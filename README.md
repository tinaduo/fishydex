# Fishydex

## Project Purpose
Fishydex is a full-stack web application developed using HTML, CSS, JavaScript, Express.js, EJS, Node.js, and PostgreSQL. It serves as a database for fish species where users can look up detailed information about various fish species, log their catches, and learn more about the different types of fish in the world. The purpose of the project is to provide an engaging platform for fish enthusiasts, providing access to relevant data and a smooth user experience.

## Technologies Used
- **HTML**
- **CSS**
- **JavaScript**
- **Express.js**
- **EJS**
- **Node.js**
- **PostgreSQL**
- **Supabase**

## Features
- Dynamically load a specific fish's data
- Add new fishes to the database

## Tasks Completed by Team Members

**Tina Duong**:
- Designed frontend design and assets
- Coded form data to accept image files

**Jackie Truong**:
- Wrote the database and set the connection to the express server
- Coded the initial functional form data to accept middleware

**Sebastian Fok**:
- Added audio and sound effects to the site
- Coded smoother transitions between pages

**Ben Louis**:
- Coded the dynamic paging for all the fish
- Designed the game console that displayed the fish information

## How to run Fishydex Locally:
1. Run ``` git clone https://github.com/tinaduo/fishydex.git```
2. Run ``` npm install ```
4. Add .env file with the following code:
  ```
  SUPABASE_URL=https://xqtteqvdlgpyindqtpll.supabase.co
  SUPABASE_ANON_KEY=[Insert Key Here]
  ```
5. Run ```nodemon server.js``` (You may need to use npx)
6. Then go to http://localhost:8080


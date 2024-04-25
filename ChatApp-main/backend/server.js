const express = require("express");
const chats = require("./data/data.js");
const env = require("dotenv");
const cors = require("cors"); // Import cors package

const app = express();
env.config();

// Enable CORS for all routes
app.use(cors());

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/", (req, res) => {
  res.send("Yoyo");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});

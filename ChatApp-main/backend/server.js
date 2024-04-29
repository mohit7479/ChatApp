const express = require("express");
const chats = require("./data/data.js");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors package
const connectDB = require("./config/db.js");
const color = require('colors');
const userRoutes = require('./routes/userRoutes.js');
const { errorHandler, notFound } = require("./middlewares/errorMiddleware.js");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

app.get("/", (req, res) => {
  res.send("Yoyo");
});

app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on Port ${port}`.yellow.bold);
});

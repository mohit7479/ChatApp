const express = require("express");
//const chats = require("./data/data.js");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors package
const connectDB = require("./config/db.js");
const color = require('colors');
const path = require("path");

const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware.js");

const app = express();
dotenv.config();


app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["POST", "GET", "PUT"],
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

// app.get("/", (req, res) => {
//   res.send("Yoyo");
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on Port ${port}`.yellow.bold);
});

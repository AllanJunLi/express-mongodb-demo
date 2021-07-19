const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const postsRoute = require("./routes/posts");
const port = process.env.port || 3000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/posts", postsRoute);

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to db");
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

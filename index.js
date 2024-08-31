const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 9000;
const cors = require('cors');
const { connect } = require("./db/connect");

connect();

app.use(cors(
  {
  origin: 'https://augmentix-git-frontend-shradhesh71s-projects.vercel.app/', // Your frontend's origin
  methods: ['GET', 'POST'], // Allowed methods
  credentials: true // If you're using cookies or authentication
}));

// Middleware to parse JSON bodies
app.use(express.json());

// routes
const user = require("./routes/user");

app.get("/", (req, res) => {
  res.send("Wohoo, backend is live now!!!");
});

app.use("/user", user);

app.listen(port, () => {
  console.log("listening on port " + port);
});

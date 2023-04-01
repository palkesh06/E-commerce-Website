const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log(req.url);
  res.send("<center><h1> From the home page </h1> </center>")
});

app.listen(8000, () => {
  console.log("Server Started!!");
});
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("This is GETs.")
});

app.listen(3000, () => {
  console.log("Sever is started.");
});

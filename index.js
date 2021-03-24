const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://SoHee:thgmlqo19960128@boiler-plate.po3cp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log("there is error");
  });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(5000);

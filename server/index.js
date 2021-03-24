const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

const { User } = require("./models/user");
const { auth } = require("./middleware/auth");

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log("there is error");
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({ hello: "I am deploying application" });
});

app.get("/api/user/auth", auth, (req, res) => {
  //only authenticated user can access - middelware
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

//when the user logout
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

//when the user signup
app.post("/api/user/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userData) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});

//When the user login
app.post("/api/user/login", (req, res) => {
  //find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth faiiled, email not found",
      });

    //compare Password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "wrong password",
        });
      }
    });

    //generate Token
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res
        .cookie("auth_check", user.token) //put token in the cookie
        .status(200)
        .json({ loginSuccess: true });
    });
  });
});

const port = process.env.PORT || 5000; //port set by heroku - only prod mode

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

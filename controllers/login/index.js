const jwt = require("jsonwebtoken");
const fs = require("fs");
// const file = require("../database.json");
// let data = fs.readFileSync(file);
// let parsedata = JSON.parse(data);
// console.log(parsedata);

const login = (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
  };

  if (user.username == "admin" && user.email == "admin") {
    jwt.sign({ user }, "adminkey", { expiresIn: "3000s" }, (err, token) => {
      res.send({ token });
    });
  } else {
    jwt.sign({ user }, "userkey", { expiresIn: "300s" }, (err, token) => {
      res.send({ token });
      console.log(
        "/////////////////////////-----------------/////////////////"
      );
    });
  }
};

module.exports = {
  login,
};

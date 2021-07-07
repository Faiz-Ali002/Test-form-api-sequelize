require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const models = require("./models");
const app = express();
const fs = require("fs");
var bodyParser = require("body-parser");
var cors = require("cors");
const routes = require("./routes");

app.use(cors());
app.use(express.json());

app.use(routes);

// app.post("/user/posts", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "Post created...",
//         authData,
//       });
//     }
//   });
// });

// app.post("/login", (req, res) => {
//   // Mock user
//   const user = {
//     id: req.body.id,
//     username: req.body.username,
//     email: req.body.email,
//   };

//   jwt.sign({ user }, "secretkey", { expiresIn: "300s" }, (err, token) => {
//     res.json({
//       token,
//     });
//   });
// });

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers["authorization"];
//   // Check if bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//     req.token = bearerHeader;

//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }
// }
app.use("*", function (req, res) {
  res.status(404).send({
    message: "route not found",
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// app.use(function (err, req, res, next) {
//   res.status(404).send.({
//     message: "route not found",
//   });
// });

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
////////////////////////////////////////////////////////////////////////////////////

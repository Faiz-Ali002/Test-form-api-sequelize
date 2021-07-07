const express = require("express");
const router = express.Router();
const usersRoutes = require("./users");
const login = require("./users/login");
// const verify = require("../routes/users/index");
// verify.verifyToken();
router.use("/login", login);
router.use("/users", usersRoutes);

module.exports = router;

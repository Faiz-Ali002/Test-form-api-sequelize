const express = require("express");

const router = express.Router();
const { userController, carController } = require("../../controllers");

router.get("/", userController.getuser);

router.post("/", verifyToken, userController.postuser);

router.put("/:id", verifyToken, userController.putuser);

router.delete("/:id", verifyToken, userController.deleteuser);
router.get("/:usersId/cars", carController.getcar);
router.post("/:usersId/cars", verifyToken, carController.postcar);
router.put("/:usersId/cars/:carsId", carController.putcar);
router.delete("/:usersId/cars/:carsId", carController.deletecar);

module.exports = router;
//////   Functions   //////
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    req.token = bearerHeader;

    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

// module.exports = {
//   router,
//   // verifyToken,
// };

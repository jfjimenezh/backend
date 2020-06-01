const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/user", userController.createUser);
router.get("/user/:id", userController.getUserById);
router.get("/user", userController.getAllUsers);
module.exports = router;

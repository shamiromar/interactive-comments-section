const router = require("express").Router();
const userController = require("../controllers/userController.js");

router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);
router.post("/user/verify", userController.verify);

module.exports = router;

const express = require("express");
const {
    registerUser,
    authUser,
    allUsers,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/").get(protect, allUsers);
// router.get("/add-product", adminController.getAddProduct);

module.exports = router;

const express = require("express");
const authRouter = express.Router();

const { getLogin } = require("../controllers/authController");
const { postLogin } = require("../controllers/authController");
const { postlogout } = require("../controllers/authController");
const { getSignup } = require("../controllers/authController");
const { postSignup } = require("../controllers/authController");

// Routes

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);
authRouter.post("/logout", postlogout);
authRouter.get("/signup", getSignup);
authRouter.post("/signup", postSignup);

module.exports = authRouter;
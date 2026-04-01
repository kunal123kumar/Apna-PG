// External Modules
const express = require("express");
const hostRouter = express.Router();

// local Modules
const { getAddHome } = require("../controllers/hostControllers.js");
const { postAddHome } = require("../controllers/hostControllers.js");
const { getHostHomeList } = require("../controllers/hostControllers.js");
const { getEditHome } = require("../controllers/hostControllers.js");
const { postEditHome } = require("../controllers/hostControllers.js");
const { postDeleteHome } = require("../controllers/hostControllers.js");

// Routes

hostRouter.get("/add-home", getAddHome);
hostRouter.post("/add-home", postAddHome);
hostRouter.get("/host-home-list", getHostHomeList);
hostRouter.get("/edit-home/:homeId", getEditHome);
hostRouter.post("/edit-home", postEditHome);
hostRouter.post("/delete-home", postDeleteHome);


exports.hostRouter = hostRouter;

//External Modules
const express = require("express");
const storeRouter = express.Router();
// Local Modules
const { getHomes } = require("../controllers/storeControllers.js");
const { getBooking } = require("../controllers/storeControllers.js");
const { getReserve } = require("../controllers/storeControllers.js");
const { getFavourites } = require("../controllers/storeControllers.js");
const { getHomeList } = require("../controllers/storeControllers.js");
const { getHomeDetails } = require("../controllers/storeControllers.js");
const { postFavourites } = require("../controllers/storeControllers.js");
const { postBooking } = require("../controllers/storeControllers.js");


// Routes
storeRouter.get("/", getHomes);
storeRouter.get("/booking", getBooking);
storeRouter.get("/reserve", getReserve);
storeRouter.get("/favourites", getFavourites);
storeRouter.get("/home-list", getHomeList);
storeRouter.get("/home/:homeId",getHomeDetails);
storeRouter.post("/favourites", postFavourites);
storeRouter.post("/booking/:homeId", postBooking);


module.exports = storeRouter;

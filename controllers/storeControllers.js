// IMPORTING MODULES
const User = require("../models/users");
const Home = require("../models/home");


exports.getHomes = (req, res, next) => {
  console.log("isloggedIn:", req.session.isloggedIn, "user:", req.session.user);
  Home.find()
    .then((homes_data) => {
      res.render("store/index", {
        house_data: homes_data,
        Page_title: " Airbnb Home",
        isloggedIn: req.session.isloggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

exports.getBooking = (req, res, next) => {
  res.render("store/booking", {
    Page_title: " Booking Home",
    isloggedin: req.session.isloggedin,
    user: req.session.user,
  });
};

exports.getReserve = (req, res, next) => {
  res.render("store/reserve", {
    Page_title: " Reserve Home",
    isloggedIn: req.session.isloggedIn,
    user: req.session.user,
  });
};

exports.getFavourites = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const userId = req.session.user.userId;
    console.log("Fetching favourites for user ID:", userId);

    const user = await User.findById(userId).populate("userFavourites");

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("store/favourites", {
      Page_title: "Favourites Homes",
      isloggedIn: req.session.isloggedIn,
      user: req.session.user,
      FavouritesData: user.userFavourites || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.postFavourites = async (req, res) => {
  const { homeId, action } = req.body;  // ✅ Added action parameter
  const userId = req.session.user.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Handle remove action
    if (action === "remove") {
      user.userFavourites = user.userFavourites.filter(
        (favId) => favId.toString() !== homeId
      );
      await user.save();
      console.log("Home removed from favourites");
      return res.redirect("/favourites");
    }

    
    // Check if the home is already in favourites
    if (user.userFavourites.includes(homeId)) {
      console.log("Home already in favourites");
      return res.redirect("/favourites");
    }

    user.userFavourites.push(homeId);
    await user.save();

    console.log("Home added to favourites");
    res.redirect("/favourites");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.getHomeList = (req, res, next) => {
  Home.find().then((homes_data) => {
    res.render("store/home_list", {
      house_data: homes_data,
      Page_title: " Airbnb Home",
      isloggedIn: req.session.isloggedIn,
    });
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    console.log(home);
    if (!home) {
      return res.redirect("/home-list");
    }
    res.render("store/home_details", {
      Page_title: " Home Details",
      home: home,
      isloggedIn: req.session.isloggedIn,
    });
  });
};




exports.postBooking = async (req, res) => {
  const { homeId } = req.params;
  const {  action } = req.body;
  const userId = req.session.user?.userId;

  if (!homeId) {
    return res.status(400).send("homeId is required");
  }

  if (!userId) {
    return res.status(401).send("Not authenticated");
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // REMOVE booking
    if (action === "remove") {
      user.userBookings = user.userBookings.filter(
        bookingId => bookingId.toString() !== homeId
      );
      await user.save();
      return res.redirect("/bookings");
    }

    // CHECK duplicate booking
    const alreadyBooked = user.userBookings.some(
      bookingId => bookingId.toString() === homeId
    );

    if (alreadyBooked) {
      return res.redirect("/bookings");
    }

    // ADD booking
    user.userBookings.push(homeId);
    await user.save();

    res.redirect("/bookings");

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


const Home = require("../models/home");
const fs = require("fs");
exports.getAddHome = (req, res, next) => {
  res.render("host/add_home", {
    Page_title: "Add Home on Airbnb",
    isloggedIn: req.session.isloggedIn,
    user : req.session.user
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editMode = req.query.edit;
  Home.findById(homeId).then((home) => {
    if (!home) {
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, home, editMode);
    res.render("host/edit_home", {
      Page_title: "Edit Home on Airbnb",
      home: home,
      editing: editMode,
      isloggedIn: req.session.isloggedIn,
      user : req.session.user
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const {
    homeId,
    name,
    houseowner,
    description,
    price,
    location,
    rating,
  } = req.body;

  Home.findById(homeId)
    .then((home) => {
      home.name = name;
      home.houseowner = houseowner;
      home.description = description;
      home.price = price;
      home.location = location;
     if (req.file) {
        // Delete the previous image file
        if (home.image_file) {
          fs.unlink(home.image_file, (err) => {
            if (err) {
              console.log("Error deleting previous image file:", err);
            }
          });
        }
        home.image_file = req.file.path
      }
      home.rating = rating;
      home
        .save()
        .then((result) => {
          console.log("Home Updated Successfully", result);
        })
        .catch((err) => {
          console.log("Error saving home:", err);
        });
    })
    .catch((err) => {
      console.log("Error finding home:", err);
    });

  res.redirect("/host/host-home-list");
};

exports.postAddHome = (req, res, next) => {
  const { name, houseowner, description, price, location, rating } =
    req.body;
  const image_file = req.file ? req.file.path : null;
  const new_home = new Home({
    name,
    houseowner,
    description,
    price,
    location,
    image_file,
    rating,
  });
  new_home.save().then(() => {
    console.log("New Home Added");
  });
  res.render("host/home_added", {
    Page_title: " Home Added Successfully",
    isloggedIn: req.session.isloggedIn,
    user : req.session.user
  });
};
exports.getHostHomeList = (req, res, next) => {
  Home.find().then((homes_data) => {
    res.render("host/host_home_list", {
      house_data: homes_data,
      Page_title: " Host Registered Homes",
      isloggedIn: req.session.isloggedIn,
      user : req.session.user
    });
  });
};
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.body.homeId;
  Home.findByIdAndDelete(homeId).then(() => {
    res.redirect("/host/host-home-list");
  });
};

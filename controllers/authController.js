// External Modules
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Local Modules
const User = require("../models/users");

exports.getLogin = (req, res) => {
  res.render("./auth/login", { pageTitle: "Login" ,errorMessage: undefined,user:{}});
};


exports.postLogin = async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  
  if (!user) {
    return res.status(401).render("./auth/login", {
      pageTitle: "Login",
      errorMessage: "Invalid email or password.",
      user:{}
    });
  }
  
  const Match = await bcrypt.compare(password, user.password);
  if (!Match) {
    return res.status(401).render("./auth/login", {
      pageTitle: "Login",
      errorMessage: "Invalid password.",
      user:{}
    });
  }
  
  req.session.user = {
    email: user.email,
    userType: user.userType,
    firstName: user.firstName,
    lastName: user.lastName,
    userId: user._id
  };
  req.session.isloggedIn = true;
  
  // Use callback to ensure redirect happens AFTER save
  req.session.save((err) => {
    if (err) {
      console.log("Session save error:", err);
    }
    console.log("Session saved, redirecting...");
    res.redirect("/");
  });
};
exports.postlogout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log("Error destroying session during logout:", error);
      return res.redirect("/");
    }
    res.redirect("/login");
  });
};
exports.getSignup = (req, res) => {
  res.render("./auth/signup", {
    pageTitle: "Signup",
    errors: [],
    oldInput: {},
    user:{},
  });
};

exports.postSignup = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("First name must contain only letters"),

  check("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Last name must contain only letters"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character")
    .trim(),

  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("terms").equals("on").withMessage("You must accept Terms & Conditions"),

  (req, res) => {
    const errors = validationResult(req);
    const { firstName, lastName, email, password, userType } = req.body;

    if (!errors.isEmpty()) {
      return res.status(422).render("./auth/signup", {
        pageTitle: "Signup",
        user:{},
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, userType },
      });
    }

    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType,
      });
      user
        .save()
        .then(() => {
          res.redirect("/login");
        })
        .catch((err) => {
          return res.status(422).render("./auth/signup", {
            pageTitle: "Signup",
            user:{},
            errors: [err.message],
            oldInput: { firstName, lastName, email, userType },
          });
        });
    });
  },
];

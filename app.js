//Core Modules
const path = require("path");
//External Modules

const express = require("express");
const multer  = require('multer')
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);


// Local Modules

const rootDir = require("./utils/path.js");
const authRouter = require("./routes/authRouter");
const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const { getPageNotFound } = require("./controllers/error");
const mongoose = require("mongoose");
// const { mongoConnect } = require("./utils/databaseUtil");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

// Const Varables

const Data_path =
  "mongodb+srv://kunal8235823516kumar_db_user:AIRBNB_123@cluster0.0lesqxw.mongodb.net/airbnbDB";
const port = 3000;

const randomString = (length) => {
  let result = "";
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${randomString(10)}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png, image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."), false);
  }
};


const  multerOptions = {
  storage,
  fileFilter,
}


const store = new MongoDBStore({
  uri: Data_path,
  collection: "sessions",
});

// Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "Airbnb Secret Key", resave: false, saveUninitialized: false , store: store}));
app.use(express.static(path.join(rootDir, "public")));
app.use("/upload", express.static(path.join(rootDir, "upload")));
app.use("/host/upload", express.static(path.join(rootDir, "upload")));
  

// app.use((req, res, next) => {
//   req.isloggedIn = req.session.isloggedIn;
//   next();
// });

app.use(multer(multerOptions).single('image_file'));


app.use("/", storeRouter);
app.use(authRouter);
app.use("/host", (req, res, next) => {
  if (!req.session.isloggedIn) {
    return res.redirect("/login");
  } else {
    next();
  }
});
app.use("/host", hostRouter);

// app.use(getPageNotFound);

// Routes

mongoose
  .connect(Data_path)
  .then(() => {
    console.log("Connected to MongoDB via Mongoose");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

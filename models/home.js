const mongoose = require("mongoose");
const homeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  houseowner: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  location: { type: String, required: true },
  image_file: String,
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("Home", homeSchema);

// //Core modules
// const path = require("path");
// const fs = require("fs");
// const { ObjectId } = require("mongodb");

// // Local modules
// const rootDir = require("../utils/path");
// const { getDb } = require("../utils/databaseUtil");

// // Constants
// const filePath = path.join(rootDir, "data", "homes_data.json");

// module.exports = class Home {
// /*************  ✨ Windsurf Command ⭐  *************/
//   /**
//    * Constructor for Home class.
//    * @param {string} name - Name of the home
//    * @param {string} houseowner - Name of the house owner
//    * @param {string} description - Description of the home
//    * @param {number} price - Price of the home
//    * @param {string} location - Location of the home
//    * @param {string} image_file - URL of the home image
//    * @param {number} rating - Rating of the home
//    */
// /*******  291feacc-ec2f-48c1-a079-1a6a131c9671  *******/
//   constructor(
//     name,
//     houseowner,
//     description,
//     price,
//     location,
//     image_file,
//     rating,
//   ) {
//     this.name = name;
//     this.houseowner = houseowner;
//     this.description = description;
//     this.price = price;
//     this.location = location;
//     this.image_file = image_file;
//     this.rating = rating;
//   }
//   save() {
//     const db = getDb();
//     if (this._id) {
//     const homeId = this._id;
//     const homeData = { ...this };
//     delete homeData._id; // ⭐ CRITICAL FIX

//     return db.collection("homes").updateOne(
//       { _id: new ObjectId(homeId) },
//       { $set: homeData }
//     );
//   }else{
//       return db.collection("homes").insertOne(this);
//     }
//   }

//   static find() {
//     const db = getDb();
//     return db.collection("homes").find().toArray();
//   }

//   static findById(HomeId) {
//     const db = getDb();
//     return db
//       .collection("homes")
//       .find({ _id: new ObjectId(HomeId) })
//       .next();
//   }

//   static deleteById(favId) {
//   const db = getDb();
//   return db.collection("favourites").deleteOne({
//     _id: new ObjectId(favId)
//   });
// }

// };

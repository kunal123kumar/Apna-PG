const moongoose = require("mongoose");

const userSchema = new moongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    
  },
    userType: {
    type: String,
    enum: ["guest", "host"],
    required: true,
  },
   userFavourites: [
    {
      type: moongoose.Schema.Types.ObjectId,
      ref: "Home", 
    },
  ], 
    userBookings: [
    {
      type: moongoose.Schema.Types.ObjectId,
      ref: "Home", 
    },    
  ],
});

module.exports = moongoose.model("User", userSchema);
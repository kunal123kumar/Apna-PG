const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  houseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Booking', bookingSchema);

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
    {
      title: String,
      description: String,
      // we want to reference owners inside the listing model and for that we will use their IDs
      // this is telling us that in "owner" property of each listing object, we will have
      // saved ObjectId (id that is automatically generated by MongoDB) that belongs to one of the owners from the owners collection
      owner: { type: Schema.Types.ObjectId, ref: 'owner' },
      rating: Number
    },
    {
      timestamps: true
    }
  );

module.exports = model('Booking', bookingSchema);

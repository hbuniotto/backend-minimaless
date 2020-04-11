const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const listingPhotoSchema = new Schema(
  {
    url: String,
    cover: Boolean,
    // listing: { type: Schema.Types.ObjectId, ref: "listing" } // may not need it - need to test in postman
  },
  {
    timestamps: true
  }
);

// const user = model('user', userSchema);
// module.exports = user;

module.exports = model("ListingPhoto", listingPhotoSchema);

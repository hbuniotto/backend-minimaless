const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const listingPhotoSchema = new Schema(
  {
    url: String,
    cover: Boolean,
    listing: { type: Schema.Types.ObjectId, ref: "listing" }
  },
  {
    timestamps: true
  }
);

// const user = model('user', userSchema);
// module.exports = user;

module.exports = model("ListingPhoto", listingPhotoSchema);

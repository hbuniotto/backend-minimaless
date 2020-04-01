const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const listingCategorySchema = new Schema (
  {
    name: String
  },
  {
    timestamps: true
  }
);

// const user = model('user', userSchema);
// module.exports = user;

module.exports = model("ListingCategory", listingCategorySchema);

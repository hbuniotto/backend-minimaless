const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const listingConditionSchema = new Schema (
  {
    name: String
  },
  {
    timestamps: true
  }
);

// const user = model('user', userSchema);
// module.exports = user;

module.exports = model("ListingCondition", listingConditionSchema);

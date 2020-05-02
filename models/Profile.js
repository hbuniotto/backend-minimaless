const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    avatar:{
      type: Array,
      default:[]
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipcode: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Profile = mongoose.model("profile", ProfileSchema);

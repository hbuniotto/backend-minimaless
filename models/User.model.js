const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    streetAddress: String,
    cityAddress: String,
    stateAddress: String,
    zipAddress: String,
    pictureUrl: String,
    
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true, // leave for now
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);

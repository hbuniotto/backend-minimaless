const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    address: {
      streetAddress: String,
      cityAddress: String,
      stateAddress: String,
      zipAddress: String,
    },
    phone: Number,
    pictureUrl: String,
    
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true, // leave for now
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);

// THIS WILL BE USED WHEN WE VALIDATE ADDRESS
// STORE USER LOCATION COORDINATES

// users: {
//   location: {
//      type: "Point",
//      coordinates: [-73.856077, 40.848447]
//   },
//   name: "Morris Park Bake Shop"
// }

// {              
//   geometry: {
//      type: "Polygon",
//      coordinates: [[
//         [ -73.99, 40.75 ],
//         [ -73.99, 40.75],
//         ...
//         [ -73.98, 40.76 ],
//         [ -73.99, 40.75 ]
//      ]]
//    },
//    name: "Hell's Kitchen"
// }
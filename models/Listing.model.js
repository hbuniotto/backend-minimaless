const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    brand:  {
      type: String,
      // required: true
    },
    description:  {
      type: String,
      // required: true
    },
    size: { // will add a size charge on mouseover
      type: String,
      // required: true,
      enum: [
        "Extra Small", 
        "Small", 
        "Medium", 
        "Large", 
        "Extra Large",
        "Other"
      ],
      default: "Medium"
    },
    condition: {
      type: String,
      // required: true,
      enum: [
        "Brand New", 
        "Good", 
        "Fair"
      ],
      default: "Good"
    },
    category: {
      type: String,
      // required: true,
      enum: [
        "Pants & Shorts", 
        "Suits & Jackets", 
        "Shirts & Buttondowns", 
        "Dresses & Skirts", 
        "Shoes",
        "Accessories",
        "Other"
      ],
      // default: null
    },
    occasion: {
      type: String,
      // required: true,
      enum: [
        "Night Out", 
        "Business", 
        "Casual", 
        "Athleisure", 
      ],
      default: "Casual"  
    },  
    color: {
      type: String,
      // required: true,
      enum: [
        "Black", 
        "White", 
        "Red", 
        "Yellow", 
        "Blue",
        "Green",
        "Pink",
        "Orange",
        "Other"
      ],
    },
    
    // user: { type: Schema.Types.ObjectId, ref: "User" },
    price: { 
      type: Number,
      // required: true,
     }, // find out how to make it 2 decimals for price

    images:{
        type: Array,
        default:[]
    },
  },
  {
    timestamps: true
  }
);

module.exports = Listing = mongoose.model('listing', ListingSchema);

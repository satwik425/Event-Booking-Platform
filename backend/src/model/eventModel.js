const mongoose =require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: String,

  date: {
    type: Date,
    required: true
  },

  totalSeats: {
    type: Number,
    required: true,
    min: 1
  },

  bookedSeats: {
    type: Number,
    default: 0
  },

  location: String,

  price: {
    type: Number,
    default: 0
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

const eventModel=mongoose.model("event",eventSchema);

module.exports=eventModel
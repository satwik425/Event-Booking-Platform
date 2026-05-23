
const mongoose =require("mongoose");


const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },
  seatsBooked: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const bookingModel=mongoose.model("booking",bookingSchema);

module.exports=bookingModel
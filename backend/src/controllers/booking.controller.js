const mongoose=require("mongoose");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const bookingModel =require("../model/bookingModel");
const  eventModel  = require("../model/eventModel");



const bookingEvent = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    let decoded;
    try {
      decoded = Jwt.verify(token,process.env.JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const userId = decoded.userId;
    const eventId = req.params.eventId;
    const { seatsRequested } = req.body;

    const event = await eventModel.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.bookedSeats + seatsRequested > event.totalSeats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    // Create booking
    const booking = await bookingModel.create({
      user: userId,
      event: eventId,
      seatsBooked: seatsRequested
    });

    // Update seats
    event.bookedSeats += seatsRequested;
    await event.save();

    return res.status(201).json({ message: "Booking successful", booking });

  } catch (err) {
    return res.status(500).json({ message: "Error booking event", error: err.message });
  }
};
module.exports =bookingEvent;
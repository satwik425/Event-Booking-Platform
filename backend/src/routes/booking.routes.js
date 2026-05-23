const express =require("express");
const bookingEvent= require("../controllers/booking.controller");


const router=express.Router();

router.post("/bookingEvent/:eventId",bookingEvent);


module.exports=router

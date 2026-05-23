const express =require("express");
const {createEvent,deleteEvent,updateEvent,getAllEvent,getEventById} = require("../controllers/event.controller");
const Jwt = require("jsonwebtoken");

const router=express.Router();

router.post("/create-event",createEvent);

router.delete("/delete-event/:id",deleteEvent);

router.patch("/update-event/:id",updateEvent);

router.get("/getEventById/:id",getEventById);

router.get("/getAllEvent",getAllEvent);

module.exports=router
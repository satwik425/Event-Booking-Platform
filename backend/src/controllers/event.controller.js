
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const eventModel =require("../model/eventModel")

const createEvent=async (req,res)=>{
    try{
const token = req.cookies.token;

    if(!token){
    return res.status(401).json({
       messsage:"unautherised"
     });
    }
    let decoded;
    try{
     decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return res.status(403).json({
            message:"unautherised",
            error:err.message
            
        });
    }
   if(decoded.role!=="admin"){
     return res.status(403).json({
       message:"request denied"
     });
   }
const {title,description,date,totalSeats,location,price}=req.body;

 const event = await eventModel.create({
    title: title,
    description:description,
    date:date,
    totalSeats:totalSeats,
    bookedSeats:0,
    location:location,
    price:price,
    createdBy:decoded.userId
 });

    return res.status(201).json({
        message:"event created",
        event
    })
    }catch(err){
        return res.status(500).json({
            message:"error creating event",
            error:err.message
        })
    }
};

const deleteEvent =async (req,res)=>{
try{
const token = req.cookies.token;

    if(!token){
    return res.status(401).json({
       messsage:"unautherised"
     });
    }
    let decoded;
    try{
     decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return res.status(403).json({
            message:"unautherised",
            error:err.message
            
        });
    }
   if(decoded.role!=="admin"){
     return res.status(403).json({
       message:"request denied"
     });
   }
   const id =req.params.id;

   const check=await eventModel.findById(id);

   if(!check){
    return res.status(404).json({
        message:"event not found"
    });
   }

   if (check.createdBy.toString() !== decoded.userId) {
  return res.status(403).json({
    message: "You can only delete your own events"
  });
}
   
   await eventModel.findByIdAndDelete(id);


   return res.status(200).json({
        message:"event deleted"
    })
   }catch(err){
        return res.status(500).json({
            message:"error deleting event",
            error:err.message
        });
    }
};

const updateEvent =async (req,res)=>{
try{
const token = req.cookies.token;

    if(!token){
    return res.status(401).json({
       message:"unautherised"
     });
    }
    let decoded;
    try{
     decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return res.status(403).json({
            message:"unautherised",
            error:err.message
            
        });
    }
   if(decoded.role!=="admin"){
     return res.status(403).json({
       message:"request denied"
     });
   }
   const id =req.params.id;
   const event=await eventModel.findById(id);

    if(!event){
    return res.status(404).json({
        message:"event not found"
    });
   }

   if (event.createdBy.toString() !== decoded.userId) {
  return res.status(403).json({
    message: "You can only update your own events"
  });
}

   const { title, description, date, totalSeats, location, price } = req.body;

    if (totalSeats < event.bookedSeats) {
        return res.status(400).json({
          message: "Total seats cannot be less than booked seats"
        });
      }

    const updatedevent=await eventModel.findByIdAndUpdate(id,{
    title: title,
    description:description,
    date:date,
    totalSeats:totalSeats,
    location:location,
    price:price
 },{new:true});


   return res.status(200).json({
        message:"event updated",
        updatedevent
    })
   }catch(err){
        return res.status(500).json({
            message:"error updating event",
            error:err.message
        });
    }
};

const getAllEvent = async (req,res)=>{
try{
const token = req.cookies.token;

    if(!token){
    return res.status(401).json({
       message:"unautherised"
     });
    }

    let decoded;
   try {
  decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded payload:", decoded);
} catch (err) {
  console.error("JWT verification failed:", err.message);
  return res.status(403).json({
    message: "unauthorized",
    error: err.message
  });
}

;
    console.log("Cookie received:", req.cookies.token);


   const events =await eventModel.find();

    if(events.length === 0){
    return res.status(404).json({
        message:"No Event Available"
    });
   }
   return res.status(200).json({
        message:"event fetched",
        events
    })
   }catch(err){
        return res.status(500).json({
            message:"error fetching event",
            error:err.message
        });
    }
};

const getEventById = async (req,res)=>{
try{
const token = req.cookies.token;

    if(!token){
    return res.status(401).json({
       message:"unautherised"
     });
    }

    let decoded;
   try {
  decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded payload:", decoded);
} catch (err) {
  console.error("JWT verification failed:", err.message);
  return res.status(403).json({
    message: "unauthorized",
    error: err.message
  });
}

;
   const id =req.params.id;


   const event =await eventModel.findById(id);

    if(!event){
    return res.status(404).json({
        message:"No Event Available"
    });
   }
   return res.status(200).json({
        message:"event fetched",
        event
    })
   }catch(err){
        return res.status(500).json({
            message:"error fetching event",
            error:err.message
        });
    }
};

module.exports ={createEvent,deleteEvent,updateEvent,getAllEvent,getEventById};
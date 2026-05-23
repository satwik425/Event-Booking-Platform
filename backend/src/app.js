const express =require("express");
const event = require("./routes/event.routes");
const user = require("./routes/user.routes");
const booking = require("./routes/booking.routes");
const cookieParser = require("cookie-parser");
const cors =require("cors")
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URI,  // React dev server
  credentials: true               // allow cookies (JWT)
    }                 
));

app.use("/api/user",user);

app.use("/api/event",event);

app.use("/api/booking",booking)


module.exports=app



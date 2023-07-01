// List of imports
const express = require('express');
const app = express();
require("dotenv").config()
let userRouter = require("./routes/user.route");
const mongoose = require("mongoose")
const cors = require("cors");


// Middleware
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/user",userRouter);


let URI = "mongodb+srv://seyidami13:mongodbpass@cluster0.jc3kz.mongodb.net/school_portal_db?retryWrites=true&w=majority";

mongoose.connect(URI)
.then(()=>{
    console.log("mongodb connected successfully")
})
.catch((err)=>{
    console.log("mongodb no gree connect");
    console.log(err)
})




// Variable Declaration
let PORT = process.env.PORT



app.listen(PORT,()=>{
    console.log("app is listening at PORT :" + PORT)
})

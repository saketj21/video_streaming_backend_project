import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "./constants.js";
import  express  from "express";
import connectDB from "./db/index.js";
dotenv.config({
    path: ".env"
});
connectDB();






/*const app = express();
( async () => {
    try{
         await mongoose.connect('${process.env.MONGODB_URI}')
         app.on("errror",(error)=>{
                console.log("ERR: ",error);
                throw error;
         })
         app.listen(process.env.PORT,()=>{
             console.log("Server is running on PORT: ",process.env.PORT)
         })
    }
    catch(error){
        console.log("ERROR: ",error)
        throw error;
    }
})()*/
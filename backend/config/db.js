import mongoose from "mongoose";
import 'dotenv/config'
const URI= process.env.MONGODB_URI;

export const connectDB= async () =>{
    await mongoose.connect(URI)
    .then(() =>{
        console.log("DB connected");
    })
}
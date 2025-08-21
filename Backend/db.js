import mongoose from "mongoose";
import dotenv from "dotenv";

async function connectDB(){
    try{
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        if(connection) console.log(`Connected to MongoDB ${connection.host}`);
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
    
} 

export default connectDB;
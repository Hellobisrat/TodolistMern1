import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = async()=>{
try{
   const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is undefined! Check your .env file")
  await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

}
catch (error){
  console.error(`mongoose connection error ${error}`)
  process.exit(1)
};

  
}

export default db;
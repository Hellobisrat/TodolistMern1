import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from "./routes/todoRoutes.js"



dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoutes)
app.use('/api/todos',todoRoutes)

const PORT = process.env.PORT;


app.listen(PORT,()=>{
  db();
  console.log(`server running on port ${PORT}`)
})




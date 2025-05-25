import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

//Register a new user

router.post("/register",async(req,res)=>{
  try {
    const {username, email, password} = req.body;

    const hassedPassword = await bcrypt.hash(password,10);
    const newUser = await  User.create({username,email,password:hassedPassword})
    res.status(200).json({message:'User registerd successfully'})
  }
  catch (error){
    res.status(500).json({error:error.message})
  }
})

router.post('/login', async(req,res)=>{
  try{
    const {email,password} =req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(404).json({message:"User not found"});
    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword) return res.status(401).json({message:"Invalid password"})
     
        // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1hr"})
    res.status(200).json({token,user})
  
  } catch(error){
    res.status(500).json({error:error.message})
  }
})

export default router;
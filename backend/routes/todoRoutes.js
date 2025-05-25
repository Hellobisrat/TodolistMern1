import express from "express";
import Todo from "../models/Todo.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//Add a new todo

router.post("/",authMiddleware, async(req,res)=>{
  console.log("received request:",req.body);
  
  try {
    const {title} =req.body;
    const newTodo = await Todo.create({userId:req.user.id,title})
    res.status(201).json({message:"route is working",newTodo});
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

// get all todos for logged-in user

router.get('/',authMiddleware,async(req,res)=>{
  try {
    const todos =await Todo.find({userId:req.user.id});
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

// update todo

router.put("/:id",authMiddleware, async(req,res)=>{
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

// Delete a todo

router.delete("/:id",authMiddleware, async (req,res)=>{
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Todo deleted suceessfully"})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

export default router;
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", requored:true},
  title:{type:String, required:true},
  completed:{type:Boolean, default:false}
},{
  timestamps:true
})

const Todo = mongoose.model("Todo",todoSchema);

export default Todo;
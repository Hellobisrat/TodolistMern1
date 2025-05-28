import { useState, useContext } from "react";
import TodoContext from "../context/TodoContext";

const Todos = () => {
  const { todos, handleAddTodo, handleUpdateTodo, handleDeleteTodo } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTodo(newTodo);
    setNewTodo("");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Todo List</h2>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input type="text"
         placeholder="New Todo" 
         value={newTodo} 
         onChange={(e) => setNewTodo(e.target.value)}
         required 
         className="flex-grow border p-2 rounded"/>
        <button type="submit"
        className="bg-blue-500 
         text-white px-4 py-2 
          rounded hover:bg-blue-600"
        >Add Todo</button>
      </form>

      <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
          <li key={todo._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span className={todo.completed ? "line-through text-gray-500" : ""}>{todo.title}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleUpdateTodo(todo._id, { completed: !todo.completed })}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => handleDeleteTodo(todo._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
};

export default Todos;


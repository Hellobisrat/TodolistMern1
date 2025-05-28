import { createContext, useState, useContext, useEffect } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../services/api";
import AuthContext from "./AuthContext";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  console.log("Token in TOdoContext:",token);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
  const fetchTodos = async () => {
    if (!token) {
      console.log("Token not available, skipping fetch.");
      return;
    }

    try {
      const response = await getTodos(token);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error.response?.data || error.message);
    }
  };

  fetchTodos();
}, [token]);
 

  const handleAddTodo = async (title) => {
  console.log("Adding Todo with Token:", token);
  if (!token) return;

  try {
    const response = await addTodo({ title }, token);
    setTodos((prevTodos)=>[...prevTodos, response.data]);
  } catch (error) {
    console.error("Error adding todo:", error.response?.data || error.message);
  }
};

  const handleUpdateTodo = async (id, updatedTodo) => {
    const response = await updateTodo(id, updatedTodo, token);
    setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id, token);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, handleAddTodo, handleUpdateTodo, handleDeleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
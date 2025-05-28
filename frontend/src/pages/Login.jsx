import { useContext, useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const {setUser} =useContext(AuthContext);

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await loginUser({ email, password });

    if (!response.data.token) {
      throw new Error("No token received from backend");
    }

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user",JSON.stringify(response.data.user))
    console.log("Stored Token:", localStorage.getItem("token"));
    setUser(response.data.user)
    navigate("/"); // ✅ Redirect to home after login
  } catch (error) {
    console.log("Login failed:", error.response?.data || error.message);
  }
};
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
 useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken);
  }
}, []);

useEffect(() => {
  if (!token) {
    setUser(null);
    localStorage.removeItem("token");
   
    return;
  }

 
   const storedUser = localStorage.getItem("user")
  console.log("stored User:",storedUser)
  if ( storedUser) {
    try{
      setUser(JSON.parse(storedUser))
    } catch (error){
      console.log("error occured :",error)
    }
    ;  // ✅ Ensure user is properly set
  } else {
    setUser(null);
   
  }
}, [token]);

  const login = async (userData) => {
    try {
      const response = await loginUser(userData);
      if (!response.data.token || !response.data.user) {
      throw new Error("Invalid login response");
    }

      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem('token',response.data.token)
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      return null;
    }
  };

  const register = async (userData) => {
  try {
    const response = await registerUser(userData);
    setUser(response.data.user);
    setToken(response.data.token);

    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    return null;
  }

  };

  const logout = () => {
  setUser(null);
  setToken(null);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href="/login"
};

  return (
    <AuthContext.Provider value={{ user,setUser, token, login, register,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [authUser, setAuthUser]=useState(user);

 useEffect(() => {
  setAuthUser(user);
}, [user])

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token')
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="text-lg font-bold">TodoMERN</Link>
      <div className="space-x-4">
        {user ? (
        <>
          <Link to="/todos">Todos</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      </div>
      
    </nav>
  );
};

export default Navbar;
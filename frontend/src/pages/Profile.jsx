import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { updateUser } from "../services/api";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser({ username, email, password }, token);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
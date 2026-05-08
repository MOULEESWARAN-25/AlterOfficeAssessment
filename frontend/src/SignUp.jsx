import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await axios.post("https://todo-app-alteroffice.vercel.app/api/signup", { name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        
        {error && <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</div>}
        
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Name</label>
            <input 
              type="text" 
              className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Email</label>
            <input 
              type="email" 
              className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Password</label>
            <input 
              type="password" 
              className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading} 
            className="mt-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm">
          Already have an account? <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline">Login</button>
        </p>
      </div>
    </div>
  );
}

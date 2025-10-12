// 


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://dashboard-backend-9i5l.onrender.com/api/v1/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      console.log("Signin response:", data); // debug the response

      if (res.ok && data.user && data.token) {
        // save token and role safely
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role || "user"); // fallback to 'user'

        // role-based redirect
        if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSignin}
      className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 shadow-sm"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 shadow-sm"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
    </form>
  );
}

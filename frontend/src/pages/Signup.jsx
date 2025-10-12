import { useState } from "react";
import axios from "axios";

export default function Signup({ onSignupSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ✅ Email validation
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  // ✅ Password validation
  const validatePassword = (value) => {
    return value.length >= 6; // example rule
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Check before submitting
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/signup",
        { username: email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(res.data); // { message: "sign up successful" }

      if (onSignupSuccess) {
        onSignupSuccess();
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto"
    >
      {/* Email Input */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(validateEmail(e.target.value) ? "" : "Invalid email format.");
        }}
        required
        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-400 shadow-sm"
      />
      {emailError && (
        <p className="text-red-500 text-sm -mt-4">{emailError}</p>
      )}

      {/* Password Input */}
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError(
            validatePassword(e.target.value)
              ? ""
              : "Password must be at least 6 characters long."
          );
        }}
        required
        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-400 shadow-sm"
      />
      {passwordError && (
        <p className="text-red-500 text-sm -mt-4">{passwordError}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md disabled:opacity-50"
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

      {/* Server Error */}
      {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
    </form>
  );
}

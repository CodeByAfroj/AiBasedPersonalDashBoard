

import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import animation from "../assets/animation2.mp4";
import "../App.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center gap-10  font-sans px-9">
      <div className="h-130 flex flex-col items-center w-full max-w-md p-8 bg-gradient-to-r from-slate-400 to-slate-600  rounded-3xl shadow-2xl">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center">
            Welcome
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex w-full mb-8 bg-gray-100 rounded-full p-1 relative">
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg transform transition-transform duration-300 ${
              activeTab === "register"
                ? "translate-x-full bg-gradient-to-r from-green-500 to-green-600"
                : ""
            }`}
          />
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 rounded-full font-semibold text-center relative z-10 transition-colors duration-300 ${
              activeTab === "login"
                ? "text-white"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 rounded-full font-semibold text-center relative z-10 transition-colors duration-300 ${
              activeTab === "register"
                ? "text-white"
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Card */}
        <div className="w-full">
          {activeTab === "login" ? (
            <Signin />
          ) : (
            <Signup onSignupSuccess={() => setActiveTab("login")} />
          )}
        </div>

        <p className="text-center text-gray-400 mt-8 text-sm">
          &copy; 2025 All rights reserved.
        </p>
      </div>

      {/* Video Section */}
      <div className="max-sm:hidden w-full max-w-md bg-white rounded-3xl shadow-2xl">
        <video
          src={animation}
          autoPlay
          loop
          muted
          playsInline
          className="h-130 w-full object-cover rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
}

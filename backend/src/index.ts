
import express from "express";
import mongoose from "mongoose";
import { UserModel } from "./db.js";
import { DataModel } from "./data.js";
import { TimelineModel } from "./timeline.js";
import type { Response } from "express";
import cors from "cors";
import {authMiddleware,isAdmin } from"./middleware.js"
import type {  AuthRequest} from "./middleware.js";
import jwt from "jsonwebtoken";
import router from "./timelineRouter.js";
const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Signup route
app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;

      const existingUser = await UserModel.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    
    const role = username === "mulaniafroj7@gmail.com" ? "admin" : "user"; // ✅ Auto-assign

  await UserModel.create({ username, password,role });
  res.json({ message: "Sign up successful" });
});

// Signin route
app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
   const JWT_SECRET = process.env.JWT_SECRET || "123123";

  const existingUser = await UserModel.findOne({ username, password });

  if (!existingUser) return res.status(403).json({ message: "Incorrect credentials" });

  const token = jwt.sign(
    { id: existingUser._id, username: existingUser.username ,role:existingUser.role},
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  // res.json({ token,existingUser });
  res.json({
  token,
  user: {
    id: existingUser._id,
    username: existingUser.username,
    role: existingUser.role
  }
});
});

// Dashboard route (protected)
app.get("/api/v1/dashboard", authMiddleware, async (req: AuthRequest, res: Response) => {
  const user = await UserModel.findById(req.user?.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    userId: req.user?.id,
    username: user.username,
  });
});

app.post("/api/create", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { title, desc, link, } = req.body;
    const userId =req.user?.id;
    if (!title || !desc || !link) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newData = await DataModel.create({ title, desc, link, userId });
    res.json(newData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// View all user-specific data
app.get("/api/viewall", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const allData = await DataModel.find({ userId: req.user?.id });
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a user-specific data item
app.delete("/api/delete/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const deleted = await DataModel.findOneAndDelete({ _id: req.params.id, userId: req.user?.id});
    if (!deleted) return res.status(403).json({ error: "Not allowed" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a user-specific data item
app.put("/api/update/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const updated = await DataModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(403).json({ error: "Not allowed" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/v1/admin-dashboard", authMiddleware, isAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const data = await DataModel.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// timeline schema

app.use('/api',router)


app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);
});

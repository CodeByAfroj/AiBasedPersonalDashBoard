// import express from "express";
// import mongoose from "mongoose";
// import { UserModel } from "./db.js";
// import  type {Response} from "express";
// import cors from "cors";

// import type {  AuthRequest } from "./middleware.js";
// import {authMiddleware} from"./middleware.js"

// import jwt from "jsonwebtoken";

// const app = express();
// app.use(express.json())


// app.use(cors({
//   origin: "http://localhost:5173", // your React app origin
//   credentials: true, // optional, if you want cookies
// }));

// app.post("/api/v1/signup",async (req,res)=>{
//      const username = req.body.username;
//      const password = req.body.password;

//     await UserModel.create({
//          username:username,
//          password:password
//      })
//      res.json({message:"sign up successful"})
// })

// const JWT_PASSWORD="123123"
// app.post("/api/v1/signin",async (req,res)=>{
//      const username = req.body.username;
//      const password = req.body.password;

//    const existingUser = await UserModel.findOne({
//          username,
//          password
//      })
     
//      if(existingUser){
//           const token = jwt.sign({
//                id:existingUser._id,
//                username: existingUser.username 
//           }, JWT_PASSWORD)
//           res.json({
//                token,
               
//           })
//      }else{
//           return res.status(403).json(
//                {
//                     message:"Incorrect credentials"
//                }
//           )
//      }


// })


// // Usage in a route
// app.get("/api/v1/dashboard", authMiddleware, (req: AuthRequest, res: Response) => {
//   res.json({
//     message: "Welcome to your dashboard 🚀",
// //     userId: req.userId, // ✅ works now
//       username: req.username,
//   });
// });


// app.listen(process.env.PORT,()=>{
//      console.log(`Listening at http://localhost:${process.env.PORT}`)
// })





import express from "express";
import mongoose from "mongoose";
import { UserModel } from "./db.js";
import { DataModel } from "./data.js";
import type { Response } from "express";
import cors from "cors";
import {authMiddleware} from"./middleware.js"
import type {  AuthRequest } from "./middleware.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Signup route
app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
  await UserModel.create({ username, password });
  res.json({ message: "Sign up successful" });
});

// Signin route
app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await UserModel.findOne({ username, password });

  if (!existingUser) return res.status(403).json({ message: "Incorrect credentials" });

  const token = jwt.sign(
    { id: existingUser._id, username: existingUser.username },
    "123123"
  );

  res.json({ token });
});

// Dashboard route (protected)
app.get("/api/v1/dashboard", authMiddleware,async (req: AuthRequest, res: Response) => {
  const user = await UserModel.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

     
  res.json({
    
    userId: req.userId,
    username: user.username,
  });
});


// app.post("/api/create",async(req,res)=>{  
//      const { title, desc,link } = req.body;
//   const newData =await DataModel.create({ title, desc,link });
//   res.json(newData);
    
// })


// app.post("/api/create", async (req, res) => {
//   try {
//     const { title, desc, link } = req.body;
//      const userId = req.userId;
//     if (!title || !desc || !link) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//    const newData = await DataModel.create({ title, desc, link, userId });
//   res.json(newData);
//   } catch (err) {
//     console.error("Error creating data:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });


// app.get("/api/viewall", async (req, res) => {
//   try {
//     const allData = await DataModel.find({ userId: req.userId });
//     res.json(allData);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });


// app.delete("/api/delete/:id", async (req, res) => {
//   try {
//      await DataModel.findOneAndDelete({ _id: req.params.id, userId: req.userId });
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// app.put("/api/update/:id", async (req, res) => {
//   try {
//    const updated = await DataModel.findOneAndUpdate(
//   { _id: req.params.id, userId: req.userId },
//   req.body,
//   { new: true }
// );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });






// Create data (protected)
app.post("/api/create", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { title, desc, link } = req.body;
    const userId = req.userId;
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
    const allData = await DataModel.find({ userId: req.userId });
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a user-specific data item
app.delete("/api/delete/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const deleted = await DataModel.findOneAndDelete({ _id: req.params.id, userId: req.userId });
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
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(403).json({ error: "Not allowed" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);
});

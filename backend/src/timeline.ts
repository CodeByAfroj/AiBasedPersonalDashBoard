import dotenv  from "dotenv";
import mongoose, { model,Schema } from "mongoose";

dotenv.config()
const url=process.env.MONGO_URL

if (!url) {
  throw new Error("❌ MONGO_URL is missing in .env file");
}
await mongoose.connect(url)
.then(()=>{
    console.log("database Connected")
})

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const timelineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  entries: [entrySchema], // array of embedded entries
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link timeline to user
  createdAt: { type: Date, default: Date.now }
});

export const TimelineModel = mongoose.model("Timeline", timelineSchema);

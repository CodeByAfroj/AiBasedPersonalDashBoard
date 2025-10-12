import express from "express";
import { TimelineModel } from "./timeline.js"; // your Mongoose schema
import type { AuthRequest } from "./middleware.js";
import { authMiddleware } from "./middleware.js";

const router = express.Router();

// ---------------- CREATE Timeline ----------------
router.post("/timeline", authMiddleware, async (req: AuthRequest, res) => {
  const { title } = req.body;
  const userId = req.user?.id;

  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const newTimeline = await TimelineModel.create({ title, userId, entries: [] });
    res.json(newTimeline);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- GET ALL Timelines for User ----------------
router.get("/timelines", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const timelines = await TimelineModel.find({ userId: req.user?.id }).sort({ createdAt: -1 });
    res.json(timelines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- GET Single Timeline ----------------
router.get("/timeline/:id", authMiddleware, async (req: AuthRequest, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "Timeline ID is required" });

  try {
    const timeline = await TimelineModel.findOne({ _id: id, userId: req.user?.id });
    if (!timeline) return res.status(404).json({ error: "Timeline not found" });
    res.json(timeline);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- UPDATE Timeline Title ----------------
router.put("/timeline/:id", authMiddleware, async (req: AuthRequest, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "Timeline ID is required" });

  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const updated = await TimelineModel.findOneAndUpdate(
      { _id: id, userId: req.user?.id },
      { title },
      { new: true }
    );
    if (!updated) return res.status(403).json({ error: "Not allowed" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- DELETE Timeline ----------------
router.delete("/timeline/:id", authMiddleware, async (req: AuthRequest, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "Timeline ID is required" });

  try {
    const deleted = await TimelineModel.findOneAndDelete({ _id: id, userId: req.user?.id });
    if (!deleted) return res.status(403).json({ error: "Not allowed" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- ADD Entry to Timeline ----------------
router.post("/timeline/:id/entry", authMiddleware, async (req: AuthRequest, res) => {
  const timelineId = req.params.id;
  if (!timelineId) return res.status(400).json({ error: "Timeline ID is required" });

  const { title, desc } = req.body;
  if (!title || !desc) return res.status(400).json({ error: "Title and description required" });

  try {
    const timeline = await TimelineModel.findOne({ _id: timelineId, userId: req.user?.id });
    if (!timeline) return res.status(404).json({ error: "Timeline not found" });

    timeline.entries.push({ title, desc });
    await timeline.save();
    res.json(timeline);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- UPDATE Entry ----------------
router.put("/timeline/:timelineId/entry/:entryId", authMiddleware, async (req: AuthRequest, res) => {
  const { timelineId, entryId } = req.params;
  if (!timelineId || !entryId)
    return res.status(400).json({ error: "Timeline ID and Entry ID are required" });

  try {
    const timeline = await TimelineModel.findOne({ _id: timelineId, userId: req.user?.id });
    if (!timeline) return res.status(404).json({ error: "Timeline not found" });

    const entry = timeline.entries.id(entryId);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    const { title, desc } = req.body;
    entry.title = title || entry.title;
    entry.desc = desc || entry.desc;

    await timeline.save();
    res.json(timeline);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- DELETE Entry ----------------

router.delete("/timeline/:timelineId/entry/:entryId", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { timelineId, entryId } = req.params;

    if (!timelineId || !entryId) {
      return res.status(400).json({ error: "timelineId and entryId are required" });
    }

    const timeline = await TimelineModel.findOne({ _id: timelineId, userId: req.user?.id });
    if (!timeline) return res.status(404).json({ error: "Timeline not found" });

    const entry = timeline.entries.id(entryId as string);
    if (!entry) return res.status(404).json({ error: "Entry not found" });

    // Use pull() to remove the subdocument
    timeline.entries.pull(entry._id);

    await timeline.save();
    res.json(timeline);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



export default router;

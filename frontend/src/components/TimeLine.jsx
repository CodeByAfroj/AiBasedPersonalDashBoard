
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit, FiTrash2, FiSun, FiMoon } from "react-icons/fi";

const API_BASE = "https://dashboard-backend-9i5l.onrender.com/api";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function TimeLine() {
  const [timelines, setTimelines] = useState([]);
  const [currentTimeline, setCurrentTimeline] = useState(null);
  const [newTimelineTitle, setNewTimelineTitle] = useState("");
  const [entryTitle, setEntryTitle] = useState("");
  const [entryDesc, setEntryDesc] = useState("");
  const [editEntryId, setEditEntryId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);
  const token = localStorage.getItem("token");

  // attach token to axios default if present
  useEffect(() => {
    if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axios.defaults.headers.common["Authorization"];
  }, [token]);

  useEffect(() => {
    (async () => {
      await fetchTimelines();
      setLoading(false);
    })();
  }, []);

  // ----- API calls -----
  async function fetchTimelines() {
    try {
      const res = await axios.get(`${API_BASE}/timelines`);
      setTimelines(res.data || []);
    } catch (err) {
      console.error("fetchTimelines:", err?.response?.data || err.message);
    }
  }

  async function createTimeline() {
    const title = newTimelineTitle?.trim();
    if (!title) return;
    try {
      const res = await axios.post(`${API_BASE}/timeline`, { title });
      setTimelines((p) => [...p, res.data]);
      setNewTimelineTitle("");
      // auto-select newly created timeline
      setCurrentTimeline(res.data);
    } catch (err) {
      console.error("createTimeline:", err?.response?.data || err.message);
    }
  }

  // pick timeline (fetch full timeline from server to get entries)
  async function selectTimeline(id) {
    try {
      const res = await axios.get(`${API_BASE}/timeline/${id}`);
      setCurrentTimeline(res.data);
      // clear any edit state
      setEditEntryId(null);
      setEntryTitle("");
      setEntryDesc("");
    } catch (err) {
      console.error("selectTimeline:", err?.response?.data || err.message);
    }
  }

  async function deleteTimeline(id) {
    try {
      await axios.delete(`${API_BASE}/timeline/${id}`);
      setTimelines((p) => p.filter((t) => t._id !== id));
      if (currentTimeline?._id === id) setCurrentTimeline(null);
    } catch (err) {
      console.error("deleteTimeline:", err?.response?.data || err.message);
    }
  }

  async function addEntry() {
    if (!currentTimeline) return;
    if (!entryTitle.trim() || !entryDesc.trim()) return;
    try {
      const res = await axios.post(
        `${API_BASE}/timeline/${currentTimeline._id}/entry`,
        { title: entryTitle.trim(), desc: entryDesc.trim() }
      );
      setCurrentTimeline(res.data); // backend returns full timeline
      setEntryTitle("");
      setEntryDesc("");
    } catch (err) {
      console.error("addEntry:", err?.response?.data || err.message);
    }
  }

  async function updateEntry(id) {
    if (!currentTimeline) return;
    try {
      const res = await axios.put(
        `${API_BASE}/timeline/${currentTimeline._id}/entry/${id}`,
        { title: entryTitle.trim(), desc: entryDesc.trim() }
      );
      setCurrentTimeline(res.data);
      setEditEntryId(null);
      setEntryTitle("");
      setEntryDesc("");
    } catch (err) {
      console.error("updateEntry:", err?.response?.data || err.message);
    }
  }

  async function removeEntry(id) {
    if (!currentTimeline) return;
    try {
      const res = await axios.delete(
        `${API_BASE}/timeline/${currentTimeline._id}/entry/${id}`
      );
      setCurrentTimeline(res.data);
    } catch (err) {
      console.error("removeEntry:", err?.response?.data || err.message);
    }
  }

  // UI helpers
  function beginEdit(entry) {
    setEditEntryId(entry._id);
    setEntryTitle(entry.title);
    setEntryDesc(entry.desc);
    // scroll input into view on small devices
    setTimeout(() => {
      const el = document.getElementById("timeline-entry-input");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  }

  // Loading state
  if (loading) return <div className="p-6 text-center">Loading timeline...</div>;

  return (
<div className={dark ? "dark" : ""}>
  <div className="p-4 sm:p-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
    {/* header */}
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        Timeline Dashboard
      </h1>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark((d) => !d)}
          className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle theme"
        >
          {dark ? <FiSun className="text-yellow-400" /> : <FiMoon />}
        </button>
      </div>
    </div>

    {/* create timeline */}
    <div className="flex flex-col sm:flex-row gap-2 mb-6">
      <input
        value={newTimelineTitle}
        onChange={(e) => setNewTimelineTitle(e.target.value)}
        placeholder="New timeline title"
        className="flex-1 px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={createTimeline}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-95 transition"
      >
        <FiPlus className="inline mr-2" />
        Create
      </button>
    </div>

    {/* timeline selector */}
    <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
      {timelines.length === 0 && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          No timelines yet — create one above.
        </div>
      )}
      {timelines.map((t) => (
        <div
          key={t._id}
          className={`min-w-[150px] sm:min-w-[180px] p-3 rounded-lg cursor-pointer flex-shrink-0 transition ${
            currentTimeline?._id === t._id
              ? "bg-blue-600 text-white"
              : "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
          }`}
          onClick={() => selectTimeline(t._id)}
        >
          <div className="flex justify-between items-start gap-2">
            <div className="font-semibold truncate">{t.title}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTimeline(t._id);
              }}
              className="text-red-500 hover:text-red-400 text-sm"
              aria-label="Delete timeline"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* timeline view */}
   {/* timeline view */}
{currentTimeline ? (
  <div className="relative max-w-[700px] mx-auto">
    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
      {currentTimeline.title}
    </h2>

    {/* scrollable container */}
    <div
      className="relative overflow-y-auto overflow-x-hidden max-h-[64vh] px-4 py-2 scrollbar-none"
      style={{ overscrollBehavior: "contain" }}
    >
      {/* vertical line */}
      <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 to-indigo-500 transform -translate-x-1/2 z-0" />

      <div className="space-y-8 relative z-10">
        <AnimatePresence>
          {currentTimeline.entries.map((entry, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className={`mb-8 relative w-full flex flex-col sm:flex-row ${isLeft ? "sm:flex-row-reverse" : ""}`}
              >
                {/* Dot */}
                <div className="absolute left-0 sm:left-1/2 transform -translate-x-1/2 top-3 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 border-2 border-white dark:border-gray-900 z-20 shadow-lg" />

                {/* Card */}
                <div className={`w-full sm:w-1/2 p-2 flex ${isLeft ? "justify-end" : "justify-start"}`}>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{entry.title}</h3>
                      <div className="flex gap-2">
                        {/* Edit button */}
                        <button
                          onClick={() => beginEdit(entry)}
                          className="text-yellow-600 hover:text-yellow-500 text-sm flex items-center gap-1"
                        >
                          <FiEdit /> Edit
                        </button>
                        {/* Delete button */}
                        <button
                          onClick={() => removeEntry(entry._id)}
                          className="text-red-600 hover:text-red-500 text-sm flex items-center gap-1"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{entry.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>

    {/* Add/Edit Inputs */}
    <div className="mt-6 flex flex-col sm:flex-row gap-2 items-stretch">
      <input
        value={entryTitle}
        onChange={(e) => setEntryTitle(e.target.value)}
        placeholder="Entry title"
        className="flex-1 px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
      />
      <input
        value={entryDesc}
        onChange={(e) => setEntryDesc(e.target.value)}
        placeholder="Entry description"
        className="flex-1 px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => (editEntryId ? updateEntry(editEntryId) : addEntry())}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white"
      >
        {editEntryId ? "Update" : "Add"}
      </button>
    </div>
  </div>
) : (
  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
    Select a timeline to view entries
  </div>
)}

  </div>

  {/* small helper CSS for hidden scrollbar */}
  <style jsx>{`
    .scrollbar-none::-webkit-scrollbar {
      width: 6px;
    }
    .scrollbar-none::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.08);
      border-radius: 999px;
    }
    .scrollbar-none {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.08) transparent;
    }
  `}</style>
</div>

  );
}

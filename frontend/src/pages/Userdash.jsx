
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiPlus } from "react-icons/fi";

const Userdash = () => {
  const [data, setData] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

  // Separate states for Add popup
  const [addTitle, setAddTitle] = useState("");
  const [addDesc, setAddDesc] = useState("");
  const [addLink, setAddLink] = useState("");

  // Shared states for Edit popup
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editLink, setEditLink] = useState("");

  const token = localStorage.getItem("token"); // JWT token

  // Fetch user entries
  useEffect(() => {
    if (!token) return;
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://dashboard-backend-9i5l.onrender.com/api/viewall", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`https://dashboard-backend-9i5l.onrender.com/api/delete/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prev) => prev.filter((item) => item._id !== _id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (item) => {
    setEditingData(item);
    setEditTitle(item.title);
    setEditDesc(item.desc);
    setEditLink(item.link || "");
  };

  const handleUpdate = async () => {
    if (!editingData) return;
    try {
      const res = await axios.put(
        `https://dashboard-backend-9i5l.onrender.com/api/update/${editingData._id}`,
        { title: editTitle, desc: editDesc, link: editLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingData(null);
      setData((prev) =>
        prev.map((item) => (item._id === editingData._id ? res.data : item))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!addTitle || !addDesc) return;
    try {
      const res = await axios.post(
        "https://dashboard-backend-9i5l.onrender.com/api/create",
        { title: addTitle, desc: addDesc, link: addLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData((prev) => [res.data, ...prev]);
      setAddTitle("");
      setAddDesc("");
      setAddLink("");
      setShowAddPopup(false);
      setExpandedId(res.data._id);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900 font-sans flex flex-col md:flex-row gap-6">
      {/* Left Side: Add Button */}
      <div className="flex-shrink-0">
        <button
          onClick={() => setShowAddPopup(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white text-2xl shadow-lg hover:bg-blue-700 transition"
          title="Add New Entry"
        >
          <FiPlus />
        </button>
      </div>

      {/* Right Side: Entries */}
      <div className="flex-1 flex flex-col gap-4">
        {data.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No entries found. Click the "+" button to add a new entry.
          </p>
        )}

        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border dark:border-gray-700 transition hover:shadow-lg"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(item._id)}
            >
              <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                {item.title}
              </h3>
              {expandedId === item._id ? (
                <FiChevronUp className="text-gray-500 dark:text-gray-400" />
              ) : (
                <FiChevronDown className="text-gray-500 dark:text-gray-400" />
              )}
            </div>

            {expandedId === item._id && (
              <div className="mt-3 text-left text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed break-words">
                {item.desc}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <br />
                    {item.link}
                  </a>
                )}
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => startEdit(item)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80 shadow-xl flex flex-col gap-3 relative">
            <button
              onClick={() => setShowAddPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Add New Entry
            </h2>
            <input
              type="text"
              value={addTitle}
              onChange={(e) => setAddTitle(e.target.value)}
              placeholder="Title"
              className="px-3 py-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={addDesc}
              onChange={(e) => setAddDesc(e.target.value)}
              placeholder="Description"
              rows={4}
              className="px-3 py-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <input
              type="text"
              value={addLink}
              onChange={(e) => setAddLink(e.target.value)}
              placeholder="Link (optional)"
              className="px-3 py-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreate}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition mt-2"
            >
              Add Entry
            </button>
          </div>
        </div>
      )}

      {/* Edit Popup */}
      {editingData && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80 shadow-xl flex flex-col gap-3 relative">
            <button
              onClick={() => setEditingData(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Update Entry
            </h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
              className="px-3 py-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Description"
              rows={4}
              className="px-3 py-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <input
              type="text"
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
              placeholder="Link (optional)"
              className="px-3 py-2 rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleUpdate}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition mt-2"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userdash;

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

// const TimeLine = () => {
//   const [timelines, setTimelines] = useState([]);
//   const [currentTimeline, setCurrentTimeline] = useState(null);
//   const [newTimelineTitle, setNewTimelineTitle] = useState("");
//   const [entryTitle, setEntryTitle] = useState("");
//   const [entryDesc, setEntryDesc] = useState("");
//   const [editId, setEditId] = useState(null);

//   const createTimeline = () => {
//     if (!newTimelineTitle) return;
//     const newTimeline = { id: Date.now(), title: newTimelineTitle, entries: [] };
//     setTimelines([...timelines, newTimeline]);
//     setNewTimelineTitle("");
//   };

//   const addEntry = () => {
//     if (!entryTitle || !entryDesc || !currentTimeline) return;

//     if (editId) {
//       const updatedTimeline = {
//         ...currentTimeline,
//         entries: currentTimeline.entries.map(e =>
//           e.id === editId ? { ...e, title: entryTitle, desc: entryDesc } : e
//         ),
//       };
//       setTimelines(timelines.map(t => t.id === currentTimeline.id ? updatedTimeline : t));
//       setCurrentTimeline(updatedTimeline);
//       setEditId(null);
//     } else {
//       const updatedTimeline = {
//         ...currentTimeline,
//         entries: [...currentTimeline.entries, { id: Date.now(), title: entryTitle, desc: entryDesc }],
//       };
//       setTimelines(timelines.map(t => t.id === currentTimeline.id ? updatedTimeline : t));
//       setCurrentTimeline(updatedTimeline);
//     }

//     setEntryTitle("");
//     setEntryDesc("");
//   };

//   const handleEdit = (entryId) => {
//     const entry = currentTimeline.entries.find(e => e.id === entryId);
//     setEntryTitle(entry.title);
//     setEntryDesc(entry.desc);
//     setEditId(entryId);
//   };

//   const handleDelete = (entryId) => {
//     const updatedTimeline = {
//       ...currentTimeline,
//       entries: currentTimeline.entries.filter(e => e.id !== entryId),
//     };
//     setTimelines(timelines.map(t => t.id === currentTimeline.id ? updatedTimeline : t));
//     setCurrentTimeline(updatedTimeline);
//   };

//   const timelineVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       {/* Create new timeline */}
//       {!currentTimeline && (
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold mb-2">Create New Timeline</h2>
//           <input
//             type="text"
//             placeholder="Timeline Title"
//             value={newTimelineTitle}
//             onChange={e => setNewTimelineTitle(e.target.value)}
//             className="border p-2 rounded mr-2 text-black"
//           />
//           <button
//             onClick={createTimeline}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
//           >
//             Create
//           </button>
//         </div>
//       )}

//       {/* Timeline cards */}
//       {!currentTimeline && timelines.length > 0 && (
//         <div>
//           <h2 className="text-xl font-bold mb-2">Your Timelines</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {timelines.map(t => (
//               <motion.div
//                 key={t.id}
//                 className="bg-gray-800 p-4 rounded shadow cursor-pointer hover:shadow-xl transition-all duration-300"
//                 whileHover={{ scale: 1.05 }}
//                 onClick={() => setCurrentTimeline(t)}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <h3 className="font-bold text-lg">{t.title}</h3>
//                 <p>{t.entries.length} entries</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Opened Timeline */}
//       {currentTimeline && (
//         <div className="mt-6">
//           <button
//             onClick={() => setCurrentTimeline(null)}
//             className="mb-4 text-red-500 font-bold transition-colors duration-300 hover:text-red-400"
//           >
//             ← Back to Timelines
//           </button>

//           <h2 className="text-2xl font-bold mb-4">{currentTimeline.title}</h2>

//           {/* Add/Edit Entry */}
//           <div className="mb-6 flex flex-wrap gap-2">
//             <input
//               type="text"
//               placeholder="Entry Title"
//               value={entryTitle}
//               onChange={e => setEntryTitle(e.target.value)}
//               className="border p-2 rounded text-black flex-1 min-w-[150px]"
//             />
//             <input
//               type="text"
//               placeholder="Entry Description"
//               value={entryDesc}
//               onChange={e => setEntryDesc(e.target.value)}
//               className="border p-2 rounded text-black flex-1 min-w-[150px]"
//             />
//             <button
//               onClick={addEntry}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2 transition-all duration-300"
//             >
//               <FiPlus /> {editId ? "Update Entry" : "Add Entry"}
//             </button>
//           </div>

//           {/* Timeline display (alternating left/right) */}
//           <div className="relative max-w-3xl mx-auto">
//             <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 h-full"></div>

//             {currentTimeline.entries.length === 0 && <p className="text-gray-400">No entries yet. Add one above!</p>}

//             {currentTimeline.entries.map((entry, idx) => {
//               const isLeft = idx % 2 === 0;
//               return (
//                 <motion.div
//                   key={entry.id}
//                   className={`mb-8 flex w-full justify-${isLeft ? "start" : "end"} relative`}
//                   variants={timelineVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   <div className="w-1/2 p-4">
//                     {isLeft && (
//                       <div className="bg-gray-800 p-4 rounded shadow-lg relative hover:shadow-xl transition-all duration-300">
//                         <h3 className="font-bold text-lg mb-2">{entry.title}</h3>
//                         <p>{entry.desc}</p>
//                         <div className="absolute top-2 right-2 flex gap-2">
//                           <FiEdit className="cursor-pointer hover:text-blue-400 transition-colors duration-300" onClick={() => handleEdit(entry.id)} />
//                           <FiTrash2 className="cursor-pointer hover:text-red-500 transition-colors duration-300" onClick={() => handleDelete(entry.id)} />
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex flex-col items-center">
//                     <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-gray-900 z-10"></div>
//                   </div>

//                   <div className="w-1/2 p-4">
//                     {!isLeft && (
//                       <div className="bg-gray-800 p-4 rounded shadow-lg relative hover:shadow-xl transition-all duration-300">
//                         <h3 className="font-bold text-lg mb-2">{entry.title}</h3>
//                         <p>{entry.desc}</p>
//                         <div className="absolute top-2 right-2 flex gap-2">
//                           <FiEdit className="cursor-pointer hover:text-blue-400 transition-colors duration-300" onClick={() => handleEdit(entry.id)} />
//                           <FiTrash2 className="cursor-pointer hover:text-red-500 transition-colors duration-300" onClick={() => handleDelete(entry.id)} />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimeLine;




// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

// const TimeLine = () => {
//     const [timelines, setTimelines] = useState([]);
//     const [currentTimeline, setCurrentTimeline] = useState(null);
//     const [newTimelineTitle, setNewTimelineTitle] = useState("");
//     const [entryTitle, setEntryTitle] = useState("");
//     const [entryDesc, setEntryDesc] = useState("");
//     const [editId, setEditId] = useState(null);

//     const createTimeline = () => {
//         if (!newTimelineTitle) return;
//         const newTimeline = { id: Date.now(), title: newTimelineTitle, entries: [] };
//         setTimelines([...timelines, newTimeline]);
//         setNewTimelineTitle("");
//     };

//     const addEntry = () => {
//         if (!entryTitle || !entryDesc || !currentTimeline) return;

//         if (editId) {
//             const updatedTimeline = {
//                 ...currentTimeline,
//                 entries: currentTimeline.entries.map(e =>
//                     e.id === editId ? { ...e, title: entryTitle, desc: entryDesc } : e
//                 ),
//             };
//             setTimelines(timelines.map(t => t.id === currentTimeline.id ? updatedTimeline : t));
//             setCurrentTimeline(updatedTimeline);
//             setEditId(null);
//         } else {
//             const updatedTimeline = {
//                 ...currentTimeline,
//                 entries: [...currentTimeline.entries, { id: Date.now(), title: entryTitle, desc: entryDesc }],
//             };
//             setTimelines(timelines.map(t => t.id === currentTimeline.id ? updatedTimeline : t));
//             setCurrentTimeline(updatedTimeline);
//         }

//         setEntryTitle("");
//         setEntryDesc("");
//     };

//     const handleEdit = (entryId) => {
//         const entry = currentTimeline.entries.find(e => e.id === entryId);
//         setEntryTitle(entry.title);
//         setEntryDesc(entry.desc);
//         setEditId(entryId);
//     };

//     const handleDelete = (entryId) => {
//         const updatedTimeline = {
//             ...currentTimeline,
//             entries: currentTimeline.entries.filter(e => e.id !== entryId),
//         };
//         setTimelines(timelines.map(t => t.id === currentTimeline.id ? updatedTimeline : t));
//         setCurrentTimeline(updatedTimeline);
//     };

//     const timelineVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
//     };

//     return (
//         <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 transition-colors duration-500">
//             {/* Create new timeline */}
//             {!currentTimeline && (
//                 <div className="mb-6">
//                     <h2 className="text-2xl font-bold mb-2">Create New Timeline</h2>
//                     <input
//                         type="text"
//                         placeholder="Timeline Title"
//                         value={newTimelineTitle}
//                         onChange={e => setNewTimelineTitle(e.target.value)}
//                         className="border p-2 rounded mr-2 text-gray-900 dark:text-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
//                     />
//                     <button
//                         onClick={createTimeline}
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
//                     >
//                         Create
//                     </button>
//                 </div>
//             )}

//             {/* Timeline cards */}
//             {!currentTimeline && timelines.length > 0 && (
//                 <div>
//                     <h2 className="text-xl font-bold mb-2">Your Timelines</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {timelines.map(t => (
//                             <motion.div
//                                 key={t.id}
//                                 className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow cursor-pointer hover:shadow-xl transition-all duration-300"
//                                 whileHover={{ scale: 1.05 }}
//                                 onClick={() => setCurrentTimeline(t)}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                             >
//                                 <h3 className="font-bold text-lg">{t.title}</h3>
//                                 <p>{t.entries.length} entries</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Opened Timeline */}
//             {currentTimeline && (
//                 <div className="mt-6">
//                     <button
//                         onClick={() => setCurrentTimeline(null)}
//                         className="mb-4 text-red-500 font-bold transition-colors duration-300 hover:text-red-400"
//                     >
//                         ← Back to Timelines
//                     </button>

//                     <h2 className="text-2xl font-bold mb-4">{currentTimeline.title}</h2>

//                     {/* Add/Edit Entry */}
//                     <div className="mb-6 flex flex-wrap gap-2">
//                         <input
//                             type="text"
//                             placeholder="Entry Title"
//                             value={entryTitle}
//                             onChange={e => setEntryTitle(e.target.value)}
//                             className="border p-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 flex-1 min-w-[150px] border-gray-300 dark:border-gray-600"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Entry Description"
//                             value={entryDesc}
//                             onChange={e => setEntryDesc(e.target.value)}
//                             className="border p-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 flex-1 min-w-[150px] border-gray-300 dark:border-gray-600"
//                         />
//                         <button
//                             onClick={addEntry}
//                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2 transition-all duration-300"
//                         >
//                             <FiPlus /> {editId ? "Update Entry" : "Add Entry"}
//                         </button>
//                     </div>

//                     {/* Timeline display (alternating left/right) */}
//                     <div className="relative max-w-3xl mx-auto">
//                         <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 h-full"></div>

//                         {currentTimeline.entries.length === 0 && (
//                             <p className="text-gray-500 dark:text-gray-400">No entries yet. Add one above!</p>
//                         )}

//                         {currentTimeline.entries.map((entry, idx) => {
//                             const isLeft = idx % 2 === 0;
//                             return (
//                                 <motion.div
//                                     key={entry.id}
//                                     className={`mb-8 flex w-full justify-${isLeft ? "start" : "end"} relative`}
//                                     variants={timelineVariants}
//                                     initial="hidden"
//                                     animate="visible"
//                                 >
//                                     {/* Left side */}
//                                     <div className={`w-full md:w-1/2 p-2 ${isLeft ? "md:pr-6" : "md:pl-6"} flex justify-${isLeft ? "end" : "start"}`}>
//                                         {isLeft && (
//                                             <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-lg relative hover:shadow-xl transition-all duration-300 w-full min-h-[120px] flex flex-col justify-between break-words">
//                                                 <h3 className="font-bold text-lg mb-2">{entry.title}</h3>
//                                                 <p>{entry.desc}</p>
//                                                 <div className="absolute top-2 right-2 flex gap-2">
//                                                     <FiEdit className="cursor-pointer hover:text-blue-400 transition-colors duration-300" onClick={() => handleEdit(entry.id)} />
//                                                     <FiTrash2 className="cursor-pointer hover:text-red-500 transition-colors duration-300" onClick={() => handleDelete(entry.id)} />
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>

//                                     <div className="flex flex-col items-center">
//                                         <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-gray-900 dark:border-gray-700 z-10"></div>
//                                     </div>

//                                     {/* Right side */}
//                                     <div className={`w-full md:w-1/2 p-2 ${!isLeft ? "md:pl-6" : "md:pr-6"} flex justify-${!isLeft ? "start" : "end"}`}>
//                                         {!isLeft && (
//                                             <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-lg relative hover:shadow-xl transition-all duration-300 w-full min-h-[120px] flex flex-col justify-between break-words">
//                                                 <h3 className="font-bold text-lg mb-2">{entry.title}</h3>
//                                                 <p>{entry.desc}</p>
//                                                 <div className="absolute top-2 right-2 flex gap-2">
//                                                     <FiEdit className="cursor-pointer hover:text-blue-400 transition-colors duration-300" onClick={() => handleEdit(entry.id)} />
//                                                     <FiTrash2 className="cursor-pointer hover:text-red-500 transition-colors duration-300" onClick={() => handleDelete(entry.id)} />
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>

//                                 </motion.div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TimeLine;



import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const TimeLine = () => {
  const [timelines, setTimelines] = useState([]);
  const [currentTimeline, setCurrentTimeline] = useState(null);
  const [newTimelineTitle, setNewTimelineTitle] = useState("");
  const [entryTitle, setEntryTitle] = useState("");
  const [entryDesc, setEntryDesc] = useState("");
  const [editId, setEditId] = useState(null);

  const createTimeline = () => {
    if (!newTimelineTitle) return;
    const newTimeline = { id: Date.now(), title: newTimelineTitle, entries: [] };
    setTimelines([...timelines, newTimeline]);
    setNewTimelineTitle("");
  };

  const addEntry = () => {
    if (!entryTitle || !entryDesc || !currentTimeline) return;

    if (editId) {
      const updatedTimeline = {
        ...currentTimeline,
        entries: currentTimeline.entries.map(e =>
          e.id === editId ? { ...e, title: entryTitle, desc: entryDesc } : e
        ),
      };
      setTimelines(timelines.map(t => t.id === currentTimeline.id ? updatedTimeline : t));
      setCurrentTimeline(updatedTimeline);
      setEditId(null);
    } else {
      const updatedTimeline = {
        ...currentTimeline,
        entries: [...currentTimeline.entries, { id: Date.now(), title: entryTitle, desc: entryDesc }],
      };
      setTimelines(timelines.map(t => t.id === currentTimeline.id ? updatedTimeline : t));
      setCurrentTimeline(updatedTimeline);
    }

    setEntryTitle("");
    setEntryDesc("");
  };

  const handleEdit = (entryId) => {
    const entry = currentTimeline.entries.find(e => e.id === entryId);
    setEntryTitle(entry.title);
    setEntryDesc(entry.desc);
    setEditId(entryId);
  };

  const handleDelete = (entryId) => {
    const updatedTimeline = {
      ...currentTimeline,
      entries: currentTimeline.entries.filter(e => e.id !== entryId),
    };
    setTimelines(timelines.map(t => t.id === currentTimeline.id ? updatedTimeline : t));
    setCurrentTimeline(updatedTimeline);
  };

  const timelineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 transition-colors duration-500">
      {/* Create new timeline */}
      {!currentTimeline && (
        <div className="mb-6 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Timeline Title"
            value={newTimelineTitle}
            onChange={e => setNewTimelineTitle(e.target.value)}
            className="border p-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 flex-1"
          />
          <button
            onClick={createTimeline}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
          >
            Create
          </button>
        </div>
      )}

      {/* Timeline cards */}
      {!currentTimeline && timelines.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Your Timelines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {timelines.map(t => (
              <motion.div
                key={t.id}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[100px] break-words"
                whileHover={{ scale: 1.03 }}
                onClick={() => setCurrentTimeline(t)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-bold text-lg">{t.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{t.entries.length} entries</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Opened Timeline */}
      {currentTimeline && (
        <div className="mt-6">
          <button
            onClick={() => setCurrentTimeline(null)}
            className="mb-4 text-red-500 font-bold transition-colors duration-300 hover:text-red-400"
          >
            ← Back to Timelines
          </button>

          <h2 className="text-2xl font-bold mb-4">{currentTimeline.title}</h2>

          {/* Add/Edit Entry */}
          <div className="mb-6 flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="Entry Title"
              value={entryTitle}
              onChange={e => setEntryTitle(e.target.value)}
              className="border p-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 flex-1 border-gray-300 dark:border-gray-600"
            />
            <input
              type="text"
              placeholder="Entry Description"
              value={entryDesc}
              onChange={e => setEntryDesc(e.target.value)}
              className="border p-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 flex-1 border-gray-300 dark:border-gray-600"
            />
            <button
              onClick={addEntry}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2 transition-all duration-300"
            >
              <FiPlus /> {editId ? "Update Entry" : "Add Entry"}
            </button>
          </div>

          {/* Timeline display */}
          <div className="relative max-w-3xl mx-auto">
            {/* Central line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 h-full"></div>

            {currentTimeline.entries.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">No entries yet. Add one above!</p>
            )}

            {currentTimeline.entries.map((entry, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={entry.id}
                  className="mb-8 flex flex-col md:flex-row w-full relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  {/* Left side */}
                  <div className={`w-full md:w-1/2 p-2 ${isLeft ? "md:pr-6" : "md:pl-6"} flex justify-${isLeft ? "end" : "start"}`}>
                    {isLeft && (
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-lg relative hover:shadow-xl transition-all duration-300 w-full min-h-[120px] flex flex-col justify-between break-words">
                        <h3 className="font-bold text-lg mb-2">{entry.title}</h3>
                        <p>{entry.desc}</p>
                        <div className="absolute top-2 right-2 flex gap-2">
                          <FiEdit className="cursor-pointer hover:text-blue-400 transition-colors duration-300" onClick={() => handleEdit(entry.id)} />
                          <FiTrash2 className="cursor-pointer hover:text-red-500 transition-colors duration-300" onClick={() => handleDelete(entry.id)} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="flex justify-center items-center w-full md:w-1/12">
                    <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-gray-900 dark:border-gray-700 z-10"></div>
                  </div>

                  {/* Right side */}
                  <div className={`w-full md:w-1/2 p-2 ${!isLeft ? "md:pl-6" : "md:pr-6"} flex justify-${!isLeft ? "start" : "end"}`}>
                    {!isLeft && (
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-lg relative hover:shadow-xl transition-all duration-300 w-full min-h-[120px] flex flex-col justify-between break-words">
                        <h3 className="font-bold text-lg mb-2">{entry.title}</h3>
                        <p>{entry.desc}</p>
                        <div className="absolute top-2 right-2 flex gap-2">
                          <FiEdit className="cursor-pointer hover:text-blue-400 transition-colors duration-300" onClick={() => handleEdit(entry.id)} />
                          <FiTrash2 className="cursor-pointer hover:text-red-500 transition-colors duration-300" onClick={() => handleDelete(entry.id)} />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeLine;

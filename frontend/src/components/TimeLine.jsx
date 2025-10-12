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
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 transition-colors duration-500">
//       {/* Create new timeline */}
//       {!currentTimeline && (
//         <div className="mb-6 flex flex-col sm:flex-row gap-2">
//           <input
//             type="text"
//             placeholder="Timeline Title"
//             value={newTimelineTitle}
//             onChange={e => setNewTimelineTitle(e.target.value)}
//             className="border p-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 flex-1"
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
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {timelines.map(t => (
//               <motion.div
//                 key={t.id}
//                 className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[100px] break-words"
//                 whileHover={{ scale: 1.03 }}
//                 onClick={() => setCurrentTimeline(t)}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <h3 className="font-bold text-lg">{t.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-300 mt-2">{t.entries.length} entries</p>
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
//           <div className="mb-6 flex flex-col md:flex-row gap-2">
//             <input
//               type="text"
//               placeholder="Entry Title"
//               value={entryTitle}
//               onChange={e => setEntryTitle(e.target.value)}
//               className="border p-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 flex-1 border-gray-300 dark:border-gray-600"
//             />
//             <input
//               type="text"
//               placeholder="Entry Description"
//               value={entryDesc}
//               onChange={e => setEntryDesc(e.target.value)}
//               className="border p-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 flex-1 border-gray-300 dark:border-gray-600"
//             />
//             <button
//               onClick={addEntry}
//               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2 transition-all duration-300"
//             >
//               <FiPlus /> {editId ? "Update Entry" : "Add Entry"}
//             </button>
//           </div>

//           {/* Timeline display */}
//           <div className="relative max-w-3xl mx-auto">
//             {/* Central line */}
//             <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 h-full"></div>

//             {currentTimeline.entries.length === 0 && (
//               <p className="text-gray-500 dark:text-gray-400">No entries yet. Add one above!</p>
//             )}

//             {currentTimeline.entries.map((entry, idx) => {
//               const isLeft = idx % 2 === 0;
//               return (
//                 <motion.div
//                   key={entry.id}
//                   className="mb-8 flex flex-col md:flex-row w-full relative"
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ type: "spring", stiffness: 100, damping: 15 }}
//                 >
//                   {/* Left side */}
//                   <div className={`w-full md:w-1/2 p-2 ${isLeft ? "md:pr-6" : "md:pl-6"} flex justify-${isLeft ? "end" : "start"}`}>
//                     {isLeft && (
//                       <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-lg relative hover:shadow-xl transition-all duration-300 w-full min-h-[120px] flex flex-col justify-between break-words">
//                         <h3 className="font-bold text-lg mb-2">{entry.title}</h3>
//                         <p>{entry.desc}</p>
//                         <div className="absolute top-2 right-2 flex gap-2">
//                           <FiEdit className="cursor-pointer hover:text-blue-400 transition-colors duration-300" onClick={() => handleEdit(entry.id)} />
//                           <FiTrash2 className="cursor-pointer hover:text-red-500 transition-colors duration-300" onClick={() => handleDelete(entry.id)} />
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Center dot */}
//                   <div className="flex justify-center items-center w-full md:w-1/12">
//                     <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-gray-900 dark:border-gray-700 z-10"></div>
//                   </div>

//                   {/* Right side */}
//                   <div className={`w-full md:w-1/2 p-2 ${!isLeft ? "md:pl-6" : "md:pr-6"} flex justify-${!isLeft ? "start" : "end"}`}>
//                     {!isLeft && (
//                       <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-lg relative hover:shadow-xl transition-all duration-300 w-full min-h-[120px] flex flex-col justify-between break-words">
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



// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
// import axios from "axios";

// const API_BASE = "http://localhost:3000/api"; // replace with your backend

// const TimeLine = () => {
//   const [timelines, setTimelines] = useState([]);
//   const [currentTimeline, setCurrentTimeline] = useState(null);
//   const [newTimelineTitle, setNewTimelineTitle] = useState("");
//   const [entryTitle, setEntryTitle] = useState("");
//   const [entryDesc, setEntryDesc] = useState("");
//   const [editId, setEditId] = useState(null);

//   const token = localStorage.getItem("token"); // replace with your auth token logic

//   // ---------------- Fetch timelines from server ----------------
//   const fetchTimelines = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/timelines`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTimelines(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchTimelines();
//   }, []);

//   // ---------------- Timeline CRUD ----------------
//   const createTimeline = async () => {
//     if (!newTimelineTitle) return;
//     try {
//       const res = await axios.post(
//         `${API_BASE}/timeline`,
//         { title: newTimelineTitle },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setTimelines([res.data, ...timelines]);
//       setNewTimelineTitle("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const selectTimeline = async (timelineId) => {
//     try {
//       const res = await axios.get(`${API_BASE}/timeline/${timelineId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrentTimeline(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteTimeline = async (timelineId) => {
//     try {
//       await axios.delete(`${API_BASE}/timeline/${timelineId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTimelines(timelines.filter((t) => t._id !== timelineId));
//       if (currentTimeline?._id === timelineId) setCurrentTimeline(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------- Entry CRUD ----------------
//   const addEntry = async () => {
//     if (!entryTitle || !entryDesc || !currentTimeline) return;
//     try {
//       if (editId) {
//         const res = await axios.put(
//           `${API_BASE}/timeline/${currentTimeline._id}/entry/${editId}`,
//           { title: entryTitle, desc: entryDesc },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setCurrentTimeline(res.data);
//         setEditId(null);
//       } else {
//         const res = await axios.post(
//           `${API_BASE}/timeline/${currentTimeline._id}/entry`,
//           { title: entryTitle, desc: entryDesc },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setCurrentTimeline(res.data);
//       }
//       setEntryTitle("");
//       setEntryDesc("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (entryId) => {
//     const entry = currentTimeline.entries.find((e) => e._id === entryId);
//     setEntryTitle(entry.title);
//     setEntryDesc(entry.desc);
//     setEditId(entry._id);
//   };

//   const handleDelete = async (entryId) => {
//     if (!currentTimeline) return;
//     try {
//       const res = await axios.delete(
//         `${API_BASE}/timeline/${currentTimeline._id}/entry/${entryId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCurrentTimeline(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ---------------- Timeline animation ----------------
//   const timelineVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 transition-colors duration-500">
//       {/* Create Timeline */}
//       {!currentTimeline && (
//         <div className="mb-6 flex flex-col sm:flex-row gap-2">
//           <input
//             type="text"
//             placeholder="Timeline Title"
//             value={newTimelineTitle}
//             onChange={(e) => setNewTimelineTitle(e.target.value)}
//             className="border p-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 flex-1"
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
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {timelines.map((t) => (
//               <motion.div
//                 key={t._id}
//                 className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[100px] break-words"
//                 whileHover={{ scale: 1.03 }}
//                 onClick={() => selectTimeline(t._id)}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <h3 className="font-bold text-lg">{t.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-300 mt-2">{t.entries?.length || 0} entries</p>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     deleteTimeline(t._id);
//                   }}
//                   className="text-red-500 mt-2"
//                 >
//                   Delete
//                 </button>
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
//           <div className="mb-6 flex flex-col md:flex-row gap-2">
//             <input
//               type="text"
//               placeholder="Entry Title"
//               value={entryTitle}
//               onChange={(e) => setEntryTitle(e.target.value)}
//               className="border p-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 flex-1"
//             />
//             <input
//               type="text"
//               placeholder="Entry Description"
//               value={entryDesc}
//               onChange={(e) => setEntryDesc(e.target.value)}
//               className="border p-2 rounded text-gray-900 dark:text-gray-100 dark:bg-gray-700 flex-1"
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

//             {currentTimeline.entries.length === 0 && (
//               <p className="text-gray-500 dark:text-gray-400">No entries yet. Add one above!</p>
//             )}

//             {currentTimeline.entries.map((entry, idx) => {
//               const isLeft = idx % 2 === 0;
//               return (
//                 <motion.div
//                   key={entry._id}
//                   className="mb-8 flex flex-col md:flex-row w-full relative"
//                   variants={timelineVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   {/* Left side */}
//                   <div className={`w-full md:w-1/2 p-2 ${isLeft ? "md:pr-6" : "md:pl-6"} flex justify-${isLeft ? "end" : "start"}`}>
//                     {isLeft && (
//                       <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-lg relative hover:shadow-xl transition-all duration-300 w-full min-h-[120px] flex flex-col justify-between break-words">
//                         <h3 className="font-bold text-lg mb-2">{entry.title}</h3>
//                         <p>{entry.desc}</p>
//                         <div className="absolute top-2 right-2 flex gap-2">
//                           <FiEdit className="cursor-pointer hover:text-blue-400" onClick={() => handleEdit(entry._id)} />
//                           <FiTrash2 className="cursor-pointer hover:text-red-500" onClick={() => handleDelete(entry._id)} />
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   {/* Center dot */}
//                   <div className="flex justify-center items-center w-full md:w-1/12">
//                     <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-gray-900 dark:border-gray-700 z-10"></div>
//                   </div>

//                   {/* Right side */}
//                   <div className={`w-full md:w-1/2 p-2 ${!isLeft ? "md:pl-6" : "md:pr-6"} flex justify-${!isLeft ? "start" : "end"}`}>
//                     {!isLeft && (
//                       <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-lg relative hover:shadow-xl transition-all duration-300 w-full min-h-[120px] flex flex-col justify-between break-words">
//                         <h3 className="font-bold text-lg mb-2">{entry.title}</h3>
//                         <p>{entry.desc}</p>
//                         <div className="absolute top-2 right-2 flex gap-2">
//                           <FiEdit className="cursor-pointer hover:text-blue-400" onClick={() => handleEdit(entry._id)} />
//                           <FiTrash2 className="cursor-pointer hover:text-red-500" onClick={() => handleDelete(entry._id)} />
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



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

// const API_BASE = "http://localhost:3000/api";

// export default function TimeLine() {
//   const [timelines, setTimelines] = useState([]);
//   const [currentTimeline, setCurrentTimeline] = useState(null);
//   const [newTimelineTitle, setNewTimelineTitle] = useState("");
//   const [entryTitle, setEntryTitle] = useState("");
//   const [entryDesc, setEntryDesc] = useState("");
//   const [editEntryId, setEditEntryId] = useState(null);

//   const token = localStorage.getItem("token");

//   const fetchTimelines = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/timelines`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTimelines(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchTimelines();
//   }, []);

//   const createTimeline = async () => {
//     if (!newTimelineTitle) return;
//     try {
//       const res = await axios.post(
//         `${API_BASE}/timeline`,
//         { title: newTimelineTitle },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setTimelines([res.data, ...timelines]);
//       setNewTimelineTitle("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteTimeline = async (id) => {
//     try {
//       await axios.delete(`${API_BASE}/timeline/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTimelines(timelines.filter((t) => t._id !== id));
//       if (currentTimeline?._id === id) setCurrentTimeline(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const selectTimeline = async (id) => {
//     try {
//       const res = await axios.get(`${API_BASE}/timeline/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCurrentTimeline(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const addEntry = async () => {
//     if (!entryTitle || !entryDesc || !currentTimeline) return;
//     try {
//       const res = await axios.post(
//         `${API_BASE}/timeline/${currentTimeline._id}/entry`,
//         { title: entryTitle, desc: entryDesc },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCurrentTimeline(res.data);
//       setEntryTitle("");
//       setEntryDesc("");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const editEntry = async (entryId) => {
//     if (!entryTitle || !entryDesc || !currentTimeline) return;
//     try {
//       const res = await axios.put(
//         `${API_BASE}/timeline/${currentTimeline._id}/entry/${entryId}`,
//         { title: entryTitle, desc: entryDesc },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCurrentTimeline(res.data);
//       setEntryTitle("");
//       setEntryDesc("");
//       setEditEntryId(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteEntry = async (entryId) => {
//     if (!currentTimeline) return;
//     try {
//       const res = await axios.delete(
//         `${API_BASE}/timeline/${currentTimeline._id}/entry/${entryId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCurrentTimeline(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

//   return (
//     <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-500">
//       <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
//         Timeline Dashboard
//       </h1>

//       {/* ---------------- Create Timeline ---------------- */}
//       <div className="flex flex-col sm:flex-row gap-2 mb-6 justify-center">
//         <input
//           type="text"
//           placeholder="New timeline title"
//           value={newTimelineTitle}
//           onChange={(e) => setNewTimelineTitle(e.target.value)}
//           className="border px-3 py-2 rounded-lg w-full sm:w-1/2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition"
//         />
//         <button
//           onClick={createTimeline}
//           className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-lg w-full sm:w-auto hover:from-blue-600 hover:to-indigo-600 transition flex items-center justify-center gap-2"
//         >
//           <FiPlus /> Add Timeline
//         </button>
//       </div>

//       {/* ---------------- Timeline Selection ---------------- */}
//       <div className="flex gap-4 mb-6 p-4 overflow-x-auto px-2 sm:px-0">
//         {timelines.map((t) => (
//           <motion.div
//             key={t._id}
//             whileHover={{ scale: 1.05 }}
//             className={`p-3  rounded-lg shadow-md cursor-pointer min-w-[150px] sm:min-w-[200px] flex-shrink-0 flex flex-col justify-between bg-white dark:bg-gray-800 transition hover:shadow-xl ${
//               currentTimeline?._id === t._id ? "ring-2 ring-blue-500" : ""
//             }`}
//             onClick={() => selectTimeline(t._id)}
//           >
//             <h2 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">{t.title}</h2>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 deleteTimeline(t._id);
//               }}
//               className="text-red-500 mt-2 text-xs sm:text-sm flex items-center gap-1 hover:text-red-400 transition"
//             >
//               <FiTrash2 /> Delete
//             </button>
//           </motion.div>
//         ))}
//       </div>

// {currentTimeline && (
//   <div className="relative max-w-[700px] w-full mx-auto p-2 sm:p-4">
//     <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
//       {currentTimeline.title}
//     </h2>

//     {/* Scrollable timeline box */}
// <div className="overflow-y-auto overflow-x-hidden max-h-[70vh] scrollbar-none">
//       {currentTimeline.entries.map((entry, idx) => {
//         const isLeft = idx % 2 === 0;
//         return (
//           <motion.div
//             key={entry._id}
//             variants={fadeUp}
//             initial="hidden"
//             animate="visible"
//             transition={{ delay: idx * 0.05 }}
//             className={`mb-8 relative w-full flex flex-col sm:flex-row ${isLeft ? "sm:flex-row-reverse" : ""}`}
//           >
//             {/* Dot */}
//             <div className="absolute left-0 sm:left-1/2 transform -translate-x-1/2 top-2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full border-2 border-white z-10 shadow-lg"></div>

//             {/* Entry Card */}
//             <div className={`w-full sm:w-1/2 p-2 flex ${isLeft ? "justify-end" : "justify-start"}`}>
//               <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full border border-gray-200 dark:border-gray-600">
//                 <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{entry.title}</h3>
//                 <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{entry.desc}</p>
//                 <div className="flex gap-4 mt-3">
//                   <button
//                     onClick={() => {
//                       setEntryTitle(entry.title);
//                       setEntryDesc(entry.desc);
//                       setEditEntryId(entry._id);
//                     }}
//                     className="flex items-center gap-1 text-yellow-500 hover:text-yellow-400 text-sm transition"
//                   >
//                     <FiEdit /> Edit
//                   </button>
//                   <button
//                     onClick={() => deleteEntry(entry._id)}
//                     className="flex items-center gap-1 text-red-500 hover:text-red-400 text-sm transition"
//                   >
//                     <FiTrash2 /> Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         );
//       })}

//       {/* Central vertical line */}
//       <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-400 to-indigo-500 transform -translate-x-1/2"></div>
//     </div>

//     {/* Add/Edit Entry */}
//     <div className="flex flex-col sm:flex-row gap-2 mt-6">
//       <input
//         type="text"
//         placeholder="Entry title"
//         value={entryTitle}
//         onChange={(e) => setEntryTitle(e.target.value)}
//         className="border px-3 py-2 rounded-lg w-full sm:flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
//       />
//       <input
//         type="text"
//         placeholder="Entry description"
//         value={entryDesc}
//         onChange={(e) => setEntryDesc(e.target.value)}
//         className="border px-3 py-2 rounded-lg w-full sm:flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
//       />
//       <button
//         onClick={() => (editEntryId ? editEntry(editEntryId) : addEntry())}
//         className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto hover:from-green-600 hover:to-teal-600 transition flex items-center justify-center gap-2"
//       >
//         {editEntryId ? <><FiEdit /> Update</> : <><FiPlus /> Add</>}
//       </button>
//     </div>
//   </div>
// )}



//     </div>
//   );
// }

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



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const Todo = ({mail}) => {
//   const [data, setData] = useState("");
//   const [email, setEmail] = useState("");
//   const [reminderDate, setReminderDate] = useState("");
//   const [info, setInfo] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null); // ✅ for success/error messages


// useEffect(() => {
//   if (mail) {
//     setEmail(mail);
//   }
// }, [mail]);


//   const fetchTodos = (props) => {
//     setLoading(true);
//     axios
//       .get("https://smarttodo-y1bf.onrender.com/api/view")
//       .then((res) => setInfo(Array.isArray(res.data) ? res.data : []))
//       .catch((error) => console.error(error))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const handleDelete = (todoId) => {
//     axios
//       .delete(`https://smarttodo-y1bf.onrender.com/api/delete/${todoId}`)
//       .then(() => {
//         setMessage({ type: "success", text: "🗑️ Todo deleted" });
//         fetchTodos();
//       })
//       .catch((error) => {
//         setMessage({ type: "error", text: "❌ Error deleting todo" });
//         console.log(error);
//       });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!data.trim()) {
//       setMessage({ type: "error", text: "⚠️ Please enter a todo task!" });
//       return;
//     }
//     if (!email.trim() || !email.includes("@")) {
//       setMessage({ type: "error", text: "⚠️ Please enter a valid email!" });
//       return;
//     }

//     axios
//       .post("https://smarttodo-y1bf.onrender.com/api/add", { data, reminderDate, email })
//       .then(() => {
//         setMessage({ type: "success", text: "✅ To-do created successfully" });
//         setData("");
//         setReminderDate("");
       
//         fetchTodos();
//       })
//       .catch((error) =>
//         setMessage({
//           type: "error",
//           text: `❌ Error creating todo: ${
//             error.response?.data?.message || error.message
//           }`,
//         })
//       );
//   };



//   return (
//     <div className="h-screen w-full bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
//       <div className="bg-white shadow-xl rounded-2xl p-6 w-[480px]">
//         <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
//           📝 Smart To-Do with Reminders
//         </h1>

//         {/* Status message */}
//         {message && (
//           <p
//             className={`text-center mb-4 font-medium ${
//               message.type === "success" ? "text-green-600" : "text-red-500"
//             }`}
//           >
//             {message.text}
//           </p>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6 text-gray-700">
//           <input
//             type="text"
//             placeholder="Enter your task..."
//             value={data}
//             onChange={(e) => setData(e.target.value)}
//             className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//           />

//           <input
//             type="datetime-local"
//             value={reminderDate}
//             onChange={(e) => setReminderDate(e.target.value)}
//             className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//           />
// {/* 
//           <input
//             type="email"
//             placeholder="Enter your email..."
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
//           /> */}

//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all"
//           >
//             ➕ Add To-do
//           </button>
//         </form>

//         {/* Loader */}
//         {loading && <p className="text-center text-gray-500">Loading...</p>}

//         {/* Todo List */}
//         <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
//           {info.length === 0 && !loading && (
//             <div className="text-gray-500 text-center">
//               <p>No todos yet. Add one! 🎉</p>
//             </div>
//           )}

//           {info.map((todo, index) => {
//             const isUpcoming =
//               todo.reminderDate &&
//               new Date(todo.reminderDate) - new Date() < 24 * 60 * 60 * 1000; // < 24h

//             return (
//               <motion.div
//                 key={todo._id}
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//                 className={`flex justify-between items-center p-3 rounded-lg shadow-sm border ${
//                   isUpcoming ? "bg-yellow-100 border-yellow-400" : "bg-gray-50"
//                 }`}
//               >
//                 <div>
//                   <p className="font-medium text-gray-800">{todo.data}</p>
//                   {todo.reminderDate && (
//                     <p className="text-sm text-gray-600">
//                       ⏰ {new Date(todo.reminderDate).toLocaleString()}
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-400">📧 {todo.email}</p>
//                 </div>
//                 <button
//                   onClick={() => handleDelete(todo._id)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
//                 >
//                   Delete
//                 </button>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Todo;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Todo = ({ mail }) => {
  const [data, setData] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [now, setNow] = useState(new Date()); // ⏱️ for countdown

  // Update `now` every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Todos
  const fetchTodos = () => {
    setLoading(true);
    axios
      .get("https://smarttodo-y1bf.onrender.com/api/view")
      .then((res) => setInfo(Array.isArray(res.data) ? res.data : []))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Delete Todo
  const handleDelete = (todoId) => {
    axios
      .delete(`https://smarttodo-y1bf.onrender.com/api/delete/${todoId}`)
      .then(() => {
        setMessage({ type: "success", text: "🗑️ Todo deleted" });
        fetchTodos();
      })
      .catch((error) => {
        setMessage({ type: "error", text: "❌ Error deleting todo" });
        console.log(error);
      });
  };

  // Submit Todo
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.trim()) {
      setMessage({ type: "error", text: "⚠️ Please enter a todo task!" });
      return;
    }

    if (!mail || !mail.includes("@")) {
      setMessage({ type: "error", text: "⚠️ Invalid user email" });
      return;
    }

    axios
      .post("https://smarttodo-y1bf.onrender.com/api/add", {
        data,
  reminderDate: new Date(reminderDate).toISOString(), // ✅ store as ISO UTC
        email: mail,
      })
      .then(() => {
        setMessage({ type: "success", text: "✅ To-do created successfully" });
        setData("");
        setReminderDate("");
        fetchTodos();
      })
      .catch((error) =>
        setMessage({
          type: "error",
          text: `❌ Error creating todo: ${
            error.response?.data?.message || error.message
          }`,
        })
      );
  };

  // ⏱️ Utility: Format countdown text
  const getCountdown = (reminderDate) => {
    if (!reminderDate) return "";

    const reminderTime = new Date(reminderDate);
    const diff = reminderTime - now;

    if (diff <= 0) {
      const mins = Math.floor(Math.abs(diff) / (1000 * 60));
      const hours = Math.floor(mins / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) return `❌ Expired (${days}d ${hours % 24}h ago)`;
      if (hours > 0) return `❌ Expired (${hours}h ${mins % 60}m ago)`;
      return `❌ Expired (${mins}m ago)`;
    }

    const mins = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `⏳ in ${days}d ${hours % 24}h`;
    if (hours > 0) return `⏳ in ${hours}h ${mins % 60}m`;
    return `⏳ in ${mins}m`;
  };

  // Status utility for coloring
  const getTodoStatus = (reminderDate) => {
    if (!reminderDate) return "normal";

    const reminderTime = new Date(reminderDate);
    if (reminderTime < now) return "expired";
    if (reminderTime - now < 24 * 60 * 60 * 1000) return "upcoming";
    return "normal";
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6 transition-colors">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 w-[480px] transition-colors">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 text-center">
          📝 Smart To-Do with Reminders
        </h1>

        {/* Status message */}
        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              message.type === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mb-6 text-gray-700 dark:text-gray-200"
        >
          <input
            type="text"
            placeholder="Enter your task..."
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100"
          />

          <input
            type="datetime-local"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all shadow-md"
          >
            ➕ Add To-do
          </button>
        </form>

        {/* Loader */}
        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading...
          </p>
        )}

        {/* Todo List */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {info.length === 0 && !loading && (
            <div className="text-gray-500 dark:text-gray-400 text-center">
              <p>No todos yet. Add one! 🎉</p>
            </div>
          )}

          {info.map((todo, index) => {
            const status = getTodoStatus(todo.reminderDate);

            return (
              <motion.div
                key={todo._id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex justify-between items-center p-3 rounded-lg shadow-sm border transition-colors
                  ${
                    status === "upcoming"
                      ? "bg-yellow-100 dark:bg-yellow-900 border-yellow-400"
                      : status === "expired"
                      ? "bg-red-100 dark:bg-red-900 border-red-400"
                      : "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  }`}
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {todo.data}
                  </p>
                  {todo.reminderDate && (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📅 {new Date(todo.reminderDate).toLocaleString()}
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          status === "expired"
                            ? "text-red-600 dark:text-red-400"
                            : "text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {getCountdown(todo.reminderDate)}
                      </p>
                    </>
                  )}
                  <p className="text-xs text-gray-400">📧 {todo.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm shadow"
                >
                  Delete
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todo;

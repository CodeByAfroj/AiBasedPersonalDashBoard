

// //v3



// import {
//   Home,
//   Settings,
//   Menu,
//   BarChart3,
//   PlusSquareIcon,
//   Rocket,
//   ListTodo,
// } from "lucide-react";

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Userdash from "./Userdash";
// import Nav from "./Nav";
// import Chart from "./Chart";
// import DataDisplayer from "../components/DataDisplayer";
// import Diagram from "../components/Digram";
// import Airesponse from "../components/Airesponse";
// import Todo from "./Todo";
// import { Timeline } from "flowbite-react";
// import TimeLine from "../components/TimeLine";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [userData, setUserData] = useState(null);
//   const [activePage, setActivePage] = useState("dashboard");
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Redirect if no token
//   useEffect(() => {
//     if (!token) navigate("/signin");
//   }, [token, navigate]);

//   // Fetch user info
//   useEffect(() => {
//     if (!token) return;

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(" http://localhost:3000/api/v1/dashboard", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUserData(res.data);
//       } catch (err) {
//         console.error(err);
//         localStorage.removeItem("token");
//         navigate("/signin");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [token, navigate]);


    
//   // Fetch data
//   useEffect(() => {
//     if (!token) return;
//     fetchData();
//   }, [token]);

//   const fetchData = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/viewall", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Create new entry
//   const handleCreate = async (title, desc, link) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/create",
//         { title, desc, link },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setData((prev) => [...prev, res.data]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete entry
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setData((prev) => prev.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Update entry
//   const handleUpdate = async (id, updatedData) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:3000/api/update/${id}`,
//         updatedData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setData((prev) => prev.map((item) => (item._id === id ? res.data : item)));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <p>Loading dashboard...</p>;
//   if (!userData) return <p>User not found</p>;
//   const email = userData.username
//   const initials = userData.username
//     .trim()
//     .split(/\s+/)
//     .map((w) => w[0])
//     .join("")
//     .toUpperCase();

//   return (
//     <div className="h-screen  flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       {/* Top Navbar */}
   

//       {/* Layout */}
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside
//           className={`${
//             sidebarOpen ? "w-54" : "w-20"
//           } bg-white dark:bg-gray-800 border-r fixed dark:border-gray-700 p-4 flex flex-col gap-4 transition-all duration-300`}
//         >
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 mb-6 "
//           >
//             <Menu size={20} className="ml-2" />
//             {sidebarOpen && <span className="font-medium">Menu</span>}
//           </button>

//           <nav className="flex flex-col gap-2 ">
//              <NavItem
//               icon={<Home size={18} />}
//               label="All Entries "
//               open={sidebarOpen}
//               onClick={() => setActivePage("dashboard")}
//             />

//             <NavItem
//               icon={<Home size={18} />}
//               label="Dashboard"
//               open={sidebarOpen}
//               onClick={() => setActivePage("dashboard")}
//             />
//             <NavItem
//               icon={<BarChart3 size={18} />}
//               label="Analytics"
//               open={sidebarOpen}
//               onClick={() => setActivePage("analytics")}
//             />
//             <NavItem
//               icon={<PlusSquareIcon size={18} />}
//               label="Users"
//               open={sidebarOpen}
//               onClick={() => setActivePage("userdash")}
//             />
//             <NavItem
//               icon={<Settings size={18} />}
//               label="Settings"
//               open={sidebarOpen}
//               onClick={() => setActivePage("settings")}
//             />
//              <NavItem
//               icon={<Rocket size={18} />}
//               label="ai"
//               open={sidebarOpen}
//               onClick={() => setActivePage("ai")}
//             />
//             <NavItem
//               icon={<ListTodo size={18} />}
//               label="todo"
//               open={sidebarOpen}
//               onClick={() => setActivePage("todo")}
//             />
//              <NavItem
//               icon={<ListTodo size={18} />}
//               label="timeline"
//               open={sidebarOpen}
//               onClick={() => setActivePage("timeline")}
//             />
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6 overflow-y-auto text-gray-800 dark:text-gray-100 transition-colors duration-300">
//           {activePage === "dashboard" && (
//             <>
//               <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
//                 <Card title="Entries" value={data.length} />

//                   <Chart newEntry={data.length}/>
//               </div>
//             </>
//           )}

//           {activePage === "analytics" && (
//             <p className="text-gray-700 dark:text-gray-300">
//               <DataDisplayer  />
//             </p>
//           )}


//           {activePage === "settings" && (
//             <p className="text-gray-700 dark:text-gray-300">
//               <Diagram/>
//             </p>
//           )}

//            {activePage === "ai" && (
//             <p className="text-gray-700 dark:text-gray-300">
//               <Airesponse className="flex flex-col h-screen"/>
//             </p>
//           )}
//           {activePage === "todo" && (
//             <p className="text-gray-700 dark:text-gray-300">
//               <Todo mail={email} className="flex flex-col h-screen"/>
//             </p>
//           )}
//             {activePage === "timeline" && (
//             <p className="text-gray-700 dark:text-gray-300">
//               <TimeLine className="flex flex-col h-screen"/>
//             </p>
//           )}


//           {activePage === "userdash" && (
//             <Userdash
//               data={data}
//               onCreate={handleCreate}
//               onDelete={handleDelete}
//               onUpdate={handleUpdate}
//             />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }

// /* Reusable Components */
// function NavItem({ icon, label, open, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition"
//     >
//       {icon}
//       {open && <span className="font-medium">{label}</span>}
//     </button>
//   );
// }

// function Card({ title, value }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700 transition-colors duration-300">
//       <h3 className="text-gray-500 dark:text-gray-400 text-sm">{title}</h3>
//       <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-2">
//         {value}
//       </p>
//     </div>
//   );
// }


import {
  Home,
  Settings,
  Menu,
  BarChart3,
  PlusSquareIcon,
  Rocket,
  ListTodo,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Userdash from "./Userdash";
import Chart from "./Chart";
import DataDisplayer from "../components/DataDisplayer";
import Diagram from "../components/Digram";
import Airesponse from "../components/Airesponse";
import Todo from "./Todo";
import TimeLine from "../components/TimeLine";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect if no token
  useEffect(() => {
    if (!token) navigate("/signin");
  }, [token, navigate]);

  // Fetch user info
  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://dashboard-backend-9i5l.onrender.com/api/v1/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token, navigate]);

  // Fetch data
  useEffect(() => {
    if (!token) return;
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://dashboard-backend-9i5l.onrender.com/api/viewall", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (title, desc, link) => {
    try {
      const res = await axios.post(
        "https://dashboard-backend-9i5l.onrender.com/api/create",
        { title, desc, link },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://dashboard-backend-9i5l.onrender.com/api/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `https://dashboard-backend-9i5l.onrender.com/api/update/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData((prev) => prev.map((item) => (item._id === id ? res.data : item)));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (!userData) return <p>User not found</p>;

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-gray-200 transition-all duration-500 ease-in-out flex flex-col justify-between z-30 shadow-lg ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full mt-17">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h1
              className={`text-xl font-bold text-green-400 transition-all duration-300 ${
                sidebarOpen ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              Dashboard
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-green-400 transition"
            >
              <Menu size={22} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto hide-scrollbar mt-4">
            <SidebarItem
              icon={<Home size={20} />}
              label="Dashboard"
              active={activePage === "dashboard"}
              onClick={() => setActivePage("dashboard")}
              open={sidebarOpen}
            />
            <SidebarItem
              icon={<BarChart3 size={20} />}
              label="Analytics"
              active={activePage === "analytics"}
              onClick={() => setActivePage("analytics")}
              open={sidebarOpen}
            />
            <SidebarItem
              icon={<PlusSquareIcon size={20} />}
              label="Users"
              active={activePage === "userdash"}
              onClick={() => setActivePage("userdash")}
              open={sidebarOpen}
            />
            <SidebarItem
              icon={<Rocket size={20} />}
              label="AI"
              active={activePage === "ai"}
              onClick={() => setActivePage("ai")}
              open={sidebarOpen}
            />
            <SidebarItem
              icon={<ListTodo size={20} />}
              label="Todo"
              active={activePage === "todo"}
              onClick={() => setActivePage("todo")}
              open={sidebarOpen}
            />
            <SidebarItem
              icon={<ListTodo size={20} />}
              label="Timeline"
              active={activePage === "timeline"}
              onClick={() => setActivePage("timeline")}
              open={sidebarOpen}
            />
            <SidebarItem
              icon={<Settings size={20} />}
              label="Settings"
              active={activePage === "settings"}
              onClick={() => setActivePage("settings")}
              open={sidebarOpen}
            />
          </nav>

          <div className="border-t border-gray-700 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-gray-900">
              {userData.username.charAt(0).toUpperCase()}
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-semibold text-gray-100">
                  {userData.username}
                </p>
                <p className="text-xs text-gray-400">
                  {userData.email || "user@email.com"}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-20 md:ml-64 p-6 overflow-y-auto hide-scrollbar transition-all duration-300">
        {activePage === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Entries" value={data.length} />
              <Chart newEntry={data.length} />
            </div>
          </div>
        )}
        {activePage === "analytics" && <DataDisplayer />}
        {activePage === "settings" && <Diagram />}
        {activePage === "ai" && <Airesponse />}
        {activePage === "todo" && <Todo mail={userData.username} />}
        {activePage === "timeline" && <TimeLine />}
        {activePage === "userdash" && (
          <Userdash
            data={data}
            onCreate={handleCreate}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        )}
      </main>
    </div>
  );
}

/* Sidebar Item */
function SidebarItem({ icon, label, open, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-all duration-300 ${
        active
          ? "bg-green-600 text-white"
          : "text-gray-300 hover:bg-gray-800 hover:text-green-400"
      }`}
    >
      <span className="min-w-[24px] flex justify-center">{icon}</span>
      <span
        className={`whitespace-nowrap transition-all duration-300 ${
          open ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

/* Reusable Card Component */
function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700 transition-colors duration-300">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-2">
        {value}
      </p>
    </div>
  );
}

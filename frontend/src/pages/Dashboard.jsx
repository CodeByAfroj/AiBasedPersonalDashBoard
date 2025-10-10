// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [userData, setUserData] = useState(null);
//   const navigate =useNavigate()
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/"); // redirect to signin if no token
//       return;
//     }

//     fetch("http://localhost:3000/api/v1/dashboard", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then(res => {
//         if (res.status === 401 || res.status === 403) {
//           localStorage.removeItem("token");
//           navigate("/"); // redirect if token invalid
//         }
//         return res.json();
//       })
//       .then(json => setUserData(json))
//       .catch(err => console.error(err));
//   }, [navigate]);


//  console.log(userData)
//   if (!userData) return <p>Loading dashboard...</p>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Welcome {userData.username}</h1>

//       <p>Message from backend: {userData.message}</p>

//       {/* Example dashboard cards */}
//       <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
//         <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
//           <h2>Profile</h2>
//           <p>Username: {userData.username || "N/A"}</p>
//         </div>
//         <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
//           <h2>Stats</h2>
//           <p>Some stats here...</p>
//         </div>
//         <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
//           <h2>Notifications</h2>
//           <p>No new notifications</p>
//         </div>
//       </div>
//         <button onClick={() => { localStorage.removeItem("token"); navigate("/"); }}>
//         Logout
//       </button>
//     </div>
//   );
// }





// import {
//   Home,
//   User,
//   Settings,
//   LogOut,
//   Menu,
//   BarChart3,
//   Bell,
//   CreativeCommons,
//   CreditCard,
//   PlusIcon,
//   PlusSquareIcon,
// } from "lucide-react";


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Userdash from "./Userdash";
// import axios from "axios";


// export default function Dashboard() {
//   const [data, setData] = useState([]);
//    const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [activePage, setActivePage] = useState("dashboard");

//   const navigate = useNavigate()
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/"); // redirect to signin if no token
//       return;
//     }

//     fetch("http://localhost:3000/api/v1/dashboard", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then(res => {
//         if (res.status === 401 || res.status === 403) {
//           localStorage.removeItem("token");
//           navigate("/"); // redirect if token invalid
//         }
//         return res.json();
//       })
//       .then(json => setUserData(json))
//       .catch(err => console.error(err));
//   }, [navigate]);


//     useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/viewall");
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

 
//   if (!userData) return <p>Loading dashboard...</p>;


//   function getInitials(name) {
//     if (!name || typeof name !== "string") return "";

//     return name
//       .trim()
//       .split(/\s+/)
//       .map(word => word[0])
//       .join("")
//       .toUpperCase();
//   }


//   const initials = getInitials(userData.username)
 

//   return (
//          <div className="h-screen flex flex-col bg-gray-50">
//       {/* Top Navbar */}
//       <header className="sticky top-0 z-10 flex items-center justify-between bg-white border-b px-6 py-3 shadow-sm">
//         {/* Brand */}
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
//             {initials}
//           </div>
//           <span className="text-lg font-bold text-gray-800">MyPortal</span>
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">
//           <button className="text-gray-500 hover:text-green-600">
//             <Bell size={20} />
//           </button>

//           {/* Profile Dropdown */}
//           <div className="relative">
//             <button
//               onClick={() => setProfileOpen(!profileOpen)}
//               className="
//                 flex justify-center items-center
//                 bg-gradient-to-r from-blue-500 to-blue-600
//                 shadow-lg h-10 w-10 rounded-full
//                 hover:scale-105 hover:shadow-xl
//                 transition-all duration-300 ease-in-out
//                 cursor-pointer text-3xl p-5
//               "
//             >
//               {initials}
//             </button>

//             {profileOpen && (
//               <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-xl shadow-lg py-2 border">
//                 <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//                   <User size={16} className="inline mr-2" /> {userData.username}
//                 </button>
//                 <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//                   <Settings size={16} className="inline mr-2" /> Settings
//                 </button>
//                 <hr className="my-1" />
//                 <button
//                   className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                   onClick={() => {
//                     localStorage.removeItem("token");
//                     navigate("/");
//                   }}
//                 >
//                   <LogOut size={16} className="inline mr-2" /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Layout */}
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside
//           className={`${
//             sidebarOpen ? "w-64" : "w-20"
//           } bg-white border-r p-4 flex flex-col gap-4 transition-all duration-300`}
//         >
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6"
//           >
//             <Menu size={20} />
//             {sidebarOpen && <span className="font-medium"></span>}
//           </button>

//           <nav className="flex flex-col gap-2">
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
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           {activePage === "dashboard" && (
//             <>
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                 Dashboard Overview
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <Card title="Entries" value={Object.keys(data).length} />

//               </div>
//             </>
//           )}

//           {activePage === "analytics" && (
//             <p className="text-gray-700">📊 Analytics page content goes here</p>
//           )}

//           {activePage === "settings" && (
//             <p className="text-gray-700">⚙️ Settings page content goes here</p>
//           )}

//           {activePage === "userdash" && <Userdash />} {/* ✅ Render full Userdash component */}
//         </main>
//       </div>
//     </div>
 
//   );
// }

// /* ✅ Reusable components */
// function NavItem({ icon, label, open, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
//     >
//       {icon}
//       {open && <span className="font-medium">{label}</span>}
//     </button>
//   );
// }


// function Card({ title, value }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md border">
//       <h3 className="text-gray-500 text-sm">{title}</h3>
//       <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
//     </div>
//   );
// }


// import {
//   Home,
//   User,
//   Settings,
//   LogOut,
//   Menu,
//   BarChart3,
//   Bell,
//   PlusSquareIcon,
// } from "lucide-react";

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Userdash from "./Userdash";
// import Nav from "./Nav";

// export default function Dashboard() {
//   const [data, setData] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [profileOpen, setProfileOpen] = useState(false);
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
//         const res = await axios.get("http://localhost:3000/api/v1/dashboard", {
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

//   // Fetch user-specific data
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
//       setData(prev => [...prev, res.data]);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete entry
//   const handleDelete = async id => {
//     try {
//       await axios.delete(`http://localhost:3000/api/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setData(prev => prev.filter(item => item._id !== id));
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
//       setData(prev => prev.map(item => (item._id === id ? res.data : item)));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <p>Loading dashboard...</p>;
//   if (!userData) return <p>User not found</p>;

//   const initials = userData.username
//     .trim()
//     .split(/\s+/)
//     .map(w => w[0])
//     .join("")
//     .toUpperCase();

//   return (
//     <div className="h-screen flex flex-col bg-gray-50">
//       {/* Top Navbar */}
      

//       {/* Layout */}
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside
//           className={`${
//             sidebarOpen ? "w-64" : "w-20"
//           } bg-white border-r p-4 flex flex-col gap-4 transition-all duration-300`}
//         >
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6"
//           >
//             <Menu size={20} />
//             {sidebarOpen && <span className="font-medium">Menu</span>}
//           </button>

//           <nav className="flex flex-col gap-2">
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
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-6 overflow-y-auto">
//           {activePage === "dashboard" && (
//             <>
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                 Dashboard Overview
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <Card title="Entries" value={data.length} />
//               </div>
//             </>
//           )}

//           {activePage === "analytics" && (
//             <p className="text-gray-700">📊 Analytics page content goes here</p>
//           )}

//           {activePage === "settings" && (
//             <p className="text-gray-700">⚙️ Settings page content goes here</p>
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
//       className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
//     >
//       {icon}
//       {open && <span className="font-medium">{label}</span>}
//     </button>
//   );
// }

// function Card({ title, value }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md border">
//       <h3 className="text-gray-500 text-sm">{title}</h3>
//       <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
//     </div>
//   );
// }



//v3



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
import Nav from "./Nav";
import Chart from "./Chart";
import DataDisplayer from "../components/DataDisplayer";
import Diagram from "../components/Digram";
import Airesponse from "../components/Airesponse";
import Todo from "./Todo";

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
        const res = await axios.get(" https://loginsystem-bsye.onrender.com/api/v1/dashboard", {
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
      const res = await axios.get("http://localhost:3000/api/viewall", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Create new entry
  const handleCreate = async (title, desc, link) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/create",
        { title, desc, link },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete entry
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Update entry
  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/update/${id}`,
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
  const email = userData.username
  const initials = userData.username
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="h-screen sticky flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top Navbar */}
   

      {/* Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-54" : "w-20"
          } bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 flex flex-col gap-4 transition-all duration-300`}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 mb-6"
          >
            <Menu size={20} className="ml-2" />
            {sidebarOpen && <span className="font-medium">Menu</span>}
          </button>

          <nav className="flex flex-col gap-2">
            <NavItem
              icon={<Home size={18} />}
              label="Dashboard"
              open={sidebarOpen}
              onClick={() => setActivePage("dashboard")}
            />
            <NavItem
              icon={<BarChart3 size={18} />}
              label="Analytics"
              open={sidebarOpen}
              onClick={() => setActivePage("analytics")}
            />
            <NavItem
              icon={<PlusSquareIcon size={18} />}
              label="Users"
              open={sidebarOpen}
              onClick={() => setActivePage("userdash")}
            />
            <NavItem
              icon={<Settings size={18} />}
              label="Settings"
              open={sidebarOpen}
              onClick={() => setActivePage("settings")}
            />
             <NavItem
              icon={<Rocket size={18} />}
              label="ai"
              open={sidebarOpen}
              onClick={() => setActivePage("ai")}
            />
            <NavItem
              icon={<ListTodo size={18} />}
              label="todo"
              open={sidebarOpen}
              onClick={() => setActivePage("todo")}
            />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto text-gray-800 dark:text-gray-100 transition-colors duration-300">
          {activePage === "dashboard" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                <Card title="Entries" value={data.length} />

                  <Chart newEntry={data.length}/>
              </div>
            </>
          )}

          {activePage === "analytics" && (
            <p className="text-gray-700 dark:text-gray-300">
              <DataDisplayer  />
            </p>
          )}


          {activePage === "settings" && (
            <p className="text-gray-700 dark:text-gray-300">
              <Diagram/>
            </p>
          )}

           {activePage === "ai" && (
            <p className="text-gray-700 dark:text-gray-300">
              <Airesponse className="flex flex-col h-screen"/>
            </p>
          )}
          {activePage === "todo" && (
            <p className="text-gray-700 dark:text-gray-300">
              <Todo mail={email} className="flex flex-col h-screen"/>
            </p>
          )}



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
    </div>
  );
}

/* Reusable Components */
function NavItem({ icon, label, open, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition"
    >
      {icon}
      {open && <span className="font-medium">{label}</span>}
    </button>
  );
}

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

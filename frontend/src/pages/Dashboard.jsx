

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
import { Timeline } from "flowbite-react";
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
             <NavItem
              icon={<ListTodo size={18} />}
              label="timeline"
              open={sidebarOpen}
              onClick={() => setActivePage("timeline")}
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
            {activePage === "timeline" && (
            <p className="text-gray-700 dark:text-gray-300">
              <TimeLine className="flex flex-col h-screen"/>
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

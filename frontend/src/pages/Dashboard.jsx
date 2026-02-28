

import {
  Home,
  Settings,
  Menu,
  BarChart3,
  PlusSquareIcon,
  Rocket,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Userdash from "./Userdash";
import Chart from "./Chart";
import DataDisplayer from "../components/DataDisplayer";
import Diagram from "../components/Digram";
import Airesponse from "../components/Airesponse";
import TimeLine from "../components/TimeLine";
import Nav from "./Nav"

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
 <>
  <Nav />

  <div className="flex h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">

    {/* Sidebar */}
    <aside
      className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                  border-r border-gray-200 dark:border-gray-800
                  transition-all duration-300 ease-in-out 
                  flex flex-col justify-between shadow-sm
                  ${sidebarOpen ? "w-64" : "w-20"}`}
    >
      <div className="flex flex-col h-full">

        {/* Top */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-green-500">
              Dashboard
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-green-500 transition"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto mt-4 space-y-1 px-2">
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
            icon={<Clock size={20} />}
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

        {/* Bottom User Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-white">
            {userData.username.charAt(0).toUpperCase()}
          </div>

          {sidebarOpen && (
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {userData.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userData.email || "user@email.com"}
              </p>
            </div>
          )}
        </div>

      </div>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-8 overflow-y-auto">
      {activePage === "dashboard" && (
        <>
          <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Entries" value={data.length} />
            <Chart newEntry={data.length} />
          </div>
        </>
      )}

      {activePage === "analytics" && <DataDisplayer />}
      {activePage === "settings" && <Diagram />}
      {activePage === "ai" && <Airesponse />}
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
</>
  );
}

/* Sidebar Item */
function SidebarItem({ icon, label, open, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center text-gray-900 dark:text-gray-100 gap-3 w-full px-4 py-2.5 text-sm transition-all duration-300 ${
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

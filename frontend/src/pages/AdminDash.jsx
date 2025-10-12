import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDash = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || localStorage.getItem("role") !== "admin") {
      navigate("/signin");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get("https://dashboard-backend-9i5l.onrender.com/api/v1/admin-dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsersData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500  px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg shadow">
            <thead className="bg-blue-500 ">
              <tr>
                <th className="py-2 px-4">User ID</th>
                <th className="py-2 px-4">Username</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Data Title</th>
                <th className="py-2 px-4">Data Description</th>
                <th className="py-2 px-4">Link</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="py-2 px-4">{item.userId?._id || "N/A"}</td>
                  <td className="py-2 px-4">{item.userId?.username || "N/A"}</td>
                  <td className="py-2 px-4">{item.userId?.role || "user"}</td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">{item.desc}</td>
                  <td className="py-2 px-4">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Visit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDash;

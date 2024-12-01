import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaClipboardList,
  FaBook,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import LogoutConfirmationModal from "./LogoutConfirmationModal"; // Import the modal

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  const user = {
    name: "Admin Doe",
    role: "Enrollment Officer", // Employee type (Role/Position)
    avatar: "https://via.placeholder.com/100",
  };

  // Handle logout confirmation
  const handleLogout = () => {
    setIsModalOpen(true); // Open the modal
  };

  const confirmLogout = () => {
    setIsModalOpen(false); // Close the modal
    navigate("/login"); // Redirect to the login page
  };

  const cancelLogout = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#081708] text-white flex flex-col fixed top-0 left-0 h-full z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:relative lg:translate-x-0`}
      >
        <div className="p-6 flex flex-col items-center border-b border-gray-700">
          <Link to="/employeedb">
            <img
              src={user.avatar}
              alt="Profile"
              className="rounded-full w-20 h-20 mb-3 border-4 border-white cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
          </Link>

          <h2
            className="text-xl font-semibold cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          >
            {user.name}
          </h2>
          <p className="text-sm text-gray-400">{user.role}</p> {/* Display employee type */}
        </div>
        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="employProfile"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUser />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="employSettings"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaCog />
                <span>Settings</span>
              </Link>
            </li>
            {/* Thin Horizontal Line */}
            <hr className="my-6 border-t-2 border-gray-700" />
            <li>
              <Link
                to="EmployAcads"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUser />
                <span>Academic Records</span>
              </Link>
            </li>
            <li>
              <Link
                to="EmployStuds"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUser />
                <span>Student Records</span>
              </Link>
            </li>
            <li>
              <Link
                to="userManage"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaBook />
                <span>Manage Accounts</span>
              </Link>
            </li>
            <li>
              <Link
                to="applyManage"
                className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaClipboardList />
                <span>Manage Applications</span>
              </Link>
            </li>
            {/* Thin Horizontal Line */}
            <hr className="my-6 border-t-2 border-gray-700" />
            <li>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 flex items-center space-x-3 hover:bg-red-600 rounded-lg cursor-pointer mt-auto"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#081708] text-white p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-full p-8">
        <Outlet /> {/* This renders the nested route components */}
      </main>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
};

export default AdminDashboard;
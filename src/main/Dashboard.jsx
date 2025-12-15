// src/main/Dashboard.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { BiAnalyse } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import DarkLight from "../components/DarkLight";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const sidebarRoutes = {
  admin: [
    { to: "/dashboard/admin", label: "Admin Dashboard", icon: <MdOutlineAdminPanelSettings /> },
    { to: "/dashboard/manage-users", label: "Manage Users", icon: <GrUserManager /> },
    { to: "/dashboard/all-loan", label: "All Loans", icon: <BiAnalyse /> },
    { to: "/dashboard/loan-application", label: "Loan Applications", icon: <BiAnalyse /> },
  ],

  manager: [
    { to: "/dashboard/manager", label: "Manager Dashboard", icon: <GrUserManager /> },
    { to: "/dashboard/add-loan", label: "Add Loan", icon: <BiAnalyse /> },
    { to: "/dashboard/manage-loans", label: "Manage Loans", icon: <BiAnalyse /> },
    { to: "/dashboard/pending-loans", label: "Pending Loans", icon: <BiAnalyse /> },
    { to: "/dashboard/approved-loans", label: "Approved Loans", icon: <BiAnalyse /> },
  ],

  borrower: [
    { to: "/dashboard/borrower", label: "Borrower Dashboard", icon: <BiAnalyse /> },
    { to: "/dashboard/my-loans", label: "My Loans", icon: <BiAnalyse /> },

  ],
};

const Dashboard = () => {
   const [role, isLoading] = useRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* CONTENT */}
      <div className="drawer-content flex flex-col">
        <nav className="navbar bg-base-300">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-square">
            ☰
          </label>
          <h2 className="text-2xl font-bold">
            <span className="text-cyan-400">LoanLink</span> Dashboard
          </h2>
          <DarkLight />
        </nav>

        <div className="p-6">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <ul className="menu w-64 bg-base-200 p-4 min-h-full">
          <li>
            <Link to="/">
              <IoMdHome /> Home
            </Link>
          </li>

          <div className="divider"></div>

          {sidebarRoutes[role]?.map((item, index) => (
            <li key={index}>
              <Link to={item.to}>
                {item.icon}
                <span className="font-semibold">{item.label}</span>
              </Link>
            </li>
          ))}
        <div className="divider"></div>

        {/* ✅ COMMON PROFILE (ALL ROLES) */}
        <li>
            <Link to="/dashboard/profile">
            <CgProfile />
            <span className="font-semibold">Profile</span>
            </Link>
        </li>
          <div className="mt-auto">
            <li>
              <button>
                <CiSettings /> Settings
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

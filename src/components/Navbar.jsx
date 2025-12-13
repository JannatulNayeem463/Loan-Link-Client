import React, { useContext, useState, useEffect } from "react";
import "./navber.css"
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

 
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const beforeLoginLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-loans">All Loans</NavLink></li>
      <li><NavLink to="/about">About Us</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
    </>
  );

  const afterLoginLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-loans">All Loans</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm">
     <div className=" w-11/12 mx-auto navbar ">
       {/* Navbar Start */}
       <div className="navbar-start">
        <Logo />
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost">☰</button>
          <ul className="menu menu-sm dropdown-content bg-base-100 shadow rounded-box mt-3 w-52 p-2">
            {!user ? beforeLoginLinks : afterLoginLinks}
          </ul>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {!user ? beforeLoginLinks : afterLoginLinks}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
        {/* Theme Toggle */}
        <button className="btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* User Area */}
        {user ? (
          <div className="flex items-center gap-3">
            {/*  tooltip */}
            <div className="relative group">
              <div className="avatar online w-10 h-10 rounded-full bg-neutral text-white flex items-center justify-center cursor-pointer overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="user" />
                ) : (
                  <span className="text-lg font-bold">{user.displayName?.[0]?.toUpperCase() || "U"}</span>
                )}
              </div>

              {/* Tooltip below avatar */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-200 text-black text-sm p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line text-center z-50 w-max max-w-xs">
                {user.displayName || "Unknown User"} <br />
                {user.email || ""}
              </div>
            </div>

            {/* Logout  */}
            <button className="btn btn-error text-white" onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <NavLink to="/auth/login" className="btn bg-cyan-500 text-white px-5">
              Login
            </NavLink>
            <NavLink to="/auth/register" className="btn bg-white text-cyan-500 px-5">
              Register
            </NavLink>
          </>
        )}
      </div>
     </div>
    </div>
  );
}

export default Navbar;

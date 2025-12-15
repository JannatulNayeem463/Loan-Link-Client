import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth"; 
import useRole from "../hooks/useRole";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const Profile = () => {
    const { user, loading } = useAuth()
  const [role, isLoading] = useRole()

    const {  logOut } = useContext(AuthContext);

  
  if (!user) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
        {/* Profile Picture */}
        <img
          src={user.photoURL || "https://i.pravatar.cc/150?img=3"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />

        <p>
          <b>Name:</b> {user.displayName}
        </p>
        <p>
          <b>Email:</b> {user.email}
        </p>
        <p>
          <b>Role:</b> {role}
        </p>

        <div className="mt-6">
          <button onClick={logOut} className="btn btn-error">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

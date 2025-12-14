import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser({
        name: "John Doe",
        email: "john@example.com",
        role: "Borrower",
        // Default profile picture
        profilePic: "https://i.pravatar.cc/150?img=3",
      });
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        window.location.href = "/auth/login";
      }
    });
  };

  if (!user) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
        {/* Profile Picture */}
        <img
          src={user.profilePic || "https://i.pravatar.cc/150?img=3"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />

        <p>
          <b>Name:</b> {user.name}
        </p>
        <p>
          <b>Email:</b> {user.email}
        </p>
        <p>
          <b>Role:</b> {user.role}
        </p>

        <div className="mt-6">
          <button onClick={handleLogout} className="btn btn-error">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

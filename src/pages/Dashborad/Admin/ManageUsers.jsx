import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/data/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // Update Role Handler
  const handleRoleUpdate = (id, newRole) => {
    const updatedUsers = users.map((u) =>
      u.id === id ? { ...u, role: newRole } : u
    );

    setUsers(updatedUsers);

    Swal.fire({
      icon: "success",
      title: "Role Updated",
      text: `User role changed to ${newRole}`,
    });
  };

  // Suspend/Unsuspend Handler
  const handleToggleSuspend = (id) => {
    const updatedUsers = users.map((u) =>
      u.id === id ? { ...u, suspended: !u.suspended } : u
    );

    setUsers(updatedUsers);

    Swal.fire({
      icon: "info",
      title: "Account Updated",
      text: "User status changed successfully",
    });
  };

  return (
    <div className="p-6 bg-base-200">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id}>
                <td>{idx + 1}</td>
                <td className="font-semibold">{user.name}</td>
                <td>{user.email}</td>
                <td className="font-semibold capitalize">{user.role}</td>

                <td>
                  {user.suspended ? (
                    <span className="text-red-500 font-bold">Suspended</span>
                  ) : (
                    <span className="text-green-600 font-bold">Active</span>
                  )}
                </td>

                <td className="flex gap-3 justify-center">

                  
                  <select
                    className="select select-bordered"
                    value={user.role}
                    onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="borrower">Borrower</option>
                  </select>

                  
                  <button
                    onClick={() => handleToggleSuspend(user.id)}
                    className={`btn ${
                      user.suspended ? "btn-success" : "btn-error"
                    }`}
                  >
                    {user.suspended ? "Unsuspend" : "Suspend"}
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

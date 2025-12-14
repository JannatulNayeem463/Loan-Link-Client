import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // 
  useEffect(() => {
    fetch("/data/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // Update User Role
  const handleRoleUpdate = (id, newRole) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUsers = users.map((u) =>
          u.id === id ? { ...u, role: newRole } : u
        );
        setUsers(updatedUsers);
        Swal.fire("Updated!", `User role changed to ${newRole}`, "success");
      }
    });
  };

  // Suspend/Unsuspend User
  const handleToggleSuspend = async (id, suspended) => {
    if (!suspended) {
      // Show modal to collect reason & feedback before suspending
      const { value: formValues } = await Swal.fire({
        title: "Suspend User",
        html:
          '<input id="reason" class="swal2-input" placeholder="Reason">' +
          '<textarea id="feedback" class="swal2-textarea" placeholder="Feedback"></textarea>',
        focusConfirm: false,
        preConfirm: () => {
          const reason = document.getElementById("reason").value;
          const feedback = document.getElementById("feedback").value;
          if (!reason || !feedback) {
            Swal.showValidationMessage("Please provide reason and feedback");
            return false;
          }
          return { reason, feedback };
        },
        showCancelButton: true,
      });

      if (!formValues) return; // canceled
    }

    // Update user status
    const updatedUsers = users.map((u) =>
      u.id === id
        ? { ...u, suspended: !u.suspended, suspendInfo: !suspended ? formValues : null }
        : u
    );
    setUsers(updatedUsers);

    Swal.fire(
      "Updated!",
      !suspended ? "User suspended successfully" : "User unsuspended successfully",
      "info"
    );
  };

  return (
    <div className="p-6 m-5 rounded-2xl bg-base-200">
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

                <td className="flex gap-3 justify-center items-center">
                  {/* Role Dropdown */}
                  <select
                    className="select select-bordered"
                    value={user.role}
                    onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="borrower">Borrower</option>
                  </select>

                  {/* Suspend/Unsuspend Button */}
                  <button
                    onClick={() => handleToggleSuspend(user.id, user.suspended)}
                    className={`btn ${user.suspended ? "btn-success" : "btn-error"}`}
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

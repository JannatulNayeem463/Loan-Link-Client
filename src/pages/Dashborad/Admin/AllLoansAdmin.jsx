import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AllLoansAdmin = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch all loans
  useEffect(() => {
    fetch("https://loan-link-server-ruby.vercel.app/loans")
      .then((res) => res.json())
      .then((data) => {
        setLoans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading loans:", err);
        setLoading(false);
      });
  }, []);


  const handleEdit = (id) => {
    navigate(`/dashboard/editloan/${id}`);
  };

  // 🔹 Delete 
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This loan will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://loan-link-server-ruby.vercel.app/loans/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              setLoans(loans.filter((loan) => loan._id !== id));
              Swal.fire("Deleted!", "Loan has been removed.", "success");
            }
          });
      }
    });
  };

  //  Toggle Show on Home
  const handleShowOnHome = (id, value) => {
    fetch(`https://loan-link-server-ruby.vercel.app/loans/${id}/show-on-home`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ showOnHome: value }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          Swal.fire("Updated!", "Home display updated.", "success");

          setLoans(
            loans.map((loan) =>
              loan._id === id ? { ...loan, showOnHome: value } : loan
            )
          );
        }
      });
  };

  if (loading) {
    return <p className="text-center text-xl mt-10">Loading loans...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center"> All Loans</h2>

      <div className="overflow-x-auto shadow-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>
                  <img
                    src={loan.image}
                    className="w-16 h-16 rounded object-cover"
                    alt={loan.title}
                  />
                </td>

                <td className="font-semibold">{loan.title}</td>
                <td>{loan.interest}%</td>
                <td>{loan.category}</td>
                <td>{loan.createdBy || "Unknown"}</td>

                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-info"
                    checked={loan.showOnHome || false}
                    onChange={(e) =>
                      handleShowOnHome(loan._id, e.target.checked)
                    }
                  />
                </td>

                <td className="flex gap-2">

                  <button
                    onClick={() => handleEdit(loan._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
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

export default AllLoansAdmin;

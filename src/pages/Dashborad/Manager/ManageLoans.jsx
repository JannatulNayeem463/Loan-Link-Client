import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  // Fetch all loans
  useEffect(() => {
    fetch("http://localhost:5000/loans") 
      .then((res) => res.json())
      .then((data) => {
        setLoans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Handle delete confirmation
  const handleDelete = (loan) => {
    setSelectedLoan(loan);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:5000/loans/${selectedLoan._id}`, {
      method: "DELETE",
    })
      .then(() => {
        setLoans(loans.filter((l) => l._id !== selectedLoan._id));
        setShowDeleteModal(false);
        setSelectedLoan(null);
      })
      .catch((err) => console.error(err));
  };

  const filteredLoans = loans.filter(
    (loan) =>
      loan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center mt-12">Loading...</p>;

  return (
    <div className="p-6 bg-gray-200 max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl text-center  font-bold mb-15">Manage Loans</h2>

      <input
        type="text"
        placeholder="Search by title or category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border rounded w-full md:w-1/3"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Interest</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan._id} className="text-center">
                <td className="py-2 px-4 border">
                  <img
                    src={loan.image || "/placeholder-image.jpg"}
                    alt={loan.title}
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                </td>
                <td className="py-2 px-4 border">{loan.title}</td>
                <td className="py-2 px-4 border">{loan.interest}</td>
                <td className="py-2 px-4 border">{loan.category}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    onClick={() => navigate(`/dashboard/update-loan/${loan._id}`)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(loan)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredLoans.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No loans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/*  */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
            <p className="mb-4">
              Are you sure you want to delete <strong>{selectedLoan.title}</strong>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLoans;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // View Details button handler
  const handleViewDetails = (loanId) => {
    navigate(`/loan/${loanId}`);
  };

  // Fetch loans from server API
  useEffect(() => {
    fetch("http://localhost:5000/loans") // server API URL
      .then((res) => res.json())
      .then((data) => {
        setLoans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching loans:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-xl mt-12">Loading loans...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Loans</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loans.map((loan) => (
          <div
            key={loan._id}
            className="card bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={loan.image}
              alt={loan.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{loan.title}</h3>
              <p className="text-gray-600">{loan.category}</p>
              <p className="text-gray-600">Interest: {loan.interest}</p>
              <p className="text-gray-600">Max Limit: {loan.maxLoan}</p>
              <button
                onClick={() => handleViewDetails(loan._id)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 mt-4 w-full rounded-md font-semibold transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLoans;

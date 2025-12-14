import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  const canApply = user && user.role !== "manager" && user.role !== "admin";

  const handleApplyNow = () => {
    navigate(`/apply-loan/${loan._id}`);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/loans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoan(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-12">Loading...</p>;
  if (!loan) return <p className="text-center mt-12 text-red-500">Loan not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10">
      <img
        src={loan.image || "/placeholder-image.jpg"}
        alt={loan.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-3xl font-bold mt-4">{loan.title}</h2>
      <p className="text-gray-700 mt-2">{loan.description}</p>
      <div className="mt-4 space-y-1 text-gray-700">
        <p><strong>Category:</strong> {loan.category}</p>
        <p><strong>Interest Rate:</strong> {loan.interest}</p>
        <p><strong>Max Limit:</strong> {loan.maxLoan}</p>
        <p>
          <strong>EMI Plans:</strong>{" "}
          {Array.isArray(loan.emiPlans) ? loan.emiPlans.join(", ") : "N/A"}
        </p>
      </div>
      <button
        onClick={handleApplyNow}
        disabled={!canApply}
        className={`mt-6 w-full px-6 py-3 rounded-md font-semibold text-white transition ${
          canApply ? "bg-cyan-500 hover:bg-cyan-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Apply Now
      </button>
      {!canApply && (
        <p className="text-red-500 mt-2 text-center">
          Only borrowers can apply for loans.
        </p>
      )}
    </div>
  );
};

export default LoanDetails;

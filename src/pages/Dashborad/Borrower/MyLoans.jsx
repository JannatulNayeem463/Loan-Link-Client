import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userEmail = "user@gmail.com"; // Replace with logged-in user's email

  // Fetch user's loan applications
  const fetchMyLoans = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/my-loans?email=${userEmail}`);
      if (!res.ok) throw new Error("Failed to fetch loans");
      const data = await res.json();
      setLoans(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load loans");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyLoans();
  }, []);

  // Cancel loan
  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Loan?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:5000/applications/${id}/cancel`, {
            method: "PATCH",
          });
          const data = await res.json();
          if (data.success) {
            Swal.fire("Canceled!", "Loan application canceled", "success");
            fetchMyLoans();
          } else {
            Swal.fire("Error", "Failed to cancel loan", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to cancel loan", "error");
        }
      }
    });
  };

  // Pay application fee via Stripe
  const handlePay = async (loan) => {
    try {
      const res = await fetch("http://localhost:5000/create-loan-fee-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: loan._id,
          email: userEmail,
          loanId: loan.loanId || loan.loanTitle, // fallback if loanId missing
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        Swal.fire("Error", "Failed to create payment session", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to process payment", "error");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading loans...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl text-center font-bold mb-4">My Loans</h2>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Loan ID</th>
            <th className="border p-2">Loan Info</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Fee Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loans.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-center">
                No loan applications found
              </td>
            </tr>
          )}

          {loans.map((loan) => (
            <tr key={loan._id} className="text-center">
              <td className="border p-2">{loan.loanId || loan._id}</td>
              <td className="border p-2">{loan.loanTitle || loan.title}</td>
              <td className="border p-2">{loan.amount || "N/A"}</td>
              <td className="border p-2 font-semibold">{loan.status}</td>
              <td className="border p-2">
                {loan.applicationFeeStatus === "Paid" ? (
                  <span className="badge badge-success">Paid</span>
                ) : (
                  <span className="badge badge-warning">Unpaid</span>
                )}
              </td>
              <td className="border p-2 space-x-2">
                <button className="btn btn-info btn-sm">View</button>

                {loan.status === "Pending" && (
                  <button
                    onClick={() => handleCancel(loan._id)}
                    className="btn btn-error btn-sm"
                  >
                    Cancel
                  </button>
                )}

                {loan.applicationFeeStatus === "Unpaid" && (
                  <button
                    onClick={() => handlePay(loan)}
                    className="btn btn-success btn-sm"
                  >
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLoans;

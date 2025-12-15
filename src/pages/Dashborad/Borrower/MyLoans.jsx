import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const fetchMyLoans = async () => {
    if (!user?.email) return;
    console.log(user.email)
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://loan-link-server-ruby.vercel.app/applications?email=${user.email}`
      );

      if (!res.ok) throw new Error("Failed to fetch loans");

      const data = await res.json();
      setLoans(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyLoans();
  }, [user?.email]);

  const handleCancel = (id) => {
    navigator("dashbord/payment-success")

    Swal.fire({
      title: "Cancel Loan?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `https://loan-link-server-ruby.vercel.app/applications/${id}/cancel`,
          { method: "PATCH" }
        );
        const data = await res.json();

        if (data.success) {
          Swal.fire("Canceled!", "Loan application canceled", "success");
          fetchMyLoans();
        }
      }
    });
  };

  const handlePay = async (loan) => {
    const res = await fetch(
      "https://loan-link-server-ruby.vercel.app/create-loan-fee-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: loan._id,
          email: user?.email,
          loanId: loan.loanId || loan.loanTitle,
        }),
      }
    );

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl text-center font-bold mb-4">My Loans</h2>

      {loans.length === 0 ? (
        <p className="text-center">No loan applications found</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Loan</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Fee</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="text-center">
                <td className="border p-2">{loan.loanTitle}</td>
                <td className="border p-2">{loan.loanAmount}</td>
                <td className="border p-2">{loan.status}</td>
                <td className="border p-2">{loan.applicationFeeStatus}</td>
                <td className="border p-2 space-x-2">
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
      )}
    </div>
  );
};

export default MyLoans;

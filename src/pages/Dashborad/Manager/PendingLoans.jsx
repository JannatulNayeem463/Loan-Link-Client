import React, { useEffect, useState } from "react";

const PendingLoans = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingLoans = async () => {
    try {
      const res = await fetch("https://loan-link-server-ruby.vercel.app/pending-loans");
      const data = await res.json();
      setApplications(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingLoans();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`https://loan-link-server-ruby.vercel.app/applications/${id}/approve`, {
        method: "PATCH",
      });
      const result = await res.json();
      if (result.success) {
        alert("Loan approved!");
        fetchPendingLoans();
      }
    } catch (err) {
      console.error(err);
      alert("Error approving loan");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`https://loan-link-server-ruby.vercel.app/applications/${id}/reject`, {
        method: "PATCH",
      });
      const result = await res.json();
      if (result.success) {
        alert("Loan rejected!");
        fetchPendingLoans();
      }
    } catch (err) {
      console.error(err);
      alert("Error rejecting loan");
    }
  };

  if (loading) return <p className="text-center mt-12">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl p-5 text-center font-bold mb-4">Pending Loan Applications</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Loan ID</th>
            <th className="border px-4 py-2">Borrower</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="text-center">
              <td className="border px-4 py-2">{app.loanId}</td>
              <td className="border px-4 py-2">
                {app.userName} <br /> {app.userEmail}
              </td>
              <td className="border px-4 py-2">{app.amount}</td>
              <td className="border px-4 py-2">{new Date(app.createdAt).toLocaleDateString()}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleApprove(app._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(app._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
                <button
                  onClick={() => alert("Redirect to Loan Details")}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
          {applications.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No pending applications
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingLoans;

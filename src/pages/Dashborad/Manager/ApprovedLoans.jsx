import React, { useEffect, useState } from "react";

const ApprovedLoans = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApprovedLoans = async () => {
    try {
      const res = await fetch("http://localhost:5000/applications?status=Approved");
      const data = await res.json();
      setApplications(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedLoans();
  }, []);

  if (loading) return <p className="text-center mt-12">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Approved Loan Applications</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Loan ID</th>
            <th className="border px-4 py-2">Borrower</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Approved Date</th>
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
              <td className="border px-4 py-2">
                {app.approvedAt ? new Date(app.approvedAt).toLocaleDateString() : "-"}
              </td>
              <td className="border px-4 py-2">
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
                No approved applications
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedLoans;

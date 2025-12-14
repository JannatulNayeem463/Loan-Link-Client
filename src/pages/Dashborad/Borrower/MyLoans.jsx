import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MyLoans = () => {
  const [loans, setLoans] = useState([]);
  const userEmail = "user@gmail.com"; 

  const fetchMyLoans = async () => {
    const res = await fetch(
      `http://localhost:5000/my-loans?email=${userEmail}`
    );
    const data = await res.json();
    setLoans(data);
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
        await fetch(
          `http://localhost:5000/applications/${id}/cancel`,
          { method: "PATCH" }
        );
        Swal.fire("Canceled!", "Loan application canceled", "success");
        fetchMyLoans();
      }
    });
  };

  // Pay fee
  const handlePay = async (id) => {
    await fetch(`http://localhost:5000/applications/${id}/pay`, {
      method: "PATCH",
    });
    Swal.fire("Success", "Application fee paid", "success");
    fetchMyLoans();
  };

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
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id} className="text-center">
              <td className="border p-2">{loan.loanId}</td>
              <td className="border p-2">{loan.loanTitle}</td>
              <td className="border p-2">{loan.amount}</td>
              <td className="border p-2 font-semibold">
                {loan.status}
              </td>

              <td className="border p-2 space-x-2">
                <button className="btn btn-info btn-sm">
                  View
                </button>

                {loan.status === "Pending" && (
                  <button
                    onClick={() => handleCancel(loan._id)}
                    className="btn btn-error btn-sm"
                  >
                    Cancel
                  </button>
                )}

                {loan.applicationFeeStatus === "Unpaid" ? (
                  <button
                    onClick={() => handlePay(loan._id)}
                    className="btn btn-success btn-sm"
                  >
                    Pay
                  </button>
                ) : (
                  <span className="badge badge-success">
                    Paid
                  </span>
                )}
              </td>
            </tr>
          ))}

          {loans.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center">
                No loan applications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyLoans;

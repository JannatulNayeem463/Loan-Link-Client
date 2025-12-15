import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const ApplyLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    nationalId: "",
    incomeSource: "",
    monthlyIncome: "",
    loanAmount: "",
    reason: "",
    address: "",
    extraNotes: "",
  });

  // 🔹 Fetch single loan by id
  useEffect(() => {
    fetch(`https://loan-link-server-ruby.vercel.app/loans/${id}`)
      .then(res => res.json())
      .then(data => {
        setLoan(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loan || !user) return;

    const application = {
      ...formData,
      amount: formData.loanAmount,
      email: user.email,
      userEmail: user.email,
      loanId: loan._id,
      loanTitle: loan.title,
      interestRate: loan.interestRate,
      status: "Pending",
      applicationFeeStatus: "Unpaid",
      createdAt: new Date(),
    };

    try {
      const res = await fetch("https://loan-link-server-ruby.vercel.app/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Success", "Loan application submitted!", "success");
        navigate("/dashboard/my-loans");
      } else {
        Swal.fire("Error", data.message || "Failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Apply for Loan: {loan.title}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>User Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input w-full"
          />
        </div>

        <div className="mb-4">
          <label>Loan Title</label>
          <input
            type="text"
            value={loan.title}
            readOnly
            className="input w-full"
          />
        </div>

        <div className="mb-4">
          <label>Interest Rate</label>
          <input
            type="text"
            value={loan.interest}
            readOnly
            className="input w-full"
          />
        </div>

        {[
          "firstName",
          "lastName",
          "contactNumber",
          "nationalId",
          "incomeSource",
          "monthlyIncome",
          "loanAmount",
          "reason",
          "address",
          "extraNotes",
        ].map((field) => (
          <div key={field} className="mb-4">
            <label className="font-semibold block">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={
                field.includes("Income") || field.includes("Amount")
                  ? "number"
                  : "text"
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="input w-full"
            />
          </div>
        ))}

        <button
          type="submit"
          className="btn bg-cyan-600 text-white w-full mt-4"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyLoan;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditLoans = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch loan data
  useEffect(() => {
    fetch(`http://localhost:5000/loans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoan(data);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/loans/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loan),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Loan updated successfully!");
        navigate("/dashboard/all-loan");
      });
  };

  const handleChange = (e) => {
    setLoan({ ...loan, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Loan</h2>

      <form onSubmit={handleUpdate} className="space-y-4">

        <input
          type="text"
          name="title"
          value={loan.title || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Title"
        />

        <input
          type="text"
          name="category"
          value={loan.category || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Category"
        />

        <input
          type="number"
          name="interest"
          value={loan.interest || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Interest Rate"
        />

        <input
          type="number"
          name="maxLoan"
          value={loan.maxLoan || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Max Loan Limit"
        />

        <input
          type="text"
          name="image"
          value={loan.image || ""}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Image URL"
        />

        <textarea
          name="description"
          value={loan.description || ""}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          placeholder="Description"
        ></textarea>

        <button
          type="submit"
          className="btn bg-blue-500 text-white w-full"
        >
          Update Loan
        </button>
      </form>
    </div>
  );
};

export default EditLoans;

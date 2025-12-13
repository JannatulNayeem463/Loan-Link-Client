import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load loan details
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

  if (loading) return <p className="text-center mt-12 text-xl">Loading...</p>;
  if (!loan) return <p className="text-center mt-12">Loan not found.</p>;

  // Update Loan Submit
  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedLoan = {
      title: form.title.value,
      description: form.description.value,
      interest: form.interest.value,
      category: form.category.value,
      maxLoan: form.maxLoan.value,
      image: form.image.value,
      emiPlans: form.emiPlans.value.split(","), // comma separated list
    };

    fetch(`http://localhost:5000/loans/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLoan),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          Swal.fire({
            icon: "success",
            title: "Loan Updated Successfully!",
          });

          navigate("/dashboard/all-loan");
        }
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Loan</h2>

      <form onSubmit={handleUpdate} className="space-y-4 bg-white p-6 shadow rounded">
        <div>
          <label className="font-semibold">Loan Title</label>
          <input
            type="text"
            name="title"
            defaultValue={loan.title}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            defaultValue={loan.description}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Interest Rate (%)</label>
          <input
            type="number"
            name="interest"
            defaultValue={loan.interest}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Category</label>
          <input
            type="text"
            name="category"
            defaultValue={loan.category}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Max Loan Limit</label>
          <input
            type="number"
            name="maxLoan"
            defaultValue={loan.maxLoan}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            defaultValue={loan.image}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">
            EMI Plans (comma separated)
          </label>
          <input
            type="text"
            name="emiPlans"
            defaultValue={loan.emiPlans?.join(",")}
            className="input input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full">Update Loan</button>
      </form>
    </div>
  );
};

export default EditLoan;

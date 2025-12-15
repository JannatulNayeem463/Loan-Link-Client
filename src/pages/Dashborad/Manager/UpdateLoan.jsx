import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    interestRate: "",
    maxLoanLimit: "",
    emiPlans: "",
    requiredDocs: "",
    showOnHome: false,
  });

  useEffect(() => {
    fetch(`https://loan-link-server-ruby.vercel.app/loans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoan(data);

        // Safe handling of emiPlans and requiredDocs
        const emiPlansString = Array.isArray(data.emiPlans)
          ? data.emiPlans.join(", ")
          : typeof data.emiPlans === "string"
            ? data.emiPlans
            : "";

        const requiredDocsString = Array.isArray(data.requiredDocs)
          ? data.requiredDocs.join(", ")
          : typeof data.requiredDocs === "string"
            ? data.requiredDocs
            : "";

        setFormData({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          interestRate: data.interestRate || "",
          maxLoanLimit: data.maxLoanLimit || "",
          emiPlans: emiPlansString,
          requiredDocs: requiredDocsString,
          showOnHome: data.showOnHome || false,
        });

        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "emiPlans" || key === "requiredDocs") {
        // Convert comma-separated string to array
        const arr = value.split(",").map((v) => v.trim());
        data.append(key, JSON.stringify(arr)); // send as JSON string
      } else {
        data.append(key, value);
      }
    });

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      const res = await fetch(`https://loan-link-server-ruby.vercel.app/loans/${id}`, {
        method: "PUT",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        alert("Loan updated successfully!");
        navigate("/dashboard/manage-loans");
      } else {
        alert("Failed to update loan");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating loan");
    }
  };

  if (loading) return <p className="text-center mt-12">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl  text-center font-bold mt-5 ">Update Loan</h2>
      <p className="text-center mb-20">Please Update</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="interestRate"
          value={formData.interestRate}
          onChange={handleChange}
          placeholder="Interest Rate"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="maxLoanLimit"
          value={formData.maxLoanLimit}
          onChange={handleChange}
          placeholder="Max Loan Limit"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="emiPlans"
          value={formData.emiPlans}
          onChange={handleChange}
          placeholder="EMI Plans (comma separated)"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="requiredDocs"
          value={formData.requiredDocs}
          onChange={handleChange}
          placeholder="Required Documents (comma separated)"
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center  space-x-2">
          <input
            type="checkbox"
            name="showOnHome"
            checked={formData.showOnHome}
            onChange={handleChange}
          />
          <span>Show on Home</span>
        </label>
        <input type="file" multiple onChange={handleImageChange} />
        <button
          type="submit"
          className="bg-cyan-500 mt-5 hover:bg-cyan-600 text-white px-6 py-2 rounded"
        >
          Update Loan
        </button>
      </form>
    </div>
  );
};

export default UpdateLoan;

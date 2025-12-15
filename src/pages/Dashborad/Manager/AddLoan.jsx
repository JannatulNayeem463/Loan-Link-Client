import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddLoan = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    interestRate: "",
    maxLoanLimit: "",
    requiredDocs: [],
    emiPlans: "",
    images: [],
    showOnHome: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, images: files });
    } else if (type === "select-multiple") {
      const options = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({ ...formData, [name]: options });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === "images") {
          for (let i = 0; i < formData.images.length; i++) {
            data.append("images", formData.images[i]);
          }
        } else if (key === "requiredDocs") {
          data.append(key, formData[key].join(","));
        } else {
          data.append(key, formData[key]);
        }
      }

      await axios.post("https://loan-link-server-ruby.vercel.app/loans", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Loan added successfully!");

      setFormData({
        title: "",
        description: "",
        category: "",
        interestRate: "",
        maxLoanLimit: "",
        requiredDocs: [],
        emiPlans: "",
        images: [],
        showOnHome: false,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add loan");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl text-center font-bold mb-4">Add Loan</h2>
      <div className="bg-white p-10 rounded shadow">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" name="title" placeholder="Loan Title" value={formData.title} onChange={handleChange} required className="w-full p-2 mb-3 border rounded" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 mb-3 border rounded" />
          <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 mb-3 border rounded">
            <option value="">Select Category</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
            <option value="Car">Car</option>
          </select>
          <input type="number" name="interestRate" placeholder="Interest Rate (%)" value={formData.interestRate} onChange={handleChange} required className="w-full p-2 mb-3 border rounded" />
          <input type="number" name="maxLoanLimit" placeholder="Max Loan Limit" value={formData.maxLoanLimit} onChange={handleChange} required className="w-full p-2 mb-3 border rounded" />

          <select multiple name="requiredDocs" value={formData.requiredDocs} onChange={handleChange} className="w-full p-2 mb-3 border rounded">
            <option value="ID Proof">ID Proof</option>
            <option value="Income Proof">Income Proof</option>
            <option value="Address Proof">Address Proof</option>
          </select>

          <input type="text" name="emiPlans" placeholder="EMI Plans" value={formData.emiPlans} onChange={handleChange} className="w-full p-2 mb-3 border rounded" />
          <input type="file" name="images" multiple onChange={handleChange} className="w-full mb-3" />

          <label className="flex items-center mb-3">
            <input type="checkbox" name="showOnHome" checked={formData.showOnHome} onChange={handleChange} className="mr-2" />
            Show on Home
          </label>

          <button type="submit" className="w-full bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600">Add Loan</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddLoan;

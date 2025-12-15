import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full relative">

      {/* ---------- BIG CENTERED Toast ---------- */}
      {showToast && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-10 py-6 rounded-2xl shadow-2xl text-2xl font-bold animate-slide-in-out flex items-center gap-4 min-w-[450px] justify-center z-50">
          <span className="text-4xl">✅</span>
          <span>Message sent successfully!🥰</span>
        </div>
      )}

      {/* ---------- Hero Section ---------- */}
      <div className="bg-cyan-700 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Contact Us</h1>
        <p className="mt-4 text-xl max-w-2xl mx-auto opacity-90">
          We're here to help! Feel free to reach out anytime.
        </p>
      </div>

      {/* ---------- Contact Form Section ---------- */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white shadow-xl rounded-xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Send Us a Message
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Fill out the form and our team will get back to you soon.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">

            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-cyan-500 outline-none"  
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-cyan-500 outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message here..."
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-cyan-500 outline-none"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-3 rounded-lg 
              text-lg font-semibold hover:bg-cyan-700 transition"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>

      <div className="py-10 bg-gray-100 text-center text-gray-600">
        <p>We usually reply within 24 hours.</p>
      </div>

      {/* ---------- Toast Animation CSS ---------- */}
      <style>{`
        @keyframes slideInOut {
          0% { transform: translate(-50%, -120%); opacity: 0; }
          10% { transform: translate(-50%, 0); opacity: 1; }
          90% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, -120%); opacity: 0; }
        }
        .animate-slide-in-out {
          animation: slideInOut 3s ease forwards;
        }
      `}</style>

    </div>
  );
};

export default Contact;

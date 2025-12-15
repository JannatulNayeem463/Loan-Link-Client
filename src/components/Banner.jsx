import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate("/all-loans"); 
  };

  const handleExplore = () => {
    navigate("/all-loans"); 
  };

  return (
    <section
      className="w-full p-4 bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?auto=format&fit=crop&w=1400&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="bg-black/50 p-8 md:p-16 rounded-lg max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Get Your Loan Easily & Quickly
        </h1>
        <p className="text-gray-200 mt-4 text-lg md:text-xl">
          Fast approval, low interest rates, and a simple application process.
          Apply today and secure your financial future.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleApply}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            Apply for Loan
          </button>

          <button
            onClick={handleExplore}
            className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-md font-semibold transition"
          >
            Explore Loans
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;

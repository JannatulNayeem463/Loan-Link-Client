import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full">

      {/* ---------- Hero Section ---------- */}
      <div className="bg-gray-100 text-black py-20 text-center">
        <h1 className="text-5xl font-extrabold">About LoanLink</h1>
        <p className="mt-4 text-xl max-w-2xl mx-auto opacity-90">
          A modern web-based platform simplifying microloan management for small financial organizations.
        </p>
      </div>

      {/* ---------- Main Content + Image Section ---------- */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-blue-100">
        
        {/* Text Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
          <p className="mt-5 text-gray-700 leading-7">
            <strong>LoanLink</strong> is a powerful microloan request, review, 
            and approval management system designed to streamline the work of 
            small financial organizations, NGOs, and microloan providers.
          </p>

          <p className="mt-4 text-gray-700 leading-7">
            Many institutions struggle to organize loan applications, 
            verification, approval workflows, EMI scheduling, and repayments. 
            LoanLink solves this by offering a secure, automated, and user-friendly 
            digital solution.
          </p>

          <p className="mt-4 text-gray-700 leading-7">
            Our goal is to transform microloan management with a system that is 
            fast, transparent, and accessible for everyone.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src="https://5.imimg.com/data5/SD/PE/MY-72323302/microfinance-system-software-500x500.jpg"
            alt="Microloan System"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

      </div>

      {/* ---------- Highlight Section ---------- */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-gray-600 leading-7 text-lg">
            To make microloan management smart, transparent, and effortless— 
            empowering small financial organizations and helping communities grow.
          </p>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;

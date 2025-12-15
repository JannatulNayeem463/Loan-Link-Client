import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AvailableLoans = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://loan-link-server-ruby.vercel.app/loans")
      .then((res) => res.json())
      .then((data) => setLoans(data.slice(0, 6)))
      .catch((err) => console.error(err));
  }, []);

  //  View Details 
  const handleViewDetails = (id) => {
    navigate(`/loan/${id}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-11/12 mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Available Loans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={loan.image}
                alt={loan.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{loan.title}</h3>
                <p className="text-gray-600 mb-4">{loan.description}</p>
                <p className="font-bold mb-4">Max Loan: {loan.maxLoan}</p>

                <button
                  onClick={() => handleViewDetails(loan._id)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 mt-4 w-full rounded-md font-semibold transition"
                >
                  View Details
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableLoans;

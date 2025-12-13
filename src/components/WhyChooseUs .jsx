import React, { useEffect, useState } from "react";

const WhyChooseUs = () => {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    fetch("/data/benefits.json")
      .then((res) => res.json())
      .then((data) => setBenefits(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg text-center transition">
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
              <p className="text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

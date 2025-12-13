import React, { useEffect, useState } from "react";

const HowItWorks = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetch("/data/steps.json")
      .then((res) => res.json())
      .then((data) => setSteps(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-11/12 mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

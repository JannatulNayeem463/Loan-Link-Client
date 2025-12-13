import React, { useEffect, useState } from "react";

const LoanFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch("/data/faqs.json")
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch((err) => console.error(err));
  }, []);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 font-semibold flex justify-between items-center"
              >
                {faq.question}
                <span>{openIndex === idx ? "−" : "+"}</span>
              </button>
              {openIndex === idx && <div className="p-4 text-gray-700">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanFAQ;

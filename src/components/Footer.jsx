import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 mt-12">

<div className="flex flex-col md:flex-row justify-between gap-10">

       <div className="mb-6 ml-20 ">
        <h2 className="text-4xl font-bold text-cyan-400">Loan<span className="text-white text-2xl pt-4">Link</span></h2>
        <p className="text-gray-400 mt-2 max-w-sm">
          This is a simple footer built with React JSX. Add your website or
          company description here.
        </p>
      </div>

     
      <div className="mb-6 mr-80 ">
        <h3 className="text-xl font-semibold text-white mb-3">Useful Links</h3>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-300 hover:text-cyan-400">Home</a></li>
          <li><a href="#" className="text-gray-300 hover:text-cyan-400">About</a></li>
          <li><a href="#" className="text-gray-300 hover:text-cyan-400">Services</a></li>
          <li><a href="#" className="text-gray-300 hover:text-cyan-400">Contact</a></li>
        </ul>
      </div>
     </div>

     
      <div className="text-center border-t border-gray-700 pt-4 text-gray-400">
        © 2025 <span className= " font-bold text-cyan-400">LoanLink</span> — All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;

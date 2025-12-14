import { Link } from "react-router-dom";

const Manager = () => {
  return (
    <div className="p-10 bg-gray-200 rounded-2xl m-5 ">
      <h2 className="text-2xl text-center font-bold mb-6">Manager Panel</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Add Loan */}
        <Link
          to="/dashboard/add-loan"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">➕ Add Loan</h3>
          <p className="text-sm text-gray-500">
            Create a new loan application
          </p>
        </Link>

        {/* Manage Loans */}
        <Link
          to="/dashboard/manage-loans"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">📋 Manage Loans</h3>
          <p className="text-sm text-gray-500">
            View and manage all loans
          </p>
        </Link>

        {/* Pending Applications */}
        <Link
          to="/dashboard/pending-loans"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">⏳ Pending Applications</h3>
          <p className="text-sm text-gray-500">
            Review pending loan requests
          </p>
        </Link>

        {/* Approved Applications */}
        <Link
          to="/dashboard/approved-loans"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">✅ Approved Applications</h3>
          <p className="text-sm text-gray-500">
            View approved loans
          </p>
        </Link>

        {/* My Profile */}
        <Link
          to="/dashboard/profile"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-2">👤 My Profile</h3>
          <p className="text-sm text-gray-500">
            Manage your account information
          </p>
        </Link>

      </div>
    </div>
  );
};

export default Manager;

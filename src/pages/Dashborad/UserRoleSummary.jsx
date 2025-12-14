import { Link } from "react-router-dom";
import {
  ShieldCheckIcon,
  BriefcaseIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const UserRoleSummary = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">User Roles</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Admin */}
        <Link
          to="admin"
          className="flex items-center gap-4 p-4 border rounded-lg
                     hover:bg-gray-50 hover:shadow transition"
        >
          <div className="p-3 rounded-full bg-red-100">
            <ShieldCheckIcon className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-sm text-gray-600">Admin</p>
        </Link>

        {/* Manager */}
        <Link
          to="manager"
          className="flex items-center gap-4 p-4 border rounded-lg
                     hover:bg-gray-50 hover:shadow transition"
        >
          <div className="p-3 rounded-full bg-blue-100">
            <BriefcaseIcon className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600">Manager</p>
        </Link>

        {/* Borrower */}
        <Link
          to="borrower"
          className="flex items-center gap-4 p-4 border rounded-lg
                     hover:bg-gray-50 hover:shadow transition"
        >
          <div className="p-3 rounded-full bg-green-100">
            <UserIcon className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Borrower</p>
        </Link>

      </div>
    </div>
  );
};

export default UserRoleSummary;

import {
    BanknotesIcon,
    UserGroupIcon,
    ClockIcon,
    CheckCircleIcon,
  } from "@heroicons/react/24/outline";
  
  const DashboardOverview = () => {
    const data = [
      {
        title: "Total Loan Amount",
        value: "$ 12,50,000",
        icon: BanknotesIcon,
        color: "text-green-600",
        bg: "bg-green-100",
      },
      {
        title: "Active Loans",
        value: "85",
        icon: UserGroupIcon,
        color: "text-blue-600",
        bg: "bg-blue-100",
      },
      {
        title: "Pending Loans",
        value: "12",
        icon: ClockIcon,
        color: "text-yellow-600",
        bg: "bg-yellow-100",
      },
      {
        title: "Completed Loans",
        value: "210",
        icon: CheckCircleIcon,
        color: "text-purple-600",
        bg: "bg-purple-100",
      },
    ];
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-5 flex items-center gap-4"
          >
            <div
              className={`p-3 rounded-full ${item.bg}`}
            >
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
  
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h3 className="text-xl font-bold text-gray-900">
                {item.value}
              </h3>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default DashboardOverview;
  
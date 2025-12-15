import React, { useEffect, useState } from "react";

const LoanApplications = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [filterStatus, setFilterStatus] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch applications
    const fetchApplications = async () => {
        setLoading(true);
        let url = "https://loan-link-server-ruby.vercel.app/applications";
        if (filterStatus) url += `?status=${filterStatus}`;

        const res = await fetch(url);
        const data = await res.json();
        setApplications(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchApplications();
    }, [filterStatus]);

    if (loading) return <p className="text-center mt-12">Loading applications...</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Loan Applications</h2>

            {/* Filter */}
            <div className="mb-4 flex gap-4">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border px-4 py-2 rounded"
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <button
                    onClick={fetchApplications}
                    className="bg-cyan-500 text-white px-4 py-2 rounded"
                >
                    Filter
                </button>
            </div>

            {/* Applications Table */}
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Loan ID</th>
                        <th className="px-4 py-2">User (Email, Name)</th>
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app._id} className="border-b">
                            <td className="px-4 py-2">{app.loanId}</td>
                            <td className="px-4 py-2">{app.userEmail} / {app.userName}</td>
                            <td className="px-4 py-2">{app.category}</td>
                            <td className="px-4 py-2">{app.amount}</td>
                            <td className="px-4 py-2">{app.status}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => setSelectedApp(app)}
                                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                        <h3 className="text-2xl font-bold mb-4">Application Details</h3>
                        <p><strong>Loan ID:</strong> {selectedApp.loanId}</p>
                        <p><strong>User:</strong> {selectedApp.userName} ({selectedApp.userEmail})</p>
                        <p><strong>Category:</strong> {selectedApp.category}</p>
                        <p><strong>Amount:</strong> {selectedApp.amount}</p>
                        <p><strong>Status:</strong> {selectedApp.status}</p>
                        <p><strong>Application Fee:</strong> {selectedApp.applicationFeeStatus}</p>
                        <p><strong>Submitted On:</strong> {new Date(selectedApp.createdAt).toLocaleString()}</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setSelectedApp(null)}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoanApplications;

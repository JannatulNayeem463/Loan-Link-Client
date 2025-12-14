import { useEffect, useState } from "react";
import axios from "axios";

const PaymentModal = ({ application, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!application || !application._id) return;

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5000/applications/${application._id}/payment-details`)
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch payment details");
        setLoading(false);
      });
  }, [application]);

  if (!application) return null; // modal won't render if no application

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Payment Details</h3>

        {loading && <p>Loading payment details...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && details && (
          <>
            <p><b>Email:</b> {details.email}</p>
            <p><b>Transaction ID:</b> {details.transactionId}</p>
            <p><b>Loan ID:</b> {details.loanId}</p>
            <p><b>Amount:</b> ${details.amount}</p>
            <p><b>Paid At:</b> {new Date(details.paidAt).toLocaleString()}</p>
          </>
        )}

        <div className="modal-action">
          <button onClick={onClose} className="btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

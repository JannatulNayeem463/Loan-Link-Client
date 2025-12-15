import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = params.get("session_id");

    if (sessionId) {
      axios.get(
        `https://loan-link-server-ruby.vercel.app/payment-success?session_id=${sessionId}`
      );
    }

    setTimeout(() => {
      navigate("/dashboard/my-loans");
    }, 2000);
  }, []);

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h2>
      <p>Redirecting to My Loans...</p>
    </div>
  );
};

export default PaymentSuccess;

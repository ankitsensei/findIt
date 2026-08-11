import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userId = searchParams.get("userId");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/verify-email", {
        userId,
        otp,
      });

      toast.success(response.data.message);

      navigate("/signin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid verification code");
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post("http://localhost:3000/resend-otp", {
        userId,
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend code");
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter 6-digit OTP"
      />

      <button type="submit">Verify Email</button>

      <button type="button" onClick={handleResend}>
        Resend Code
      </button>
    </form>
  );
};

export default VerifyEmail;

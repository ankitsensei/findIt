import { useState } from "react";
import { useNavigate, useSearchParams, NavLink } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import Logo from "../assets/logo.jpeg";
import { ShieldCheck } from "lucide-react";
import { API_BASE_URL } from "../config";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userId = searchParams.get("userId");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-email`, {
        userId,
        otp,
      });

      toast.success(response.data.message);

      navigate("/signin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid verification code");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/resend-otp`, {
        userId,
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-52px)] flex items-center justify-center bg-canvas px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <NavLink to="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl">
              <img src={Logo} alt="logo" className="rounded-md" />
            </span>
            <span className="font-display text-lg font-medium text-ink">
              findIt
            </span>
          </NavLink>
          <h2 className="mt-6 font-display text-[28px] font-normal tracking-[-0.02em] text-ink">
            Verify your email
          </h2>
          <p className="mt-1.5 text-sm text-secondary">
            We sent a 6-digit code to your email. It expires in 10 minutes.
          </p>
        </div>

        <div className="card p-6 md:p-8">
          <form onSubmit={handleVerify} noValidate>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="otp"
                  className="label"
                >
                  Verification code
                </label>
                <div className="relative">
                  <ShieldCheck
                    size={16}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="000000"
                    className="field py-2.5 pl-11 pr-4 text-center text-2xl font-semibold tracking-[0.5em] placeholder:tracking-[0.5em]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary mt-2 w-full"
              >
                {isSubmitting ? "Verifying..." : "Verify Email"}
              </button>
            </div>
          </form>

          <div className="mt-4 flex items-center justify-center gap-1 text-sm text-body">
            <span>Didn't receive a code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="link-blue font-medium disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isResending ? "Sending..." : "Resend code"}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-body">
          Wrong email?{" "}
          <NavLink
            to="/signup"
            className="link-blue font-medium"
          >
            Sign up again
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;

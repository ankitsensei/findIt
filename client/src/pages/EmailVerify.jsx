import { useState } from "react";
import { useNavigate, useSearchParams, NavLink } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import Logo from "../assets/logo.jpeg";
import { ShieldCheck } from "lucide-react";

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
      const response = await axios.post("http://localhost:3000/verify-email", {
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
      const response = await axios.post("http://localhost:3000/resend-otp", {
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
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <NavLink to="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl">
              <img src={Logo} alt="logo" className="rounded-md" />
            </span>
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              findIt
            </span>
          </NavLink>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-950">
            Verify your email
          </h2>
          <p className="mt-1.5 text-sm text-zinc-500">
            We sent a 6-digit code to your email. It expires in 10 minutes.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={handleVerify} noValidate>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="otp"
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  Verification code
                </label>
                <div className="relative">
                  <ShieldCheck
                    size={16}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
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
                    className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-11 pr-4 text-center text-2xl font-semibold tracking-[0.5em] text-zinc-900 placeholder:text-zinc-300 placeholder:tracking-[0.5em] outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-xl bg-zinc-950 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? "Verifying..." : "Verify Email"}
              </button>
            </div>
          </form>

          <div className="mt-4 flex items-center justify-center gap-1 text-sm text-zinc-500">
            <span>Didn't receive a code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-zinc-950 underline underline-offset-4 transition hover:text-zinc-600 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isResending ? "Sending..." : "Resend code"}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Wrong email?{" "}
          <NavLink
            to="/signup"
            className="font-semibold text-zinc-950 underline underline-offset-4 transition hover:text-zinc-600"
          >
            Sign up again
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;

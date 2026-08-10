import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import Logo from "../assets/logo.jpeg";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error")) {
      toast.error("Google sign in failed. Please try again.");
      navigate("/signin", { replace: true });
    }
  }, [navigate, searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: data.email,
        password: data.password,
      });
      console.log(response.data);
      // Save JWT
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
      toast.success("Login Successful!");
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded-xl border py-2.5 pl-11 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:ring-2 ${
      hasError
        ? "border-red-400 bg-red-50/30 focus:border-red-400 focus:ring-red-100"
        : "border-zinc-300 bg-white focus:border-zinc-900 focus:ring-zinc-200"
    }`;

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
            Welcome back
          </h2>
          <p className="mt-1.5 text-sm text-zinc-500">
            Sign in to your account to continue.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-zinc-700"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass(errors.email)}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium text-zinc-500 transition hover:text-zinc-800 cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock
                    size={16}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={inputClass(errors.password)}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-600 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff size={16} strokeWidth={2} />
                    ) : (
                      <Eye size={16} strokeWidth={2} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-zinc-950 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.99] cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs text-zinc-400">or</span>
            <span className="h-px flex-1 bg-zinc-200" />
          </div>
          <button
            type="button"
            onClick={() => {
              window.location.href = "http://localhost:3000/auth/google";
            }}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-zinc-300 bg-white py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 active:scale-[0.99] cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="font-semibold text-zinc-950 underline underline-offset-4 transition hover:text-zinc-600"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signin;

import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Logo from "../assets/logo.jpeg";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/createuser`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      toast.success("Account created! Please verify your email.");

      setTimeout(() => {
        navigate(`/verify-email?userId=${response.data.userId}`);
      }, 1000);
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(typeof message === "string" ? message : "Signup failed");
    }
  };

  const inputClass = (hasError) =>
    `field pl-11 pr-10 ${hasError ? "field-error" : ""}`;

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
            Create your account
          </h2>
          <p className="mt-1.5 text-sm text-secondary">
            Start your journey with findIt in under a minute.
          </p>
        </div>

        <div className="card p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="label"
                >
                  Username
                </label>
                <div className="relative">
                  <User
                    size={16}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    className={inputClass(errors.username)}
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 5,
                        message: "Username must be at least 5 characters",
                      },
                      maxLength: {
                        value: 30,
                        message: "Username cannot exceed 30 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9._]+$/,
                        message:
                          "Only letters, numbers, periods (.) and underscores (_) are allowed",
                      },
                    })}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="label"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
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
                <label
                  htmlFor="password"
                  className="label"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={inputClass(errors.password)}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted transition hover:text-body cursor-pointer"
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="label"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    strokeWidth={2}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={inputClass(errors.confirmPassword)}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted transition hover:text-body cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} strokeWidth={2} />
                    ) : (
                      <Eye size={16} strokeWidth={2} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary mt-2 w-full"
              >
                Create account
              </button>
            </div>
          </form>
          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-edge" />
            <span className="text-xs text-muted">or</span>
            <span className="h-px flex-1 bg-edge" />
          </div>
          <button
            type="button"
            onClick={() => {
              window.location.href = `${API_BASE_URL}/auth/google`;
            }}
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-edge bg-card py-3 text-sm font-medium text-ink transition hover:bg-soft-surface cursor-pointer"
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

        <p className="mt-6 text-center text-sm text-body">
          Already have an account?{" "}
          <NavLink
            to="/signin"
            className="link-blue font-medium"
          >
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;

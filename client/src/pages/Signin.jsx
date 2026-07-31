import { useState } from "react";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import Logo from "../assets/logo.jpeg";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = () => {
    setSubmitted(true);
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

        {submitted && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            Signed in successfully!
          </div>
        )}

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

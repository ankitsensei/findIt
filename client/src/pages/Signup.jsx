import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="mt-20 w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-90 flex flex-col gap-4"
      >
        {/* Username */}
        <div className="flex flex-col">
          <label>Username</label>
          <input
            type="text"
            placeholder="ankitsensei"
            className="border px-4 py-2 rounded-md"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Minimum 5 characters",
              },
              maxLength: {
                value: 20,
                message: "Maximum 20 characters",
              },
            })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            placeholder="ankit@gmail.com"
            className="border px-4 py-2 rounded-md"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            className="border px-4 py-2 rounded-md"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="********"
            className="border px-4 py-2 rounded-md"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;

import { useState } from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="mt-20 w-full h-screen flex flex-col items-center justify-center">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="w-90 flex flex-col gap-3"
      >
        <div className="flex flex-col">
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => e.target.value}
            placeholder="ankitsensei"
            {...register("username")}
            className="border px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => e.target.email}
            placeholder="ankit@gmail.com"
            {...register("email")}
            className="border px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="text"
            onChange={(e) => e.target.value}
            placeholder="********"
            {...register("password")}
            className="border px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>Confirm Password</label>
          <input
            type="text"
            onChange={(e) => e.target.confirmPassword}
            placeholder="********"
            {...register("confirmPassword")}
            className="border px-4 py-2 rounded-md"
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Signup;

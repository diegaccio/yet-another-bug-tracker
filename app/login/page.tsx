import { Box, Button, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log("Login");
  };

  return (
    <Box className="p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <TextField.Root
            {...register("username", { required: "Username is required" })}
            className="mt-1"
          />
          {/*errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )*/}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <TextField.Root
            type="password"
            {...register("password", { required: "Password is required" })}
            className="mt-1"
          />
          {/* errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p> */}
        </div>
        <Button type="submit" className="mt-2">
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;

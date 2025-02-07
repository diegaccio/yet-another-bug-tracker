"use client";
import { login } from "@/app/actions/action";
import { ErrorMessage } from "@/app/components";
import { loginSchema, LoginSchemaType } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Box, Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const [error, setError] = useState("");

  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();

    setSubmitting(true);

    const result = await login(data);

    if (!result || !result.success) {
      setError("Login Failed");
      setSubmitting(false);
      return;
    }

    if (result.error) {
      setError("Login Failed");
      setSubmitting(false);
      return;
    }
  });
  return (
    <Box className="p-6 rounded-lg shadow-lg bg-white max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <TextField.Root {...register("username")} className="mt-1" />
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <TextField.Root
            type="password"
            {...register("password")}
            className="mt-1"
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </div>
        {error && (
          <Callout.Root color="red">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Button type="submit" className="mt-2">
          Login
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;

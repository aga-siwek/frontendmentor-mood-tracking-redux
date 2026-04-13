"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Logo from "@/components/common/logo/Logo.tsx";
import { fetchLogin, goToRegister } from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store/store.ts";

const formSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Invalid email format."),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters.")
    .max(100, "Password is too long."),
});

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    const { email, password } = data;
    dispatch(
      fetchLogin({
        user_email: email,
        user_password: password,
      }),
    );
  };

  const onSignUpClick = () => {
    dispatch(goToRegister());
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <Logo />
      <Card className="flex flex-col items-start w-full max-w-xl lg:max-w-[530px] px-4 py-10 ">
        <CardHeader className="flex flex-col text-start w-full text-neutral-1">
          <CardTitle className="font-bold text-[32px] leading-[1.4] tracking-[-0.3px]">
            Welcome back!
          </CardTitle>
          <CardDescription className="text-start text-neutral-2 font-light text-[18px] leading-[1.4] tracking-[-0.3px]">
            {" "}
            Log in to continue tracking your mood and sleep.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 w-full justify-start">
          <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-input-email"
                      className="text-start font-light text-[18px] leading-[1.4] tracking-[-0.3px]"
                    >
                      Email address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="name@mail.com"
                      autoComplete="email"
                      className="font-light ext-[18px] leading-[1.4] tracking-[-0.3px]"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-input-password"
                      className="text-start font-light text-[18px] leading-[1.4] tracking-[-0.3px]"
                    >
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="password"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="w-full">
          <Field
            orientation="horizontal"
            className="flex flex-col w-full gap-5"
          >
            <Button
              type="submit"
              form="form-rhf-input"
              className="w-full bg-accent-2 font-medium text-[20px] leading-[1.4] p-6 rounded-md"
            >
              Log In
            </Button>
            <p className="text-[18px] leading-[1.4] tracking-[-0.3px] text-neutral-2 font-light">
              Haven't got an account?{" "}
              <a
                className="text-accent-2 cursor-pointer"
                onClick={onSignUpClick}
              >
                Sign up
              </a>
              .
            </p>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
export default Login;

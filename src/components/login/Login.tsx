"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/store/store";

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
import { Spinner } from "@/components/ui/spinner";
import { fetchLogin, fetchDemoLogin, goToRegister } from "@/store/slices/authSlice";

const formSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Invalid email format."),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters.")
    .max(100, "Password is too long."),
});

function Login() {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector((state) => state.auth.loginError);
  const demoLoginLoading = useAppSelector((state) => state.auth.demoLoginLoading);
  const demoLoginError = useAppSelector((state) => state.auth.demoLoginError);
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

  const onDemoClick = () => {
    dispatch(fetchDemoLogin());
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
                      className="font-light text-[18px] leading-[1.4] tracking-[-0.3px]"
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
            {loginError && (
              <p className="text-destructive text-sm">Invalid email or password.</p>
            )}
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-neutral-3" />
              <span className="text-neutral-2 text-[14px] font-light">or</span>
              <div className="flex-1 h-px bg-neutral-3" />
            </div>
            <Button
              type="button"
              className="w-full font-light text-[16px] leading-[1.4] py-3 px-6 rounded-md border border-neutral-3 bg-transparent text-neutral-2 hover:border-accent-2 hover:bg-accent-2/10 hover:text-accent-2 transition-colors"
              onClick={onDemoClick}
              disabled={demoLoginLoading}
            >
              {demoLoginLoading ? (
                <>
                  <Spinner className="size-4" />
                  Generating demo data...
                </>
              ) : (
                "Try Demo"
              )}
            </Button>
            {demoLoginError && (
              <p className="text-destructive text-sm">
                {demoLoginError === "rate_limited"
                  ? "Too many attempts, please try again later."
                  : "Demo login failed. Please try again."}
              </p>
            )}
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
            <p className="text-[12px] leading-[1.4] tracking-[-0.3px] text-neutral-2 font-light">As this is a portfolio project hosted on Render's free tier, the first launch may take up to 30 seconds due to the server waking up. Thank you for your patience!</p>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
export default Login;

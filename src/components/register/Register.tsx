"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
import { useDispatch } from "react-redux";
import {goToLogin} from "@/store/appSlice.ts";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(10, "Username must be at most 10 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ),
  email: z.string().min(1, "Email is required.").email("Invalid email format."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password is too long.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character.",
    ),
});

function Register() {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      icon: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
    console.log("username", data.username);
  }

  const onLogInClick = () => {
    dispatch(goToLogin())
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <Logo />
      <Card className="flex flex-col items-start w-full max-w-xl lg:max-w-[530px] px-4 py-10 ">
        <CardHeader className="flex flex-col text-start w-full text-neutral-1">
          <CardTitle className="font-bold text-[32px] leading-[1.4] tracking-[-0.3px]">
            Create an account
          </CardTitle>
          <CardDescription className="text-start text-neutral-2 font-light text-[18px] leading-[1.4] tracking-[-0.3px]">
            Join to track your daily mood and sleep with ease.
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
              Sign up
            </Button>
            <p className="text-[18px] leading-[1.4] tracking-[-0.3px] text-neutral-2 font-light">
              Already got an account? <a className="text-accent-2 cursor-pointer" onClick={onLogInClick}>Log in</a>.
            </p>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
export default Register;

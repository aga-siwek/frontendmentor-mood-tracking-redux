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
import {closeSetting} from "@/store/appSlice.ts";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(10, "Username must be at most 10 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ),
});

function Setting() {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit= () => {
    console.log("personalize form submitted")
  }

  const onClose = () => {
    dispatch(closeSetting())
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center bg-neutral-1-transparent p-2 fixed top-0 left-0 w-full h-full">
      <Card className="flex flex-col items-start w-full max-w-150 px-4 py-10 ">
        <div className="flex justify-end w-full cursor-pointer" onClick={onClose}>
          <p className="text-base text-neutral-3">&#10005;</p>
        </div>
        <CardHeader className="flex flex-col text-start w-full text-neutral-1">
          <CardTitle className="font-bold text-[32px] leading-[1.4] tracking-[-0.3px]">
            Update your profile
          </CardTitle>
          <CardDescription className="text-start text-neutral-2 font-normal text-[18px] leading-[1.4] tracking-[-0.3px]">
            Personalize your account with your name and photo.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 w-full justify-start">
          <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-rhf-input-username"
                      className="text-start font-light text-[18px] leading-[1.4] tracking-[-0.3px]"
                    >
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      autoComplete="username"
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
              Save changes
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
export default Setting;

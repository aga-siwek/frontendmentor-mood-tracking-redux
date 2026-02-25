"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"

const timesList = [
    {
        id: "02hours",
        title: "0-2 hours",
        value: "0",
    },
    {
        id: "34hours",
        title: "3-4 hours",
        value: "1",
    },
    {
        id: "56hours",
        title: "5-6 hours",
        value: "2",
    },
    {
        id: "78hours",
        title: "7-8 hours",
        value: "3",
    },
    {
        id: "9hours",
        title: "9+ hours",
        value: "4",
    },
] as const

const formSchema = z.object({
    time: z.string().min(1, "You must select today sleep time."),
})

export function NewSleepTime() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            time: "0",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data.time)
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <CardContent
                className = "flex flex-col gap-5 w-full justify-start px-0 ">
                <form id="form-rhf-radiogroup" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="time"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <FieldSet data-invalid={fieldState.invalid}>
                                    <FieldDescription className="font-bold text-[28px] md:text-[32px] leading-[1.4] tracking-[-0.3px] text-neutral-1">
                                        How many hours did you sleep last night?
                                    </FieldDescription>
                                    <RadioGroup
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        aria-invalid={fieldState.invalid}
                                    >
                                        {timesList.map((time) => (
                                            <FieldLabel
                                                key={time.id}
                                                htmlFor={`form-rhf-radiogroup-${time.id}`}
                                                className=""
                                            >
                                                <Field
                                                    orientation="horizontal"
                                                    data-invalid={fieldState.invalid}
                                                    className="bg-neutral-5 rounded-[10px] ">
                                                    <RadioGroupItem
                                                        value={time.value}
                                                        id={`form-rhf-radiogroup-${time.id}`}
                                                        aria-invalid={fieldState.invalid}
                                                        className="data-[state=checked]:border-accent-2 data-[state=checked]:border-4"
                                                    />
                                                    <FieldContent className="">
                                                        <FieldTitle className="text-[24px] leading-[1.4]">{time.title}</FieldTitle>
                                                    </FieldContent>
                                                </Field>
                                            </FieldLabel>
                                        ))}
                                    </RadioGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </FieldSet>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="p-0">
                <Field
                    orientation="horizontal"
                    className="flex flex-col w-full gap-5 p-0"
                >
                    <Button
                        type="submit"
                        form="form-rhf-radiogroup"
                        className="w-full bg-accent-2 font-medium text-[20px] leading-[1.4] py-6 rounded-md cursor-pointer"
                    >
                        Submit
                    </Button>
                </Field>

            </CardFooter>
        </div>
    )
}

export default NewSleepTime;
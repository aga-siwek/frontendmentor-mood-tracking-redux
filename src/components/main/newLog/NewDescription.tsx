"use client"
import { useDispatch } from "react-redux";
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
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

import {
    InputGroup,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import {addTodayLog} from "@/store/appSlice.ts";

const formSchema = z.object({
    description: z
        .string()
        .min(10, "Description must be at least 10 characters.")
        .max(150, "Description must be at most 150 characters."),
})

export function NewDescription() {
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data.description)
        dispatch(addTodayLog(data.description))
    }

    return (
   <div className="flex flex-col gap-8 w-full p-0">
            <CardContent className="p-0">
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>

                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-description" className="font-bold text-[28px] md:text-[32px] leading-[1.3] md:leading-[1.4] tracking-[-0.3px] text-neutral-1">
                                        Write about your day...
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="form-rhf-demo-description"
                                            placeholder="Today, I felt…"
                                            rows={6}
                                            className="min-h-24 resize-none placeholder:text-[18px] placeholder:italic placeholder:text-neutral-2"
                                            aria-invalid={fieldState.invalid}
                                        />
                                    </InputGroup>
                                    <InputGroupText className="tabular-nums">
                                        {field.value.length}/150
                                    </InputGroupText>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="p-0">
                <Field orientation="horizontal">
                    <Button type="submit" form="form-rhf-demo" className="w-full bg-accent-2 font-medium text-[20px] leading-[1.4] py-6 rounded-md cursor-pointer">
                        Continue
                    </Button>
                </Field>
            </CardFooter>
   </div>

    )
}

export default NewDescription;
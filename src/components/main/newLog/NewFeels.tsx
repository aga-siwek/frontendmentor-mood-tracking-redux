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
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import {addTodayLog} from "@/store/appSlice.ts";

const feelsList = [
    {
        id: "joyful",
        label: "Joyful",
    },
    {
        id: "down",
        label: "Down",
    },
    {
        id: "anxious",
        label: "Anxious",
    },
    {
        id: "calm",
        label: "Calm",
    },
    {
        id: "excited",
        label: "Excited",
    },
    {
        id: "lonely",
        label: "Lonely",
    },
    {
        id: "grateful",
        label: "Grateful",
    },
    {
        id: "overwhelmed",
        label: "Overwhelmed",
    },
    {
        id: "motivated",
        label: "Motivated",
    },
    {
        id: "irritable",
        label: "Irritable",
    },
    {
        id: "peaceful",
        label: "Peaceful",
    },
    {
        id: "tired",
        label: "Tired",
    },
    {
        id: "hopeful",
        label: "Hopeful",
    },
    {
        id: "confident",
        label: "Confident",
    },
    {
        id: "stressed",
        label: "Stressed",
    },
    {
        id: "content",
        label: "Content",
    },
    {
        id: "disappointed",
        label: "Disappointed",
    },
    {
        id: "optimistic",
        label: "Optimistic",
    },
    {
        id: "restless",
        label: "Restless",
    },
] as const

const formSchema = z.object({
    responses: z.boolean(),
    feels: z
        .array(z.string())
        .min(1, "Please select at least one notification type.")
        .refine(
            (value) => value.every((feel) => feelsList.some((f) => f.id === feel)),
            {
                message: "Invalid notification type selected.",
            }
        ),
})

export function NewFeels() {
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            responses: true,
            feels: [],
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data.feels)
        dispatch(addTodayLog(data.feels))
    }

    return (
        <div className="flex flex-col gap-8 w-full">
            <CardContent className="">
                <form id="form-rhf-checkbox" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="feels"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <FieldGroup>
                                    <FieldSet data-invalid={fieldState.invalid}>
                                        <FieldGroup data-slot="checkbox-group">
                                            {feelsList.map((feel) => (
                                                <Field
                                                    key={feel.id}
                                                    orientation="horizontal"
                                                    data-invalid={fieldState.invalid}
                                                    className="w-fit bg-neutral-5 px-4 py-3 rounded-[10px] has-[[data-state=checked]]:outline-2 has-[[data-state=checked]]:outline-accent-2"
                                                >
                                                    <Checkbox
                                                        id={`form-rhf-checkbox-${feel.id}`}
                                                        name={field.name}
                                                        aria-invalid={fieldState.invalid}
                                                        checked={field.value.includes(feel.id)}
                                                        onCheckedChange={(checked) => {
                                                            const newValue = checked
                                                                ? [...field.value, feel.id]
                                                                : field.value.filter(
                                                                    (value) => value !== feel.id
                                                                )
                                                            field.onChange(newValue)
                                                        }}
                                                        className=""
                                                    />
                                                    <FieldLabel
                                                        htmlFor={`form-rhf-checkbox-${feel.id}`}
                                                        className="font-normal w-fit text-[18px] leading-[1.4] tracking-[-0.3px]"
                                                    >
                                                        {feel.label}
                                                    </FieldLabel>
                                                </Field>
                                            ))}
                                        </FieldGroup>
                                    </FieldSet>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </FieldGroup>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="submit"
                        form="form-rhf-checkbox"
                        className="w-full bg-accent-2 font-medium text-[20px] leading-[1.4] py-6 rounded-md cursor-pointer"
                    >
                        Continue
                    </Button>
                </Field>
            </CardFooter>
        </div>
    )
}


export default NewFeels;
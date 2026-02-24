"use client"
import veryHappyIcon from "@/assets/icon-very-happy-color.svg"
import happyIcon from "@/assets/icon-happy-color.svg"
import neutralIcon from "@/assets/icon-neutral-color.svg"
import sadIcon from "@/assets/icon-sad-color.svg"
import verySadIcon from "@/assets/icon-very-sad-color.svg"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import {ReactSVG} from "react-svg";

const moods = [
    {
        id: "veryHappy",
        title: "Very Happy",
        icon: <ReactSVG src={veryHappyIcon} className="h-6 w-6"/>,
        value: 2,
    },
    {
        id: "happy",
        title: "Happy",
        icon: <ReactSVG src={happyIcon} className="h-6 w-6"/>,
        value: 1,
    },
    {
        id: "neutral",
        title: "Neutral",
        icon: <ReactSVG src={neutralIcon} className="h-6 w-6"/>,
        value: 0,
    },
    {
        id: "sad",
        title: "Sad",
        icon: <ReactSVG src={sadIcon} className="h-6 w-6"/>,
        value: -1,
    },
    {
        id: "verySad",
        title: "Very Sad",
        icon: <ReactSVG src={verySadIcon} className="h-6 w-6"/>,
        value: -2,
    },
] as const

const formSchema = z.object({
    mood: z.number().min(1, "You must select one today mood."),
})

export function NewMood() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mood: 0,
        },
    })

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
        })
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <CardContent
                className = "flex flex-col gap-5 w-full justify-start px-0 ">
                <form id="form-rhf-radiogroup" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="mood"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <FieldSet data-invalid={fieldState.invalid}>
                                    <FieldDescription className="font-bold text-[28px] md:text-[32px] leading-[1.4] tracking-[-0.3px] text-neutral-1">
                                        How was your mood today?
                                    </FieldDescription>
                                    <RadioGroup
                                        name={field.name}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        aria-invalid={fieldState.invalid}
                                    >
                                        {moods.map((mood) => (
                                            <FieldLabel
                                                key={mood.id}
                                                htmlFor={`form-rhf-radiogroup-${mood.id}`}
                                                className="flex flex-row justify-center items-center"
                                            >
                                                <Field
                                                    orientation="horizontal"
                                                    data-invalid={fieldState.invalid}
                                                    className="bg-neutral-5 rounded-[10px]">
                                                    <RadioGroupItem
                                                        value={mood.value}
                                                        id={`form-rhf-radiogroup-${mood.id}`}
                                                        aria-invalid={fieldState.invalid}

                                                    />
                                                    <FieldContent className="flex flex-row justify-between items-center">
                                                        <FieldTitle className="text-[24px] leading-[1.4]">{mood.title}</FieldTitle>
                                                        <FieldDescription>
                                                            {mood.icon}
                                                        </FieldDescription>
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
                        form="form-rhf-input"
                        className="w-full bg-accent-2 font-medium text-[20px] leading-[1.4] py-6 rounded-md"
                        onClick={onSubmit}
                    >
                        Continue
                    </Button>
                </Field>

            </CardFooter>
        </div>
    )
}
export default NewMood

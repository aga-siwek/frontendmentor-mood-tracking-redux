"use client"
import { useDispatch } from "react-redux";
import veryHappyIcon from "@/assets/icon-very-happy-color.svg"
import happyIcon from "@/assets/icon-happy-color.svg"
import neutralIcon from "@/assets/icon-neutral-color.svg"
import sadIcon from "@/assets/icon-sad-color.svg"
import verySadIcon from "@/assets/icon-very-sad-color.svg"
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
import {ReactSVG} from "react-svg";
import {addTodayLog} from "@/store/appSlice.ts";

const moodsList = [
    {
        id: "veryHappy",
        title: "Very Happy",
        icon: <ReactSVG src={veryHappyIcon} className="h-6 w-6"/>,
        value: "2",
    },
    {
        id: "happy",
        title: "Happy",
        icon: <ReactSVG src={happyIcon} className="h-6 w-6"/>,
        value: "1",
    },
    {
        id: "neutral",
        title: "Neutral",
        icon: <ReactSVG src={neutralIcon} className="h-6 w-6"/>,
        value: "0",
    },
    {
        id: "sad",
        title: "Sad",
        icon: <ReactSVG src={sadIcon} className="h-6 w-6"/>,
        value: "-1",
    },
    {
        id: "verySad",
        title: "Very Sad",
        icon: <ReactSVG src={verySadIcon} className="h-6 w-6"/>,
        value: "-2",
    },
] as const

const formSchema = z.object({
    mood: z.string().min(1, "You must select one today mood."),
})

export function NewMood() {
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mood: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
      console.log(data.mood)
        dispatch(addTodayLog(data.mood))
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
                                        {moodsList.map((mood) => (
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
                                                        className="data-[state=checked]:border-accent-2 data-[state=checked]:border-4"

                                                    />
                                                    <FieldContent className="flex flex-row justify-between items-center">
                                                        <FieldTitle className="text-[24px] leading-[1.4]">{mood.title}</FieldTitle>
                                                        <FieldDescription>
                                                            <div>
                                                            {mood.icon}
                                                            </div>
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
                        form="form-rhf-radiogroup"
                        className="w-full bg-accent-2 font-medium text-[20px] leading-[1.4] py-6 rounded-md cursor-pointer"
                    >
                        Continue
                    </Button>
                </Field>
            </CardFooter>
        </div>
    )
}
export default NewMood

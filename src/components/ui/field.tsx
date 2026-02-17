"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const FieldGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("grid gap-6", className)} {...props} />
))
FieldGroup.displayName = "FieldGroup"

const Field = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" }
>(({ className, orientation = "vertical", ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "group flex gap-2",
            orientation === "vertical" ? "flex-col" : "flex-row items-center justify-between",
            className
        )}
        {...props}
    />
))
Field.displayName = "Field"

const FieldLabel = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-data-[invalid=true]:text-destructive",
            className
        )}
        {...props}
    />
))
FieldLabel.displayName = "FieldLabel"

const FieldDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-[0.8rem] text-muted-foreground", className)}
        {...props}
    />
))
FieldDescription.displayName = "FieldDescription"

const FieldError = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement> & { errors?: (any | undefined)[] }
>(({ className, errors, children, ...props }, ref) => {
    const errorMessage = errors?.find((e) => !!e)?.message || children

    if (!errorMessage) return null

    return (
        <p
            ref={ref}
            className={cn("text-[0.8rem] font-medium text-destructive", className)}
            {...props}
        >
            {errorMessage}
        </p>
    )
})
FieldError.displayName = "FieldError"

export { Field, FieldGroup, FieldLabel, FieldDescription, FieldError }
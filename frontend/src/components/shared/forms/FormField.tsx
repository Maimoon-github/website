import * as React from "react"
import { cn } from "@/lib/utils"

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  error?: string
  id?: string
}

export default function FormField({
  label,
  error,
  id,
  children,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm font-medium text-red-500 animate-in fade-in-0 slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  )
}

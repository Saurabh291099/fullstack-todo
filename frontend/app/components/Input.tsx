import React, { ChangeEvent, forwardRef } from "react";
import Label from "./Label";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps {
  label?: string;
  id: string;
  name?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  errorMessage?: string | React.ReactNode;
  disabled?: boolean;
  value?: string;
  classNameForContainer?: string;
  variant?: "large" | "small" | "medium";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  register?: UseFormRegister<FieldValues>;
  autoFocus?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      name,
      type = "text",
      required = false,
      placeholder = "Enter here",
      className = "",
      errorMessage,
      disabled = false,
      value,
      classNameForContainer = "",
      variant = "medium",
      onChange,
      register,
      autoFocus,
      maxLength,
      ...rest
    },
    ref
  ) => {
    const sizeVariant = {
      large: "py-3 px-4",
      medium: "py-2.5 px-4",
      small: "p-2",
    };

    return (
      <div className={`relative inline-flex flex-col ${classNameForContainer}`}>
        {label && (
          <Label id={`${id}-label`} labelFor={id} variant={variant}>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
          maxLength={maxLength}
          autoFocus={autoFocus}
          autoComplete="false"
          {...register}
          {...rest}
          className={`
            border rounded-lg bg-white placeholder:text-neutral-400 mt-2 text-base text-neutral-900
            focus:outline-none
            ${
              errorMessage
                ? "border-red-500"
                : "border-neutral-300 hover:border-neutral-600 focus:border-primary-900"
            }
            ${
              disabled &&
              "disabled:bg-neutral-100 disabled:pointer-events-none disabled:select-none"
            }
            ${sizeVariant[variant]}
            ${className}
          `}
        />
        {errorMessage && (
          <span className="text-red-500 text-sm mt-2 block">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);


Input.displayName = "Input";
export default Input;

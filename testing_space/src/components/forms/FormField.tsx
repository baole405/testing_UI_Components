import React from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  type?: string;
  control?: Control<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
}

const FormField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  type = "text",
  control,
  errors,
}: FormFieldProps<TFieldValues>) => {
  // If no control or errors, render a basic input
  if (!control || !errors) {
    return (
      <div className="flex flex-col w-full mb-4">
        <label htmlFor={name} className="mb-2 text-lg text-gray-700">
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          className="input border-indigo mt-1 rounded-lg border-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={label}
        />
      </div>
    );
  }

  // Render with React Hook Form Controller
  return (
    <div className="flex flex-col w-full mb-4">
      <label htmlFor={name} className="mb-2 text-lg text-gray-700">
        {label} *
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            id={name}
            className="input border-indigo mt-1 rounded-lg border-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={label}
          />
        )}
      />
      {errors[name] && (
        <p className="error text-red-500 mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FormField;
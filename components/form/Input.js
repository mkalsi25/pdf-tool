import React from "react";

export default function Input({
  name,
  type,
  label,
  register,
  errors,
  required,
  placeholder,
}) {
  return (
    <div className="grid gap-2 ">
      <label htmlFor={name} className="text-xs">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, {
          required: required ? true : false,
        })}
        placeholder={placeholder}
        className={`px-4 py-2 outline-none focus:outline-none rounded bg-white w-full filter drop-shadow-md border ${
          errors[name] ? "border-red-500" : "border-gray-100"
        }`}
      />
      {errors[name] && (
        <span className="text-xs text-red-600 font-bold">
          {name} is required!
        </span>
      )}
    </div>
  );
}

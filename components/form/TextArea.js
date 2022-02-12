import React from "react";

export default function TextArea({
  register,
  errors,
  placeholder,
  name,
  required,
  label,
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-xs">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows="15"
        placeholder={placeholder}
        {...register(name, { required: required ? true : false })}
        className={`px-4 py-2 outline-none resize-none focus:outline-none rounded bg-white w-full filter drop-shadow-md border ${
          errors[name] ? "border-red-500" : "border-gray-100"
        }`}
      ></textarea>
    </div>
  );
}

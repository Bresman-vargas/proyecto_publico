import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  className?: string;
  require?: boolean;
}

export default function InputForm({
  label,
  type = "text",
  placeholder,
  name,
  register,
  errors,
  className,
  require = false,
}: InputProps) {
  return (
    <div className={className}>
      <label className="text-txt-sec flex flex-col gap-2">
        <div className="flex gap-2">
          {label} {require && <span className="text-txt-sec">*</span>}
        </div>
        <input
          className="outline-none p-2 border-2 border-bg-ter rounded-md"
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          {...register(name)}
        />
      </label>
      <div className="h-8">
        {errors[name] && (
          <span className="text-err text-sm">
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    </div>
  );
}

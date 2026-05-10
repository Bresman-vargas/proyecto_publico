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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  onChange,
}: InputProps) {
  return (
    <div className={className}>
      <label className="text-txt-sec flex flex-col gap-2">
        <div className="flex gap-1">
          {label}:{require && <span className="text-txt-sec">*</span>}
        </div>
        <input
          className="bg-bg-sec/40 p-2 border border-border rounded-md focus:outline-1 outline-accent/30"
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          {...register(name)}
          onChange={onChange ?? register(name).onChange}
        />
      </label>
      <div className="h-8 flex items-center">
        {errors[name] && (
          <span className="text-err text-sm">
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    </div>
  );
}

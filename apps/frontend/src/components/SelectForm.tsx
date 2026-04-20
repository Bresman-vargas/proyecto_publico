import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: Option[];
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  className?: string;
  require?: boolean;
  placeholder?: string;
}

export default function SelectForm({
  label,
  name,
  options,
  register,
  errors,
  className,
  require = false,
  placeholder = "Seleccione una opción",
}: SelectProps) {
  return (
    <div className={className}>
      <label className="text-txt-sec flex flex-col gap-2">
        <div className="flex gap-1">
          {label}:{require && <span className="text-txt-sec">*</span>}
        </div>
        
        <select
          className={`bg-bg-sec/40 p-2 border border-border rounded-md focus:outline-1 outline-accent/30 cursor-pointer appearance-none`}
          {...register(name)}
          defaultValue=""
        >
          <option value="" disabled className="bg-bg">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-bg-sec text-txt-sec">
              {opt.label}
            </option>
          ))}
        </select>
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
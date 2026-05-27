import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  className?: string;
  require?: boolean;
  rows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextAreaForm({
  label,
  placeholder,
  name,
  register,
  errors,
  className,
  require = false,
  rows = 4,
  onChange,
}: TextAreaProps) {
  return (
    <div className={className}>
      <label className="text-txt-sec flex flex-col gap-2">
        <div className="flex gap-1">
          {label}:{require && <span className="text-txt-sec">*</span>}
        </div>
        <textarea
          className="bg-bg-sec/40 p-2 border border-border rounded-md focus:outline-1 outline-accent/30 resize-none"
          placeholder={placeholder}
          autoComplete="off"
          rows={rows}
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

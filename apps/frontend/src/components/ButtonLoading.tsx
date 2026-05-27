import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  isValid?: boolean;
}

export default function ButtonLoading ({
  children,
  loading = false,
  isValid = true,
  type = "submit",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center gap-2 rounded-md px-4 py-2 w-full transition-all font-medium";

  const stateStyles =
    isValid && !loading
      ? "bg-accent cursor-pointer text-bg hover:opacity-90 shadow-md active:scale-[0.98]"
      : "bg-accent/20 cursor-not-allowed text-txt";

  return (
    <button
      {...props}
      type={type as "submit" | "button" | "reset"} // Aseguramos el tipo literal
      disabled={!isValid || loading}
      className={`${baseStyles} ${stateStyles} ${className}`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Procesando...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};


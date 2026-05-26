interface LoaderProps {
  className?: string;
}

export default function Loader({ className = "" }: LoaderProps) {
  return (
    <div 
      className={`flex justify-center items-center w-full overflow-hidden ${className}`}
    >
      <div className="size-8 border-4 border-accent rounded-md animate-spin" />
    </div>
  );
}
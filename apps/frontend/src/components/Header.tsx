import type { ReactNode } from "react";

interface headerProps {
  children: ReactNode;
  className? : string;
}

export default function Header({ children, className = '' }: headerProps) {
  return (
    <header className={`border-b border-border text-text h-15 ${className}`}>
      {children}
    </header>
  );
}

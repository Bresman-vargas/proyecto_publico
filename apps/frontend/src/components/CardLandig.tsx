import { type ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
}

export default function CardLandig({ title, children }: CardProps) {
  return (
    <div className="bg-bg-sec text-center border border-border rounded-2xl h-fit hover:border-accent">
      <h2 className="center font-semibold my-4">{title}</h2>
      <div className="p-4 m-2 text-txt-sec bg-bg rounded-xl text-pretty border border-border">
        {children}
      </div>
    </div>
  );
}

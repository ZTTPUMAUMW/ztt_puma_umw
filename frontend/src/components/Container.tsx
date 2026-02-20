import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  width?: "default" | "content" | "form";
}

export default function Container({ children, className = "", width = "default" }: ContainerProps) {
  const widthClass =
    width === "content" ? "container-content" : width === "form" ? "container-form" : "container";
  return <div className={`${widthClass} ${className}`}>{children}</div>;
}

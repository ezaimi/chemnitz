import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

export default function Button({
  label,
  bgColor = "#fc037f",
  textColor = "#111111",
  className = "",
  ...rest
}: Props) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`px-4 flex py-2 border-1 items-center rounded-full w-full justify-center ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
}

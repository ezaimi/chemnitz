import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
  startIcon?: React.ReactNode;
  hoverBgColor?: string;   
  hoverTextColor?: string; 
}

export default function Button({
  label,
  bgColor = "#f2f2f2",
  textColor = "#111111",
  hoverBgColor = "#1c191b",       
  hoverTextColor = "white", 
  className = "",
  startIcon,
  ...rest
}: Props) {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverBgColor;
        e.currentTarget.style.color = hoverTextColor;
        e.currentTarget.style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = bgColor;
        e.currentTarget.style.color = textColor;
      }}
      className={`text-white focus:outline-none font-medium rounded-full text-sm w-full py-3.5 text-center transition duration-200 flex justify-center gap-2
 ${className}`}
      {...rest}
    >
      {startIcon && <span className="h-4">{startIcon}</span>}
      <span>{label}</span>
    </button>
  );
}

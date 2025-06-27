import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    bgColor?: string;
    textColor?: string;
    className?: string;
    startIcon?: React.ReactNode;
    hoverBgColor?: string;
    hoverTextColor?: string;
    borderWidth?: string;
    borderColor?: string;

}

export default function HeaderButton({
    label,
    bgColor = "#1c191b",
    textColor = "white",
    hoverBgColor = "white",
    hoverTextColor = "#1c191b",
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
            className={`text-white focus:outline-none font-medium rounded-full border-1 border-[1c191b] w-full h-full text-sm text-center  transition duration-200 flex justify-center gap-2
 ${className}`}
            {...rest}
        >
            {startIcon && <span className="h-4">{startIcon}</span>}
            <span>{label}</span>
        </button>
    );
}

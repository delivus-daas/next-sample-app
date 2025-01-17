import {ButtonHTMLAttributes} from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: "small" | "medium" | "large";
    variant?: "primary" | "secondary" | "outline";
}

export const Button = ({children, className, ...rest}: Props) => {
    return (
        <button className={"btn w-full " + className} {...rest}>{children}</button>
    )
}
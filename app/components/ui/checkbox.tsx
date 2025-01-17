import {InputHTMLAttributes} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    rightLabel?: string;
    message?: string;
    rightMessage?: string;
    checkboxSize?: "large" | "medium" | "small";
}

export const Checkbox = ({label, className, type = "checkbox", checkboxSize, ...rest}: Props) => {
    return (
        <label className={"label cursor-pointer checkbox-cntr " + checkboxSize}>
            <input type={type} defaultChecked className={"checkbox checkbox-md checkbox-primary [--chkfg:white] " + className} {...rest} />
            <span className="label-text">{label}</span>
        </label>
    )
}
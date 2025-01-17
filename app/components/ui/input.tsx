import {InputHTMLAttributes} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    rightLabel?: string;
    errorMessage?: string;
    rightMessage?: string;
    inputSize?: "small" | "medium" | "large";
}

export const Input = ({label, rightLabel, errorMessage, rightMessage, inputSize, className, type = 'text', ...rest}: Props) => {
    return (
        <label className={"w-full input-cntr " + className + inputSize}>
            <div className="label top">
                {label && <span className="label-text ">{label}</span>}
                {rightLabel && <span className="label-text-alt">{rightLabel}</span>}
            </div>
            <input type={type} className={"input w-full input-bordered input-primary input-md p-2 " + className} {...rest}/>
            <div className="label bottom">
                {errorMessage && <span className="label-text-alt text-danger">{errorMessage}</span>}
                {rightMessage && <span className="label-text-alt">{rightMessage}</span>}
            </div>
        </label>
    )
}
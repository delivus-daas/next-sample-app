"use client"
import {authenticate} from "ospring/app/actions/auth";
import {useActionState} from "react";
import {Button, Input} from "ospring/app/components/ui";

export default function SigninForm() {
    console.log("Login page");
    const [errorMessage, action] = useActionState(authenticate, undefined);

    return (
        <form action={action} id={"login"} className={"h-full flex flex-col pt-10 items-center"}>
            <div className={"text-foreground m-10 text-xl"}>Login</div>
            <Input className={"mb-4"} maxLength={8} inputSize={"medium"} name={"phone"} placeholder={"0000 0000"}
                   label={"Phone number"}/>
            <Input maxLength={36} inputSize={"medium"} name={"password"} type="password" placeholder={"******"}
                   label={"Password"}
                   errorMessage={errorMessage?.errors?.password ? errorMessage?.errors?.password[0] : ""}/>
            <Button className={"bg-foreground text-background h-10 w-full mt-auto"} type={"submit"}>Login</Button>
        </form>
    )
}
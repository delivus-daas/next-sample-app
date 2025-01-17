'use server'
import {signIn} from "ospring/auth";
import {AuthError} from "next-auth";

interface SigninFormState {
    success?: string;
    errors?: {
        phone?: string[];
        password?: string[];
        _form?: string[];
    };
}

// Authenticating function for sign-in
export async function authenticate(prevState: SigninFormState | undefined, formData: FormData) {
    console.log("authenticate", formData);
    try {
        await signIn('credentials', formData);
    } catch (error) {
        console.log("authenticate error: ", error);
        // Handling authentication errors
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        errors: {
                            password: ['Invalid credentials.'],
                        }
                    };
                default:
                    return {
                        errors: {
                            password: ['Something went wrong.'],
                        }
                    };
            }
        }
        throw error;
    }
};
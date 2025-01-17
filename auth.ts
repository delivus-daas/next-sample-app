import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import {findUserByPhone} from "ospring/app/db/user";
import {z} from 'zod';

export const {handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            // Parsing and validating incoming credentials using Zod
            const parsedCredentials = signinSchema
                .safeParse(credentials);

            console.log('authorize', parsedCredentials);
            if (parsedCredentials.success) {
                const {phone, password} = parsedCredentials.data;
                const user = await findUserByPhone(phone); //getUser from database

                console.log('authorize user:', user);
                // If user exists, compare hashed passwords
                if (!user) return null;
                console.log('authorize user:', user);
                const passwordsMatch = await bcrypt.compare(password, user.password);
                // If passwords match, return the user
                if (passwordsMatch) return user;
            }
            // If credentials are invalid, log and return null
            console.log('Invalid credentials');
            return null;
        },
    })],
    callbacks: {
        // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
        async session({session, trigger, newSession}) {
            // Note, that `rest.session` can be any arbitrary object, remember to validate it!
            if (trigger === "update" && newSession?.name) {
                // You can update the session in the database if it's not already updated.
                // await adapter.updateUser(session.user.id, { name: newSession.name })

                // Make sure the updated value is reflected on the client
                session.user = newSession.name
            }
            return session
        }
    }
});

export const signinSchema = z.object({
    phone: z.string()
        .min(1, {message: 'Phone required!'})
        .min(8, {message: 'Phone must have at least 8 characters!'})
        .max(8, {message: 'Phone must have 8 characters!'}),
    password: z
        .string()
        .min(3)
        .max(255),
});

import type {NextAuthConfig} from 'next-auth';

export const AUTH_PATH = "/auth";
export const PROTECTED_PATH = "/dashboard";
// Creating the configuration object for NextAuth
export const authConfig = {
    trustHost: true,
    // Defining signup pages to tailor the authentication experience. Here, we redirect the default sign-in page to '/login'.
    pages: {
        signIn: AUTH_PATH + "/signin",
    },
    // Configuring callbacks for handling authorization logic during authentication flow.
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            console.log("isOnDashboard", auth?.user, nextUrl.pathname);
            // Checking if the user is logged in
            const isLoggedIn = !!auth?.user;
            // Determining if the user is currently on the dashboard
            const isOnDashboard = nextUrl.pathname.startsWith(PROTECTED_PATH);
            // Handling authorization logic based on user status and location
            if (isOnDashboard) {
                // Redirecting unauthenticated users to the login page when attempting to access dashboard-related pages
                return isLoggedIn;
            } else if (isLoggedIn) {
                // Redirecting authenticated users to the dashboard if they attempt to access authentication-related pages like login/signup
                return Response.redirect(new URL(PROTECTED_PATH, nextUrl));
            }
            // Allowing access for other scenarios
            return true;
        },
    },

    // Placeholder array for authentication providers. We initialize it as empty for now, adding providers when required.
    providers: [], // We start with an empty array, adding providers as needed

} satisfies NextAuthConfig;
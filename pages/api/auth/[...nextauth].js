import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Configuration options for NextAuth
const authOptions = {
  providers: [
    GoogleProvider({
      // Google OAuth client ID and client secret from environment variables
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // Check if the user is signing in using Google provider
      if (account.provider === "google") {
        // Return true if the user's email is verified
        return profile.email_verified;
      }
      // For other providers, allow sign in
      return true;
    },
    // Secret used for secure cookies and tokens
    secret: process.env.NEXTAUTH_SECRET,
  },
};

// Export NextAuth with configured options
export default NextAuth(authOptions);

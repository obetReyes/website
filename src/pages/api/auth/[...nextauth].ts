
import nextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export default nextAuth({
  secret:process.env.NEXTAUTH_SECRET as string,

    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
      ],
    
      pages: {
        error: '/', // Error code passed in query string as ?error=
        verifyRequest: undefined, // (used for check email message)
        newUser: undefined // New users will be directed here on first sign in (leave the property out if not of interest)
      },
      callbacks:{
        async signIn({ account, profile }:any) {
          if (account.provider === "google") {
            return profile.email_verified && profile.email === "obettinor@gmail.com"
          }
          return true // Do different verification for other providers that don't have `email_verified`
        },
      }
      
})
import NextAuth from "next-auth"
import { session } from "next-auth/client"
import SpotifyProvider from "next-auth/providers/spotify"
export default NextAuth({  
   // Configure one or more authentication providers  
   providers: [    
      SpotifyProvider({   
         scope: 'user-read-private user-read-email user-read-playback-state user-read-recently-played user-top-read user-modify-playback-state',   
         clientId: process.env.SPOTIFY_CLIENT_ID,      
         clientSecret: process.env.SPOTIFY_CLIENT_SECRET,    
      }),    
      // ...add more providers here  
   ],
   callbacks: { 
      async jwt(token, _, account) {
        if (account) {
          token.id = account.id
          token.accessToken = account.accessToken
        }
         return token
      },
      async session(session, user) {
        session.user = user
        return session
      }
    },
})


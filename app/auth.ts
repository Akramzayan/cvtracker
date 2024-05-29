import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  theme:{
    logo:"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
    brandColor:"#4285F4",
    colorScheme:"auto",
    
  

  },
    adapter:PrismaAdapter(prisma),
  providers: [Google],
})
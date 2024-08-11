import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "email", type: "email", placeholder: "Email" },
          password: {
            label: "password",
            type: "password",
            placeholder: "Password",
          },
        },
        async authorize(credentials, req) {
          if (!credentials?.email || !credentials.password) return null;
  
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
  
          if (!user) return null;
  
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.hashedPassword!
          );
  
          return passwordMatch ? user : null;
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    session: {
      strategy: "jwt",
    },
  };
  
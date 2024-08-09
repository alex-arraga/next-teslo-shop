import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import prisma from './lib/prisma';

import { z } from 'zod';
import bcryptjs from 'bcryptjs'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: 'auth/new-account'
  },
  callbacks: {
    jwt({ user, token }) {
      if(user) {
        token.data = user
      }

      return token
    },
    session({ session, user, token }) {
      session.user = token.data as any
      return session
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        // Validate credentials
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Match email
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) return null;

        // Match password
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // Return user without password
        const { password: _, ...rest } = user;
        return rest
      },
    }),
  ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
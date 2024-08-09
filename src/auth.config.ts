import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcryptjs from 'bcryptjs'
import prisma from './lib/prisma';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: 'auth/new-account'
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
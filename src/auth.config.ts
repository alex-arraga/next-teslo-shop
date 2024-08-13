import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import prisma from './lib/prisma';

import { z } from 'zod';
import bcryptjs from 'bcryptjs'


const authenticatedRoutes = [
  '/checkout',
  '/checkout/address',
  '/cart',
  '/profile',
  '/orders',
]

const publicRoutes = [
  '/',
  '/gender/[gender]',
  '/product/[slug]',
]

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: 'auth/new-account'
  },
  callbacks: {
    // Callback that work with auth middleware
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isOnAuthenticatedRoute = authenticatedRoutes.includes(nextUrl.pathname);
      const isOnPublicRoute = publicRoutes.includes(nextUrl.pathname);

      // Rutas que requieren autenticación
      if (isOnAuthenticatedRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 

      // Rutas públicas o cualquier otra ruta no protegida
      if(isOnPublicRoute || !isLoggedIn) {
        return true
      }

      // Comportamiento por defecto
      return isLoggedIn
    },

    jwt({ user, token }) {
      if (user) {
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
        const user = await prisma.user.findUnique({ where: { email: email.toLocaleLowerCase() } });
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
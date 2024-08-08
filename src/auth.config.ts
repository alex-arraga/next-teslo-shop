import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

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

        console.log(parsedCredentials.success)
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        console.log('Authconfig.ts')
        console.log({ email, password })

        // Buscar correo 

        // Comparar contraseñas

        // Regresar el usuario

        return null
      },
    }),
  ]
};

export const { signIn, signOut, auth } = NextAuth(authConfig)
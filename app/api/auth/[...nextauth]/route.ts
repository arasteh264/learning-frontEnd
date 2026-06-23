import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const secret = process.env.NEXTAUTH_SECRET as string;

if (!secret) {
  throw new Error("NEXTAUTH_SECRET is missing");
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              identifier: credentials?.username,
              password: credentials?.password,
            }),
          },
        );
        const data = await res.json();
        if (!data?.accessToken) {
          return null;
        }
        return {
          id: data.user.id,
          name: data.user.userName,
          accessToken: data.accessToken,
          role: data.user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        if (typeof user.accessToken === "string") {
          token.accessToken = user.accessToken;
        }

        if (typeof user.role === "string") {
          token.role = user.role;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.role = token.role as string;
      return session;
    },
  },

  secret,
});

export { handler as GET, handler as POST };

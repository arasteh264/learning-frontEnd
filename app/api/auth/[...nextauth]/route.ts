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
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              identifier: credentials.username,
              password: credentials.password,
            }),
          },
        );

        if (!res.ok) return null;

        const data = await res.json();

        if (!data?.accessToken || !data?.user) return null;

        return {
          id: String(data.user.id),
          name: data.user.userName ?? "",
          accessToken: data.accessToken,
          role: data.user.role ?? "USER",
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
        token.accessToken = (user as any).accessToken ?? undefined;
        token.role = (user as any).role ?? undefined;
      }
      return token;
    },

    async session({ session, token }) {
      if (!session || !token) return session;

      if (typeof token.accessToken === "string") {
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },

  secret,
});

export { handler as GET, handler as POST };

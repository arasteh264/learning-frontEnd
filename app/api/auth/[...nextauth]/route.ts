import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import http from "@/src/services/interseptor/http";

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
        try {
          const res = await http.post("/auth/login", {
            identifier: credentials?.username,
            password: credentials?.password,
          });

          const data = res.data?.data || res.data;

          if (!data?.accessToken) return null;

          return {
            id: data.id || "1",
            name: data.name || "",
            accessToken: data.accessToken,
            role: data.user.role || "user",
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken || "";
        token.role = user.role || "user";
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;

      session.user = {
        ...session.user,
        role: token.role as string,
      };

      return session;
    },
  },

  secret,
});

export { handler as GET, handler as POST };

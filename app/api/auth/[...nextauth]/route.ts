import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import http from "@/services/interseptor/http";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        username: {},
        password: {},
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
            name: data.userName || "",
            accessToken: data.accessToken,
            role: data.user.role || "user",
          };
        } catch (err) {
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
        token.accessToken = user.accessToken;
        token.role = user.role;
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

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

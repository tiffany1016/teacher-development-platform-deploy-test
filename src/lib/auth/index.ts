import NextAuth from "next-auth";
import CredentialsProvider from "./CredentialsProvider";
import { USERS } from "../constants";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [CredentialsProvider],
  callbacks: {
    async session({ session, token }) {
      const userEmail = token.email || session?.user?.email;
      if (!userEmail) return session;
      const user = USERS[USERS.findIndex(({ email }) => email === userEmail)];
      if (session.user) {
        session.user.username = user.username;
        session.user.email = user.email;
        session.user.mobile = user.mobile;
        session.user.authority = user.authority;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

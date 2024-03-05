import NextAuth from "next-auth";
import CredentialsProvider from "./CredentialsProvider";
import { USERS } from "../constants";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [CredentialsProvider],
  callbacks: {
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.name = user.username;
    //     token.email = user.email;
    //     token.mobile = user.mobile;
    //   }
    //   return token;
    // },
    async session({ session, token }) {
      const userEmail = token.email || session?.user?.email;
      if (!userEmail) return session;
      // const email = "myemail@gmail.com";
      // const username = "阿依";
      // const mobile = "0912345678";
      const user = USERS[USERS.findIndex(({ email }) => email === userEmail)];
      if (session.user) {
        session.user.name = user.username;
        session.user.email = user.email;
        session.user.mobile = user.mobile;
      }
      console.log(session)
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

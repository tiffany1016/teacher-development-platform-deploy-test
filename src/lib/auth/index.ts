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
      // const email = "myemail@gmail.com";
      // const username = "阿依";
      // const mobile = "0912345678";
      const user = USERS[USERS.findIndex(({ email }) => email === userEmail)];
      console.log(user);
      return {
        ...session,
        user: {
          username: user.username,
          email: user.email,
          mobile: user.mobile,
        },
      };
    },
  },
  pages: {
    signIn: "/",
  },
});

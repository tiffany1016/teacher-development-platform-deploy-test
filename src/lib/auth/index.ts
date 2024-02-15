import NextAuth from "next-auth";
import CredentialsProvider from "./CredentialsProvider";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [CredentialsProvider],
  callbacks: {
    async session({ session, token }) {
      // const email = token.email || session?.user?.email;
      // if (!email) return session;
      const email = "myemail@gmail.com";
      const username = "阿依";
      const mobile = "0912345678";

      return {
        ...session,
        user: {
          username: username,
          email: email,
          mobile: mobile,

        },
      };
    },
  },
  pages: {
    signIn: "/",
  },
});

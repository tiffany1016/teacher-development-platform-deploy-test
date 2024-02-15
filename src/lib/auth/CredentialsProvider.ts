import CredentialsProvider from "next-auth/providers/credentials";
import { authSchema } from "@/validators/auth";

// import bcrypt from "bcryptjs";

export default CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    console.log("in authorize")
    let validatedCredentials: {
      email: string;
      password: string;
    };
    try {
      validatedCredentials = authSchema.parse(credentials);
    } catch (error) {
      console.log("Wrong credentials. Try again.");
      return null;
    }
    const { email, password } = validatedCredentials;
    const existedUser = true;
    if (!existedUser) {
      console.log("invalid email");
      return null;
    }

    // Sign in
    // const isValid = await bcrypt.compare(password, existedUser.hashedPassword);
    const isValid = (password === "1234");
    if (!isValid) {
      console.log("Wrong password. Try again.");
      return null;
    }
    return {
      email: email,
    };
  },
});

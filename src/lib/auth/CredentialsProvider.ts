import CredentialsProvider from "next-auth/providers/credentials";
import { authSchema } from "@/validators/auth";
import { USERS } from "../constants";

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
    const userEmail = validatedCredentials.email;
    const userPassword = validatedCredentials.password;

    // Sign in
    // const isValid = await bcrypt.compare(password, existedUser.hashedPassword);
    const userIndex = USERS.findIndex(({ email }) => email === userEmail);
    const existedUser = userIndex !== -1;
    if (!existedUser) {
      console.log("invalid email");
      return null;
    }
    const user = USERS[userIndex];
    
    const isValid = (user.password === userPassword);

    if (!isValid) {
      console.log("Wrong password. Try again.");
      return null;
    }
    return {
      email: userEmail,
    };
  },
});

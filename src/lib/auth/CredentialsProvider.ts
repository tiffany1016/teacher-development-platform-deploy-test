// import CredentialsProvider from "next-auth/providers/credentials";
// import { authSchema } from "@/validators/auth";
// import { USERS } from "../constants";

// // import bcrypt from "bcryptjs";

// export default CredentialsProvider({
//   name: "credentials",
//   credentials: {
//     email: { label: "Email", type: "text" },
//     password: { label: "Password", type: "password" },
//   },
//   async authorize(credentials) {
//     console.log("in authorize")
//     let validatedCredentials: {
//       email: string;
//       password: string;
//     };
//     try {
//       validatedCredentials = authSchema.parse(credentials);
//     } catch (error) {
//       console.log("Wrong credentials. Try again.");
//       return null;
//     }
//     const userEmail = validatedCredentials.email;
//     const userPassword = validatedCredentials.password;

//     // Sign in
//     // const isValid = await bcrypt.compare(password, existedUser.hashedPassword);
//     const userIndex = USERS.findIndex(({ email }) => email === userEmail);
//     const existedUser = userIndex !== -1;
//     if (!existedUser) {
//       console.log("invalid email");
//       return null;
//     }
//     const user = USERS[userIndex];
    
//     const isValid = (user.password === userPassword);

//     if (!isValid) {
//       console.log("Wrong password. Try again.");
//       return null;
//     }
//     return {
//       email: userEmail,
//       mobile: user.mobile,
//       authority: user.authority,
//       username: user.username
//     };
//   },
// });

import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { authSchema } from "@/validators/auth";

export default CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    username: { label: "Userame", type: "text", optional: true },
    password: { label: "Password", type: "password" },
    mobile:{ label:"Mobile", type:"text", optional: true},
  },
  async authorize(credentials) {
    let validatedCredentials: {
      email: string;
      username?: string;
      password: string;
      mobile?:string;
    };

    try {
      validatedCredentials = authSchema.parse(credentials);
    } catch (error) {
      console.log("Wrong credentials. Try again.");
      return null;
    }
    const { email, username, password,mobile } = validatedCredentials;

    const [existedUser] = await db
      .select({
        id: usersTable.displayId,
        username: usersTable.username,
        email: usersTable.email,
        provider: usersTable.provider,
        hashedPassword: usersTable.hashedPassword,
        mobile: usersTable.mobile,
        authority: usersTable.authority,
      })
      .from(usersTable)
      .where(eq(usersTable.email, validatedCredentials.email.toLowerCase()))
      .execute();
    if (!existedUser) {
      // Sign up
      if (!username) {
        console.log("Name is required.");
        return null;
      }
      if(!mobile){
        console.log("Phone number is required.");
        return null;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const [createdUser] = await db
        .insert(usersTable)
        .values({
          username,
          email: email.toLowerCase(),
          mobile,
          hashedPassword,
          provider: "credentials",
        })
        .returning();
      return {
        email: createdUser.email,
        username: createdUser.username,
        id: createdUser.displayId,
        mobile: createdUser.mobile,
        authority: createdUser.authority,
      };
    }

    // Sign in
    if (existedUser.provider !== "credentials") {
      console.log(`The email has registered with ${existedUser.provider}.`);
      return null;
    }
    if (!existedUser.hashedPassword) {
      console.log("The email has registered with social account.");
      return null;
    }

    const isValid = await bcrypt.compare(password, existedUser.hashedPassword);
    if (!isValid) {
      console.log("Wrong password. Try again.");
      return null;
    }
    return {
      email: existedUser.email,
      username: existedUser.username,
      id: existedUser.id,
      mobile: existedUser.mobile,
      authority:existedUser.authority,
    };
  },
});

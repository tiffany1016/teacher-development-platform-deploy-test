import { NextResponse, type NextRequest } from "next/server";

import {  eq,or } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { z } from "zod";
const getUserSchema=z.object({
  email:z.string().optional(),
  mobile:z.string().optional(),
})
const getUserByMobileSchema=z.object({
  mobile:z.string(),
})
const postUserSchema=z.object({
  username:z.string(),
  email:z.string(),
  mobile:z.string(),
  hashedPassword:z.string(),
});
const updateUserSchema=z.object({
  id:z.string(),
  username:z.string().optional(),
  authority:z.string().optional(),
  disable:z.boolean().optional(),
  experience:z.string().optional(),
  hashedPassword:z.string().optional(),
});
type getUserRequest=z.infer<typeof getUserSchema>;
type getUserByMobileRequest=z.infer<typeof getUserByMobileSchema>;
type postUserRequest = z.infer<typeof postUserSchema>;
type updateUserRequest = z.infer<typeof updateUserSchema>;
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  const mobile = url.searchParams.get('mobile');

  if (!email && !mobile) {
    return NextResponse.json({ error: "Email or phone is required" }, { status: 400 });
  }

  let condition = email ? eq(usersTable.email, email) : eq(usersTable.mobile, mobile!);

  try {
    const userData = await db.select({
      mobile: usersTable.mobile,
      hashedPassword: usersTable.hashedPassword,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(condition);

    if (userData.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const user = userData[0];
    // Avoid sending sensitive data like hashedPassword to the client
    return NextResponse.json({ mobile: user.mobile, email: user.email }, { status: 200 });
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
// export async function GET(request: NextRequest){
//   const data = await request.json();
//   try {
//     getUserByMobileSchema.parse(data);
//   } catch (error) {
//     return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//   }
//   const { mobile } = data as getUserByMobileRequest;
//   const userData =await db.select({
//     email:usersTable.email,
//     Password:usersTable.hashedPassword,
//   })
//     .from(usersTable)
//     .where(eq(usersTable.mobile,mobile));
  
//   return new NextResponse("OK", { status: 200 });
// } 
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postUserSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { username,email,mobile,hashedPassword } = data as postUserRequest;
  await db
    .insert(usersTable)
    .values({username,email,mobile,hashedPassword})
  return new NextResponse("OK", { status: 200 });
}
export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateUserSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id,username,authority,disable,experience,hashedPassword } = data as updateUserRequest;
  await db
    .update(usersTable)
    .set({username,authority,disable,experience,hashedPassword})
    .where(eq(usersTable.displayId, id))
  return new NextResponse("OK", { status: 200 });
}
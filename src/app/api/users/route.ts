import { NextResponse, type NextRequest } from "next/server";

import {  eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { z } from "zod";
const postUserSchema=z.object({
  username:z.string(),
  email:z.string(),
  phoneNumber:z.string(),
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
type postUserRequest = z.infer<typeof postUserSchema>;
type updateUserRequest = z.infer<typeof updateUserSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postUserSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { username,email,phoneNumber,hashedPassword } = data as postUserRequest;
  await db
    .insert(usersTable)
    .values({username,email,phoneNumber,hashedPassword})
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
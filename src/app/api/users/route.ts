import { NextResponse, type NextRequest } from "next/server";

import {  eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { z } from "zod";

const updateUserSchema=z.object({
  id:z.string(),
  username:z.string().optional(),
  authority:z.string().optional(),
  available:z.boolean().optional(),
  experience:z.custom<{
    startTime:string[],
    endTime:string[],
    school:string[],
    position:string[],
    subject:string[],
    role:string[],
    feature:string[],
  }>().optional(),
  hashedPassword:z.string().optional(),
});

type updateUserRequest = z.infer<typeof updateUserSchema>;

export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateUserSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id,username,authority,available,experience,hashedPassword } = data as updateUserRequest;
  await db
    .update(usersTable)
    .set({username,authority,available,experience,hashedPassword})
    .where(eq(usersTable.displayId, id))
  return new NextResponse("OK", { status: 200 });
}
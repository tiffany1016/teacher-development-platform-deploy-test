import { NextResponse, type NextRequest } from "next/server";

import { and,eq } from "drizzle-orm";

import { db } from "@/db";
import { courseRecordTable } from "@/db/schema";


import { z } from "zod";

const postRecordSchema = z.object({
  studentId:z.string(),
  courseId:z.string(),
  title:z.string(),
  discription:z.string().optional(),
  link:z.string().optional(),
  publicToEveryone:z.boolean().optional(),
});
const updateRecordSchema=z.object({
  studentId:z.string(),
  courseId:z.string(),
  title:z.string().optional(),
  discription:z.string().optional(),
  link:z.string().optional(),
  publicToEveryone:z.boolean().optional(),
});
const deleteRecordSchema=z.object({
  studentId:z.string(),
  courseId:z.string(),
});
type PostRecordRequest = z.infer<typeof postRecordSchema>;
type updateRecordRequest = z.infer<typeof updateRecordSchema>;
type deleteRecordRequest = z.infer<typeof deleteRecordSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postRecordSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { studentId,courseId,title,discription,link,publicToEveryone} = data as PostRecordRequest;
  await db
    .insert(courseRecordTable)
    .values({
      studentId,
      courseId,
      title,
      discription,
      link,
      publicToEveryone,
    })

  return new NextResponse("OK", { status: 200 });
}
export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateRecordSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { studentId,courseId,title,discription,link,publicToEveryone } = data as updateRecordRequest;
  await db
    .update(courseRecordTable)
    .set({title,discription,link,publicToEveryone})
    .where(and(eq(courseRecordTable.studentId, studentId), eq(courseRecordTable.courseId, courseId)));
  return new NextResponse("OK", { status: 200 });
}
export async function DELETE(request: NextRequest) {
  const data = await request.json();
  try {
    deleteRecordSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { studentId,courseId } = data as deleteRecordRequest;
  await db
    .delete(courseRecordTable)
    .where(and(eq(courseRecordTable.studentId, studentId), eq(courseRecordTable.courseId, courseId)));
  return new NextResponse("OK", { status: 200 });
}
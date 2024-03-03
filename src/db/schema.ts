import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  index,
  char,
  json,
  text,
  pgTable,
  serial,
  uuid,
  varchar,
  unique,
  timestamp,
  integer,
  doublePrecision,
  boolean,
} from "drizzle-orm/pg-core";
export const usersTable = pgTable("users",{
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull().unique(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    phoneNumber: varchar("phoneNumber", { length: 100 }).notNull(),
    authority:char("authority").notNull().default('A'),
    available:boolean("available").notNull().default(true),
    experience:json("experience").$type<{
      startTime:string[],
      endTime:string[],
      school:string[],
      position:string[],
      subject:string[],
      role:string[],
      feature:string[],
    }>(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
      enum: ["github", "credentials"],
    })
      .notNull()
      .default("credentials"),
  },
  (table) => ({
    displayIdIndexOfUsers: index("display_id_index_of_users").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
    phoneIndex:index("phone_index").on(table.phoneNumber),
  }),
);
export const usersRelations = relations(usersTable, ({ many }) => ({
  courseTaken: many(courseTable),
}));
export const courseTable= pgTable("course",{
    id:serial("id").primaryKey(),
    year:integer("year").notNull(),
    series:varchar("series").notNull(),
    courseId:varchar("courseId").notNull().unique(),
    name:varchar("name",{length:100}).notNull(),
    teacherId:uuid("teacherId").notNull(),
    typeId:integer("typeId").notNull(),
  },
);
export const userToCourse=pgTable("userToCourse",{
    userId:uuid("userId").notNull().references(()=>usersTable.displayId),
    
  },
);
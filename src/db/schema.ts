import { relations } from "drizzle-orm";
import {
  index,
  char,
  json,
  pgTable,
  serial,
  uuid,
  varchar,
  integer,
  boolean,
  text,
} from "drizzle-orm/pg-core";
export const usersTable = pgTable("users",{
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull().unique(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    phoneNumber: varchar("phoneNumber", { length: 100 }).notNull(),
    authority:char("authority").notNull().default('A'),
    disable:boolean("disable").notNull().default(false),
    // experience:json("experience").$type<{
    //   startTime:string[],
    //   endTime:string[],
    //   school:string[],
    //   position:string[],
    //   subject:string[],
    //   role:string[],
    //   feature:string[],
    // }>(),
    experience:text("experience").default(JSON.stringify({startTime:[],
      endTime:[],
      school:[],
      position:[],
      subject:[],
      role:[],
      feature:[],}))
      .notNull(),
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
  studentToCourse: many(studentToCourse),
  records:many(courseRecordTable),
  teacher:many(courseTable),
}));
export const courseTable= pgTable("course",{
    id:serial("id").primaryKey(),
    year:integer("year").notNull(),
    series:varchar("series").notNull(),
    courseId:varchar("courseId").notNull().unique(),
    name:varchar("name",{length:100}).notNull(),
    teacherId:uuid("teacherId").references(()=>usersTable.displayId,{
      onUpdate: 'cascade'
    }),
    typeId:varchar("typeId").notNull().references(()=>courseMapTable.id,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  },
);
export const courseRelations=relations(courseTable,({one,many})=>({
  studentToCourse: many(studentToCourse),
  teacher:one(usersTable,{
    fields:[courseTable.teacherId],
    references:[usersTable.displayId],
  }),
  records:many(courseRecordTable),
  type:one(courseMapTable,{
    fields:[courseTable.typeId],
    references:[courseMapTable.id],
  }),
}));
export const studentToCourse=pgTable("userToCourse",{
    userId:uuid("userId").notNull().references(()=>usersTable.displayId,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    courseId:varchar("courseId").notNull().references(()=>courseTable.courseId,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  },
);
export const userToCourseRelations=relations(studentToCourse,({one})=>({
  course: one(courseTable, {
    fields: [studentToCourse.courseId],
    references: [courseTable.courseId],
  }),
  user: one(usersTable, {
    fields: [studentToCourse.userId],
    references: [usersTable.displayId],
  }),
}));
export const courseRecordTable=pgTable("courseRecord",{
    id:serial("id").primaryKey(),
    studentId:uuid("studentId").notNull().references(()=>usersTable.displayId,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    courseId:varchar("courseId").notNull().references(()=>courseTable.courseId,{
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    title:varchar("title",{length:200}).notNull(),
    discription:varchar("discription",{length:500}),
    link:varchar("link"),
    publicToEveryone:boolean("public").notNull().default(false),
  },
);
export const recordRelations=relations(courseRecordTable,({one})=>({
  student:one(usersTable,{
    fields: [courseRecordTable.studentId],
    references:[usersTable.displayId],
  }),
  course:one(courseTable,{
    fields: [courseRecordTable.courseId],
    references: [courseTable.courseId],
  })
}));
export const courseMapTable=pgTable("courseMap",{
    id:varchar("id",{length:50}).notNull().unique(),
    bigCategory:varchar("bigCategory",{length:50}).notNull(),
    middleCategory:varchar("middleCategory",{length:50}).notNull(),
    smallCategory:varchar("smallCategory",{length:50}).notNull(),
  },
);
export const courseMapRelations=relations(courseMapTable,({many})=>({
  course:many(courseTable),
}));
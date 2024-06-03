import { pgTable, integer, serial, text, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
  //create a table called users
  id: serial("id").primaryKey(), //create a column called id
  fullname: text("full_name"), // create a column called full_name
  phone: varchar("phone", { length: 100 }), //create a column called phone
  address: varchar("address", { length: 100 }), //create a column called address
  score: integer("score"), //create a column called score
});

export const ProfileTable = pgTable("profiles", {
  id: serial("id").primaryKey(),
  bio: varchar("bio", { length: 256 }),
  userId: integer("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
});

export type TIUser = typeof UserTable.$inferInsert;
export type TSUser = typeof UserTable.$inferSelect;

export type TIProfile = typeof ProfileTable.$inferInsert;
export type TSProfile = typeof ProfileTable.$inferSelect;

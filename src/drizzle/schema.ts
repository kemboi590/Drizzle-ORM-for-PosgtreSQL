import { pgTable, integer, serial, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { primaryKey } from "drizzle-orm/mysql-core";
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

// Relationships of user table 1 to 1
export const UsersRelations = relations(UserTable, ({ one, many }) => ({
  profile: one(ProfileTable, {
    fields: [UserTable.id],
    references: [ProfileTable.userId],
  }),
  post: many(PostTable),
}));

// post table
export const PostTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  content: text("content"),
  userId: integer("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
});

// relationships of post table 1 to many
export const PostRelations = relations(PostTable, ({ one, many }) => ({
  user: one(UserTable, {
    // means that one user can have many posts
    fields: [PostTable.userId], // the field that is used to join the two tables
    references: [UserTable.id], // the field that is used to join the two tables
  }),
  postOnCategories: many(PostsOnCategories),

}));

// category table
export const CategoryTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
});

// join table for post and categories
export const PostsOnCategories = pgTable(
  "posts_on_categories",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => PostTable.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => CategoryTable.id, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      compositeKey: [table.postId, table.categoryId],
    };
  }
);

// relationships of post table many to many
export const CategoriesRelation = relations(PostTable, ({ many }) => ({
  postCategories: many(PostsOnCategories)
}));


// postOnCategoriesRelations
export const PostsOnCategoriesRelations = relations(PostsOnCategories, ({ one }) => ({
  post: one(PostTable, {
    fields: [PostsOnCategories.postId],
    references: [PostTable.id],
  }),
  category: one(CategoryTable, {
    fields: [PostsOnCategories.categoryId],
    references: [CategoryTable.id],
  }),
}));


export type TIUser = typeof UserTable.$inferInsert;
export type TSUser = typeof UserTable.$inferSelect;

export type TIProfile = typeof ProfileTable.$inferInsert;
export type TSProfile = typeof ProfileTable.$inferSelect;

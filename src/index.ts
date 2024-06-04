import { eq } from "drizzle-orm";
import db from "./drizzle/db";
import { PostTable, ProfileTable, UserTable } from "./drizzle/schema";
import { TIUser, TSUser, TIProfile, TSProfile } from "./drizzle/schema";

// insert user
const createUser = async (user: TIUser) => {
  await db.insert(UserTable).values({
    fullname: user.fullname,
    phone: user.phone,
    address: user.address,
    score: user.score,
  });
};

const getUser = async (): Promise<TSUser[] | null> => {
  return await db.query.UserTable.findMany();
};

const getProfiles = async (): Promise<TSProfile[] | null> => {
  return await db.select().from(ProfileTable);
};

// insert data
const creatUserProfile = async (user: TIProfile) => {
  await db.insert(ProfileTable).values({
    bio: user.bio,
    userId: user.userId,
  });
};
// update
const updateUserProfile = async (bio: string, user_id: number) => {
  await db
    .update(ProfileTable)
    .set({ bio })
    .where(eq(ProfileTable.id, user_id));
};

// delete
const deleteUserProfile = async (user_id: number) => {
  return db.delete(ProfileTable).where(eq(ProfileTable.id, user_id));
};

// search
// const searchUser = async (name: string) => {
//   return db.query.UserTable.findMany({
//     where: like(UserTable.fullname, `%${name}%`)
//   });

// }

//  1-1 relationship
const getUserWithProfile = async () => {
  return await db.query.UserTable.findMany({
    columns: {
      fullname: true,
      phone: true,
      score: true,
    },
    with: {
      profile: {
        columns: {
          bio: true,
        },
      },
    },
  });
};

// 1 to many relationship
const getUsersWithPosts = async () => {
  return await db.query.UserTable.findMany({
    // columns: {
    //   fullname: true,
    //   phone: true,
    //   score: true,
    // },
    with: {
      post: true,
    },
  });
};

// get posts with user
const getPostWithUser = async (id: number) => {
  return await db.query.PostTable.findMany({
    columns: {
      content: true,
    },
    with: {
      user: {
        columns: {
          fullname: true,
          phone: true,
          score: true,
        },
      },
    },
    where: eq(PostTable.id, id),
  });
};

// n-n relationship post and categories
export const getPostWithCategories = async () => {
  return await db.query.PostTable.findMany({
    // columns: {
    //   content: true,
    // },
    with: {
      postOnCategories: {
        category: {
          columns: {
            name: true,
          },
        },
      },
    },
  });
};

// MAIN FUNCTION TO RUN
async function main() {
  // console.log(await getUser());
  // console.log(
  //   await creatUserProfile({ bio: "I am a software engineer", userId: 1 })
  // );
  // console.log(await getProfiles());
  // console.log(updateUserProfile("cloud advocate", 3));
  // await deleteUserProfile(7);
  // console.log(await getUserWithProfile());
  // console.log(await getUsersWithPosts());
  // console.log(await getPostWithUser(1));
  // console.log(await getPostWithCategories());
}
main();

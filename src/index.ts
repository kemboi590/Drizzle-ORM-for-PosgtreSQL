import { eq } from "drizzle-orm";
import db from "./drizzle/db";
import { ProfileTable, UserTable } from "./drizzle/schema";
import { TIUser, TSUser, TIProfile, TSProfile } from "./drizzle/schema";

// insert user
const createUser = async (user: TIUser) => {
  await db.insert(UserTable).values({
    fullname: user.fullname,
    phone: user.phone,
    address: user.address,
    score: user.score,
  })
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
async function main() {
  // console.log(await getUser());
  // console.log(
  //   await creatUserProfile({ bio: "I am a software engineer", userId: 1 })
  // );
  // console.log(await getProfiles());
  console.log(updateUserProfile("I am a cloud advocate", 3));
  // await deleteUserProfile(7);


  // create user 
  console.log()
}
main();

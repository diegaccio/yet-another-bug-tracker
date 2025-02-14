import React from "react";
import { getLastUsersUpdateTime, getUsers } from "../db/dbUtils";
import UsersTable from "./UsersTable";
import { revalidatePath } from "next/cache";
import { RefreshCache } from "../components/RefreshCache";

const UsersPage = async () => {
  const users = await getUsers();
  const lastUpdated = await getLastUsersUpdateTime();

  async function checkUsersChange() {
    "use server";

    console.log("CHECK USER CHANGE");

    const checkPostLastUpdated = await getLastUsersUpdateTime();
    console.log(checkPostLastUpdated, lastUpdated);

    const didChange =
      lastUpdated?.getTime() !== checkPostLastUpdated?.getTime() ||
      lastUpdated?.getDate() !== checkPostLastUpdated?.getDate();

    if (didChange) {
      console.log("INVALIDATING USERS");
      revalidatePath("/users");
    }
  }

  return (
    <>
      <UsersTable users={users}></UsersTable>
      <RefreshCache check={checkUsersChange} />
    </>
  );
};

export default UsersPage;

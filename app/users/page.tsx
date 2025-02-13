import React from "react";
import { getUsers } from "../db/dbUtils";
import UsersTable from "./UsersTable";

const UsersPage = async () => {
  const users = await getUsers();

  return <UsersTable serverUsers={users}></UsersTable>;
};

export default UsersPage;

import { User } from "@prisma/client";
import { Table, Text } from "@radix-ui/themes";
import UserUpdaterButton from "./UserUpdaterButton";

const UsersTable = ({ users }: { users: User[] }) => {
  console.log("Rendering Users Table");
  return (
    <>
      <Text>{new Date().toLocaleString()}</Text>
      <Text></Text>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Admin</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.RowHeaderCell>{user.userName}</Table.RowHeaderCell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.admin ? "Admin" : "User"}</Table.Cell>
              <Table.Cell>
                <UserUpdaterButton id={user.id}></UserUpdaterButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default UsersTable;

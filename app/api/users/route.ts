import { getUsers } from "@/app/db/dbUtils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("API/TODOS: Fetching USERS");
    const todos = await getUsers();
    return NextResponse.json(todos, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todos: " + error },
      {
        status: 500, //BAD REQUEST
      }
    );
  }
}

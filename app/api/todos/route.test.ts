import { POST } from "./route";
import { NextRequest } from "next/server";
import { prisma } from "@/prisma/client";

jest.mock("@/prisma/client", () => ({
  prisma: {
    todo: {
      create: jest.fn(),
    },
  },
}));

describe("POST /api/todos", () => {
  it("should return 400 if JSON is invalid", async () => {
    const request = new NextRequest(
      new Request("http://localhost", { method: "POST", body: "invalid json" })
    );
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Invalid JSON");
  });

  it("should return 400 if validation fails", async () => {
    const request = new NextRequest(
      new Request("http://localhost", {
        method: "POST",
        body: JSON.stringify({ title: "" }),
      })
    );
    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.title?._errors).toContain("Title is required");
  });

  it("should create a new todo and return 201", async () => {
    const requestBody = { title: "Test Todo", description: "Test Description" };
    const request = new NextRequest(
      new Request("http://localhost", {
        method: "POST",
        body: JSON.stringify(requestBody),
      })
    );

    (prisma.todo.create as jest.Mock).mockResolvedValue(requestBody);

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(201);
    expect(json).toEqual(requestBody);
  });
});

import { describe, it, expect, vi, Mock } from "vitest";
import { PATCH } from "./route";
import { NextRequest } from "next/server";
import { prisma } from "@/prisma/client";

// Mock the Prisma client
vi.mock("@/prisma/client", () => ({
  prisma: {
    todo: {
      update: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

describe("PATCH /api/todos/[i]", () => {
  it("should return 400 if JSON is invalid", async () => {
    const request = new NextRequest(
      new Request("http://localhost", { method: "POST", body: "invalid json" })
    );
    const response = await PATCH(request, { params: { id: "1" } });
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Invalid JSON");
  });

  it("should return 400 if validation fails", async () => {
    const request = new NextRequest(
      new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({ title: "" }),
      })
    );
    const response = await PATCH(request, { params: { id: "1" } });
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.title?._errors).toContain("Title is required");
  });

  it("should update a todo and return the updated todo", async () => {
    const oldTodo = {
      id: 1,
      title: "Old Title",
      description: "Old Description",
    };
    const updatedTodo = {
      id: 1,
      title: "New Title",
      description: "New Description",
    };

    // Mock the prisma.todo.update method
    (prisma.todo.findUnique as Mock).mockResolvedValue(oldTodo);
    (prisma.todo.update as Mock).mockResolvedValue(updatedTodo);

    const request = new NextRequest(
      new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({
          title: "New Title",
          description: "New Description",
        }),
      })
    );

    const response = await PATCH(request, { params: { id: "1" } });
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual(updatedTodo);
    expect(prisma.todo.update).toHaveBeenCalledWith({
      where: { id: oldTodo.id },
      data: { title: "New Title", description: "New Description" },
    });
  });
});

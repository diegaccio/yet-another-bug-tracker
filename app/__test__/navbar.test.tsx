import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import NavBar from "../NavBar";

describe("NavBarComponent", () => {
  test("renders without crashing", () => {
    render(<NavBar />);
    expect(1).toBeTruthy();
  });

  test("renders the home link", () => {
    render(<NavBar />);

    expect(screen.getAllByTestId("logo")).toBeDefined();
  });

  test("renders the todos link", () => {
    render(<NavBar />);
    expect(screen.getAllByTestId("todos-link")).toBeDefined();
  });

  test("renders the dashboard link", () => {
    render(<NavBar />);
    expect(screen.getAllByTestId("home-link")).toBeDefined();
  });
});

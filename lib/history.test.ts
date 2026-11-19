import { describe, expect, it } from "vitest";
import {
  addQuestionToHistory,
  parseHistory,
  trimTitle,
} from "./history";

describe("trimTitle", () => {
  it("shortens long titles", () => {
    const long = "a".repeat(60);
    expect(trimTitle(long).length).toBeLessThanOrEqual(48);
    expect(trimTitle(long).endsWith("…")).toBe(true);
  });
});

describe("parseHistory", () => {
  it("rejects invalid JSON", () => {
    expect(parseHistory("not-json")).toEqual([]);
  });

  it("parses valid entries", () => {
    const items = [{ id: "1", title: "PMI?", createdAt: "2026-01-01" }];
    expect(parseHistory(JSON.stringify(items))).toEqual(items);
  });
});

describe("addQuestionToHistory", () => {
  it("prepends new questions", () => {
    const next = addQuestionToHistory([], "What is escrow?");
    expect(next).toHaveLength(1);
    expect(next[0].title).toBe("What is escrow?");
  });
});
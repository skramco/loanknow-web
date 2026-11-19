import { afterEach, describe, expect, it } from "vitest";
import { askOwen, getOwenEnvStatus } from "./client";

const original = { ...process.env };

afterEach(() => {
  process.env = { ...original };
});

describe("getOwenEnvStatus", () => {
  it("reports missing required env vars", () => {
    delete process.env.OWEN_API_URL;
    delete process.env.OWEN_API_KEY;
    const status = getOwenEnvStatus();
    expect(status.configured).toBe(false);
    expect(status.missing).toContain("OWEN_API_URL");
    expect(status.missing).toContain("OWEN_API_KEY");
  });
});

describe("askOwen", () => {
  it("returns unavailable when not configured", async () => {
    delete process.env.OWEN_API_URL;
    delete process.env.OWEN_API_KEY;
    const result = await askOwen("What is PMI?");
    expect(result.status).toBe("unavailable");
    if (result.status === "unavailable") {
      expect(result.code).toBe("not_configured");
    }
  });

  it("returns not_implemented when env is set but client is not wired", async () => {
    process.env.OWEN_API_URL = "https://example.com/owen";
    process.env.OWEN_API_KEY = "test-key";
    const result = await askOwen("What is PMI?");
    expect(result.status).toBe("unavailable");
    if (result.status === "unavailable") {
      expect(result.code).toBe("not_implemented");
    }
  });
});
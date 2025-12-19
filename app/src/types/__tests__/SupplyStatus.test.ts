import { describe, it, expect } from "vitest";
import { SupplyStatus } from "../SupplyStatus";

describe("SupplyStatus", () => {
  it("should have three enum values", () => {
    expect(SupplyStatus.SUFFICIENT).toBe("SUFFICIENT");
    expect(SupplyStatus.INSUFFICIENT).toBe("INSUFFICIENT");
    expect(SupplyStatus.MISSING).toBe("MISSING");
  });

  it("should allow enum value comparison", () => {
    const status = SupplyStatus.SUFFICIENT;
    expect(status).toBe(SupplyStatus.SUFFICIENT);
    expect(status).not.toBe(SupplyStatus.MISSING);
  });
});

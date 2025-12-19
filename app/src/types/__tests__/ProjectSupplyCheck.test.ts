import { describe, it, expect } from "vitest";
import { ProjectSupplyCheck } from "../ProjectSupplyCheck";
import { SupplyStatus } from "../SupplyStatus";

describe("ProjectSupplyCheck", () => {
  it("should create a valid ProjectSupplyCheck object", () => {
    const check: ProjectSupplyCheck = {
      itemId: "123",
      itemName: "Test Item",
      requiredQuantity: 10.0,
      availableQuantity: 5.0,
      supplyStatus: SupplyStatus.INSUFFICIENT,
      quantityGap: 5.0,
    };

    expect(check.itemId).toBe("123");
    expect(check.itemName).toBe("Test Item");
    expect(check.requiredQuantity).toBe(10.0);
    expect(check.availableQuantity).toBe(5.0);
    expect(check.supplyStatus).toBe(SupplyStatus.INSUFFICIENT);
    expect(check.quantityGap).toBe(5.0);
  });

  it("should support all supply status values", () => {
    const sufficient: ProjectSupplyCheck = {
      itemId: "1",
      itemName: "Item 1",
      requiredQuantity: 10.0,
      availableQuantity: 15.0,
      supplyStatus: SupplyStatus.SUFFICIENT,
      quantityGap: 0.0,
    };

    const insufficient: ProjectSupplyCheck = {
      itemId: "2",
      itemName: "Item 2",
      requiredQuantity: 10.0,
      availableQuantity: 5.0,
      supplyStatus: SupplyStatus.INSUFFICIENT,
      quantityGap: 5.0,
    };

    const missing: ProjectSupplyCheck = {
      itemId: "3",
      itemName: "Item 3",
      requiredQuantity: 10.0,
      availableQuantity: 0.0,
      supplyStatus: SupplyStatus.MISSING,
      quantityGap: 10.0,
    };

    expect(sufficient.supplyStatus).toBe(SupplyStatus.SUFFICIENT);
    expect(insufficient.supplyStatus).toBe(SupplyStatus.INSUFFICIENT);
    expect(missing.supplyStatus).toBe(SupplyStatus.MISSING);
  });
});

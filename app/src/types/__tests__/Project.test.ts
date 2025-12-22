import { describe, it, expect } from "vitest";
import { Project } from "../Project";
import { ProjectSupplyCheck } from "../ProjectSupplyCheck";
import { SupplyStatus } from "../SupplyStatus";
import { ProjectStatus } from "../ProjectStatus";

describe("Project type with supplyCheck", () => {
  it("should allow Project with optional supplyCheck field", () => {
    const projectWithoutSupplyCheck: Project = {
      id: 1,
      name: "Test Project",
      description: "Test Description",
      status: ProjectStatus.ACTIVE,
      createdAt: "2025-01-01T00:00:00",
    };

    expect(projectWithoutSupplyCheck.supplyCheck).toBeUndefined();
  });

  it("should allow Project with supplyCheck field", () => {
    const supplyCheck: ProjectSupplyCheck[] = [
      {
        itemId: "123",
        itemName: "Test Item",
        requiredQuantity: 10.0,
        availableQuantity: 5.0,
        supplyStatus: SupplyStatus.INSUFFICIENT,
        quantityGap: 5.0,
      },
    ];

    const projectWithSupplyCheck: Project = {
      id: 1,
      name: "Test Project",
      description: "Test Description",
      status: ProjectStatus.ACTIVE,
      createdAt: "2025-01-01T00:00:00",
      supplyCheck: supplyCheck,
    };

    expect(projectWithSupplyCheck.supplyCheck).toBeDefined();
    expect(projectWithSupplyCheck.supplyCheck).toHaveLength(1);
    expect(projectWithSupplyCheck.supplyCheck?.[0].itemName).toBe("Test Item");
  });
});

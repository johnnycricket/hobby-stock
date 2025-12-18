import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SupplyCheck } from "../SupplyCheck";
import { ProjectSupplyCheck } from "@/types/ProjectSupplyCheck";
import { SupplyStatus } from "@/types/SupplyStatus";

describe("SupplyCheck", () => {
  it("should render loading state", () => {
    render(<SupplyCheck loading={true} />);
    expect(screen.getByText("Loading supply check...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    render(<SupplyCheck error="Failed to load" />);
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });

  it("should render empty state when no supply check data", () => {
    render(<SupplyCheck supplyCheck={[]} />);
    expect(screen.getByText("No items to check")).toBeInTheDocument();
  });

  it("should render supply check with summary and items", () => {
    const supplyCheck: ProjectSupplyCheck[] = [
      {
        itemId: "1",
        itemName: "Item 1",
        requiredQuantity: 10.0,
        availableQuantity: 15.0,
        supplyStatus: SupplyStatus.SUFFICIENT,
        quantityGap: 0.0,
      },
      {
        itemId: "2",
        itemName: "Item 2",
        requiredQuantity: 10.0,
        availableQuantity: 5.0,
        supplyStatus: SupplyStatus.INSUFFICIENT,
        quantityGap: 5.0,
      },
      {
        itemId: "3",
        itemName: "Item 3",
        requiredQuantity: 10.0,
        availableQuantity: 0.0,
        supplyStatus: SupplyStatus.MISSING,
        quantityGap: 10.0,
      },
    ];

    render(<SupplyCheck supplyCheck={supplyCheck} />);

    expect(screen.getByText("Supply Check")).toBeInTheDocument();
    expect(screen.getByText("3 items total")).toBeInTheDocument();
    expect(screen.getByText("1 sufficient")).toBeInTheDocument();
    expect(screen.getByText("1 insufficient")).toBeInTheDocument();
    expect(screen.getByText("1 missing")).toBeInTheDocument();

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("should handle singular item count", () => {
    const supplyCheck: ProjectSupplyCheck[] = [
      {
        itemId: "1",
        itemName: "Item 1",
        requiredQuantity: 10.0,
        availableQuantity: 10.0,
        supplyStatus: SupplyStatus.SUFFICIENT,
        quantityGap: 0.0,
      },
    ];

    render(<SupplyCheck supplyCheck={supplyCheck} />);
    expect(screen.getByText("1 item total")).toBeInTheDocument();
  });
});

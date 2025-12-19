import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SupplyCheckItem } from "../SupplyCheckItem";
import { ProjectSupplyCheck } from "@/types/ProjectSupplyCheck";
import { SupplyStatus } from "@/types/SupplyStatus";

describe("SupplyCheckItem", () => {
  it("should render sufficient status with green colors", () => {
    const check: ProjectSupplyCheck = {
      itemId: "1",
      itemName: "Test Item",
      requiredQuantity: 10.0,
      availableQuantity: 15.0,
      supplyStatus: SupplyStatus.SUFFICIENT,
      quantityGap: 0.0,
    };

    render(<SupplyCheckItem check={check} />);

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("SUFFICIENT")).toBeInTheDocument();
    expect(screen.getByText(/Required:/)).toBeInTheDocument();
    expect(screen.getByText(/Available:/)).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("should render insufficient status with yellow colors", () => {
    const check: ProjectSupplyCheck = {
      itemId: "2",
      itemName: "Test Item 2",
      requiredQuantity: 10.0,
      availableQuantity: 5.0,
      supplyStatus: SupplyStatus.INSUFFICIENT,
      quantityGap: 5.0,
    };

    render(<SupplyCheckItem check={check} />);

    expect(screen.getByText("Test Item 2")).toBeInTheDocument();
    expect(screen.getByText("INSUFFICIENT")).toBeInTheDocument();
    expect(screen.getByText(/Need.*more/)).toBeInTheDocument();
  });

  it("should render missing status with red colors", () => {
    const check: ProjectSupplyCheck = {
      itemId: "3",
      itemName: "Test Item 3",
      requiredQuantity: 10.0,
      availableQuantity: 0.0,
      supplyStatus: SupplyStatus.MISSING,
      quantityGap: 10.0,
    };

    render(<SupplyCheckItem check={check} />);

    expect(screen.getByText("Test Item 3")).toBeInTheDocument();
    expect(screen.getByText("MISSING")).toBeInTheDocument();
    expect(screen.getByText(/Need.*more/)).toBeInTheDocument();
  });

  it("should not show quantity gap when sufficient", () => {
    const check: ProjectSupplyCheck = {
      itemId: "4",
      itemName: "Test Item 4",
      requiredQuantity: 10.0,
      availableQuantity: 10.0,
      supplyStatus: SupplyStatus.SUFFICIENT,
      quantityGap: 0.0,
    };

    render(<SupplyCheckItem check={check} />);

    expect(screen.queryByText(/Need .* more/)).not.toBeInTheDocument();
  });
});

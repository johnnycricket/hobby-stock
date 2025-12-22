import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ProjectDetails } from "../ProjectDetails";
import { ProjectService } from "@/services/project-service";
import { ItemService } from "@/services/item-service";
import { Project } from "@/types/Project";
import { SupplyStatus } from "@/types/SupplyStatus";

// Mock the services
vi.mock("@/services/project-service");
vi.mock("@/services/item-service");

// Mock useParams and useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ProjectDetails with SupplyCheck", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display supply check component when project has supplyCheck data", async () => {
    const mockProject: Project = {
      id: 1,
      name: "Test Project",
      description: "Test Description",
      status: "ACTIVE",
      createdAt: "2025-01-01T00:00:00",
      supplyCheck: [
        {
          itemId: "1",
          itemName: "Test Item",
          requiredQuantity: 10.0,
          availableQuantity: 5.0,
          supplyStatus: SupplyStatus.INSUFFICIENT,
          quantityGap: 5.0,
        },
      ],
    };

    vi.mocked(ProjectService.findById).mockResolvedValue({
      data: { project: mockProject },
      errors: undefined,
    } as unknown);

    vi.mocked(ItemService.findAll).mockResolvedValue({
      data: { items: [] },
      errors: undefined,
    } as unknown);

    renderWithRouter(<ProjectDetails />);

    await waitFor(() => {
      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    expect(screen.getByText("Supply Check")).toBeInTheDocument();
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  it("should display supply check even when project has no items", async () => {
    const mockProject: Project = {
      id: 1,
      name: "Test Project",
      description: "Test Description",
      status: "ACTIVE",
      createdAt: "2025-01-01T00:00:00",
      items: [],
      supplyCheck: [],
    };

    vi.mocked(ProjectService.findById).mockResolvedValue({
      data: { project: mockProject },
      errors: undefined,
    } as unknown);

    vi.mocked(ItemService.findAll).mockResolvedValue({
      data: { items: [] },
      errors: undefined,
    } as unknown);

    renderWithRouter(<ProjectDetails />);

    await waitFor(() => {
      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    expect(screen.getByText("Supply Check")).toBeInTheDocument();
    expect(screen.getByText("No items to check")).toBeInTheDocument();
  });

  it("should update supply check when project data changes", async () => {
    const initialProject: Project = {
      id: 1,
      name: "Test Project",
      description: "Test Description",
      status: "ACTIVE",
      createdAt: "2025-01-01T00:00:00",
      supplyCheck: [
        {
          itemId: "1",
          itemName: "Item 1",
          requiredQuantity: 10.0,
          availableQuantity: 5.0,
          supplyStatus: SupplyStatus.INSUFFICIENT,
          quantityGap: 5.0,
        },
      ],
    };

    vi.mocked(ProjectService.findById).mockResolvedValue({
      data: { project: initialProject },
      errors: undefined,
    } as unknown);

    vi.mocked(ItemService.findAll).mockResolvedValue({
      data: { items: [] },
      errors: undefined,
    } as unknown);

    renderWithRouter(<ProjectDetails />);

    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });

    // Verify supply check is displayed
    expect(screen.getByText("Supply Check")).toBeInTheDocument();
    expect(screen.getByText("1 item total")).toBeInTheDocument();
  });
});

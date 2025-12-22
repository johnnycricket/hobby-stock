import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Projects } from "../Projects";
import { ProjectService } from "@/services/project-service";
import { ItemService } from "@/services/item-service";
import { ProjectStatus } from "@/types/ProjectStatus";

// Mock the services
vi.mock("@/services/project-service");
vi.mock("@/services/item-service");

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Projects - Empty Paginated Responses", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle empty content array in paginated response", async () => {
    vi.mocked(ProjectService.findAllPaginated).mockResolvedValue({
      data: {
        projectsPaginated: {
          content: [],
          pageInfo: {
            totalElements: 0,
            totalPages: 0,
            currentPage: 0,
            hasNext: false,
            hasPrevious: false,
          },
        },
      },
      errors: undefined,
    } as unknown);

    vi.mocked(ItemService.findAll).mockResolvedValue({
      data: { items: [] },
      errors: undefined,
    } as unknown);

    renderWithRouter(<Projects />);

    await waitFor(() => {
      expect(screen.getByText("No projects found.")).toBeInTheDocument();
    });

    expect(
      screen.getByText("Try adjusting your filters or create a new project.")
    ).toBeInTheDocument();
  });

  it("should handle undefined content in paginated response", async () => {
    vi.mocked(ProjectService.findAllPaginated).mockResolvedValue({
      data: {
        projectsPaginated: {
          content: undefined,
          pageInfo: {
            totalElements: 0,
            totalPages: 0,
            currentPage: 0,
            hasNext: false,
            hasPrevious: false,
          },
        },
      },
      errors: undefined,
    } as unknown);

    vi.mocked(ItemService.findAll).mockResolvedValue({
      data: { items: [] },
      errors: undefined,
    } as unknown);

    renderWithRouter(<Projects />);

    await waitFor(() => {
      expect(screen.getByText("No projects found.")).toBeInTheDocument();
    });
  });

  it("should handle missing projectsPaginated in response", async () => {
    vi.mocked(ProjectService.findAllPaginated).mockResolvedValue({
      data: {},
      errors: undefined,
    } as unknown);

    vi.mocked(ItemService.findAll).mockResolvedValue({
      data: { items: [] },
      errors: undefined,
    } as unknown);

    renderWithRouter(<Projects />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Invalid response format: missing projectsPaginated data"
        )
      ).toBeInTheDocument();
    });
  });

  it("should handle missing pageInfo in paginated response", async () => {
    vi.mocked(ProjectService.findAllPaginated).mockResolvedValue({
      data: {
        projectsPaginated: {
          content: [],
          pageInfo: undefined,
        },
      },
      errors: undefined,
    } as unknown);

    vi.mocked(ItemService.findAll).mockResolvedValue({
      data: { items: [] },
      errors: undefined,
    } as unknown);

    renderWithRouter(<Projects />);

    await waitFor(() => {
      expect(screen.getByText("No projects found.")).toBeInTheDocument();
    });
  });

  it("should display appropriate message when filtering by status returns no results", async () => {
    vi.mocked(ProjectService.findByStatusPaginated).mockResolvedValue({
      data: {
        projectsByStatusPaginated: {
          content: [],
          pageInfo: {
            totalElements: 0,
            totalPages: 0,
            currentPage: 0,
            hasNext: false,
            hasPrevious: false,
          },
        },
      },
      errors: undefined,
    } as unknown);

    vi.mocked(ItemService.findAll).mockResolvedValue({
      data: { items: [] },
      errors: undefined,
    } as unknown);

    renderWithRouter(<Projects />);

    // Change filter to a specific status
    const statusFilter = screen.getByLabelText(/Filter by Status:/i);
    statusFilter.dispatchEvent(
      new Event("change", { bubbles: true, cancelable: true })
    );

    await waitFor(() => {
      // The component should handle the empty response gracefully
      expect(
        screen.getByText(/No projects found with status/i)
      ).toBeInTheDocument();
    });
  });

  it("should handle projectsByStatusPaginated response structure correctly", async () => {
    const mockProject = {
      id: 1,
      name: "Filtered Project",
      description: "Test Description",
      status: ProjectStatus.ACTIVE,
      createdAt: "2025-01-01T00:00:00",
    };

    vi.mocked(ProjectService.findByStatusPaginated).mockResolvedValue({
      data: {
        projectsByStatusPaginated: {
          content: [mockProject],
          pageInfo: {
            totalElements: 1,
            totalPages: 1,
            currentPage: 0,
            hasNext: false,
            hasPrevious: false,
          },
        },
      },
      errors: undefined,
    } as unknown);

    vi.mocked(ItemService.findAll).mockResolvedValue({
      data: { items: [] },
      errors: undefined,
    } as unknown);

    renderWithRouter(<Projects />);

    // Change filter to ACTIVE status
    const statusFilter = screen.getByLabelText(/Filter by Status:/i);
    await userEvent.selectOptions(statusFilter, ProjectStatus.ACTIVE);

    await waitFor(() => {
      expect(screen.getByText("Filtered Project")).toBeInTheDocument();
    });
  });

  it("should handle empty content aft er filtering out completed projects", async () => {
    const user = userEvent.setup();
    const completedProject = {
      id: 1,
      name: "Completed Project",
      description: "Test",
      status: ProjectStatus.COMPLETED,
      createdAt: "2025-01-01T00:00:00",
    };

    vi.mocked(ProjectService.findAllPaginated).mockResolvedValue({
      data: {
        projectsPaginated: {
          content: [completedProject],
          pageInfo: {
            totalElements: 1,
            totalPages: 1,
            currentPage: 0,
            hasNext: false,
            hasPrevious: false,
          },
        },
      },
      errors: undefined,
    } as unknown);

    vi.mocked(ItemService.findAll).mockResolvedValue({
      data: { items: [] },
      errors: undefined,
    } as unknown);

    renderWithRouter(<Projects />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("Completed Project")).toBeInTheDocument();
    });

    // Uncheck "Show Completed Projects"
    const showCompletedCheckbox = screen.getByLabelText(
      /Show Completed Projects/i
    );
    await user.click(showCompletedCheckbox);

    await waitFor(() => {
      // After filtering out completed projects, content should be empty
      expect(screen.getByText("No projects found.")).toBeInTheDocument();
    });
  });

  it("should handle GraphQL errors gracefully", async () => {
    vi.mocked(ProjectService.findAllPaginated).mockResolvedValue({
      data: undefined,
      errors: [{ message: "GraphQL error occurred" }],
    } as unknown);

    renderWithRouter(<Projects />);

    await waitFor(() => {
      expect(screen.getByText("GraphQL error occurred")).toBeInTheDocument();
    });
  });

  it("should display projects when content array has items", async () => {
    const mockProject = {
      id: 1,
      name: "Test Project",
      description: "Test Description",
      status: ProjectStatus.ACTIVE,
      createdAt: "2025-01-01T00:00:00",
    };

    vi.mocked(ProjectService.findAllPaginated).mockResolvedValue({
      data: {
        projectsPaginated: {
          content: [mockProject],
          pageInfo: {
            totalElements: 1,
            totalPages: 1,
            currentPage: 0,
            hasNext: false,
            hasPrevious: false,
          },
        },
      },
      errors: undefined,
    } as unknown);

    vi.mocked(ItemService.findAll).mockResolvedValue({
      data: { items: [] },
      errors: undefined,
    } as unknown);

    renderWithRouter(<Projects />);

    await waitFor(() => {
      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    expect(screen.queryByText("No projects found.")).not.toBeInTheDocument();
  });
});

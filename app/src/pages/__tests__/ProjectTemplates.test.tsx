import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { ProjectTemplates } from "../ProjectTemplates";
import { ProjectTemplateService } from "@/services/project-template-service";
import { ProjectStatus } from "@/types/ProjectStatus";

// Mock the services
vi.mock("@/services/project-template-service");

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

describe("ProjectTemplates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render templates list", async () => {
    const mockTemplates = [
      {
        id: 1,
        name: "Arduino Template",
        description: "Basic Arduino project template",
        defaultStatus: ProjectStatus.PLANNING,
        createdAt: "2025-01-01T00:00:00",
        updatedAt: "2025-01-01T00:00:00",
        items: [],
      },
      {
        id: 2,
        name: "Woodworking Template",
        description: "Woodworking project template",
        defaultStatus: ProjectStatus.ACTIVE,
        createdAt: "2025-01-02T00:00:00",
        updatedAt: "2025-01-02T00:00:00",
        items: [],
      },
    ];

    vi.mocked(ProjectTemplateService.findAll).mockResolvedValue({
      data: {
        projectTemplates: mockTemplates,
      },
      errors: undefined,
    } as unknown);

    renderWithRouter(<ProjectTemplates />);

    await waitFor(() => {
      expect(screen.getByText("Arduino Template")).toBeInTheDocument();
      expect(screen.getByText("Woodworking Template")).toBeInTheDocument();
    });
  });

  it("should show empty state when no templates", async () => {
    vi.mocked(ProjectTemplateService.findAll).mockResolvedValue({
      data: {
        projectTemplates: [],
      },
      errors: undefined,
    } as unknown);

    renderWithRouter(<ProjectTemplates />);

    await waitFor(() => {
      expect(screen.getByText("No templates found.")).toBeInTheDocument();
      expect(
        screen.getByText("Create Your First Template")
      ).toBeInTheDocument();
    });
  });

  it("should navigate to new template page when clicking New Template", async () => {
    vi.mocked(ProjectTemplateService.findAll).mockResolvedValue({
      data: {
        projectTemplates: [],
      },
      errors: undefined,
    } as unknown);

    renderWithRouter(<ProjectTemplates />);

    await waitFor(() => {
      const newButton = screen.getByText("New Template");
      expect(newButton).toBeInTheDocument();
    });

    const newButton = screen.getByText("New Template");
    await userEvent.click(newButton);

    expect(mockNavigate).toHaveBeenCalledWith("/templates/new");
  });

  it("should delete template when confirmed", async () => {
    const mockTemplates = [
      {
        id: 1,
        name: "Test Template",
        description: "Test Description",
        defaultStatus: ProjectStatus.PLANNING,
        createdAt: "2025-01-01T00:00:00",
        updatedAt: "2025-01-01T00:00:00",
        items: [],
      },
    ];

    vi.mocked(ProjectTemplateService.findAll).mockResolvedValue({
      data: {
        projectTemplates: mockTemplates,
      },
      errors: undefined,
    } as unknown);

    vi.mocked(ProjectTemplateService.deleteTemplate).mockResolvedValue({
      data: {
        deleteProjectTemplate: {
          success: true,
          message: "Template deleted successfully",
          template: null,
        },
      },
      errors: undefined,
    } as unknown);

    renderWithRouter(<ProjectTemplates />);

    await waitFor(() => {
      expect(screen.getByText("Test Template")).toBeInTheDocument();
    });

    const deleteButton = screen.getByLabelText("Delete");
    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText("Are you sure you want to delete this template?")
      ).toBeInTheDocument();
    });

    const confirmButton = screen.getByText("Confirm");
    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(ProjectTemplateService.deleteTemplate).toHaveBeenCalledWith(1);
    });
  });

  it("should navigate to edit page when clicking edit", async () => {
    const mockTemplates = [
      {
        id: 1,
        name: "Test Template",
        description: "Test Description",
        defaultStatus: ProjectStatus.PLANNING,
        createdAt: "2025-01-01T00:00:00",
        updatedAt: "2025-01-01T00:00:00",
        items: [],
      },
    ];

    vi.mocked(ProjectTemplateService.findAll).mockResolvedValue({
      data: {
        projectTemplates: mockTemplates,
      },
      errors: undefined,
    } as unknown);

    renderWithRouter(<ProjectTemplates />);

    await waitFor(() => {
      expect(screen.getByText("Test Template")).toBeInTheDocument();
    });

    const editButton = screen.getByLabelText("Edit");
    await userEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith("/templates/1/edit");
  });

  it("should navigate to create project page when clicking Use Template", async () => {
    const mockTemplates = [
      {
        id: 1,
        name: "Test Template",
        description: "Test Description",
        defaultStatus: ProjectStatus.PLANNING,
        createdAt: "2025-01-01T00:00:00",
        updatedAt: "2025-01-01T00:00:00",
        items: [],
      },
    ];

    vi.mocked(ProjectTemplateService.findAll).mockResolvedValue({
      data: {
        projectTemplates: mockTemplates,
      },
      errors: undefined,
    } as unknown);

    renderWithRouter(<ProjectTemplates />);

    await waitFor(() => {
      expect(screen.getByText("Test Template")).toBeInTheDocument();
    });

    const useButton = screen.getByText("Use Template");
    await userEvent.click(useButton);

    expect(mockNavigate).toHaveBeenCalledWith("/projects/new?templateId=1");
  });
});




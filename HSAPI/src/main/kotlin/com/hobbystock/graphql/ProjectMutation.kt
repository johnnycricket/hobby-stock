package com.hobbystock.graphql

import com.hobbystock.services.ProjectService
import com.hobbystock.types.ProjectInput
import com.hobbystock.types.ProjectMutationResult
import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectMutationController @Autowired constructor(private val projectService: ProjectService) {
  @MutationMapping
  fun createProject(input: ProjectInput): ProjectMutationResult {
    return ProjectMutationResult(
            success = true,
            message = "Project created successfully",
            project = projectService.createProject(input)
    )
  }

  @MutationMapping
  fun updateProject(id: UUID, input: ProjectInput): ProjectMutationResult {
    return ProjectMutationResult(
            success = true,
            message = "Project updated successfully",
            project = projectService.updateProject(id, input)
    )
  }

  @MutationMapping
  fun deleteProject(id: UUID): ProjectMutationResult {
    return projectService.deleteProject(id)
  }

  @MutationMapping
  fun updateProjectStatus(id: UUID, status: String): ProjectMutationResult {
    return projectService.updateProjectStatus(id, status)
  }

  @MutationMapping
  fun completeProject(id: UUID, endDate: String?): ProjectMutationResult {
    return projectService.completeProject(id, endDate)
  }
}

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
  fun updateProject(id: String, input: ProjectInput): ProjectMutationResult {
    val uuid = UUID.fromString(id)
    return ProjectMutationResult(
            success = true,
            message = "Project updated successfully",
            project = projectService.updateProject(uuid, input)
    )
  }

  @MutationMapping
  fun deleteProject(id: String): ProjectMutationResult {
    val uuid = UUID.fromString(id)
    return projectService.deleteProject(uuid)
  }

  @MutationMapping
  fun updateProjectStatus(id: String, status: String): ProjectMutationResult {
    val uuid = UUID.fromString(id)
    return projectService.updateProjectStatus(uuid, status)
  }

  @MutationMapping
  fun completeProject(id: String, endDate: String?): ProjectMutationResult {
    val uuid = UUID.fromString(id)
    return projectService.completeProject(uuid, endDate)
  }
}

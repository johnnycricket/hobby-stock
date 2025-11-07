package com.hobbystock.graphql

import com.hobbystock.services.ProjectService
import com.hobbystock.types.ProjectInput
import com.hobbystock.types.ProjectMutationResult
import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectMutationController @Autowired constructor(private val projectService: ProjectService) {
  @MutationMapping
  fun createProject(@Argument input: ProjectInput): ProjectMutationResult {
    return ProjectMutationResult(
            success = true,
            message = "Project created successfully",
            project = projectService.createProject(input)
    )
  }

  @MutationMapping
  fun updateProject(@Argument id: String, @Argument input: ProjectInput): ProjectMutationResult {
    val uuid = UUID.fromString(id)
    return ProjectMutationResult(
            success = true,
            message = "Project updated successfully",
            project = projectService.updateProject(uuid, input)
    )
  }

  @MutationMapping
  fun deleteProject(@Argument id: String): ProjectMutationResult {
    val uuid = UUID.fromString(id)
    return projectService.deleteProject(uuid)
  }

  @MutationMapping
  fun updateProjectStatus(@Argument id: String, @Argument status: String): ProjectMutationResult {
    val uuid = UUID.fromString(id)
    return projectService.updateProjectStatus(uuid, status)
  }

  @MutationMapping
  fun completeProject(@Argument id: String, @Argument endDate: String?): ProjectMutationResult {
    val uuid = UUID.fromString(id)
    return projectService.completeProject(uuid, endDate)
  }
}

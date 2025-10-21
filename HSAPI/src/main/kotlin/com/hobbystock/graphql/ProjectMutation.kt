package com.hobbystock.graphql

import com.hobbystock.services.ProjectService
import com.hobbystock.types.ProjectInput
import com.hobbystock.types.ProjectMutationResult
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectMutationController @Autowired constructor(private val projectService: ProjectService) {
  @MutationMapping
  fun createProject(input: ProjectInput!): ProjectMutationResult! {
    return ProjectMutationResult(success = true, message = "Project created successfully", project = projectService.createProject(input))
  }
  
  @MutationMapping
  fun updateProject(id: Int!, input: ProjectInput!): ProjectMutationResult! {
    return ProjectMutationResult(success = true, message = "Project updated successfully", project = projectService.updateProject(id, input))
  }

  @MutationMapping
  fun deleteProject(id: Int!): ProjectMutationResult! {
    return projectService.deleteProject(id)
  }

  @MutationMapping
  fun updateProjectStatus(id: Int!, status: String!): ProjectMutationResult! {
    return ProjectMutationResult(success = true, message = "Project status updated successfully", project = projectService.updateProjectStatus(id, status))
  }

  @MutationMapping
  fun completeProject(id: Int!, endDate: String!): ProjectMutationResult! {
    return ProjectMutationResult(success = true, message = "Project completed successfully", project = projectService.completeProject(id, endDate))
  }
}
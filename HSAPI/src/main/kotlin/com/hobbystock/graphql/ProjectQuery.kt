package com.hobbystock.graphql

import com.hobbystock.services.ProjectService
import com.hobbystock.types.Project
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectQueryController {
  private val projectService: ProjectService

  constructor(projectService: ProjectService) {
    this.projectService = projectService
  }

  @QueryMapping
  fun projects(): List<Project> {
    return projectService.findAll()
  }

  @QueryMapping
  fun project(id: Int): Project {
    return projectService.findById(id)
            ?: throw NoSuchElementException("Project not found for id: $id")
  }

  @QueryMapping
  fun projectsByStatus(status: String): List<Project> {
    return projectService.findByStatus(status)
  }

  @QueryMapping
  fun searchProjects(searchTerm: String): List<Project> {
    return projectService.search(searchTerm)
  }
}

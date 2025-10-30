package com.hobbystock.graphql

import com.hobbystock.services.ProjectService
import com.hobbystock.types.Project
import com.hobbystock.types.ProjectPage
import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectQueryController @Autowired constructor(private val projectService: ProjectService) {
  @QueryMapping
  fun projects(): List<Project> {
    return projectService.findAll()
  }

  @QueryMapping
  fun project(@Argument id: String): Project {
    val uuid = UUID.fromString(id)
    return projectService.findById(uuid)
            ?: throw NoSuchElementException("Project not found for id: $id")
  }

  @QueryMapping
  fun projectsByStatus(@Argument status: String): List<Project> {
    return projectService.findByStatus(status)
  }

  @QueryMapping
  fun searchProjects(@Argument searchTerm: String): List<Project> {
    return projectService.search(searchTerm)
  }

  // Paginated queries
  @QueryMapping
  fun projectsPaginated(@Argument page: Int = 0, @Argument size: Int = 20): ProjectPage {
    return projectService.findAllPaginated(page, size)
  }

  @QueryMapping
  fun projectsByStatusPaginated(
          @Argument status: String,
          @Argument page: Int = 0,
          @Argument size: Int = 20
  ): ProjectPage {
    return projectService.findByStatusPaginated(status, page, size)
  }

  @QueryMapping
  fun searchProjectsPaginated(
          @Argument searchTerm: String,
          @Argument page: Int = 0,
          @Argument size: Int = 20
  ): ProjectPage {
    return projectService.searchPaginated(searchTerm, page, size)
  }
}

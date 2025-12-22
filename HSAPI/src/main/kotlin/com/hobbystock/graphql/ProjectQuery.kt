package com.hobbystock.graphql

import com.hobbystock.services.ProjectItemService
import com.hobbystock.services.ProjectService
import com.hobbystock.services.SupplyCheckService
import com.hobbystock.types.Project
import com.hobbystock.types.ProjectItem
import com.hobbystock.types.ProjectPage
import com.hobbystock.types.ProjectSupplyCheck
import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectQueryController
@Autowired
constructor(
        private val projectService: ProjectService,
        private val projectItemService: ProjectItemService,
        private val supplyCheckService: SupplyCheckService
) {
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
  fun projectsByStatus(@Argument status: com.hobbystock.types.ProjectStatus): List<Project> {
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
          @Argument status: com.hobbystock.types.ProjectStatus,
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

  @SchemaMapping(typeName = "Project", field = "items")
  fun items(project: Project): List<ProjectItem> {
    val projectUuid = project.id
    return projectItemService.findByProjectId(projectUuid)
  }

  @SchemaMapping(typeName = "Project", field = "supplyCheck")
  fun supplyCheck(project: Project): List<ProjectSupplyCheck> {
    val projectUuid = project.id
    return supplyCheckService.calculateSupplyCheck(projectUuid)
  }
}

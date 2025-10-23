package com.hobbystock.graphql

import com.hobbystock.services.ProjectItemService
import com.hobbystock.types.Project
import com.hobbystock.types.ProjectItem
import com.hobbystock.types.ProjectItemPage
import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectItemQueryController
@Autowired
constructor(private val projectItemService: ProjectItemService) {
  @QueryMapping
  fun projectItems(projectId: UUID): List<ProjectItem> {
    return projectItemService.findByProjectId(projectId)
  }

  @QueryMapping
  fun itemProjects(itemId: UUID): List<Project> {
    return projectItemService.findProjectsByItemId(itemId)
  }

  @QueryMapping
  fun projectItem(projectId: UUID, itemId: UUID): ProjectItem {
    return projectItemService.findByProjectIdAndItemId(projectId, itemId)
  }

  @QueryMapping
  fun searchProjectItems(searchTerm: String): List<ProjectItem> {
    return projectItemService.search(searchTerm)
  }

  // Paginated queries
  @QueryMapping
  fun projectItemsPaginated(page: Int = 0, size: Int = 20): ProjectItemPage {
    return projectItemService.findAllPaginated(page, size)
  }

  @QueryMapping
  fun projectItemsByProjectPaginated(
          projectId: UUID,
          page: Int = 0,
          size: Int = 20
  ): ProjectItemPage {
    return projectItemService.findByProjectIdPaginated(projectId, page, size)
  }

  @QueryMapping
  fun projectItemsByItemPaginated(itemId: UUID, page: Int = 0, size: Int = 20): ProjectItemPage {
    return projectItemService.findByItemIdPaginated(itemId, page, size)
  }
}

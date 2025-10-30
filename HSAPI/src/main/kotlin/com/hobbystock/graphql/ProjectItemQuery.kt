package com.hobbystock.graphql

import com.hobbystock.services.ProjectItemService
import com.hobbystock.types.Project
import com.hobbystock.types.ProjectItem
import com.hobbystock.types.ProjectItemPage
import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectItemQueryController
@Autowired
constructor(private val projectItemService: ProjectItemService) {
  @QueryMapping
  fun projectItems(@Argument projectId: String): List<ProjectItem> {
    val uuid = UUID.fromString(projectId)
    return projectItemService.findByProjectId(uuid)
  }

  @QueryMapping
  fun itemProjects(@Argument itemId: String): List<Project> {
    val uuid = UUID.fromString(itemId)
    return projectItemService.findProjectsByItemId(uuid)
  }

  @QueryMapping
  fun projectItem(@Argument projectId: String, @Argument itemId: String): ProjectItem {
    val projectUuid = UUID.fromString(projectId)
    val itemUuid = UUID.fromString(itemId)
    return projectItemService.findByProjectIdAndItemId(projectUuid, itemUuid)
  }

  @QueryMapping
  fun searchProjectItems(@Argument searchTerm: String): List<ProjectItem> {
    return projectItemService.search(searchTerm)
  }

  // Paginated queries
  @QueryMapping
  fun projectItemsPaginated(@Argument page: Int = 0, @Argument size: Int = 20): ProjectItemPage {
    return projectItemService.findAllPaginated(page, size)
  }

  @QueryMapping
  fun projectItemsByProjectPaginated(
          @Argument projectId: String,
          @Argument page: Int = 0,
          @Argument size: Int = 20
  ): ProjectItemPage {
    val uuid = UUID.fromString(projectId)
    return projectItemService.findByProjectIdPaginated(uuid, page, size)
  }

  @QueryMapping
  fun projectItemsByItemPaginated(
          @Argument itemId: String,
          @Argument page: Int = 0,
          @Argument size: Int = 20
  ): ProjectItemPage {
    val uuid = UUID.fromString(itemId)
    return projectItemService.findByItemIdPaginated(uuid, page, size)
  }
}

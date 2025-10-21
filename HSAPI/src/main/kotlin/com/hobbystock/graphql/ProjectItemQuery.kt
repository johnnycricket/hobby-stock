package com.hobbystock.graphql

import com.hobbystock.services.ProjectItemService
import com.hobbystock.types.ProjectItem
import com.hobbystock.types.ProjectItemPage
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectItemQueryController @Autowired constructor(private val projectItemService: ProjectItemService) {
  @QueryMapping
  fun projectItems(projectId: Int!): List<ProjectItem> {
    return projectItemService.findByProjectId(projectId)
  }
  
  @QueryMapping
  fun itemProjects(itemId: Int!): List<Project> {
    return projectItemService.findByItemId(itemId)
  }

  @QueryMapping
  fun projectItem(projectId: Int!, itemId: Int!): ProjectItem {
    return projectItemService.findByProjectIdAndItemId(projectId, itemId)
  }

  @QueryMapping
  fun searchProjectItems(searchTerm: String!): List<ProjectItem> {
    return projectItemService.search(searchTerm)
  }
  
  // Paginated queries
  @QueryMapping
  fun projectItemsPaginated(page: Int, size: Int): ProjectItemPage {
    return projectItemService.findAllPaginated(page, size)
  }
  
  @QueryMapping
  fun projectItemsByProjectPaginated(projectId: Int!, page: Int, size: Int): ProjectItemPage {
    return projectItemService.findByProjectIdPaginated(projectId, page, size)
  }
  
  @QueryMapping
  fun projectItemsByItemPaginated(itemId: Int!, page: Int, size: Int): ProjectItemPage {
    return projectItemService.findByItemIdPaginated(itemId, page, size)
  }
}
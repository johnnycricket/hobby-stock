package com.hobbystock.graphql

import com.hobbystock.services.ProjectItemService
import com.hobbystock.types.ProjectItem
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectItemQueryController {
  private val projectItemService: ProjectItemService
  
  constructor(projectItemService: ProjectItemService) {
    this.projectItemService = projectItemService
  }

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
}
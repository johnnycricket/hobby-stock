package com.hobbystock.graphql

import com.hobbystock.services.ProjectItemService
import com.hobbystock.types.ProjectItemInput
import com.hobbystock.types.ProjectItemMutationResult
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectItemMutationController {
  private val projectItemService: ProjectItemService
 
  constructor(projectItemService: ProjectItemService) {
    this.projectItemService = projectItemService
  }

  @MutationMapping
  fun addItemToProject(input: ProjectItemInput!): ProjectItemMutationResult! {
    return projectItemService.addItemToProject(input)
  }
  
  @MutationMapping
  fun removeItemFromProject(id: Int!): ProjectItemMutationResult! {
    return projectItemService.removeItemFromProject(id)
  }

  @MutationMapping
  fun updateProjectItem(id: Int!, quantityUsed: Int!): ProjectItemMutationResult! {
    return projectItemService.updateProjectItem(id, quantityUsed)
  }

  @MutationMapping
  fun removeItemFromProjectByIds(projectId: Int!, itemId: Int!): ProjectItemMutationResult! {
    return projectItemService.removeItemFromProjectByIds(projectId, itemId)
  }
}
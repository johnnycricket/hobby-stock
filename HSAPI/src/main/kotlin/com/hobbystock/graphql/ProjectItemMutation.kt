package com.hobbystock.graphql

import com.hobbystock.services.ProjectItemService
import com.hobbystock.types.ProjectItemInput
import com.hobbystock.types.ProjectItemMutationResult
import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectItemMutationController
@Autowired
constructor(private val projectItemService: ProjectItemService) {
  @MutationMapping
  fun addItemToProject(input: ProjectItemInput): ProjectItemMutationResult {
    return projectItemService.addItemToProject(input)
  }

  @MutationMapping
  fun removeItemFromProject(id: UUID): ProjectItemMutationResult {
    return projectItemService.removeItemFromProject(id)
  }

  @MutationMapping
  fun updateProjectItem(id: UUID, quantityUsed: Int): ProjectItemMutationResult {
    return projectItemService.updateProjectItem(id, quantityUsed)
  }

  @MutationMapping
  fun removeItemFromProjectByIds(projectId: UUID, itemId: UUID): ProjectItemMutationResult {
    return projectItemService.removeItemFromProjectByIds(projectId, itemId)
  }
}

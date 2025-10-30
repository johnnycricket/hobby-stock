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
  fun removeItemFromProject(id: String): ProjectItemMutationResult {
    val uuid = UUID.fromString(id)
    return projectItemService.removeItemFromProject(uuid)
  }

  @MutationMapping
  fun updateProjectItem(id: String, quantityUsed: Int): ProjectItemMutationResult {
    val uuid = UUID.fromString(id)
    return projectItemService.updateProjectItem(uuid, quantityUsed)
  }

  @MutationMapping
  fun removeItemFromProjectByIds(projectId: String, itemId: String): ProjectItemMutationResult {
    val projectUuid = UUID.fromString(projectId)
    val itemUuid = UUID.fromString(itemId)
    return projectItemService.removeItemFromProjectByIds(projectUuid, itemUuid)
  }
}

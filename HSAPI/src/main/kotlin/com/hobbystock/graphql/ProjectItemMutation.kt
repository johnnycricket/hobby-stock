package com.hobbystock.graphql

import com.hobbystock.services.ProjectItemService
import com.hobbystock.types.ProjectItemInput
import com.hobbystock.types.ProjectItemMutationResult
import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectItemMutationController
@Autowired
constructor(private val projectItemService: ProjectItemService) {
  @MutationMapping
  fun addItemToProject(@Argument input: ProjectItemInput): ProjectItemMutationResult {
    val projectUuid = UUID.fromString(input.projectId)
    val itemUuid = UUID.fromString(input.itemId)
    return projectItemService.addItemToProject(projectUuid, itemUuid, input.quantityUsed)
  }

  @MutationMapping
  fun removeItemFromProject(@Argument id: String): ProjectItemMutationResult {
    val uuid = UUID.fromString(id)
    return projectItemService.removeItemFromProject(uuid)
  }

  @MutationMapping
  fun updateProjectItem(
          @Argument id: String,
          @Argument quantityUsed: Float
  ): ProjectItemMutationResult {
    val uuid = UUID.fromString(id)
    return projectItemService.updateProjectItem(uuid, quantityUsed)
  }

  @MutationMapping
  fun removeItemFromProjectByIds(
          @Argument projectId: String,
          @Argument itemId: String
  ): ProjectItemMutationResult {
    val projectUuid = UUID.fromString(projectId)
    val itemUuid = UUID.fromString(itemId)
    return projectItemService.removeItemFromProjectByIds(projectUuid, itemUuid)
  }
}

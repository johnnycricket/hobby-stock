package com.hobbystock.services

import com.hobbystock.entities.ProjectItemsEntity
import com.hobbystock.repositories.ProjectItemRepository
import com.hobbystock.types.ProjectItem
import com.hobbystock.types.ProjectItemInput
import com.hobbystock.types.ProjectItemMutationResult
import org.springframework.stereotype.Service

@Service
class ProjectItemService(private val projectItemRepository: ProjectItemRepository) {

  fun findByProjectId(projectId: Int): List<ProjectItem> =
          projectItemRepository.findByProjectId(projectId.toLong()).map { it.toGraphQLType() }
  fun findByItemId(itemId: Int): List<ProjectItem> =
          projectItemRepository.findByItemId(itemId.toLong()).map { it.toGraphQLType() }
  fun findByProjectIdAndItemId(projectId: Int, itemId: Int): ProjectItem =
          projectItemRepository
                  .findByProjectIdAndItemId(projectId.toLong(), itemId.toLong())
                  ?.toGraphQLType()
  fun search(searchTerm: String): List<ProjectItem> =
          projectItemRepository.search(searchTerm).map { it.toGraphQLType() }
  fun addItemToProject(input: ProjectItemInput): ProjectItemMutationResult {
    val entity =
            ProjectItemsEntity(
                    projectId = input.projectId.toLong(),
                    itemId = input.itemId.toLong(),
                    quantityUsed = input.quantityUsed
            )
    return projectItemRepository.save(entity).toGraphQLType()
  }
  fun removeItemFromProject(id: Int): ProjectItemMutationResult {
    return projectItemRepository.removeItemFromProject(id.toLong()).toGraphQLType()
  }
  fun updateProjectItem(id: Int, quantityUsed: Int): ProjectItemMutationResult {
    val entity =
            projectItemRepository.findById(id.toLong()).orElseThrow {
              NoSuchElementException("Project item not found")
            }
    entity.quantityUsed = quantityUsed
    return projectItemRepository.save(entity).toGraphQLType()
  }
  fun removeItemFromProjectByIds(projectId: Int, itemId: Int): ProjectItemMutationResult {
    return projectItemRepository
            .removeItemFromProjectByIds(projectId.toLong(), itemId.toLong())
            .toGraphQLType()
  }
}

private fun ProjectItemsEntity.toGraphQLType(): ProjectItem =
        ProjectItem(
                id = this.id.toInt(),
                projectId = this.projectId.toInt(),
                itemId = this.itemId.toInt(),
                quantityUsed = this.quantityUsed,
                createdAt = this.createdAt.toString()
        )

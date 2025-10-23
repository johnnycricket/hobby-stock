package com.hobbystock.services

import com.hobbystock.entities.ProjectItemsEntity
import com.hobbystock.entities.ProjectsEntity
import com.hobbystock.repositories.ProjectItemRepository
import com.hobbystock.types.PageInfo
import com.hobbystock.types.Project
import com.hobbystock.types.ProjectItem
import com.hobbystock.types.ProjectItemInput
import com.hobbystock.types.ProjectItemMutationResult
import com.hobbystock.types.ProjectItemPage
import java.util.UUID
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ProjectItemService(private val projectItemRepository: ProjectItemRepository) {

        fun findByProjectId(projectId: UUID): List<ProjectItem> =
                projectItemRepository.findByProjectId(projectId).map { it.toGraphQLType() }
        fun findByItemId(itemId: UUID): List<ProjectItem> =
                projectItemRepository.findByItemId(itemId).map { it.toGraphQLType() }

        fun findProjectsByItemId(itemId: UUID): List<Project> =
                projectItemRepository.findByItemId(itemId).map {
                        it.project?.toProjectGraphQLType()
                                ?: throw IllegalStateException("Project not found")
                }
        fun findByProjectIdAndItemId(projectId: UUID, itemId: UUID): ProjectItem =
                projectItemRepository.findByProjectIdAndItemId(projectId, itemId)?.toGraphQLType()
                        ?: throw NoSuchElementException("Project item not found")
        fun search(searchTerm: String): List<ProjectItem> =
                projectItemRepository
                        .findAll()
                        .filter {
                                it.item?.name?.contains(searchTerm, ignoreCase = true) == true ||
                                        it.item?.description?.contains(
                                                searchTerm,
                                                ignoreCase = true
                                        ) == true
                        }
                        .map { it.toGraphQLType() }

        // Paginated methods
        fun findAllPaginated(page: Int = 0, size: Int = 20): ProjectItemPage {
                val pageable = PageRequest.of(page, size)
                val pageResult = projectItemRepository.findAll(pageable)

                return ProjectItemPage(
                        content = pageResult.content.map { it.toGraphQLType() },
                        pageInfo =
                                PageInfo(
                                        totalElements = pageResult.totalElements,
                                        totalPages = pageResult.totalPages,
                                        currentPage = pageResult.number,
                                        hasNext = pageResult.hasNext(),
                                        hasPrevious = pageResult.hasPrevious()
                                )
                )
        }

        fun findByProjectIdPaginated(
                projectId: UUID,
                page: Int = 0,
                size: Int = 20
        ): ProjectItemPage {
                val pageable = PageRequest.of(page, size)
                val pageResult = projectItemRepository.findByProjectId(projectId, pageable)

                return ProjectItemPage(
                        content = pageResult.content.map { it.toGraphQLType() },
                        pageInfo =
                                PageInfo(
                                        totalElements = pageResult.totalElements,
                                        totalPages = pageResult.totalPages,
                                        currentPage = pageResult.number,
                                        hasNext = pageResult.hasNext(),
                                        hasPrevious = pageResult.hasPrevious()
                                )
                )
        }

        fun findByItemIdPaginated(itemId: UUID, page: Int = 0, size: Int = 20): ProjectItemPage {
                val pageable = PageRequest.of(page, size)
                val pageResult = projectItemRepository.findByItemId(itemId, pageable)

                return ProjectItemPage(
                        content = pageResult.content.map { it.toGraphQLType() },
                        pageInfo =
                                PageInfo(
                                        totalElements = pageResult.totalElements,
                                        totalPages = pageResult.totalPages,
                                        currentPage = pageResult.number,
                                        hasNext = pageResult.hasNext(),
                                        hasPrevious = pageResult.hasPrevious()
                                )
                )
        }

        @Transactional
        fun removeItemFromProject(id: UUID): ProjectItemMutationResult {
                return try {
                        val entity =
                                projectItemRepository.findById(id).orElseThrow {
                                        NoSuchElementException("Project item not found")
                                }
                        projectItemRepository.delete(entity)
                        ProjectItemMutationResult(
                                success = true,
                                message = "Item removed from project successfully",
                                projectItem = null
                        )
                } catch (e: Exception) {
                        ProjectItemMutationResult(
                                success = false,
                                message = "Item not found",
                                projectItem = null
                        )
                }
        }

        @Transactional
        fun addItemToProject(input: ProjectItemInput): ProjectItemMutationResult {
                val entity =
                        ProjectItemsEntity(
                                projectId = input.projectId,
                                itemId = input.itemId,
                                quantityUsed = input.quantityUsed ?: 0
                        )
                val savedProjectItem = projectItemRepository.save(entity).toGraphQLType()
                return ProjectItemMutationResult(
                        success = true,
                        message = "Item added to project successfully",
                        projectItem = savedProjectItem
                )
        }
        @Transactional
        fun updateProjectItem(id: UUID, quantityUsed: Int): ProjectItemMutationResult {
                val entity =
                        projectItemRepository.findById(id).orElseThrow {
                                NoSuchElementException("Project item not found")
                        }
                val updatedEntity = entity.copy(quantityUsed = quantityUsed)
                val savedProjectItem = projectItemRepository.save(updatedEntity).toGraphQLType()
                return ProjectItemMutationResult(
                        success = true,
                        message = "Project item updated successfully",
                        projectItem = savedProjectItem
                )
        }
        @Transactional
        fun removeItemFromProjectByIds(projectId: UUID, itemId: UUID): ProjectItemMutationResult {
                return try {
                        val entity =
                                projectItemRepository.findByProjectIdAndItemId(projectId, itemId)
                                        ?: throw NoSuchElementException("Project item not found")
                        projectItemRepository.delete(entity)
                        ProjectItemMutationResult(
                                success = true,
                                message = "Item removed from project successfully",
                                projectItem = null
                        )
                } catch (e: Exception) {
                        ProjectItemMutationResult(
                                success = false,
                                message = "Item not found",
                                projectItem = null
                        )
                }
        }
}

private fun ProjectItemsEntity.toGraphQLType(): ProjectItem =
        ProjectItem(
                id = this.id!!,
                projectId = this.projectId,
                itemId = this.itemId,
                quantityUsed = this.quantityUsed,
                createdAt = this.createdAt.toString()
        )

private fun ProjectsEntity.toProjectGraphQLType(): Project =
        Project(
                id = this.id!!,
                name = this.name,
                description = this.description,
                status = this.status,
                startDate = this.startDate?.toString(),
                endDate = this.endDate?.toString(),
                createdAt = this.createdAt.toString(),
                updatedAt = this.updatedAt?.toString()
        )

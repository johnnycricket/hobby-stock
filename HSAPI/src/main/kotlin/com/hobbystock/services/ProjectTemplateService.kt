package com.hobbystock.services

import com.hobbystock.entities.ProjectTemplateEntity
import com.hobbystock.entities.ProjectTemplateItemEntity
import com.hobbystock.repositories.ProjectTemplateItemRepository
import com.hobbystock.repositories.ProjectTemplateRepository
import com.hobbystock.types.PageInfo
import com.hobbystock.types.Project
import com.hobbystock.types.ProjectInput
import com.hobbystock.types.ProjectMutationResult
import com.hobbystock.types.ProjectTemplate
import com.hobbystock.types.ProjectTemplateInput
import com.hobbystock.types.ProjectTemplateItem
import com.hobbystock.types.ProjectTemplateItemInput
import com.hobbystock.types.ProjectTemplateMutationResult
import com.hobbystock.types.ProjectTemplatePage
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ProjectTemplateService(
        private val templateRepository: ProjectTemplateRepository,
        private val templateItemRepository: ProjectTemplateItemRepository,
        private val projectService: ProjectService,
        private val projectItemService: ProjectItemService,
        private val itemService: ItemService
) {
        fun findAll(): List<ProjectTemplate> {
                val templates = templateRepository.findAll()
                return templates.map { entity ->
                        val template = entity.toGraphQLType()
                        val items = templateItemRepository.findByTemplateId(entity.id!!).map { it.toGraphQLType() }
                        template.copy(items = items)
                }
        }

        fun findById(id: Long): ProjectTemplate? {
                val entity = templateRepository.findById(id).orElse(null) ?: return null
                val template = entity.toGraphQLType()
                // Load items
                val items = templateItemRepository.findByTemplateId(id).map { it.toGraphQLType() }
                return template.copy(items = items)
        }

        fun findAllPaginated(page: Int = 0, size: Int = 20): ProjectTemplatePage {
                val pageable = PageRequest.of(page, size)
                val pageResult = templateRepository.findAll(pageable)

                val templates = pageResult.content.map { entity ->
                        val template = entity.toGraphQLType()
                        val items = templateItemRepository.findByTemplateId(entity.id!!).map { it.toGraphQLType() }
                        template.copy(items = items)
                }

                return ProjectTemplatePage(
                        content = templates,
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
        fun createTemplate(input: ProjectTemplateInput): ProjectTemplate {
                val entity =
                        ProjectTemplateEntity(
                                name = input.name,
                                description = input.description,
                                defaultStatus = input.defaultStatus,
                                createdAt = LocalDateTime.now(),
                                updatedAt = LocalDateTime.now()
                        )
                val savedTemplate = templateRepository.save(entity)

                // Save template items if provided
                input.items?.forEach { itemInput ->
                        val itemId = UUID.fromString(itemInput.itemId)
                        // Validate item exists
                        itemService.findById(itemId)
                                ?: throw NoSuchElementException("Item not found: ${itemInput.itemId}")

                        val templateItem =
                                ProjectTemplateItemEntity(
                                        templateId = savedTemplate.id!!,
                                        itemId = itemId,
                                        quantityUsed = itemInput.quantityUsed,
                                        createdAt = LocalDateTime.now()
                                )
                        templateItemRepository.save(templateItem)
                }

                val template = savedTemplate.toGraphQLType()
                val items = templateItemRepository.findByTemplateId(savedTemplate.id!!).map { it.toGraphQLType() }
                return template.copy(items = items)
        }

        @Transactional
        fun updateTemplate(id: Long, input: ProjectTemplateInput): ProjectTemplate {
                val existing =
                        templateRepository.findById(id).orElseThrow {
                                NoSuchElementException("Template not found")
                        }

                val updatedEntity =
                        existing.copy(
                                name = input.name,
                                description = input.description,
                                defaultStatus = input.defaultStatus,
                                updatedAt = LocalDateTime.now()
                        )
                val savedTemplate = templateRepository.save(updatedEntity)

                // Delete existing template items
                templateItemRepository.deleteByTemplateId(id)

                // Save new template items if provided
                input.items?.forEach { itemInput ->
                        val itemId = UUID.fromString(itemInput.itemId)
                        // Validate item exists
                        itemService.findById(itemId)
                                ?: throw NoSuchElementException("Item not found: ${itemInput.itemId}")

                        val templateItem =
                                ProjectTemplateItemEntity(
                                        templateId = savedTemplate.id!!,
                                        itemId = itemId,
                                        quantityUsed = itemInput.quantityUsed,
                                        createdAt = LocalDateTime.now()
                                )
                        templateItemRepository.save(templateItem)
                }

                val template = savedTemplate.toGraphQLType()
                val items = templateItemRepository.findByTemplateId(savedTemplate.id!!).map { it.toGraphQLType() }
                return template.copy(items = items)
        }

        @Transactional
        fun deleteTemplate(id: Long): ProjectTemplateMutationResult {
                return try {
                        if (!templateRepository.existsById(id)) {
                                return ProjectTemplateMutationResult(
                                        success = false,
                                        message = "Template not found",
                                        template = null
                                )
                        }
                        templateRepository.deleteById(id)
                        ProjectTemplateMutationResult(
                                success = true,
                                message = "Template deleted successfully",
                                template = null
                        )
                } catch (e: Exception) {
                        ProjectTemplateMutationResult(
                                success = false,
                                message = "Failed to delete template: ${e.message}",
                                template = null
                        )
                }
        }

        @Transactional
        fun createProjectFromTemplate(
                templateId: Long,
                projectInput: ProjectInput
        ): ProjectMutationResult {
                val template =
                        templateRepository.findById(templateId).orElseThrow {
                                NoSuchElementException("Template not found")
                        }

                // Create project with input data (which may override template defaults)
                val project = projectService.createProject(projectInput)

                // Get template items
                val templateItems = templateItemRepository.findByTemplateId(templateId)

                // Add all template items to the new project
                templateItems.forEach { templateItem ->
                        projectItemService.addItemToProject(
                                project.id,
                                templateItem.itemId,
                                templateItem.quantityUsed.toFloat()
                        )
                }

                // Return the complete project with items
                val projectWithItems = projectService.findById(project.id)
                return ProjectMutationResult(
                        success = true,
                        message = "Project created from template successfully",
                        project = projectWithItems
                )
        }
}

private fun ProjectTemplateEntity.toGraphQLType(): ProjectTemplate =
        ProjectTemplate(
                id = this.id!!,
                name = this.name,
                description = this.description,
                defaultStatus = this.defaultStatus,
                createdAt = this.createdAt.toString(),
                updatedAt = this.updatedAt.toString(),
                items = null // Will be loaded by GraphQL resolver if needed
        )

private fun ProjectTemplateItemEntity.toGraphQLType(): ProjectTemplateItem =
        ProjectTemplateItem(
                id = this.id!!,
                templateId = this.templateId,
                itemId = this.itemId,
                quantityUsed = this.quantityUsed,
                createdAt = this.createdAt.toString(),
                item = null // Will be loaded by GraphQL resolver if needed
        )


package com.hobbystock.types

import java.util.UUID

data class ProjectTemplate(
        val id: Long,
        val name: String,
        val description: String?,
        val defaultStatus: ProjectStatus,
        val createdAt: String,
        val updatedAt: String?,
        val items: List<ProjectTemplateItem>? = null
)

data class ProjectTemplateItem(
        val id: Long,
        val templateId: Long,
        val itemId: UUID,
        val quantityUsed: java.math.BigDecimal,
        val createdAt: String,
        val item: com.hobbystock.types.Item? = null
)

data class ProjectTemplateInput(
        val name: String,
        val description: String?,
        val defaultStatus: ProjectStatus,
        val items: List<ProjectTemplateItemInput>? = null
)

data class ProjectTemplateItemInput(
        val itemId: String,
        val quantityUsed: java.math.BigDecimal
)

data class ProjectTemplatePage(val content: List<ProjectTemplate>, val pageInfo: PageInfo)

data class ProjectTemplateMutationResult(
        val success: Boolean,
        val message: String?,
        val template: ProjectTemplate?
)




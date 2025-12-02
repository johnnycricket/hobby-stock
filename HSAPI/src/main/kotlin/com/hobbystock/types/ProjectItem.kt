package com.hobbystock.types

import java.util.UUID

data class ProjectItem(
        val id: UUID,
        val projectId: UUID,
        val itemId: UUID,
        val quantityUsed: Float?,
        val createdAt: String
)

data class ProjectItemInput(val projectId: String, val itemId: String, val quantityUsed: Float?)

data class ProjectItemMutationResult(
        val success: Boolean,
        val message: String?,
        val projectItem: ProjectItem?
)

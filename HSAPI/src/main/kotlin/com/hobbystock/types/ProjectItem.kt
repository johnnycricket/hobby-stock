package com.hobbystock.types

import java.util.UUID

data class ProjectItem(
        val id: UUID,
        val projectId: UUID,
        val itemId: UUID,
        val quantityUsed: Int?,
        val createdAt: String
)

data class ProjectItemInput(val projectId: UUID, val itemId: UUID, val quantityUsed: Int?)

data class ProjectItemMutationResult(
        val success: Boolean,
        val message: String?,
        val projectItem: ProjectItem?
)

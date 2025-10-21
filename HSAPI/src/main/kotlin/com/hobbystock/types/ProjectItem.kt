package com.hobbystock.types

data class ProjectItem(
        val id: Int,
        val projectId: Int,
        val itemId: Int,
        val quantityUsed: Int?,
        val createdAt: String
)

data class ProjectItemInput(val projectId: Int, val itemId: Int, val quantityUsed: Int?)

data class ProjectItemMutationResult(
        val success: Boolean,
        val message: String?,
        val projectItem: ProjectItem?
)

package com.hobbystock.types

import java.util.UUID

data class Project(
        val id: UUID,
        val name: String,
        val description: String?,
        val status: ProjectStatus,
        val startDate: String?,
        val endDate: String?,
        val createdAt: String,
        val updatedAt: String?,
        val items: List<ProjectItem>? = null
)

data class ProjectInput(
        val name: String,
        val description: String?,
        val status: ProjectStatus,
        val startDate: String?,
        val endDate: String?
)

data class ProjectMutationResult(val success: Boolean, val message: String?, val project: Project?)

package com.hobbystock.types

data class Project(
        val id: Int,
        val name: String,
        val description: String?,
        val status: String,
        val startDate: String?,
        val endDate: String?,
        val createdAt: String,
        val updatedAt: String?,
        val items: List<ProjectItem>? = null
)

data class ProjectInput(
        val name: String,
        val description: String?,
        val status: String,
        val startDate: String?,
        val endDate: String?
)

data class ProjectMutationResult(val success: Boolean, val message: String?, val project: Project?)

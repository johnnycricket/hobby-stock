package com.hobbystock.types

data class PageInfo(
        val totalElements: Long,
        val totalPages: Int,
        val currentPage: Int,
        val hasNext: Boolean,
        val hasPrevious: Boolean
)

data class ItemPage(val content: List<Item>, val pageInfo: PageInfo)

data class ProjectPage(val content: List<Project>, val pageInfo: PageInfo)

data class CategoryPage(val content: List<Category>, val pageInfo: PageInfo)

data class ProjectItemPage(val content: List<ProjectItem>, val pageInfo: PageInfo)

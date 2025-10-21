package com.hobbystock.types

data class Category(val id: Int, val name: String, val description: String?)

data class CategoryInput(val name: String, val description: String?)

data class CategoryMutationResult(
        val success: Boolean,
        val message: String?,
        val category: Category?
)

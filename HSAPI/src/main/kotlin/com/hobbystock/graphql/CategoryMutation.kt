package com.hobbystock.graphql

import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.stereotype.Controller
import com.hobbystock.services.CategoryService
import com.hobbystock.types.CategoryMutationResult
import com.hobbystock.types.CategoryInput

@Controller
class CategoryMutationController @Autowired constructor(private val categoryService: CategoryService) {
    @MutationMapping
    fun createCategory(input: CategoryInput!): CategoryMutationResult! {
        return CategoryMutationResult(success = true, message = "Category created successfully", category = categoryService.createCategory(input))
    }

    @MutationMapping
    fun updateCategory(id: Int, input: CategoryInput!): CategoryMutationResult! {
        return CategoryMutationResult(success = true, message = "Category updated successfully", category = categoryService.updateCategory(id, input))
    }

    @MutationMapping
fun deleteCategory(id: Int): CategoryMutationResult {
    val deletedCategory = categoryService.findById(id)  // Get before delete
    categoryService.deleteCategory(id)
    return CategoryMutationResult(
        success = true,
        message = "Category deleted successfully",
        category = deletedCategory
    )
}
}
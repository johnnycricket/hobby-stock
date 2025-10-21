package com.hobbystock.services

import com.hobbystock.entities.CategoryEntity
import com.hobbystock.repositories.CategoryRepository
import com.hobbystock.types.Category
import com.hobbystock.types.CategoryInput
import com.hobbystock.types.MutationResult
import org.springframework.stereotype.Service

@Service
class CategoryService(private val categoryRepository: CategoryRepository) {
  fun findAll(): List<Category> = categoryRepository.findAll().map { it.toGraphQLType() }

  fun findById(id: Int): Category? =
          categoryRepository.findById(id.toLong()).orElse(null)?.toGraphQLType()

  fun createCategory(category: CategoryInput): Category {
    val entity =
            CategoryEntity(
                    id = 0L, // Assuming new entity; set to 0 or null for auto-generated
                    name = category.name,
                    description = category.description
            )
    return categoryRepository.save(entity).toGraphQLType()
  }

  fun updateCategory(id: Int, category: CategoryInput): Category {
    val existing =
            categoryRepository.findById(id.toLong()).orElseThrow {
              NoSuchElementException("Category not found")
            }
    val updatedEntity = existing.copy(name = category.name, description = category.description)
    return categoryRepository.save(updatedEntity).toGraphQLType()
  }

  fun deleteCategory(id: Int): MutationResult {
    return try {
      categoryRepository.deleteById(id.toLong())
      MutationResult(success = true, message = "Category deleted successfully")
    } catch (e: Exception) {
      MutationResult(success = false, message = "Category not found")
    }
  }
}

private fun CategoryEntity.toGraphQLType(): Category =
        Category(id = this.id.toInt(), name = this.name, description = this.description)

package com.hobbystock.services

import com.hobbystock.entities.CategoryEntity
import com.hobbystock.repositories.CategoryRepository
import com.hobbystock.types.Category
import com.hobbystock.types.CategoryInput
import com.hobbystock.types.CategoryPage
import com.hobbystock.types.MutationResult
import com.hobbystock.types.PageInfo
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CategoryService(private val categoryRepository: CategoryRepository) {
  fun findAll(): List<Category> = categoryRepository.findAll().map { it.toGraphQLType() }

  fun findById(id: Int): Category? =
          categoryRepository.findById(id.toLong()).orElse(null)?.toGraphQLType()

  // Paginated methods
  fun findAllPaginated(page: Int = 0, size: Int = 20): CategoryPage {
    val pageable = PageRequest.of(page, size)
    val pageResult = categoryRepository.findAll(pageable)

    return CategoryPage(
            content = pageResult.content.map { it.toGraphQLType() },
            pageInfo =
                    PageInfo(
                            totalElements = pageResult.totalElements,
                            totalPages = pageResult.totalPages,
                            currentPage = pageResult.number,
                            hasNext = pageResult.hasNext(),
                            hasPrevious = pageResult.hasPrevious()
                    )
    )
  }

  @Transactional
  fun createCategory(category: CategoryInput): Category {
    val entity =
            CategoryEntity(
                    id = 0, // Assuming new entity; set to 0 or null for auto-generated
                    name = category.name,
                    description = category.description
            )
    return categoryRepository.save(entity).toGraphQLType()
  }

  @Transactional
  fun updateCategory(id: Int, category: CategoryInput): Category {
    val existing =
            categoryRepository.findById(id.toLong()).orElseThrow {
              NoSuchElementException("Category not found")
            }
    val updatedEntity = existing.copy(name = category.name, description = category.description)
    return categoryRepository.save(updatedEntity).toGraphQLType()
  }

  @Transactional
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

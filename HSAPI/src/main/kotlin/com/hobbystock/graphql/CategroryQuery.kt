package com.hobbystock.graphql

import com.hobbystock.services.CategoryService
import com.hobbystock.types.Category
import com.hobbystock.types.CategoryPage
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class CategoryQueryController @Autowired constructor(private val categoryService: CategoryService) {

  @QueryMapping
  fun categories(): List<Category> {
    return categoryService.findAll()
  }

  @QueryMapping
  fun category(@Argument id: Int): Category {
    return categoryService.findById(id)
            ?: throw NoSuchElementException("Category not found for id: $id")
  }

  // Paginated queries
  @QueryMapping
  fun categoriesPaginated(@Argument page: Int = 0, @Argument size: Int = 20): CategoryPage {
    return categoryService.findAllPaginated(page, size)
  }
}

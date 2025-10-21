package com.hobbystock.graphql

import com.hobbystock.services.CategoryService
import com.hobbystock.types.Category
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class CategoryQueryController @Autowired constructor(private val categoryService: CategoryService) {

  @QueryMapping
  fun categories(): List<Category> {
    return categoryService.findAll()
  }

  @QueryMapping
  fun category(id: Int): Category {
    return categoryService.findById(id)
            ?: throw NoSuchElementException("Category not found for id: $id")
  }
}

package com.hobbystock.repositories

import com.hobbystock.entities.CategoryEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CategoryRepository : JpaRepository<CategoryEntity, Long> {
  fun findByName(name: String): CategoryEntity?

  // Paginated methods
  fun findAll(pageable: Pageable): Page<CategoryEntity>
}

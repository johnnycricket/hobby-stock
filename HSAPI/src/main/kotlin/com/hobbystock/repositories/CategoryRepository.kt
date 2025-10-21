package com.hobbystock.repositories

import com.hobbystock.entities.CategoryEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CategoryRepository : JpaRepository<CategoryEntity, Long> {
  override fun findAll(): List<CategoryEntity>
  override fun findById(id: Long): java.util.Optional<CategoryEntity>
  fun findByName(name: String): CategoryEntity?
}

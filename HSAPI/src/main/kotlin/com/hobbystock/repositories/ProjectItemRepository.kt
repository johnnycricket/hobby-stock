package com.hobbystock.repositories

import com.hobbystock.entities.ProjectItemsEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectItemRepository : JpaRepository<ProjectItemsEntity, Long> {
  fun findByProjectId(projectId: Long): List<ProjectItemsEntity>
  fun findByItemId(itemId: Long): List<ProjectItemsEntity>
  fun findByProjectIdAndItemId(projectId: Long, itemId: Long): ProjectItemsEntity?

  // Paginated methods
  override fun findAll(pageable: Pageable): Page<ProjectItemsEntity>
  fun findByProjectId(projectId: Long, pageable: Pageable): Page<ProjectItemsEntity>
  fun findByItemId(itemId: Long, pageable: Pageable): Page<ProjectItemsEntity>
}

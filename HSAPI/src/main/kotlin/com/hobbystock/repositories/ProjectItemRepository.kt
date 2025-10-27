package com.hobbystock.repositories

import com.hobbystock.entities.ProjectItemsEntity
import java.util.UUID
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectItemRepository : JpaRepository<ProjectItemsEntity, UUID> {
  fun findByProjectId(projectId: UUID): List<ProjectItemsEntity>
  fun findByItemId(itemId: UUID): List<ProjectItemsEntity>
  fun findByProjectIdAndItemId(projectId: UUID, itemId: UUID): ProjectItemsEntity?

  // Paginated methods
  override fun findAll(pageable: Pageable): Page<ProjectItemsEntity>
  fun findByProjectId(projectId: UUID, pageable: Pageable): Page<ProjectItemsEntity>
  fun findByItemId(itemId: UUID, pageable: Pageable): Page<ProjectItemsEntity>
}

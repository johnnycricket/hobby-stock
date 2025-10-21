package com.hobbystock.repositories

import com.hobbystock.entities.ProjectItemsEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectItemRepository : JpaRepository<ProjectItemsEntity, Long> {
  fun findByProjectId(projectId: Long): List<ProjectItemsEntity>
  fun findByItemId(itemId: Long): List<ProjectItemsEntity>
  fun findByProjectIdAndItemId(projectId: Long, itemId: Long): ProjectItemsEntity?

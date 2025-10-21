package com.hobbystock.repositories

import com.hobbystock.entities.ProjectsEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface ProjectRepository : JpaRepository<ProjectsEntity, Long> {
  fun findByStatus(status: String): List<ProjectsEntity>

  @Query(
          "SELECT p FROM ProjectsEntity p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))"
  )
  fun search(@Param("searchTerm") searchTerm: String): List<ProjectsEntity>
}

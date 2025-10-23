package com.hobbystock.repositories

import com.hobbystock.entities.ProjectsEntity
import java.util.UUID
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface ProjectRepository : JpaRepository<ProjectsEntity, UUID> {
        fun findByStatus(status: String): List<ProjectsEntity>

        @Query(
                "SELECT p FROM ProjectsEntity p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))"
        )
        fun search(@Param("searchTerm") searchTerm: String): List<ProjectsEntity>

        // Paginated methods
        override fun findAll(pageable: Pageable): Page<ProjectsEntity>
        fun findByStatus(status: String, pageable: Pageable): Page<ProjectsEntity>
        @Query(
                "SELECT p FROM ProjectsEntity p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))"
        )
        fun search(
                @Param("searchTerm") searchTerm: String,
                pageable: Pageable
        ): Page<ProjectsEntity>
}

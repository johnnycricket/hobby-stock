package com.hobbystock.repositories

import com.hobbystock.entities.ProjectTemplateEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectTemplateRepository : JpaRepository<ProjectTemplateEntity, Long> {
        override fun findAll(pageable: Pageable): Page<ProjectTemplateEntity>
}




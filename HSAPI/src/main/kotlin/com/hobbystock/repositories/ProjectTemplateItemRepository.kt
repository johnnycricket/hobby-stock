package com.hobbystock.repositories

import com.hobbystock.entities.ProjectTemplateItemEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectTemplateItemRepository : JpaRepository<ProjectTemplateItemEntity, Long> {
        fun findByTemplateId(templateId: Long): List<ProjectTemplateItemEntity>
        fun deleteByTemplateId(templateId: Long)
}




package com.hobbystock.entities

import com.hobbystock.types.ProjectStatus
import jakarta.persistence.*
import java.time.LocalDateTime
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes

@Entity
@Table(name = "project_templates")
data class ProjectTemplateEntity(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long? = null,
        @Column(name = "name", nullable = false) val name: String,
        @Column(name = "description") val description: String?,
        @JdbcTypeCode(SqlTypes.NAMED_ENUM)
        @Column(name = "default_status", nullable = false, columnDefinition = "project_status")
        val defaultStatus: ProjectStatus = ProjectStatus.PLANNING,
        @Column(name = "created_at") val createdAt: LocalDateTime = LocalDateTime.now(),
        @Column(name = "updated_at") val updatedAt: LocalDateTime = LocalDateTime.now()
)




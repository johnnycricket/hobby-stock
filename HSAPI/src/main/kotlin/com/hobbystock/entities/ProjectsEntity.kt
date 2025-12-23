package com.hobbystock.entities

import com.hobbystock.types.ProjectStatus
import jakarta.persistence.*
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes

@Entity
@Table(name = "projects")
data class ProjectsEntity(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(columnDefinition = "uuid")
        val id: UUID? = null,
        @Column(name = "name", nullable = false) val name: String,
        @Column(name = "description") val description: String?,
        @JdbcTypeCode(SqlTypes.NAMED_ENUM)
        @Column(name = "status", nullable = false, columnDefinition = "project_status")
        val status: ProjectStatus = ProjectStatus.PLANNING,
        @Column(name = "start_date") val startDate: LocalDate?,
        @Column(name = "end_date") val endDate: LocalDate?,
        @Column(name = "completed_at") val completedAt: LocalDateTime?,
        @Column(name = "created_at") val createdAt: LocalDateTime = LocalDateTime.now(),
        @Column(name = "updated_at") val updatedAt: LocalDateTime = LocalDateTime.now()
)

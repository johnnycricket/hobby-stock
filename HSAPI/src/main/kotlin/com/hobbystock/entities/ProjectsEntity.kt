package com.hobbystock.entities

import jakarta.persistence.*
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "projects")
data class ProjectsEntity(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(columnDefinition = "uuid")
        val id: UUID? = null,
        @Column(name = "name", nullable = false) val name: String,
        @Column(name = "description") val description: String?,
        @Column(name = "status", nullable = false) val status: String,
        @Column(name = "start_date") val startDate: LocalDate?,
        @Column(name = "end_date") val endDate: LocalDate?,
        @Column(name = "created_at") val createdAt: LocalDateTime = LocalDateTime.now(),
        @Column(name = "updated_at") val updatedAt: LocalDateTime = LocalDateTime.now()
)

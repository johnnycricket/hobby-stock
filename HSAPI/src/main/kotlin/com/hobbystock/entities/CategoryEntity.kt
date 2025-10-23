package com.hobbystock.entities

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "categories")
data class CategoryEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0,
        @Column(name = "name", nullable = false, unique = true) val name: String,
        @Column(name = "description") val description: String? = null,
        @Column(name = "created_at") val createdAt: LocalDateTime = LocalDateTime.now(),
        @Column(name = "updated_at") val updatedAt: LocalDateTime = LocalDateTime.now()
)

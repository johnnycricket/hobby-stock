package com.hobbystock.entities

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "project_items")
data class ProjectItemsEntity(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(columnDefinition = "uuid")
        val id: UUID? = null,
        @Column(name = "project_id", nullable = false) val projectId: UUID,
        @Column(name = "item_id", nullable = false) val itemId: UUID,
        @Column(name = "quantity_used", nullable = false, precision = 10, scale = 2) val quantityUsed: BigDecimal,
        @Column(name = "created_at") val createdAt: LocalDateTime = LocalDateTime.now(),
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "project_id", insertable = false, updatable = false)
        val project: ProjectsEntity? = null,
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "item_id", insertable = false, updatable = false)
        val item: ItemEntity? = null
)

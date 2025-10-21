package com.hobbystock.entities

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "project_items")
data class ProjectItemsEntity(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long = 0,
        @Column(name = "project_id", nullable = false) val projectId: Long,
        @Column(name = "item_id", nullable = false) val itemId: Long,
        @Column(name = "quantity_used", nullable = false) val quantityUsed: Int,
        @Column(name = "created_at") val createdAt: LocalDateTime = LocalDateTime.now(),
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "project_id", insertable = false, updatable = false)
        val project: ProjectsEntity? = null,
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "item_id", insertable = false, updatable = false)
        val item: ItemEntity? = null
)

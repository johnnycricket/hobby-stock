package com.hobbystock.entities

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "project_template_items")
data class ProjectTemplateItemEntity(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long? = null,
        @Column(name = "template_id", nullable = false) val templateId: Long,
        @Column(name = "item_id", nullable = false, columnDefinition = "uuid") val itemId: UUID,
        @Column(name = "quantity_used", nullable = false, precision = 10, scale = 2) val quantityUsed: BigDecimal,
        @Column(name = "created_at") val createdAt: LocalDateTime = LocalDateTime.now(),
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "template_id", insertable = false, updatable = false)
        val template: ProjectTemplateEntity? = null,
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "item_id", insertable = false, updatable = false)
        val item: ItemEntity? = null
)




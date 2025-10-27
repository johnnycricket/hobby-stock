package com.hobbystock.entities

import jakarta.persistence.*
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID

@Entity
@Table(name = "items")
data class ItemEntity(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(columnDefinition = "uuid")
        val id: UUID? = null,
        @Column(name = "name", nullable = false) val name: String,
        @Column(name = "description") val description: String? = null,
        @Column(name = "category_id", nullable = false) val categoryId: Int,
        @Column(name = "quantity", nullable = false) val quantity: Int,
        @Column(name = "min_quantity") val minQuantity: Int?,
        @Column(name = "unit_price", precision = 10, scale = 2) val unitPrice: BigDecimal?,
        @Column(name = "location") val location: String,
        @Column(name = "notes") val notes: String?,
        @Column(name = "created_at") val createdAt: LocalDateTime = LocalDateTime.now(),
        @Column(name = "updated_at") val updatedAt: LocalDateTime = LocalDateTime.now(),
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "category_id", insertable = false, updatable = false)
        val category: CategoryEntity? = null
)

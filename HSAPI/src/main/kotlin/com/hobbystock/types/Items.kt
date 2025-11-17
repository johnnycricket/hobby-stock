package com.hobbystock.types

import java.util.UUID

data class Item(
        val id: UUID,
        val name: String,
        val description: String?,
        val categoryId: Int,
        val quantity: Float,
        val minQuantity: Float?,
        val unitPrice: Float?,
        val amountType: AmountType,
        val location: String,
        val notes: String?,
        val createdAt: String,
        val updatedAt: String?,
        val category: Category? = null
)

data class ItemInput(
        val name: String,
        val description: String?,
        val categoryId: String,
        val quantity: Float,
        val minQuantity: Float?,
        val unitPrice: Float?,
        val amountType: AmountType?,
        val location: String,
        val notes: String?
)

data class ItemUpdateInput(
        val name: String?,
        val description: String?,
        val categoryId: Int?,
        val quantity: Float?,
        val minQuantity: Float?,
        val unitPrice: Float?,
        val amountType: AmountType?,
        val location: String?,
        val notes: String?
)

data class ItemMutationResult(val success: Boolean, val message: String?, val item: Item?)

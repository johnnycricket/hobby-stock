package com.hobbystock.types

data class Item(
        val id: Int,
        val name: String,
        val description: String?,
        val categoryId: Int,
        val quantity: Int,
        val minQuantity: Int?,
        val unitPrice: Float?,
        val location: String,
        val notes: String?,
        val createdAt: String,
        val updatedAt: String?,
        val category: Category? = null
)

data class ItemInput(
        val name: String,
        val description: String?,
        val categoryId: Int,
        val quantity: Int,
        val minQuantity: Int?,
        val unitPrice: Float?,
        val location: String,
        val notes: String?
)

data class ItemMutationResult(val success: Boolean, val message: String?, val item: Item?)

package com.hobbystock.services

import com.hobbystock.entities.CategoryEntity
import com.hobbystock.entities.ItemEntity
import com.hobbystock.repositories.CategoryRepository
import com.hobbystock.repositories.ItemRepository
import com.hobbystock.types.Category
import com.hobbystock.types.Item
import com.hobbystock.types.ItemInput
import com.hobbystock.types.ItemMutationResult
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ItemService(
        private val itemRepository: ItemRepository,
        private val categoryRepository: CategoryRepository
) {

        fun findAll(): List<Item> = itemRepository.findAll().map { it.toGraphQLType() }

        fun findById(id: Int): Item? =
                itemRepository.findById(id.toLong()).orElse(null)?.toGraphQLType()

        fun findByCategoryId(categoryId: Int): List<Item> =
                itemRepository.findByCategoryId(categoryId.toLong()).map { it.toGraphQLType() }

        fun findByLocation(location: String): List<Item> =
                itemRepository.findByLocation(location).map { it.toGraphQLType() }

        fun findLowStockItems(): List<Item> =
                itemRepository.findByQuantityLessThan(0).map { it.toGraphQLType() }

        fun search(searchTerm: String): List<Item> =
                itemRepository.search(searchTerm).map { it.toGraphQLType() }

        @Transactional
        fun create(input: ItemInput): Item {
                val entity =
                        ItemEntity(
                                name = input.name,
                                description = input.description,
                                categoryId = input.categoryId.toLong(),
                                quantity = input.quantity,
                                minQuantity = input.minQuantity,
                                unitPrice = input.unitPrice?.toBigDecimal(),
                                location = input.location,
                                notes = input.notes
                        )
                return itemRepository.save(entity).toGraphQLType()
        }

        @Transactional
        fun updateItem(id: Int, input: ItemInput): Item {
                val existing =
                        itemRepository.findById(id.toLong()).orElseThrow {
                                NoSuchElementException("Item not found")
                        }
                val updatedEntity =
                        existing.copy(
                                name = input.name,
                                description = input.description,
                                categoryId = input.categoryId.toLong(),
                                quantity = input.quantity,
                                minQuantity = input.minQuantity,
                                unitPrice = input.unitPrice?.toBigDecimal(),
                                location = input.location,
                                notes = input.notes
                        )
                return itemRepository.save(updatedEntity).toGraphQLType()
        }

        @Transactional
        fun deleteItem(id: Int): ItemMutationResult {
                return try {
                        itemRepository.deleteById(id.toLong())
                        ItemMutationResult(
                                success = true,
                                message = "Item deleted successfully",
                                item = null
                        )
                } catch (e: Exception) {
                        ItemMutationResult(success = false, message = "Item not found", item = null)
                }
        }
        // Extension function to convert Entity to GraphQL type
        private fun ItemEntity.toGraphQLType(): Item =
                Item(
                        id = this.id.toInt(),
                        name = this.name,
                        description = this.description,
                        categoryId = this.categoryId.toInt(),
                        quantity = this.quantity,
                        minQuantity = this.minQuantity,
                        unitPrice = this.unitPrice?.toFloat(),
                        location = this.location,
                        notes = this.notes,
                        createdAt = this.createdAt.toString(),
                        updatedAt = this.updatedAt.toString(),
                        category = this.category?.toGraphQLType()
                )

        private fun CategoryEntity.toGraphQLType(): Category =
                Category(id = this.id.toInt(), name = this.name, description = this.description)
}

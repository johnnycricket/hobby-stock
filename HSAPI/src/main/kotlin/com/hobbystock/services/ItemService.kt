package com.hobbystock.services

import com.hobbystock.entities.CategoryEntity
import com.hobbystock.entities.ItemEntity
import com.hobbystock.repositories.CategoryRepository
import com.hobbystock.repositories.ItemRepository
import com.hobbystock.types.Category
import com.hobbystock.types.AmountType
import com.hobbystock.types.Item
import com.hobbystock.types.ItemInput
import com.hobbystock.types.ItemMutationResult
import com.hobbystock.types.ItemUpdateInput
import com.hobbystock.types.ItemPage
import com.hobbystock.types.PageInfo
import java.math.BigDecimal
import java.util.UUID
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ItemService(
        private val itemRepository: ItemRepository,
        private val categoryRepository: CategoryRepository
) {

        fun findAll(): List<Item> = itemRepository.findAll().map { it.toGraphQLType() }

        fun findById(id: UUID): Item? = itemRepository.findById(id).orElse(null)?.toGraphQLType()

        fun findByCategoryId(categoryId: Int): List<Item> =
                itemRepository.findByCategoryId(categoryId).map { it.toGraphQLType() }

        fun findByLocation(location: String): List<Item> =
                itemRepository.findByLocation(location).map { it.toGraphQLType() }

        fun findLowStockItems(): List<Item> =
                itemRepository.findByQuantityLessThan(BigDecimal.ZERO).map { it.toGraphQLType() }

        fun search(searchTerm: String): List<Item> =
                itemRepository.search(searchTerm).map { it.toGraphQLType() }

        // Paginated methods
        fun findAllPaginated(page: Int = 0, size: Int = 20): ItemPage {
                val pageable = PageRequest.of(page, size)
                val pageResult = itemRepository.findAll(pageable)

                return ItemPage(
                        content = pageResult.content.map { it.toGraphQLType() },
                        pageInfo =
                                PageInfo(
                                        totalElements = pageResult.totalElements,
                                        totalPages = pageResult.totalPages,
                                        currentPage = pageResult.number,
                                        hasNext = pageResult.hasNext(),
                                        hasPrevious = pageResult.hasPrevious()
                                )
                )
        }

        fun findByCategoryIdPaginated(categoryId: Int, page: Int = 0, size: Int = 20): ItemPage {
                val pageable = PageRequest.of(page, size)
                val pageResult = itemRepository.findByCategoryId(categoryId, pageable)

                return ItemPage(
                        content = pageResult.content.map { it.toGraphQLType() },
                        pageInfo =
                                PageInfo(
                                        totalElements = pageResult.totalElements,
                                        totalPages = pageResult.totalPages,
                                        currentPage = pageResult.number,
                                        hasNext = pageResult.hasNext(),
                                        hasPrevious = pageResult.hasPrevious()
                                )
                )
        }

        fun findByLocationPaginated(location: String, page: Int = 0, size: Int = 20): ItemPage {
                val pageable = PageRequest.of(page, size)
                val pageResult = itemRepository.findByLocation(location, pageable)

                return ItemPage(
                        content = pageResult.content.map { it.toGraphQLType() },
                        pageInfo =
                                PageInfo(
                                        totalElements = pageResult.totalElements,
                                        totalPages = pageResult.totalPages,
                                        currentPage = pageResult.number,
                                        hasNext = pageResult.hasNext(),
                                        hasPrevious = pageResult.hasPrevious()
                                )
                )
        }

        fun findLowStockItemsPaginated(page: Int = 0, size: Int = 20): ItemPage {
                val pageable = PageRequest.of(page, size)
                val pageResult = itemRepository.findByQuantityLessThan(BigDecimal.ZERO, pageable)

                return ItemPage(
                        content = pageResult.content.map { it.toGraphQLType() },
                        pageInfo =
                                PageInfo(
                                        totalElements = pageResult.totalElements,
                                        totalPages = pageResult.totalPages,
                                        currentPage = pageResult.number,
                                        hasNext = pageResult.hasNext(),
                                        hasPrevious = pageResult.hasPrevious()
                                )
                )
        }

        fun searchPaginated(searchTerm: String, page: Int = 0, size: Int = 20): ItemPage {
                val pageable = PageRequest.of(page, size)
                val pageResult = itemRepository.search(searchTerm, pageable)

                return ItemPage(
                        content = pageResult.content.map { it.toGraphQLType() },
                        pageInfo =
                                PageInfo(
                                        totalElements = pageResult.totalElements,
                                        totalPages = pageResult.totalPages,
                                        currentPage = pageResult.number,
                                        hasNext = pageResult.hasNext(),
                                        hasPrevious = pageResult.hasPrevious()
                                )
                )
        }

        @Transactional
        fun create(input: ItemInput): Item {
                println("DEBUG: Received ItemInput: $input")
                println(
                        "DEBUG: categoryId value: ${input.categoryId}, type: ${input.categoryId::class}"
                )

                // Convert string categoryId to integer
                val categoryIdInt =
                        input.categoryId.toIntOrNull()
                                ?: throw IllegalArgumentException(
                                        "Invalid categoryId: ${input.categoryId}"
                                )

                val entity =
                        ItemEntity(
                                name = input.name,
                                description = input.description,
                                categoryId = categoryIdInt,
                                quantity = input.quantity.toBigDecimal(),
                                minQuantity = input.minQuantity?.toBigDecimal(),
                                unitPrice = input.unitPrice?.toBigDecimal(),
                                amountType = input.amountType ?: AmountType.COUNT,
                                location = input.location,
                                notes = input.notes
                        )
                println("DEBUG: Created entity with categoryId: ${entity.categoryId}")
                return itemRepository.save(entity).toGraphQLType()
        }

        @Transactional
        fun updateItem(id: UUID, input: ItemUpdateInput): Item {
                val existing =
                        itemRepository.findById(id).orElseThrow {
                                NoSuchElementException("Item not found")
                        }

                val updatedEntity =
                        existing.copy(
                                name = input.name ?: existing.name,
                                description = input.description ?: existing.description,
                                categoryId = input.categoryId ?: existing.categoryId,
                                quantity = input.quantity?.toBigDecimal() ?: existing.quantity,
                                minQuantity = input.minQuantity?.toBigDecimal() ?: existing.minQuantity,
                                unitPrice = input.unitPrice?.toBigDecimal() ?: existing.unitPrice,
                                amountType = input.amountType ?: existing.amountType,
                                location = input.location ?: existing.location,
                                notes = input.notes ?: existing.notes
                        )
                return itemRepository.save(updatedEntity).toGraphQLType()
        }

        @Transactional
        fun deleteItem(id: UUID): ItemMutationResult {
                return try {
                        itemRepository.deleteById(id)
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
                        id = this.id!!,
                        name = this.name,
                        description = this.description,
                        categoryId = this.categoryId,
                        quantity = this.quantity.toFloat(),
                        minQuantity = this.minQuantity?.toFloat(),
                        unitPrice = this.unitPrice?.toFloat(),
                        amountType = this.amountType,
                        location = this.location,
                        notes = this.notes,
                        createdAt = this.createdAt.toString(),
                        updatedAt = this.updatedAt.toString(),
                        category = this.category?.toGraphQLType()
                )

        private fun CategoryEntity.toGraphQLType(): Category =
                Category(id = this.id!!, name = this.name, description = this.description)
}

package com.hobbystock.services

import com.hobbystock.types.AmountType
import com.hobbystock.types.Item
import com.hobbystock.types.ProjectItem
import com.hobbystock.types.SupplyStatus
import java.util.UUID
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when` as whenever
import org.mockito.junit.jupiter.MockitoExtension

@ExtendWith(MockitoExtension::class)
class SupplyCheckServiceTest {
        @Mock private lateinit var projectItemService: ProjectItemService

        @Mock private lateinit var itemService: ItemService

        @InjectMocks private lateinit var supplyCheckService: SupplyCheckService

        private lateinit var projectId: UUID
        private lateinit var itemId1: UUID
        private lateinit var itemId2: UUID
        private lateinit var itemId3: UUID

        @BeforeEach
        fun setUp() {
                projectId = UUID.randomUUID()
                itemId1 = UUID.randomUUID()
                itemId2 = UUID.randomUUID()
                itemId3 = UUID.randomUUID()
        }

        @Test
        fun `should calculate SUFFICIENT status when available quantity equals required`() {
                // Given
                val projectItems =
                        listOf(
                                ProjectItem(
                                        id = UUID.randomUUID(),
                                        projectId = projectId,
                                        itemId = itemId1,
                                        quantityUsed = 10.0f,
                                        createdAt = "2025-01-01T00:00:00"
                                )
                        )

                val item =
                        Item(
                                id = itemId1,
                                name = "Test Item",
                                description = "Test Description",
                                categoryId = 1,
                                quantity = 10.0f,
                                minQuantity = 2.0f,
                                unitPrice = 5.0f,
                                amountType = AmountType.COUNT,
                                location = "Shelf A",
                                notes = null,
                                createdAt = "2025-01-01T00:00:00",
                                updatedAt = null
                        )

                whenever(projectItemService.findByProjectId(projectId)).thenReturn(projectItems)
                whenever(itemService.findById(itemId1)).thenReturn(item)

                // When
                val result = supplyCheckService.calculateSupplyCheck(projectId)

                // Then
                assertThat(result).hasSize(1)
                assertThat(result[0].supplyStatus).isEqualTo(SupplyStatus.SUFFICIENT)
                assertThat(result[0].quantityGap).isEqualTo(0.0f)
                assertThat(result[0].requiredQuantity).isEqualTo(10.0f)
                assertThat(result[0].availableQuantity).isEqualTo(10.0f)
        }

        @Test
        fun `should calculate SUFFICIENT status when available quantity exceeds required`() {
                // Given
                val projectItems =
                        listOf(
                                ProjectItem(
                                        id = UUID.randomUUID(),
                                        projectId = projectId,
                                        itemId = itemId1,
                                        quantityUsed = 10.0f,
                                        createdAt = "2025-01-01T00:00:00"
                                )
                        )

                val item =
                        Item(
                                id = itemId1,
                                name = "Test Item",
                                description = null,
                                categoryId = 1,
                                quantity = 15.0f,
                                minQuantity = null,
                                unitPrice = null,
                                amountType = AmountType.COUNT,
                                location = "Shelf A",
                                notes = null,
                                createdAt = "2025-01-01T00:00:00",
                                updatedAt = null
                        )

                whenever(projectItemService.findByProjectId(projectId)).thenReturn(projectItems)
                whenever(itemService.findById(itemId1)).thenReturn(item)

                // When
                val result = supplyCheckService.calculateSupplyCheck(projectId)

                // Then
                assertThat(result).hasSize(1)
                assertThat(result[0].supplyStatus).isEqualTo(SupplyStatus.SUFFICIENT)
                assertThat(result[0].quantityGap).isEqualTo(0.0f)
        }

        @Test
        fun `should calculate INSUFFICIENT status when available is less than required`() {
                // Given
                val projectItems =
                        listOf(
                                ProjectItem(
                                        id = UUID.randomUUID(),
                                        projectId = projectId,
                                        itemId = itemId1,
                                        quantityUsed = 10.0f,
                                        createdAt = "2025-01-01T00:00:00"
                                )
                        )

                val item =
                        Item(
                                id = itemId1,
                                name = "Test Item",
                                description = null,
                                categoryId = 1,
                                quantity = 5.0f,
                                minQuantity = null,
                                unitPrice = null,
                                amountType = AmountType.COUNT,
                                location = "Shelf A",
                                notes = null,
                                createdAt = "2025-01-01T00:00:00",
                                updatedAt = null
                        )

                whenever(projectItemService.findByProjectId(projectId)).thenReturn(projectItems)
                whenever(itemService.findById(itemId1)).thenReturn(item)

                // When
                val result = supplyCheckService.calculateSupplyCheck(projectId)

                // Then
                assertThat(result).hasSize(1)
                assertThat(result[0].supplyStatus).isEqualTo(SupplyStatus.INSUFFICIENT)
                assertThat(result[0].quantityGap).isEqualTo(5.0f)
                assertThat(result[0].requiredQuantity).isEqualTo(10.0f)
                assertThat(result[0].availableQuantity).isEqualTo(5.0f)
        }

        @Test
        fun `should calculate MISSING status when item not found in inventory`() {
                // Given
                val projectItems =
                        listOf(
                                ProjectItem(
                                        id = UUID.randomUUID(),
                                        projectId = projectId,
                                        itemId = itemId1,
                                        quantityUsed = 10.0f,
                                        createdAt = "2025-01-01T00:00:00"
                                )
                        )

                whenever(projectItemService.findByProjectId(projectId)).thenReturn(projectItems)
                whenever(itemService.findById(itemId1)).thenReturn(null)

                // When
                val result = supplyCheckService.calculateSupplyCheck(projectId)

                // Then
                assertThat(result).hasSize(1)
                assertThat(result[0].supplyStatus).isEqualTo(SupplyStatus.MISSING)
                assertThat(result[0].quantityGap).isEqualTo(10.0f)
                assertThat(result[0].itemName).isEqualTo("Unknown Item")
                assertThat(result[0].availableQuantity).isEqualTo(0.0f)
        }

        @Test
        fun `should calculate MISSING status when available quantity is zero`() {
                // Given
                val projectItems =
                        listOf(
                                ProjectItem(
                                        id = UUID.randomUUID(),
                                        projectId = projectId,
                                        itemId = itemId1,
                                        quantityUsed = 10.0f,
                                        createdAt = "2025-01-01T00:00:00"
                                )
                        )

                val item =
                        Item(
                                id = itemId1,
                                name = "Test Item",
                                description = null,
                                categoryId = 1,
                                quantity = 0.0f,
                                minQuantity = null,
                                unitPrice = null,
                                amountType = AmountType.COUNT,
                                location = "Shelf A",
                                notes = null,
                                createdAt = "2025-01-01T00:00:00",
                                updatedAt = null
                        )

                whenever(projectItemService.findByProjectId(projectId)).thenReturn(projectItems)
                whenever(itemService.findById(itemId1)).thenReturn(item)

                // When
                val result = supplyCheckService.calculateSupplyCheck(projectId)

                // Then
                assertThat(result).hasSize(1)
                assertThat(result[0].supplyStatus).isEqualTo(SupplyStatus.MISSING)
                assertThat(result[0].quantityGap).isEqualTo(10.0f)
        }

        @Test
        fun `should handle null quantityUsed in project item`() {
                // Given
                val projectItems =
                        listOf(
                                ProjectItem(
                                        id = UUID.randomUUID(),
                                        projectId = projectId,
                                        itemId = itemId1,
                                        quantityUsed = null,
                                        createdAt = "2025-01-01T00:00:00"
                                )
                        )

                val item =
                        Item(
                                id = itemId1,
                                name = "Test Item",
                                description = null,
                                categoryId = 1,
                                quantity = 5.0f,
                                minQuantity = null,
                                unitPrice = null,
                                amountType = AmountType.COUNT,
                                location = "Shelf A",
                                notes = null,
                                createdAt = "2025-01-01T00:00:00",
                                updatedAt = null
                        )

                whenever(projectItemService.findByProjectId(projectId)).thenReturn(projectItems)
                whenever(itemService.findById(itemId1)).thenReturn(item)

                // When
                val result = supplyCheckService.calculateSupplyCheck(projectId)

                // Then
                assertThat(result).hasSize(1)
                assertThat(result[0].requiredQuantity).isEqualTo(0.0f)
                assertThat(result[0].supplyStatus).isEqualTo(SupplyStatus.SUFFICIENT)
        }

        @Test
        fun `should handle multiple project items with different statuses`() {
                // Given
                val projectItems =
                        listOf(
                                ProjectItem(
                                        id = UUID.randomUUID(),
                                        projectId = projectId,
                                        itemId = itemId1,
                                        quantityUsed = 10.0f,
                                        createdAt = "2025-01-01T00:00:00"
                                ),
                                ProjectItem(
                                        id = UUID.randomUUID(),
                                        projectId = projectId,
                                        itemId = itemId2,
                                        quantityUsed = 5.0f,
                                        createdAt = "2025-01-01T00:00:00"
                                ),
                                ProjectItem(
                                        id = UUID.randomUUID(),
                                        projectId = projectId,
                                        itemId = itemId3,
                                        quantityUsed = 8.0f,
                                        createdAt = "2025-01-01T00:00:00"
                                )
                        )

                val item1 =
                        Item(
                                id = itemId1,
                                name = "Item 1",
                                description = null,
                                categoryId = 1,
                                quantity = 15.0f,
                                minQuantity = null,
                                unitPrice = null,
                                amountType = AmountType.COUNT,
                                location = "Shelf A",
                                notes = null,
                                createdAt = "2025-01-01T00:00:00",
                                updatedAt = null
                        )

                val item2 =
                        Item(
                                id = itemId2,
                                name = "Item 2",
                                description = null,
                                categoryId = 1,
                                quantity = 3.0f,
                                minQuantity = null,
                                unitPrice = null,
                                amountType = AmountType.COUNT,
                                location = "Shelf B",
                                notes = null,
                                createdAt = "2025-01-01T00:00:00",
                                updatedAt = null
                        )

                val item3 =
                        Item(
                                id = itemId3,
                                name = "Item 3",
                                description = null,
                                categoryId = 1,
                                quantity = 0.0f,
                                minQuantity = null,
                                unitPrice = null,
                                amountType = AmountType.COUNT,
                                location = "Shelf C",
                                notes = null,
                                createdAt = "2025-01-01T00:00:00",
                                updatedAt = null
                        )

                whenever(projectItemService.findByProjectId(projectId)).thenReturn(projectItems)
                whenever(itemService.findById(itemId1)).thenReturn(item1)
                whenever(itemService.findById(itemId2)).thenReturn(item2)
                whenever(itemService.findById(itemId3)).thenReturn(item3)

                // When
                val result = supplyCheckService.calculateSupplyCheck(projectId)

                // Then
                assertThat(result).hasSize(3)
                assertThat(result[0].supplyStatus).isEqualTo(SupplyStatus.SUFFICIENT)
                assertThat(result[1].supplyStatus).isEqualTo(SupplyStatus.INSUFFICIENT)
                assertThat(result[2].supplyStatus).isEqualTo(SupplyStatus.MISSING)
        }

        @Test
        fun `should handle empty project items list`() {
                // Given
                whenever(projectItemService.findByProjectId(projectId)).thenReturn(emptyList())

                // When
                val result = supplyCheckService.calculateSupplyCheck(projectId)

                // Then
                assertThat(result).isEmpty()
        }

        @Test
        fun `should handle decimal quantities correctly`() {
                // Given
                val projectItems =
                        listOf(
                                ProjectItem(
                                        id = UUID.randomUUID(),
                                        projectId = projectId,
                                        itemId = itemId1,
                                        quantityUsed = 10.5f,
                                        createdAt = "2025-01-01T00:00:00"
                                )
                        )

                val item =
                        Item(
                                id = itemId1,
                                name = "Test Item",
                                description = null,
                                categoryId = 1,
                                quantity = 8.3f,
                                minQuantity = null,
                                unitPrice = null,
                                amountType = AmountType.VOLUME,
                                location = "Shelf A",
                                notes = null,
                                createdAt = "2025-01-01T00:00:00",
                                updatedAt = null
                        )

                whenever(projectItemService.findByProjectId(projectId)).thenReturn(projectItems)
                whenever(itemService.findById(itemId1)).thenReturn(item)

                // When
                val result = supplyCheckService.calculateSupplyCheck(projectId)

                // Then
                assertThat(result).hasSize(1)
                assertThat(result[0].supplyStatus).isEqualTo(SupplyStatus.INSUFFICIENT)
                assertThat(result[0].quantityGap)
                        .isCloseTo(2.2f, org.assertj.core.data.Offset.offset(0.01f))
        }
}

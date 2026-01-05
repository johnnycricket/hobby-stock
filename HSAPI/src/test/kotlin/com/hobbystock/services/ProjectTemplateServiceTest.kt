package com.hobbystock.services

import com.hobbystock.entities.ProjectTemplateEntity
import com.hobbystock.entities.ProjectTemplateItemEntity
import com.hobbystock.repositories.ProjectTemplateItemRepository
import com.hobbystock.repositories.ProjectTemplateRepository
import com.hobbystock.types.ProjectInput
import com.hobbystock.types.ProjectStatus
import com.hobbystock.types.ProjectTemplateInput
import com.hobbystock.types.ProjectTemplateItemInput
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.UUID
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.ArgumentCaptor
import org.mockito.InjectMocks
import org.mockito.Mock
import org.mockito.Mockito.`when` as whenever
import org.mockito.junit.jupiter.MockitoExtension
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest

@ExtendWith(MockitoExtension::class)
class ProjectTemplateServiceTest {
        @Mock private lateinit var templateRepository: ProjectTemplateRepository

        @Mock private lateinit var templateItemRepository: ProjectTemplateItemRepository

        @Mock private lateinit var projectService: ProjectService

        @Mock private lateinit var projectItemService: ProjectItemService

        @Mock private lateinit var itemService: ItemService

        @InjectMocks private lateinit var templateService: ProjectTemplateService

        private lateinit var templateId: Long
        private lateinit var itemId1: UUID
        private lateinit var itemId2: UUID

        @BeforeEach
        fun setUp() {
                templateId = 1L
                itemId1 = UUID.randomUUID()
                itemId2 = UUID.randomUUID()
        }

        @Test
        fun `should create template successfully`() {
                // Given
                val input =
                        ProjectTemplateInput(
                                name = "Test Template",
                                description = "Test Description",
                                defaultStatus = ProjectStatus.PLANNING,
                                items =
                                        listOf(
                                                ProjectTemplateItemInput(
                                                        itemId = itemId1.toString(),
                                                        quantityUsed = BigDecimal.valueOf(5.0)
                                                )
                                        )
                        )

                val savedEntity =
                        ProjectTemplateEntity(
                                id = templateId,
                                name = input.name,
                                description = input.description,
                                defaultStatus = input.defaultStatus,
                                createdAt = LocalDateTime.now(),
                                updatedAt = LocalDateTime.now()
                        )

                whenever(itemService.findById(itemId1)).thenReturn(
                        com.hobbystock.types.Item(
                                id = itemId1,
                                name = "Test Item",
                                description = null,
                                categoryId = 1,
                                quantity = 10.0f,
                                minQuantity = null,
                                unitPrice = null,
                                amountType = com.hobbystock.types.AmountType.COUNT,
                                location = "Shelf A",
                                notes = null,
                                createdAt = "2025-01-01T00:00:00",
                                updatedAt = null
                        )
                )

                val templateItemCaptor =
                        ArgumentCaptor.forClass(ProjectTemplateItemEntity::class.java)
                whenever(templateRepository.save(org.mockito.ArgumentMatchers.any()))
                        .thenReturn(savedEntity)
                whenever(templateItemRepository.save(templateItemCaptor.capture()))
                        .thenReturn(
                                ProjectTemplateItemEntity(
                                        id = 1L,
                                        templateId = templateId,
                                        itemId = itemId1,
                                        quantityUsed = BigDecimal.valueOf(5.0),
                                        createdAt = LocalDateTime.now()
                                )
                        )
                whenever(templateItemRepository.findByTemplateId(templateId))
                        .thenReturn(emptyList())

                // When
                val result = templateService.createTemplate(input)

                // Then
                assertThat(result).isNotNull
                assertThat(result.name).isEqualTo("Test Template")
                assertThat(result.description).isEqualTo("Test Description")
                assertThat(result.defaultStatus).isEqualTo(ProjectStatus.PLANNING)
        }

        @Test
        fun `should find template by id`() {
                // Given
                val entity =
                        ProjectTemplateEntity(
                                id = templateId,
                                name = "Test Template",
                                description = "Test Description",
                                defaultStatus = ProjectStatus.PLANNING,
                                createdAt = LocalDateTime.now(),
                                updatedAt = LocalDateTime.now()
                        )

                whenever(templateRepository.findById(templateId))
                        .thenReturn(java.util.Optional.of(entity))
                whenever(templateItemRepository.findByTemplateId(templateId))
                        .thenReturn(emptyList())

                // When
                val result = templateService.findById(templateId)

                // Then
                assertThat(result).isNotNull
                assertThat(result?.name).isEqualTo("Test Template")
        }

        @Test
        fun `should return null when template not found`() {
                // Given
                whenever(templateRepository.findById(templateId))
                        .thenReturn(java.util.Optional.empty())

                // When
                val result = templateService.findById(templateId)

                // Then
                assertThat(result).isNull()
        }

        @Test
        fun `should find all templates paginated`() {
                // Given
                val entity =
                        ProjectTemplateEntity(
                                id = templateId,
                                name = "Test Template",
                                description = "Test Description",
                                defaultStatus = ProjectStatus.PLANNING,
                                createdAt = LocalDateTime.now(),
                                updatedAt = LocalDateTime.now()
                        )

                val pageable = PageRequest.of(0, 20)
                val page = PageImpl(listOf(entity), pageable, 1)

                whenever(templateRepository.findAll(pageable)).thenReturn(page)
                whenever(templateItemRepository.findByTemplateId(templateId))
                        .thenReturn(emptyList())

                // When
                val result = templateService.findAllPaginated(0, 20)

                // Then
                assertThat(result.content).hasSize(1)
                assertThat(result.pageInfo.totalElements).isEqualTo(1)
        }

        @Test
        fun `should update template successfully`() {
                // Given
                val existingEntity =
                        ProjectTemplateEntity(
                                id = templateId,
                                name = "Old Name",
                                description = "Old Description",
                                defaultStatus = ProjectStatus.PLANNING,
                                createdAt = LocalDateTime.now(),
                                updatedAt = LocalDateTime.now()
                        )

                val input =
                        ProjectTemplateInput(
                                name = "Updated Name",
                                description = "Updated Description",
                                defaultStatus = ProjectStatus.ACTIVE,
                                items = emptyList()
                        )

                val updatedEntity = existingEntity.copy(name = input.name, description = input.description, defaultStatus = input.defaultStatus)

                whenever(templateRepository.findById(templateId))
                        .thenReturn(java.util.Optional.of(existingEntity))
                whenever(templateRepository.save(org.mockito.ArgumentMatchers.any()))
                        .thenReturn(updatedEntity)
                whenever(templateItemRepository.findByTemplateId(templateId))
                        .thenReturn(emptyList())

                // When
                val result = templateService.updateTemplate(templateId, input)

                // Then
                assertThat(result).isNotNull
                assertThat(result.name).isEqualTo("Updated Name")
                assertThat(result.description).isEqualTo("Updated Description")
                assertThat(result.defaultStatus).isEqualTo(ProjectStatus.ACTIVE)
        }

        @Test
        fun `should delete template successfully`() {
                // Given
                whenever(templateRepository.existsById(templateId)).thenReturn(true)

                // When
                val result = templateService.deleteTemplate(templateId)

                // Then
                assertThat(result.success).isTrue
                assertThat(result.message).contains("deleted successfully")
        }

        @Test
        fun `should return error when deleting non-existent template`() {
                // Given
                whenever(templateRepository.existsById(templateId)).thenReturn(false)

                // When
                val result = templateService.deleteTemplate(templateId)

                // Then
                assertThat(result.success).isFalse
                assertThat(result.message).contains("not found")
        }
}




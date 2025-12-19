package com.hobbystock.services

import com.hobbystock.types.ProjectSupplyCheck
import java.util.UUID
import org.springframework.stereotype.Service

@Service
class SupplyCheckService(
        private val projectItemService: ProjectItemService,
        private val itemService: ItemService
) {
        /**
         * Calculate supply check for a project by comparing required quantities from project items
         * against available inventory quantities.
         *
         * @param projectId The UUID of the project to check
         * @return List of ProjectSupplyCheck with supply status for each project item
         */
        fun calculateSupplyCheck(projectId: UUID): List<ProjectSupplyCheck> {
                // Fetch all project items for this project
                val projectItems = projectItemService.findByProjectId(projectId)

                return projectItems.map { projectItem ->
                        // Fetch the inventory item
                        val item = itemService.findById(projectItem.itemId)

                        // Handle edge cases: missing items, null quantities
                        val itemName = item?.name ?: "Unknown Item"
                        val requiredQuantity = projectItem.quantityUsed ?: 0.0f
                        val availableQuantity = item?.quantity ?: 0.0f

                        // Calculate supply status and gap
                        val supplyStatus =
                                ProjectSupplyCheck.calculateSupplyStatus(
                                        requiredQuantity = requiredQuantity,
                                        availableQuantity = availableQuantity
                                )
                        val quantityGap =
                                ProjectSupplyCheck.calculateQuantityGap(
                                        requiredQuantity = requiredQuantity,
                                        availableQuantity = availableQuantity
                                )

                        ProjectSupplyCheck(
                                itemId = projectItem.itemId,
                                itemName = itemName,
                                requiredQuantity = requiredQuantity,
                                availableQuantity = availableQuantity,
                                supplyStatus = supplyStatus,
                                quantityGap = quantityGap
                        )
                }
        }
}

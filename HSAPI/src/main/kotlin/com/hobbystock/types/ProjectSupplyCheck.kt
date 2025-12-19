package com.hobbystock.types

import java.util.UUID

data class ProjectSupplyCheck(
        val itemId: UUID,
        val itemName: String,
        val requiredQuantity: Float,
        val availableQuantity: Float,
        val supplyStatus: SupplyStatus,
        val quantityGap: Float
) {
    companion object {
        /**
         * Calculate supply status based on required and available quantities.
         * - SUFFICIENT: availableQuantity >= requiredQuantity
         * - INSUFFICIENT: availableQuantity > 0 but < requiredQuantity
         * - MISSING: availableQuantity <= 0 or item not found
         */
        fun calculateSupplyStatus(requiredQuantity: Float, availableQuantity: Float): SupplyStatus {
            return when {
                availableQuantity <= 0 -> SupplyStatus.MISSING
                availableQuantity >= requiredQuantity -> SupplyStatus.SUFFICIENT
                else -> SupplyStatus.INSUFFICIENT
            }
        }

        /**
         * Calculate quantity gap (how much more is needed). Returns 0 if sufficient, or the
         * difference if insufficient/missing.
         */
        fun calculateQuantityGap(requiredQuantity: Float, availableQuantity: Float): Float {
            return if (availableQuantity >= requiredQuantity) {
                0.0f
            } else {
                requiredQuantity - availableQuantity
            }
        }
    }
}

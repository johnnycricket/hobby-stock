package com.hobbystock.types

import java.util.UUID
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class ProjectSupplyCheckTest {
    @Test
    fun `should calculate SUFFICIENT status when available quantity equals required`() {
        val status =
                ProjectSupplyCheck.calculateSupplyStatus(
                        requiredQuantity = 10.0f,
                        availableQuantity = 10.0f
                )
        assertThat(status).isEqualTo(SupplyStatus.SUFFICIENT)
    }

    @Test
    fun `should calculate SUFFICIENT status when available quantity exceeds required`() {
        val status =
                ProjectSupplyCheck.calculateSupplyStatus(
                        requiredQuantity = 10.0f,
                        availableQuantity = 15.0f
                )
        assertThat(status).isEqualTo(SupplyStatus.SUFFICIENT)
    }

    @Test
    fun `should calculate INSUFFICIENT status when available is less than required`() {
        val status =
                ProjectSupplyCheck.calculateSupplyStatus(
                        requiredQuantity = 10.0f,
                        availableQuantity = 5.0f
                )
        assertThat(status).isEqualTo(SupplyStatus.INSUFFICIENT)
    }

    @Test
    fun `should calculate INSUFFICIENT status when available is just below required`() {
        val status =
                ProjectSupplyCheck.calculateSupplyStatus(
                        requiredQuantity = 10.0f,
                        availableQuantity = 9.99f
                )
        assertThat(status).isEqualTo(SupplyStatus.INSUFFICIENT)
    }

    @Test
    fun `should calculate MISSING status when available quantity is zero`() {
        val status =
                ProjectSupplyCheck.calculateSupplyStatus(
                        requiredQuantity = 10.0f,
                        availableQuantity = 0.0f
                )
        assertThat(status).isEqualTo(SupplyStatus.MISSING)
    }

    @Test
    fun `should calculate MISSING status when available quantity is negative`() {
        val status =
                ProjectSupplyCheck.calculateSupplyStatus(
                        requiredQuantity = 10.0f,
                        availableQuantity = -1.0f
                )
        assertThat(status).isEqualTo(SupplyStatus.MISSING)
    }

    @Test
    fun `should calculate quantity gap as zero when sufficient`() {
        val gap =
                ProjectSupplyCheck.calculateQuantityGap(
                        requiredQuantity = 10.0f,
                        availableQuantity = 15.0f
                )
        assertThat(gap).isEqualTo(0.0f)
    }

    @Test
    fun `should calculate quantity gap as zero when exactly sufficient`() {
        val gap =
                ProjectSupplyCheck.calculateQuantityGap(
                        requiredQuantity = 10.0f,
                        availableQuantity = 10.0f
                )
        assertThat(gap).isEqualTo(0.0f)
    }

    @Test
    fun `should calculate quantity gap correctly when insufficient`() {
        val gap =
                ProjectSupplyCheck.calculateQuantityGap(
                        requiredQuantity = 10.0f,
                        availableQuantity = 5.0f
                )
        assertThat(gap).isEqualTo(5.0f)
    }

    @Test
    fun `should calculate quantity gap correctly when missing`() {
        val gap =
                ProjectSupplyCheck.calculateQuantityGap(
                        requiredQuantity = 10.0f,
                        availableQuantity = 0.0f
                )
        assertThat(gap).isEqualTo(10.0f)
    }

    @Test
    fun `should create ProjectSupplyCheck with correct values`() {
        val itemId = UUID.randomUUID()
        val check =
                ProjectSupplyCheck(
                        itemId = itemId,
                        itemName = "Test Item",
                        requiredQuantity = 10.0f,
                        availableQuantity = 5.0f,
                        supplyStatus = SupplyStatus.INSUFFICIENT,
                        quantityGap = 5.0f
                )

        assertThat(check.itemId).isEqualTo(itemId)
        assertThat(check.itemName).isEqualTo("Test Item")
        assertThat(check.requiredQuantity).isEqualTo(10.0f)
        assertThat(check.availableQuantity).isEqualTo(5.0f)
        assertThat(check.supplyStatus).isEqualTo(SupplyStatus.INSUFFICIENT)
        assertThat(check.quantityGap).isEqualTo(5.0f)
    }

    @Test
    fun `should handle decimal quantities correctly`() {
        val status =
                ProjectSupplyCheck.calculateSupplyStatus(
                        requiredQuantity = 10.5f,
                        availableQuantity = 10.5f
                )
        assertThat(status).isEqualTo(SupplyStatus.SUFFICIENT)

        val gap =
                ProjectSupplyCheck.calculateQuantityGap(
                        requiredQuantity = 10.5f,
                        availableQuantity = 8.3f
                )
        assertThat(gap).isCloseTo(2.2f, org.assertj.core.data.Offset.offset(0.01f))
    }
}

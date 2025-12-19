package com.hobbystock.types

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class SupplyStatusTest {
    @Test
    fun `should have three status values`() {
        val values = SupplyStatus.values()
        assertThat(values).hasSize(3)
        assertThat(values)
                .containsExactlyInAnyOrder(
                        SupplyStatus.SUFFICIENT,
                        SupplyStatus.INSUFFICIENT,
                        SupplyStatus.MISSING
                )
    }
}

package com.hobbystock.repositories

import com.hobbystock.entities.ItemEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface ItemRepository : JpaRepository<ItemEntity, Long> {
    fun findByCategoryId(categoryId: Long): List<ItemEntity>
    fun findByLocation(location: String): List<ItemEntity>
    fun findByQuantityLessThan(minQuantity: Int): List<ItemEntity>
    @Query(
            "SELECT i FROM ItemEntity i WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(i.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))"
    )
    fun search(@Param("searchTerm") searchTerm: String): List<ItemEntity>
}

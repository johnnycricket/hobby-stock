package com.hobbystock.repositories

import com.hobbystock.entities.ItemEntity
import java.util.UUID
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface ItemRepository : JpaRepository<ItemEntity, UUID> {
        fun findByCategoryId(categoryId: Int): List<ItemEntity>
        fun findByLocation(location: String): List<ItemEntity>
        fun findByQuantityLessThan(minQuantity: Int): List<ItemEntity>
        @Query(
                "SELECT i FROM ItemEntity i WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(i.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))"
        )
        fun search(@Param("searchTerm") searchTerm: String): List<ItemEntity>

        // Paginated methods
        override fun findAll(pageable: Pageable): Page<ItemEntity>
        fun findByCategoryId(categoryId: Int, pageable: Pageable): Page<ItemEntity>
        fun findByLocation(location: String, pageable: Pageable): Page<ItemEntity>
        fun findByQuantityLessThan(minQuantity: Int, pageable: Pageable): Page<ItemEntity>
        @Query(
                "SELECT i FROM ItemEntity i WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(i.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))"
        )
        fun search(@Param("searchTerm") searchTerm: String, pageable: Pageable): Page<ItemEntity>
}

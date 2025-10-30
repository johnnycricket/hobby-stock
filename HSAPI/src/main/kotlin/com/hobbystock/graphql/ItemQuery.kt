package com.hobbystock.graphql

import com.hobbystock.services.ItemService
import com.hobbystock.types.Item
import com.hobbystock.types.ItemPage
import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class ItemQueryController @Autowired constructor(private val itemService: ItemService) {
  @QueryMapping
  fun items(): List<Item> {
    return itemService.findAll()
  }

  @QueryMapping
  fun item(@Argument id: String): Item {
    val uuid = UUID.fromString(id)
    return itemService.findById(uuid) ?: throw NoSuchElementException("Item not found for id: $id")
  }

  @QueryMapping
  fun itemsByCategory(@Argument categoryId: Int): List<Item> {
    return itemService.findByCategoryId(categoryId)
  }

  @QueryMapping
  fun itemsByLocation(@Argument location: String): List<Item> {
    return itemService.findByLocation(location)
  }

  @QueryMapping
  fun lowStockItems(): List<Item> {
    return itemService.findLowStockItems()
  }

  @QueryMapping
  fun searchItems(@Argument searchTerm: String): List<Item> {
    return itemService.search(searchTerm)
  }

  // Paginated queries
  @QueryMapping
  fun itemsPaginated(@Argument page: Int = 0, @Argument size: Int = 20): ItemPage {
    return itemService.findAllPaginated(page, size)
  }

  @QueryMapping
  fun itemsByCategoryPaginated(
          @Argument categoryId: Int,
          @Argument page: Int = 0,
          @Argument size: Int = 20
  ): ItemPage {
    return itemService.findByCategoryIdPaginated(categoryId, page, size)
  }

  @QueryMapping
  fun itemsByLocationPaginated(
          @Argument location: String,
          @Argument page: Int = 0,
          @Argument size: Int = 20
  ): ItemPage {
    return itemService.findByLocationPaginated(location, page, size)
  }

  @QueryMapping
  fun lowStockItemsPaginated(@Argument page: Int = 0, @Argument size: Int = 20): ItemPage {
    return itemService.findLowStockItemsPaginated(page, size)
  }

  @QueryMapping
  fun searchItemsPaginated(
          @Argument searchTerm: String,
          @Argument page: Int = 0,
          @Argument size: Int = 20
  ): ItemPage {
    return itemService.searchPaginated(searchTerm, page, size)
  }
}

package com.hobbystock.graphql

import com.hobbystock.services.ItemService
import com.hobbystock.types.Item
import com.hobbystock.types.ItemPage
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class ItemQueryController @Autowired constructor(private val itemService: ItemService) {
  @QueryMapping
  fun items(): List<Item> {
    return itemService.findAll()
  }

  @QueryMapping
  fun item(id: Int): Item {
    return itemService.findById(id) ?: throw NoSuchElementException("Item not found for id: $id")
  }

  @QueryMapping
  fun itemsByCategory(categoryId: Int): List<Item> {
    return itemService.findByCategoryId(categoryId)
  }

  @QueryMapping
  fun itemsByLocation(location: String): List<Item> {
    return itemService.findByLocation(location)
  }

  @QueryMapping
  fun lowStockItems(): List<Item> {
    return itemService.findLowStockItems()
  }

  @QueryMapping
  fun searchItems(searchTerm: String): List<Item> {
    return itemService.search(searchTerm)
  }
  
  // Paginated queries
  @QueryMapping
  fun itemsPaginated(page: Int, size: Int): ItemPage {
    return itemService.findAllPaginated(page, size)
  }
  
  @QueryMapping
  fun itemsByCategoryPaginated(categoryId: Int!, page: Int, size: Int): ItemPage {
    return itemService.findByCategoryIdPaginated(categoryId, page, size)
  }
  
  @QueryMapping
  fun itemsByLocationPaginated(location: String!, page: Int, size: Int): ItemPage {
    return itemService.findByLocationPaginated(location, page, size)
  }
  
  @QueryMapping
  fun lowStockItemsPaginated(page: Int, size: Int): ItemPage {
    return itemService.findLowStockItemsPaginated(page, size)
  }
  
  @QueryMapping
  fun searchItemsPaginated(searchTerm: String!, page: Int, size: Int): ItemPage {
    return itemService.searchPaginated(searchTerm, page, size)
  }
}

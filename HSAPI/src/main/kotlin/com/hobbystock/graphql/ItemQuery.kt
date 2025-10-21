package com.hobbystock.graphql

import com.hobbystock.services.ItemService
import com.hobbystock.types.Item
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class ItemQueryController {
  private val itemService: ItemService

  constructor(itemService: ItemService) {
    this.itemService = itemService
  }

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
}

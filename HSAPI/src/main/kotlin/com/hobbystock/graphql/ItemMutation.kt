package com.hobbystock.graphql

import com.hobbystock.services.ItemService
import com.hobbystock.types.ItemInput
import com.hobbystock.types.ItemMutationResult
import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.stereotype.Controller

@Controller
class ItemMutationController @Autowired constructor(private val itemService: ItemService) {
  @MutationMapping
  fun createItem(@Argument input: ItemInput): ItemMutationResult {
    println("DEBUG: GraphQL mutation received input: $input")
    println("DEBUG: categoryId in mutation: ${input.categoryId}")
    return ItemMutationResult(
            success = true,
            message = "Item created successfully",
            item = itemService.create(input)
    )
  }

  @MutationMapping
  fun updateItem(@Argument id: UUID, @Argument input: ItemInput): ItemMutationResult {
    return ItemMutationResult(
            success = true,
            message = "Item updated successfully",
            item = itemService.updateItem(id, input)
    )
  }

  @MutationMapping
  fun deleteItem(@Argument id: UUID): ItemMutationResult {
    return itemService.deleteItem(id)
  }
}

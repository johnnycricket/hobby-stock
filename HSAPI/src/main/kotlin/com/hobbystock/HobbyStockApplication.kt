package com.hobbystock

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class HobbyStockApplication

fun main(args: Array<String>) {
    runApplication<HobbyStockApplication>(*args)
}

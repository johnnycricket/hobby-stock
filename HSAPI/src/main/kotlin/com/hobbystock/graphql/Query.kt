package com.hobbystock.graphql

import org.springframework.stereotype.Component

@Component
class Query {
    
    fun hello(): String {
        return "Hello from Hobby Stock GraphQL API!"
    }
}

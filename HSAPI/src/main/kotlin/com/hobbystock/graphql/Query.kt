package com.hobbystock.graphql

import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class QueryController {

    @QueryMapping
    fun hello(): String {
        return "Hello from Hobby Stock GraphQL API!"
    }
}

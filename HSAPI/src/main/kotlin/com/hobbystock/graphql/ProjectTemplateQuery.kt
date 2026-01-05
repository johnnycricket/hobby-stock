package com.hobbystock.graphql

import com.hobbystock.services.ProjectTemplateService
import com.hobbystock.types.ProjectTemplate
import com.hobbystock.types.ProjectTemplateItem
import com.hobbystock.types.ProjectTemplatePage
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectTemplateQueryController
@Autowired
constructor(
        private val templateService: ProjectTemplateService,
        private val itemService: com.hobbystock.services.ItemService
) {
        @QueryMapping
        fun projectTemplates(): List<ProjectTemplate> {
                return templateService.findAll()
        }

        @QueryMapping
        fun projectTemplate(@Argument id: Long): ProjectTemplate {
                return templateService.findById(id)
                        ?: throw NoSuchElementException("Template not found for id: $id")
        }

        @QueryMapping
        fun projectTemplatesPaginated(
                @Argument page: Int = 0,
                @Argument size: Int = 20
        ): ProjectTemplatePage {
                return templateService.findAllPaginated(page, size)
        }

        @SchemaMapping(typeName = "ProjectTemplate", field = "items")
        fun items(template: ProjectTemplate): List<ProjectTemplateItem> {
                return template.items ?: emptyList()
        }

        @SchemaMapping(typeName = "ProjectTemplateItem", field = "item")
        fun item(templateItem: ProjectTemplateItem): com.hobbystock.types.Item? {
                return itemService.findById(templateItem.itemId)
        }
}


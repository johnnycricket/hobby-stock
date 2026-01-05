package com.hobbystock.graphql

import com.hobbystock.services.ProjectTemplateService
import com.hobbystock.types.ProjectInput
import com.hobbystock.types.ProjectMutationResult
import com.hobbystock.types.ProjectTemplateInput
import com.hobbystock.types.ProjectTemplateMutationResult
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.stereotype.Controller

@Controller
class ProjectTemplateMutationController
@Autowired
constructor(private val templateService: ProjectTemplateService) {
        @MutationMapping
        fun createProjectTemplate(
                @Argument input: ProjectTemplateInput
        ): ProjectTemplateMutationResult {
                return try {
                        val template = templateService.createTemplate(input)
                        ProjectTemplateMutationResult(
                                success = true,
                                message = "Template created successfully",
                                template = template
                        )
                } catch (e: Exception) {
                        ProjectTemplateMutationResult(
                                success = false,
                                message = "Failed to create template: ${e.message}",
                                template = null
                        )
                }
        }

        @MutationMapping
        fun updateProjectTemplate(
                @Argument id: Long,
                @Argument input: ProjectTemplateInput
        ): ProjectTemplateMutationResult {
                return try {
                        val template = templateService.updateTemplate(id, input)
                        ProjectTemplateMutationResult(
                                success = true,
                                message = "Template updated successfully",
                                template = template
                        )
                } catch (e: NoSuchElementException) {
                        ProjectTemplateMutationResult(
                                success = false,
                                message = "Template not found",
                                template = null
                        )
                } catch (e: Exception) {
                        ProjectTemplateMutationResult(
                                success = false,
                                message = "Failed to update template: ${e.message}",
                                template = null
                        )
                }
        }

        @MutationMapping
        fun deleteProjectTemplate(@Argument id: Long): ProjectTemplateMutationResult {
                return templateService.deleteTemplate(id)
        }

        @MutationMapping
        fun createProjectFromTemplate(
                @Argument templateId: Long,
                @Argument projectInput: ProjectInput
        ): ProjectMutationResult {
                return try {
                        templateService.createProjectFromTemplate(templateId, projectInput)
                } catch (e: NoSuchElementException) {
                        ProjectMutationResult(
                                success = false,
                                message = "Template not found",
                                project = null
                        )
                } catch (e: Exception) {
                        ProjectMutationResult(
                                success = false,
                                message = "Failed to create project from template: ${e.message}",
                                project = null
                        )
                }
        }
}




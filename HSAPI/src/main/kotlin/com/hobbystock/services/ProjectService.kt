package com.hobbystock.services

import com.hobbystock.entities.ProjectsEntity
import com.hobbystock.repositories.ProjectRepository
import com.hobbystock.types.Project
import com.hobbystock.types.ProjectInput
import com.hobbystock.types.ProjectMutationResult
import java.time.LocalDate
import java.time.LocalDateTime
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ProjectService(private val projectRepository: ProjectRepository) {
  fun findAll(): List<Project> = projectRepository.findAll().map { it.toGraphQLType() }

  fun findById(id: Int): Project? =
          projectRepository.findById(id.toLong()).orElse(null)?.toGraphQLType()

  fun findByStatus(status: String): List<Project> =
          projectRepository.findByStatus(status).map { it.toGraphQLType() }

  fun search(searchTerm: String): List<Project> =
          projectRepository.search(searchTerm).map { it.toGraphQLType() }

  @Transactional
  fun createProject(project: ProjectInput): Project {
    val entity =
            ProjectsEntity(
                    name = project.name,
                    description = project.description,
                    status = project.status,
                    startDate = project.startDate?.let { LocalDate.parse(it) },
                    endDate = project.endDate?.let { LocalDate.parse(it) },
                    createdAt = LocalDateTime.now(),
                    updatedAt = LocalDateTime.now()
            )
    return projectRepository.save(entity).toGraphQLType()
  }

  @Transactional
  fun updateProject(id: Int, project: ProjectInput): Project {
    val existing =
            projectRepository.findById(id.toLong()).orElseThrow {
              NoSuchElementException("Project not found")
            }
    val updatedEntity =
            existing.copy(
                    name = project.name,
                    description = project.description,
                    status = project.status,
                    startDate = project.startDate?.let { LocalDate.parse(it) },
                    endDate = project.endDate?.let { LocalDate.parse(it) }
            )
    return projectRepository.save(updatedEntity).toGraphQLType()
  }

  @Transactional
  fun deleteProject(id: Int): ProjectMutationResult {
    return try {
      projectRepository.deleteById(id.toLong())
      ProjectMutationResult(
              success = true,
              message = "Project deleted successfully",
              project = null
      )
    } catch (e: Exception) {
      ProjectMutationResult(success = false, message = "Project not found", project = null)
    }
  }

  @Transactional
  fun updateProjectStatus(id: Int, status: String): ProjectMutationResult {
    val existing =
            projectRepository.findById(id.toLong()).orElseThrow {
              NoSuchElementException("Project not found")
            }
    val updatedEntity = existing.copy(status = status)
    return projectRepository.save(updatedEntity).toGraphQLType()
  }

  @Transactional
  fun completeProject(id: Int, endDate: String): ProjectMutationResult {
    val existing =
            projectRepository.findById(id.toLong()).orElseThrow {
              NoSuchElementException("Project not found")
            }
    val updatedEntity = existing.copy(endDate = endDate?.let { LocalDate.parse(it) })
    return projectRepository.save(updatedEntity).toGraphQLType()
  }
}

private fun ProjectsEntity.toGraphQLType(): Project =
        Project(
                id = this.id.toInt(),
                name = this.name,
                description = this.description,
                status = this.status,
                startDate = this.startDate?.toString(),
                endDate = this.endDate?.toString(),
                createdAt = this.createdAt.toString(),
                updatedAt = this.updatedAt?.toString()
        )

package com.hobbystock.services

import com.hobbystock.entities.ProjectsEntity
import com.hobbystock.repositories.ProjectRepository
import com.hobbystock.types.PageInfo
import com.hobbystock.types.Project
import com.hobbystock.types.ProjectInput
import com.hobbystock.types.ProjectMutationResult
import com.hobbystock.types.ProjectPage
import java.time.LocalDate
import java.time.LocalDateTime
import org.springframework.data.domain.PageRequest
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

  // Paginated methods
  fun findAllPaginated(page: Int = 0, size: Int = 20): ProjectPage {
    val pageable = PageRequest.of(page, size)
    val pageResult = projectRepository.findAll(pageable)

    return ProjectPage(
            content = pageResult.content.map { it.toGraphQLType() },
            pageInfo =
                    PageInfo(
                            totalElements = pageResult.totalElements,
                            totalPages = pageResult.totalPages,
                            currentPage = pageResult.number,
                            hasNext = pageResult.hasNext(),
                            hasPrevious = pageResult.hasPrevious()
                    )
    )
  }

  fun findByStatusPaginated(status: String, page: Int = 0, size: Int = 20): ProjectPage {
    val pageable = PageRequest.of(page, size)
    val pageResult = projectRepository.findByStatus(status, pageable)

    return ProjectPage(
            content = pageResult.content.map { it.toGraphQLType() },
            pageInfo =
                    PageInfo(
                            totalElements = pageResult.totalElements,
                            totalPages = pageResult.totalPages,
                            currentPage = pageResult.number,
                            hasNext = pageResult.hasNext(),
                            hasPrevious = pageResult.hasPrevious()
                    )
    )
  }

  fun searchPaginated(searchTerm: String, page: Int = 0, size: Int = 20): ProjectPage {
    val pageable = PageRequest.of(page, size)
    val pageResult = projectRepository.search(searchTerm, pageable)

    return ProjectPage(
            content = pageResult.content.map { it.toGraphQLType() },
            pageInfo =
                    PageInfo(
                            totalElements = pageResult.totalElements,
                            totalPages = pageResult.totalPages,
                            currentPage = pageResult.number,
                            hasNext = pageResult.hasNext(),
                            hasPrevious = pageResult.hasPrevious()
                    )
    )
  }

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

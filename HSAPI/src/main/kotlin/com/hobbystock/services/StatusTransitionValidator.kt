package com.hobbystock.services

import com.hobbystock.types.ProjectStatus
import org.springframework.stereotype.Service

@Service
class StatusTransitionValidator {
  private val validTransitions: Map<ProjectStatus, Set<ProjectStatus>> =
          mapOf(
                  ProjectStatus.PLANNING to setOf(ProjectStatus.ACTIVE, ProjectStatus.ON_HOLD),
                  ProjectStatus.ACTIVE to setOf(ProjectStatus.ON_HOLD, ProjectStatus.COMPLETED),
                  ProjectStatus.ON_HOLD to setOf(ProjectStatus.ACTIVE, ProjectStatus.COMPLETED),
                  ProjectStatus.COMPLETED to emptySet() // No transitions allowed from COMPLETED
          )

  fun isValidTransition(from: ProjectStatus, to: ProjectStatus): Boolean {
    if (from == to) return true // Same status is always valid
    return validTransitions[from]?.contains(to) ?: false
  }

  fun validateTransition(from: ProjectStatus, to: ProjectStatus) {
    if (!isValidTransition(from, to)) {
      throw IllegalArgumentException(
              "Invalid status transition: Cannot change status from ${from.name} to ${to.name}"
      )
    }
  }
}

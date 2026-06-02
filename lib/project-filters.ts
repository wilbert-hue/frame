import type { ProjectDataset, ProjectFilters, ProjectRecord } from './project-types'

export function getFilterOptions(projects: ProjectRecord[]) {
  const pick = (key: keyof ProjectRecord) =>
    [...new Set(projects.map((p) => p[key]).filter((v) => v != null && String(v).trim() !== ''))]
      .map(String)
      .sort()

  return {
    trackingPeriods: pick('Tracking Period'),
    regions: pick('Region / Zone'),
    projectTypes: pick('Project Type'),
    projectStages: pick('Project Stage'),
    opportunityRatings: pick('Opportunity Rating'),
    currentStatuses: pick('Current Status'),
  }
}

export function applyProjectFilters(
  projects: ProjectRecord[],
  filters: ProjectFilters
): ProjectRecord[] {
  const search = filters.search.trim().toLowerCase()

  return projects.filter((project) => {
    if (search) {
      const haystack = [
        project['Project Name'],
        project['Project Developer / Owner'],
        project.City,
        project['EPC / Main Contractor'],
        project.Remarks,
        project['Project No.'],
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(search)) return false
    }

    if (
      filters.trackingPeriods.length > 0 &&
      !filters.trackingPeriods.includes(String(project['Tracking Period'] ?? ''))
    ) {
      return false
    }

    if (
      filters.regions.length > 0 &&
      !filters.regions.includes(String(project['Region / Zone'] ?? ''))
    ) {
      return false
    }

    if (
      filters.projectTypes.length > 0 &&
      !filters.projectTypes.includes(String(project['Project Type'] ?? ''))
    ) {
      return false
    }

    if (
      filters.projectStages.length > 0 &&
      !filters.projectStages.includes(String(project['Project Stage'] ?? ''))
    ) {
      return false
    }

    if (
      filters.opportunityRatings.length > 0 &&
      !filters.opportunityRatings.includes(String(project['Opportunity Rating'] ?? ''))
    ) {
      return false
    }

    if (
      filters.currentStatuses.length > 0 &&
      !filters.currentStatuses.includes(String(project['Current Status'] ?? ''))
    ) {
      return false
    }

    return true
  })
}

export function computeKpis(dataset: ProjectDataset, filtered: ProjectRecord[]) {
  const active = filtered
  const highOpportunity = active.filter((p) =>
    String(p['Opportunity Rating'] ?? '').toLowerCase().includes('high')
  ).length
  const regions = new Set(active.map((p) => p['Region / Zone']).filter(Boolean))

  return {
    totalShown: filtered.length,
    activeProjects: active.length,
    highOpportunity,
    regions: regions.size,
  }
}

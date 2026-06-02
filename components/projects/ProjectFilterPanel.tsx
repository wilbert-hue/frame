'use client'

import { useMemo } from 'react'
import { RotateCcw, Search } from 'lucide-react'
import { useProjectStore } from '@/lib/project-store'
import { getFilterOptions } from '@/lib/project-filters'
import { FilterDropdown } from './FilterDropdown'

export function ProjectFilterPanel() {
  const { dataset, filters, setFilters, resetFilters } = useProjectStore()

  const options = useMemo(
    () => (dataset ? getFilterOptions(dataset.projects) : null),
    [dataset]
  )

  if (!dataset || !options) return null

  const activeFilterCount =
    (filters.search ? 1 : 0) +
    filters.trackingPeriods.length +
    filters.regions.length +
    filters.projectTypes.length +
    filters.projectStages.length +
    filters.opportunityRatings.length +
    filters.currentStatuses.length

  return (
    <div className="filter-panel bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-4 overflow-visible">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-800"
          >
            <RotateCcw className="h-3 w-3" />
            Reset all
          </button>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1.5 block">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-600" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            placeholder="Project, developer, city..."
            className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 placeholder:text-gray-600 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      <FilterDropdown
        label="Tracking Period"
        options={options.trackingPeriods}
        selected={filters.trackingPeriods}
        onChange={(trackingPeriods) => setFilters({ trackingPeriods })}
        placeholder="All periods"
      />

      <FilterDropdown
        label="Region / Zone"
        options={options.regions}
        selected={filters.regions}
        onChange={(regions) => setFilters({ regions })}
        placeholder="All regions"
      />

      <FilterDropdown
        label="Project Type"
        options={options.projectTypes}
        selected={filters.projectTypes}
        onChange={(projectTypes) => setFilters({ projectTypes })}
        placeholder="All types"
      />

      <FilterDropdown
        label="Project Stage"
        options={options.projectStages}
        selected={filters.projectStages}
        onChange={(projectStages) => setFilters({ projectStages })}
        placeholder="All stages"
      />

      <FilterDropdown
        label="Opportunity Rating"
        options={options.opportunityRatings}
        selected={filters.opportunityRatings}
        onChange={(opportunityRatings) => setFilters({ opportunityRatings })}
        placeholder="All ratings"
      />

      <FilterDropdown
        label="Current Status"
        options={options.currentStatuses}
        selected={filters.currentStatuses}
        onChange={(currentStatuses) => setFilters({ currentStatuses })}
        placeholder="All statuses"
      />
    </div>
  )
}

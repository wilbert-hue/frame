import { create } from 'zustand'
import type { ProjectDataset, ProjectFilters } from './project-types'
import { DEFAULT_PROJECT_FILTERS } from './project-types'

interface ProjectStore {
  dataset: ProjectDataset | null
  filters: ProjectFilters
  showAllColumns: boolean
  isLoading: boolean
  error: string | null
  setDataset: (dataset: ProjectDataset) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilters: (filters: Partial<ProjectFilters>) => void
  resetFilters: () => void
  setShowAllColumns: (show: boolean) => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  dataset: null,
  filters: { ...DEFAULT_PROJECT_FILTERS },
  showAllColumns: false,
  isLoading: true,
  error: null,
  setDataset: (dataset) => set({ dataset, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setFilters: (partial) =>
    set((state) => ({ filters: { ...state.filters, ...partial } })),
  resetFilters: () => set({ filters: { ...DEFAULT_PROJECT_FILTERS } }),
  setShowAllColumns: (showAllColumns) => set({ showAllColumns }),
}))

'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { AlertTriangle } from 'lucide-react'
import { useProjectStore } from '@/lib/project-store'
import type { ProjectDataset } from '@/lib/project-types'
import { applyProjectFilters, computeKpis } from '@/lib/project-filters'
import { ProjectFilterPanel } from '@/components/projects/ProjectFilterPanel'
import { ProjectKPICards } from '@/components/projects/ProjectKPICards'
import { ProjectDataTable } from '@/components/projects/ProjectDataTable'

export default function DashboardPage() {
  const { dataset, filters, isLoading, error, setDataset, setLoading, setError } =
    useProjectStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    async function loadData() {
      try {
        setLoading(true)
        const res = await fetch('/data/aluminium-frame-projects.json')
        if (!res.ok) throw new Error(`Failed to load project data (${res.status})`)
        const data: ProjectDataset = await res.json()
        setDataset(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [setDataset, setLoading, setError])

  const filteredRows = useMemo(
    () => (dataset ? applyProjectFilters(dataset.projects, filters) : []),
    [dataset, filters]
  )

  const kpis = useMemo(
    () => (dataset ? computeKpis(dataset, filteredRows) : null),
    [dataset, filteredRows]
  )

  if (!mounted) return null

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-teal-600 mx-auto" />
          <p className="mt-4 text-gray-700">Loading project database...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md px-4">
          <p className="text-red-600 font-semibold mb-2">Unable to load dashboard</p>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Reload
          </button>
        </div>
      </div>
    )
  }

  if (!dataset) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-700">No data available</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-[1600px]">
        <header className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Coherent Market Insights"
              width={150}
              height={60}
              className="h-auto w-auto max-w-[150px]"
              priority
            />
          </div>
          <div className="flex-1 text-center min-w-[200px]">
            <h1 className="text-2xl font-bold text-gray-900">Coherent Dashboard</h1>
            <p className="text-sm text-gray-600 mt-0.5">
              {dataset.meta.marketTitle} — {dataset.meta.dashboardTitle}
            </p>
          </div>
          <div className="w-[150px] hidden lg:block" aria-hidden />
        </header>

        {kpis && (
          <div className="mb-6 space-y-4">
            <ProjectKPICards
              activeProjects={kpis.activeProjects}
              highOpportunity={kpis.highOpportunity}
              regions={kpis.regions}
              totalShown={kpis.totalShown}
            />
            <div
              role="alert"
              className="flex gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-950"
            >
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-600 mt-0.5" aria-hidden />
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">NOTE:</span> All the data in the dashboard is demo
                data. No real-world data is related to this.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-6">
              <ProjectFilterPanel />
            </div>
          </aside>

          <main className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <ProjectDataTable rows={filteredRows} />
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              Source: {dataset.meta.sourceFile} · {dataset.meta.totalRows} projects
              {dataset.meta.demoRows != null && dataset.meta.demoRows > 0
                ? ` (${dataset.meta.demoRows} demo-filled from template)`
                : ''}
            </p>
          </main>
        </div>
      </div>
    </div>
  )
}

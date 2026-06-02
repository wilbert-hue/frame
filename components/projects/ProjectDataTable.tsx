'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import type { ProjectRecord } from '@/lib/project-types'
import { TABLE_COLUMNS } from '@/lib/project-types'
import { useProjectStore } from '@/lib/project-store'

interface ProjectDataTableProps {
  rows: ProjectRecord[]
}

type SortDir = 'asc' | 'desc'

export function ProjectDataTable({ rows }: ProjectDataTableProps) {
  const { showAllColumns, setShowAllColumns } = useProjectStore()
  const [sortKey, setSortKey] = useState<string>('Project No.')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const columns = useMemo(
    () =>
      TABLE_COLUMNS.filter((col) =>
        showAllColumns ? true : col.defaultVisible !== false
      ),
    [showAllColumns]
  )

  const sortedRows = useMemo(() => {
    const copy = [...rows]
    copy.sort((a, b) => {
      const av = a[sortKey as keyof ProjectRecord]
      const bv = b[sortKey as keyof ProjectRecord]
      const aStr = av == null ? '' : String(av)
      const bStr = bv == null ? '' : String(bv)
      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true })
      return sortDir === 'asc' ? cmp : -cmp
    })
    return copy
  }, [rows, sortKey, sortDir])

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortKey !== columnKey) {
      return <ArrowUpDown className="h-3.5 w-3.5 text-gray-400 inline ml-1" />
    }
    return sortDir === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5 text-teal-600 inline ml-1" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-teal-600 inline ml-1" />
    )
  }

  const ratingClass = (rating?: string) => {
    const r = String(rating ?? '').toLowerCase()
    if (r.includes('high')) return 'bg-green-100 text-green-800'
    if (r.includes('medium')) return 'bg-amber-100 text-amber-800'
    if (r.includes('significant')) return 'bg-blue-100 text-blue-800'
    return 'bg-gray-100 text-gray-700'
  }

  if (rows.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-600">No projects match the current filters.</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Project Tracking Table</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {sortedRows.length} row{sortedRows.length !== 1 ? 's' : ''} · click column headers to sort
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={showAllColumns}
            onChange={(e) => setShowAllColumns(e.target.checked)}
            className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />
          Show all columns
        </label>
      </div>

      <div className="overflow-auto border border-gray-200 rounded-lg bg-white max-h-[calc(100vh-20rem)]">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="px-3 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                >
                  {col.label}
                  <SortIcon columnKey={col.key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedRows.map((row) => (
              <tr key={row.id} className="hover:bg-teal-50/40">
                {columns.map((col) => {
                  const value = row[col.key as keyof ProjectRecord]
                  const display =
                    value !== null && value !== undefined ? String(value).trim() : ''

                  if (col.key === 'Project Name' && display) {
                    return (
                      <td key={col.key} className="px-3 py-2.5 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{display}</span>
                        {row._isDemo && (
                          <span className="ml-1.5 text-[10px] uppercase tracking-wide text-gray-400 font-normal">
                            demo
                          </span>
                        )}
                      </td>
                    )
                  }

                  if (col.key === 'Opportunity Rating' && display) {
                    return (
                      <td key={col.key} className="px-3 py-2.5 whitespace-nowrap">
                        <span
                          className={`inline-block max-w-xs truncate px-2 py-0.5 rounded-full text-xs font-medium ${ratingClass(display)}`}
                          title={display}
                        >
                          {display.length > 40 ? `${display.slice(0, 40)}…` : display}
                        </span>
                      </td>
                    )
                  }

                  return (
                    <td
                      key={col.key}
                      className="px-3 py-2.5 text-gray-900 align-top max-w-xs"
                      title={display}
                    >
                      {display ? (
                        <span className="line-clamp-3">{display}</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

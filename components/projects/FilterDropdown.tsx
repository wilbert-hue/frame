'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown } from 'lucide-react'

interface FilterDropdownProps {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
}

const MENU_GAP = 4
const MENU_MAX_HEIGHT = 224

type MenuPosition = {
  top?: number
  bottom?: number
  left: number
  width: number
  maxHeight: number
}

export function FilterDropdown({
  label,
  options,
  selected,
  onChange,
  placeholder = 'All',
}: FilterDropdownProps) {
  const menuId = `filter-menu-${label.replace(/[^a-zA-Z0-9]/g, '-')}`
  const [isOpen, setIsOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  const updateMenuPosition = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const viewportPadding = 12
    const spaceBelow = window.innerHeight - rect.bottom - viewportPadding
    const spaceAbove = rect.top - viewportPadding
    const openUp = spaceBelow < 160 && spaceAbove > spaceBelow
    const maxHeight = Math.max(
      120,
      Math.min(MENU_MAX_HEIGHT, (openUp ? spaceAbove : spaceBelow) - MENU_GAP)
    )

    if (openUp) {
      setMenuPosition({
        bottom: window.innerHeight - rect.top + MENU_GAP,
        left: rect.left,
        width: rect.width,
        maxHeight,
      })
    } else {
      setMenuPosition({
        top: rect.bottom + MENU_GAP,
        left: rect.left,
        width: rect.width,
        maxHeight,
      })
    }
  }, [])

  useLayoutEffect(() => {
    if (!isOpen) {
      setMenuPosition(null)
      return
    }
    updateMenuPosition()
  }, [isOpen, options.length, updateMenuPosition])

  useEffect(() => {
    if (!isOpen) return

    const onScrollOrResize = () => updateMenuPosition()
    window.addEventListener('resize', onScrollOrResize)
    window.addEventListener('scroll', onScrollOrResize, true)

    return () => {
      window.removeEventListener('resize', onScrollOrResize)
      window.removeEventListener('scroll', onScrollOrResize, true)
    }
  }, [isOpen, updateMenuPosition])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      if (
        containerRef.current?.contains(target) ||
        document.getElementById(menuId)?.contains(target)
      ) {
        return
      }
      setIsOpen(false)
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, menuId])

  if (options.length === 0) return null

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const triggerLabel =
    selected.length === 0
      ? placeholder
      : selected.length === 1
        ? selected[0].length > 28
          ? `${selected[0].slice(0, 28)}…`
          : selected[0]
        : `${selected.length} selected`

  const menu =
    isOpen && menuPosition && mounted
      ? createPortal(
          <div
            id={menuId}
            className="fixed z-[200] bg-white border border-gray-200 rounded-md shadow-lg overflow-y-auto sidebar-scroll"
            style={{
              top: menuPosition.top,
              bottom: menuPosition.bottom,
              left: menuPosition.left,
              width: menuPosition.width,
              maxHeight: menuPosition.maxHeight,
            }}
          >
            <div className="sticky top-0 z-10 p-1 border-b border-gray-100 flex gap-1 bg-white">
              <button
                type="button"
                onClick={() => onChange([])}
                className="flex-1 px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50 rounded"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => onChange([...options])}
                className="flex-1 px-2 py-1.5 text-xs text-teal-700 hover:bg-teal-50 rounded"
              >
                Select all
              </button>
            </div>
            {options.map((option) => {
              const isSelected = selected.includes(option)
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggle(option)}
                  className={`w-full flex items-start gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                    isSelected ? 'bg-teal-50/60' : ''
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border ${
                      isSelected ? 'bg-teal-600 border-teal-600' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </span>
                  <span className="leading-snug text-gray-800">{option}</span>
                </button>
              )
            })}
          </div>,
          document.body
        )
      : null

  return (
    <div ref={containerRef} className="relative">
      <label className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1.5 block">
        {label}
      </label>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left border rounded-md bg-white transition-colors ${
          isOpen
            ? 'border-teal-500 ring-2 ring-teal-500/20 text-gray-900'
            : selected.length > 0
              ? 'border-teal-400 text-gray-900'
              : 'border-gray-300 text-gray-600 hover:border-gray-400'
        }`}
      >
        <span className="truncate">{triggerLabel}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {menu}
    </div>
  )
}

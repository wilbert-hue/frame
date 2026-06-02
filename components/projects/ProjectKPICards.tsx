'use client'

import { Building2, MapPin, Star } from 'lucide-react'

interface ProjectKPICardsProps {
  activeProjects: number
  highOpportunity: number
  regions: number
  totalShown: number
}

export function ProjectKPICards({
  activeProjects,
  highOpportunity,
  regions,
  totalShown,
}: ProjectKPICardsProps) {
  const cards = [
    {
      label: 'Total Projects',
      value: String(activeProjects),
      sub: `${totalShown} row${totalShown !== 1 ? 's' : ''} after filters`,
      icon: Building2,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'High Opportunity',
      value: String(highOpportunity),
      sub: 'Rating includes High',
      icon: Star,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Regions Covered',
      value: String(regions),
      sub: 'Unique regions in filter',
      icon: MapPin,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-start gap-3"
        >
          <div className={`p-2 rounded-lg ${card.iconBg}`}>
            <card.icon className={`h-5 w-5 ${card.iconColor}`} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 font-medium">{card.label}</p>
            <p className="text-xl font-bold text-gray-900 truncate">{card.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

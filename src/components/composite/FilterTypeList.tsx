import React from 'react'
import { Tag } from '../base'
import { PokemonFilterTyped } from '@/types/pokemon'

interface FilterTypeListProps {
  filterTypesData: PokemonFilterTyped[]
  isLoading?: boolean
  selectedTypes: string[]
  total: number
  handleSelectType: (type: string) => void
}

export const FilterTypeList = ({
  filterTypesData,
  isLoading,
  selectedTypes,
  total,
  handleSelectType,
}: FilterTypeListProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="h-[38px] w-[76px] bg-gray-200 rounded-lg  animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (!filterTypesData || filterTypesData.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-red-500">Failed to load types.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Total */}
      <div className="mb-4 flex items-center">
        <p className="text-lg font-semibold text-gray-900 mr-2">Total count:</p>
        <span className="text-indigo-600 text-2xl font-extrabold">
          {total || 0}
        </span>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-3">
        <p className="text-gray-500 mr-2 self-center text-sm">Types:</p>

        {filterTypesData.map((type) => (
          <Tag
            key={type.name}
            type={type.name}
            isActive={selectedTypes.includes(type.name)}
            onClick={() => handleSelectType(type.name)}
          />
        ))}
      </div>
    </div>
  )
}
